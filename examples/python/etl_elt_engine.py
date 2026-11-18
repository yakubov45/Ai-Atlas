from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal, InvalidOperation


RAW_EVENTS: list[dict[str, object]] = [
    {"eventId": "e-001", "orderId": 101, "amountText": "120.00", "updatedAt": "2026-11-10T09:00:00Z"},
    {"eventId": "e-002", "orderId": 102, "amountText": "80.00", "updatedAt": "2026-11-10T09:02:00Z"},
    {"eventId": "e-003", "orderId": 101, "amountText": "135.00", "updatedAt": "2026-11-10T10:00:00Z"},
    {"eventId": "e-004", "orderId": 103, "amountText": "oops", "updatedAt": "2026-11-10T11:00:00Z"},
    {"eventId": "e-005", "orderId": 104, "amountText": "20.00", "updatedAt": "2026-11-10T11:20:00Z"},
]


@dataclass(frozen=True)
class CleanOrderEvent:
    event_id: str
    order_id: int
    amount: Decimal
    updated_at: datetime


@dataclass(frozen=True)
class QuarantinedEvent:
    raw: dict[str, object]
    reason: str


def parse_timestamp(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def validate_and_transform(
    events: list[dict[str, object]],
) -> tuple[list[CleanOrderEvent], list[QuarantinedEvent]]:
    seen_event_ids: set[str] = set()
    valid: list[CleanOrderEvent] = []
    quarantine: list[QuarantinedEvent] = []

    for row in events:
        event_id = str(row.get("eventId", ""))
        if not event_id or event_id in seen_event_ids:
            continue
        seen_event_ids.add(event_id)

        try:
            order_id = int(row["orderId"])
            amount = Decimal(str(row["amountText"]))
            updated_at = parse_timestamp(str(row["updatedAt"]))
        except (KeyError, ValueError, InvalidOperation):
            quarantine.append(QuarantinedEvent(raw=row, reason="invalid_amount"))
            continue

        if amount <= Decimal("0.00"):
            quarantine.append(QuarantinedEvent(raw=row, reason="non_positive_amount"))
            continue

        valid.append(
            CleanOrderEvent(
                event_id=event_id,
                order_id=order_id,
                amount=amount.quantize(Decimal("0.01")),
                updated_at=updated_at,
            )
        )

    return valid, quarantine


def upsert_latest_orders(valid_events: list[CleanOrderEvent]) -> list[CleanOrderEvent]:
    latest_by_order: dict[int, CleanOrderEvent] = {}
    for item in valid_events:
        current = latest_by_order.get(item.order_id)
        if current is None or (item.updated_at, item.event_id) > (current.updated_at, current.event_id):
            latest_by_order[item.order_id] = item
    return [latest_by_order[key] for key in sorted(latest_by_order)]


def run_pipeline(events: list[dict[str, object]], mode: str = "elt") -> dict[str, object]:
    if mode not in {"etl", "elt"}:
        raise ValueError("mode must be 'etl' or 'elt'")

    raw_staging = list(events) if mode == "elt" else []
    valid_events, quarantine = validate_and_transform(raw_staging if mode == "elt" else events)
    final_orders = upsert_latest_orders(valid_events)
    total_revenue = sum((row.amount for row in final_orders), Decimal("0.00"))

    return {
        "mode": mode,
        "rawCount": len(events),
        "stagingCount": len(raw_staging),
        "validEventCount": len(valid_events),
        "quarantineCount": len(quarantine),
        "finalOrderCount": len(final_orders),
        "totalRevenue": str(total_revenue),
        "finalOrders": [
            {
                "orderId": row.order_id,
                "amount": str(row.amount),
                "eventId": row.event_id,
                "updatedAt": row.updated_at.isoformat(),
            }
            for row in final_orders
        ],
        "quarantine": [{"eventId": q.raw.get("eventId"), "reason": q.reason} for q in quarantine],
    }


if __name__ == "__main__":
    etl_result = run_pipeline(RAW_EVENTS, mode="etl")
    elt_result = run_pipeline(RAW_EVENTS, mode="elt")
    replay_result = run_pipeline(RAW_EVENTS + RAW_EVENTS, mode="elt")

    assert etl_result["finalOrderCount"] == 3
    assert etl_result["totalRevenue"] == "235.00"
    assert elt_result["finalOrderCount"] == 3
    assert elt_result["totalRevenue"] == "235.00"
    assert replay_result["finalOrderCount"] == 3
    assert replay_result["totalRevenue"] == "235.00"

    print("ETL Result:", etl_result)
    print("ELT Result:", elt_result)
    print("Replay Idempotent Result:", replay_result)
