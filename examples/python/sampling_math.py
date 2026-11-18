from __future__ import annotations

import math
import random
from typing import Any


SYNTHETIC_CANDIDATES: list[dict[str, Any]] = [
    {"token": "Python", "logit": 2.4, "historyCount": 2},
    {"token": "matematika", "logit": 1.4, "historyCount": 0},
    {"token": "LLM", "logit": 0.6, "historyCount": 1},
    {"token": "fizika", "logit": -0.2, "historyCount": 0},
]


def stable_softmax(logits: list[float], temperature: float) -> list[float]:
    if not logits:
        raise ValueError("logits must not be empty")
    if not math.isfinite(temperature) or temperature < 0.0:
        raise ValueError("temperature must be a finite number >= 0")

    max_logit = max(logits)
    if temperature == 0.0:
        winners = [1.0 if abs(z - max_logit) < 1e-12 else 0.0 for z in logits]
        total = sum(winners)
        return [w / total for w in winners]

    safe_t = max(temperature, 1e-6)
    exps = [math.exp((z - max_logit) / safe_t) for z in logits]
    total = sum(exps)
    return [e / total for e in exps]


def sample(
    temperature: float = 1.0,
    top_k: int = 4,
    top_p: float = 1.0,
    frequency_penalty: float = 0.0,
    seed: int = 7,
    candidates: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    items = list(candidates or SYNTHETIC_CANDIDATES)
    n = len(items)
    if top_k < 1 or top_k > n:
        raise ValueError(f"top_k must be between 1 and {n}")
    if not (0.0 < top_p <= 1.0):
        raise ValueError("top_p must satisfy 0 < top_p <= 1")
    if frequency_penalty < 0.0:
        raise ValueError("frequency_penalty must be >= 0")

    adjusted_logits = [
        float(c["logit"]) - frequency_penalty * int(c.get("historyCount", 0))
        for c in items
    ]
    softmax_probs = stable_softmax(adjusted_logits, temperature)

    sorted_indices = sorted(
        range(n),
        key=lambda idx: (-softmax_probs[idx], idx),
    )

    kept_top_k = set(sorted_indices[:top_k])
    top_k_raw = [softmax_probs[i] if i in kept_top_k else 0.0 for i in range(n)]
    sum_top_k = sum(top_k_raw)
    after_top_k = [p / sum_top_k if sum_top_k > 0 else 0.0 for p in top_k_raw]

    kept_top_p: set[int] = set()
    running = 0.0
    for idx in sorted_indices:
        p = after_top_k[idx]
        if p <= 0.0:
            continue
        prev = running
        running += p
        if len(kept_top_p) == 0 or prev < top_p - 1e-12:
            kept_top_p.add(idx)

    top_p_raw = [after_top_k[i] if i in kept_top_p else 0.0 for i in range(n)]
    sum_top_p = sum(top_p_raw)
    final_probs = [p / sum_top_p if sum_top_p > 0 else 0.0 for p in top_p_raw]

    rng = random.Random(seed)
    u = rng.random()
    cdf = 0.0
    selected_token = str(items[sorted_indices[0]]["token"])
    for idx, prob in enumerate(final_probs):
        if prob <= 0.0:
            continue
        cdf += prob
        if u <= cdf + 1e-12:
            selected_token = str(items[idx]["token"])
            break

    return {
        "temperature": temperature,
        "top_k": top_k,
        "top_p": top_p,
        "frequency_penalty": frequency_penalty,
        "seed": seed,
        "softmaxProbabilities": {
            str(items[i]["token"]): round(softmax_probs[i] * 100, 2) for i in range(n)
        },
        "finalProbabilities": {
            str(items[i]["token"]): round(final_probs[i] * 100, 2) for i in range(n)
        },
        "selectedToken": selected_token,
    }


if __name__ == "__main__":
    baseline = sample(temperature=1.0, top_k=4, top_p=1.0, seed=7)
    assert baseline["finalProbabilities"] == {
        "Python": 62.21,
        "matematika": 22.89,
        "LLM": 10.28,
        "fizika": 4.62,
    }
    greedy = sample(temperature=0.0, top_k=4, top_p=1.0, seed=7)
    assert greedy["finalProbabilities"]["Python"] == 100.0
    assert greedy["selectedToken"] == "Python"

    top1 = sample(temperature=1.0, top_k=1, top_p=1.0, seed=7)
    assert top1["finalProbabilities"] == {
        "Python": 100.0,
        "matematika": 0.0,
        "LLM": 0.0,
        "fizika": 0.0,
    }

    print("Baseline (T=1, K=4, P=1):", baseline)
    print("Greedy (T=0):", greedy)
    print("Top-K=1:", top1)
