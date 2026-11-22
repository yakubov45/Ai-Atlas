# -*- coding: utf-8 -*-
"""
Reference teacher implementation and deterministic verification suite for:
- Lesson hf-02-05 (Tokenizer, Padding, Truncation & Attention Mask)
- Lesson hf-06-06 (BPE Pair Frequency & Merge Step)
- Lesson hf-11-04 (LoRA Low-Rank Parameter & Savings Calculator)
- Lesson hf-12-04 (GRPO Group Relative Advantage Normalization)

NOTE: Teacher/reference file only. Not bundled into client browser code.
"""

import math


def pad_batch(
    sequences,
    pad_id=0,
    max_length=None,
):
    """
    Pads and optionally truncates a batch of token ID sequences and builds
    the corresponding binary attention mask (1 for real tokens, 0 for padding).
    """
    if not isinstance(sequences, list) or len(sequences) == 0:
        raise ValueError("sequences bo'sh bo'lmagan ro'yxat bo'lishi shart.")
    if not isinstance(pad_id, int) or isinstance(pad_id, bool) or pad_id < 0:
        raise ValueError("pad_id manfiy bo'lmagan butun son bo'lishi shart.")
    if max_length is not None:
        if not isinstance(max_length, int) or isinstance(max_length, bool) or max_length < 0:
            raise ValueError("max_length manfiy bo'lmagan butun son yoki None bo'lishi shart.")

    for row in sequences:
        if not isinstance(row, list):
            raise ValueError("Har bir ketma-ketlik list bo'lishi shart.")
        for tok in row:
            if not isinstance(tok, int) or isinstance(tok, bool) or tok < 0:
                raise ValueError("Token ID manfiy bo'lmagan butun son bo'lishi shart.")

    target_len = max((len(r) for r in sequences), default=0) if max_length is None else max_length

    input_ids: list[list[int]] = []
    attention_mask: list[list[int]] = []

    for row in sequences:
        cut = list(row[:target_len])
        pad_count = target_len - len(cut)
        input_ids.append(cut + [pad_id] * pad_count)
        attention_mask.append([1] * len(cut) + [0] * pad_count)

    return input_ids, attention_mask


def bpe_merge_step(
    seq,
    pair,
    new_id,
):
    if not isinstance(seq, list) or not isinstance(pair, (tuple, list)) or len(pair) != 2:
        raise ValueError("seq list va pair 2 elementli bo'lishi shart")
    if not isinstance(new_id, int) or isinstance(new_id, bool) or new_id < 0:
        raise ValueError("new_id manfiy bo'lmagan butun son bo'lishi shart")

    a, b = pair[0], pair[1]
    out: list[int] = []
    i = 0
    while i < len(seq):
        if i < len(seq) - 1 and seq[i] == a and seq[i + 1] == b:
            out.append(new_id)
            i += 2
        else:
            out.append(seq[i])
            i += 1
    return out


def lora_layer_stats(
    in_features,
    out_features,
    r,
    alpha=16,
):
    if in_features <= 0 or out_features <= 0 or r <= 0 or alpha <= 0:
        raise ValueError("Barcha o'lchamlar va rank musbat bo'lishi shart")
    base_params = in_features * out_features
    lora_params = r * (in_features + out_features)
    scaling = float(alpha) / float(r)
    return {
        "base_params": base_params,
        "lora_params": lora_params,
        "scaling": scaling,
    }


def compute_grpo_advantages(rewards):
    if not isinstance(rewards, list) or len(rewards) < 2:
        raise ValueError("rewards kamida 2 ta elementdan iborat ro'yxat bo'lishi shart")
    n = len(rewards)
    mean_r = sum(rewards) / n
    var_r = sum((x - mean_r) ** 2 for x in rewards) / n
    std_r = math.sqrt(var_r)
    if std_r == 0:
        return [0.0 for _ in rewards]
    return [round((x - mean_r) / std_r, 4) for x in rewards]


if __name__ == "__main__":
    assert pad_batch([[11, 12], [21, 22, 23, 24]]) == (
        [[11, 12, 0, 0], [21, 22, 23, 24]],
        [[1, 1, 0, 0], [1, 1, 1, 1]],
    )
    assert pad_batch([[1, 2, 3], [4]], max_length=2) == (
        [[1, 2], [4, 0]],
        [[1, 1], [1, 0]],
    )
    assert pad_batch([[1, 2], [3]], max_length=0) == ([[], []], [[], []])
    assert bpe_merge_step([5, 5, 5], (5, 5), 9) == [9, 5]
    assert lora_layer_stats(1000, 1000, 10, 20) == {
        "base_params": 1000000,
        "lora_params": 20000,
        "scaling": 2.0,
    }
    assert compute_grpo_advantages([1.0, 0.0, 1.0, 0.0]) == [1.0, -1.0, 1.0, -1.0]
    print("All reference assertions passed.")
