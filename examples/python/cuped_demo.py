"""
AI Atlas — Data Scientist Deep-Dive Track (Phase 12: CUPED Variance Reduction)
Runnable zero-dependency Python educational demonstration for `Data_Scientist_Micro_Lesson_AB_CUPED.md`.

NOTE: All numbers below are synthetic educational examples, NOT real Booking.com or DoorDash experiment logs.

Run:
    python examples/python/cuped_demo.py
"""

from __future__ import annotations
from dataclasses import dataclass
from typing import List, Dict


@dataclass(frozen=True)
class Observation:
    group: str        # "control" or "treatment"
    x_pre: float      # Pre-experiment metric X (measured strictly before treatment)
    y_post: float     # Post-experiment metric Y (measured during experiment)


SYNTHETIC_DATASET: List[Observation] = [
    Observation("control", 1.0, 3.0),
    Observation("control", 2.0, 4.0),
    Observation("control", 3.0, 7.0),
    Observation("control", 4.0, 8.0),
    Observation("treatment", 3.0, 8.0),
    Observation("treatment", 4.0, 9.0),
    Observation("treatment", 5.0, 12.0),
    Observation("treatment", 6.0, 13.0),
]


def mean(values: List[float]) -> float:
    if not values:
        raise ValueError("Cannot compute mean of empty list.")
    return sum(values) / len(values)


def compute_cuped(observations: List[Observation]) -> Dict[str, object]:
    if not observations:
        raise ValueError("Observations list must not be empty.")

    xs = [o.x_pre for o in observations]
    ys = [o.y_post for o in observations]
    x_bar = mean(xs)
    y_bar = mean(ys)

    sum_sq_x = sum((x - x_bar) ** 2 for x in xs)
    sum_cross_xy = sum((x - x_bar) * (y - y_bar) for x, y in zip(xs, ys))

    # Zero-variance safeguard: if Var(X) == 0, theta cannot be divided by 0
    if abs(sum_sq_x) < 1e-12:
        theta = 0.0
        zero_variance_warning = True
    else:
        theta = sum_cross_xy / sum_sq_x
        zero_variance_warning = False

    adjusted_rows = []
    for obs in observations:
        y_adj = obs.y_post - theta * (obs.x_pre - x_bar)
        adjusted_rows.append(
            {
                "group": obs.group,
                "x_pre": obs.x_pre,
                "y_post": obs.y_post,
                "x_centered": obs.x_pre - x_bar,
                "y_adjusted": y_adj,
            }
        )

    control_raw = [r["y_post"] for r in adjusted_rows if r["group"] == "control"]
    treatment_raw = [r["y_post"] for r in adjusted_rows if r["group"] == "treatment"]
    control_adj = [r["y_adjusted"] for r in adjusted_rows if r["group"] == "control"]
    treatment_adj = [r["y_adjusted"] for r in adjusted_rows if r["group"] == "treatment"]

    control_raw_mean = mean(control_raw)
    treatment_raw_mean = mean(treatment_raw)
    raw_diff = treatment_raw_mean - control_raw_mean

    control_adj_mean = mean(control_adj)
    treatment_adj_mean = mean(treatment_adj)
    adj_diff = treatment_adj_mean - control_adj_mean

    return {
        "pooled_x_mean": x_bar,
        "pooled_y_mean": y_bar,
        "theta": theta,
        "zero_variance_warning": zero_variance_warning,
        "control_raw_mean": control_raw_mean,
        "treatment_raw_mean": treatment_raw_mean,
        "raw_difference": raw_diff,
        "control_adjusted_mean": control_adj_mean,
        "treatment_adjusted_mean": treatment_adj_mean,
        "adjusted_difference": adj_diff,
        "rows": adjusted_rows,
    }


def _self_test() -> None:
    res = compute_cuped(SYNTHETIC_DATASET)
    assert abs(float(res["pooled_x_mean"]) - 3.5) < 1e-9
    assert abs(float(res["theta"]) - (38.0 / 18.0)) < 1e-9
    assert abs(float(res["control_raw_mean"]) - 5.5) < 1e-9
    assert abs(float(res["treatment_raw_mean"]) - 10.5) < 1e-9
    assert abs(float(res["raw_difference"]) - 5.0) < 1e-9
    assert abs(float(res["control_adjusted_mean"]) - (5.5 + 19.0 / 9.0)) < 1e-9
    assert abs(float(res["treatment_adjusted_mean"]) - (10.5 - 19.0 / 9.0)) < 1e-9
    assert abs(float(res["adjusted_difference"]) - (7.0 / 9.0)) < 1e-9


def main() -> None:
    _self_test()
    res = compute_cuped(SYNTHETIC_DATASET)
    print("=== AI Atlas: Synthetic 8-Observation CUPED Demonstration ===")
    print(f"Pooled X mean:           {res['pooled_x_mean']:.3f}")
    print(f"Theta (Cov(X,Y)/Var(X)): {res['theta']:.6f}")
    print(f"Control raw mean:        {res['control_raw_mean']:.3f}")
    print(f"Treatment raw mean:      {res['treatment_raw_mean']:.3f}")
    print(f"Raw difference:          {res['raw_difference']:.3f}")
    print(f"Control adjusted mean:   {res['control_adjusted_mean']:.3f}")
    print(f"Treatment adjusted mean: {res['treatment_adjusted_mean']:.3f}")
    print(f"Adjusted difference:     {res['adjusted_difference']:.3f}")


if __name__ == "__main__":
    main()
