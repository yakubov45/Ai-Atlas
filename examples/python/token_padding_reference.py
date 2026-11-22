# -*- coding: utf-8 -*-
"""
Reference teacher implementation and deterministic verification suite for all
13 Hugging Face LLM Course chapters (hf-00 through hf-12):
- hf-00: check_env_readiness
- hf-01: select_transformer_arch
- hf-02: pad_batch & logits_to_prediction
- hf-03: diagnose_training_curve
- hf-04: validate_hub_repo_card
- hf-05: filter_and_rank_dataset
- hf-06: bpe_merge_step & extract_answer_from_offsets
- hf-07: align_labels_with_tokens
- hf-08: diagnose_pipeline_issue
- hf-09: format_gradio_response
- hf-10: compute_annotator_agreement
- hf-11: lora_layer_stats & format_chatml_messages
- hf-12: compute_grpo_advantages & score_reasoning_completion

NOTE: Teacher/reference file only. Not bundled into client browser code.
"""

import math


def check_env_readiness(py_major, py_minor, has_venv, installed_pkgs):
    if not isinstance(py_major, int) or not isinstance(py_minor, int) or py_major < 0 or py_minor < 0:
        raise ValueError("Python versiyasi manfiy bo'lmagan butun son bo'lishi shart")
    if not isinstance(installed_pkgs, (list, set, tuple)):
        raise ValueError("installed_pkgs ro'yxat bo'lishi shart")
    required = ["transformers", "datasets", "accelerate"]
    missing = [p for p in required if p not in installed_pkgs]
    py_ok = (py_major > 3) or (py_major == 3 and py_minor >= 10)
    ready = bool(py_ok and bool(has_venv) and len(missing) == 0)
    return {"ready": ready, "missing": missing}


def select_transformer_arch(task_name, context_tokens, max_ctx=4096):
    if not isinstance(context_tokens, int) or context_tokens < 0 or not isinstance(max_ctx, int) or max_ctx <= 0:
        raise ValueError("context_tokens >= 0 va max_ctx > 0 bo'lishi shart")
    encoder_tasks = {"classification", "ner", "extractive_qa"}
    decoder_tasks = {"generation", "chat", "code"}
    seq2seq_tasks = {"translation", "summarization"}
    if task_name in encoder_tasks:
        arch = "encoder"
    elif task_name in decoder_tasks:
        arch = "decoder"
    elif task_name in seq2seq_tasks:
        arch = "encoder_decoder"
    else:
        raise ValueError(f"Noma'lum NLP vazifasi: {task_name}")
    return {"arch": arch, "fits_context": bool(context_tokens <= max_ctx)}


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

    input_ids = []
    attention_mask = []

    for row in sequences:
        cut = list(row[:target_len])
        pad_count = target_len - len(cut)
        input_ids.append(cut + [pad_id] * pad_count)
        attention_mask.append([1] * len(cut) + [0] * pad_count)

    return input_ids, attention_mask


def logits_to_prediction(logits, id2label):
    if not isinstance(logits, list) or len(logits) == 0 or not isinstance(id2label, dict):
        raise ValueError("logits bo'sh bo'lmagan ro'yxat va id2label lug'at bo'lishi shart")
    max_z = max(logits)
    exps = [math.exp(z - max_z) for z in logits]
    total = sum(exps)
    probs = [e / total for e in exps]
    best_id = max(range(len(probs)), key=lambda i: probs[i])
    if best_id not in id2label:
        raise ValueError("Eng katta logit indeksi id2label ichida topilmadi")
    return {
        "id": best_id,
        "label": id2label[best_id],
        "confidence": round(probs[best_id], 4),
    }


def diagnose_training_curve(train_losses, val_losses):
    if (
        not isinstance(train_losses, list)
        or not isinstance(val_losses, list)
        or len(train_losses) < 2
        or len(train_losses) != len(val_losses)
    ):
        raise ValueError("train_losses va val_losses kamida 2 ta elementli teng ro'yxatlar bo'lishi shart")
    min_val = min(val_losses)
    best_epoch = val_losses.index(min_val) + 1
    if train_losses[-1] < train_losses[0] and val_losses[-1] > min_val * 1.05:
        status = "overfitting"
    elif train_losses[-1] >= train_losses[0] * 0.98:
        status = "underfitting"
    else:
        status = "healthy"
    return {"status": status, "best_epoch": best_epoch}


def validate_hub_repo_card(repo_id, license_name, metrics):
    if not isinstance(repo_id, str) or repo_id.count("/") != 1:
        raise ValueError("repo_id 'namespace/model-name' formatida bo'lishi shart")
    ns, name = [p.strip() for p in repo_id.split("/")]
    if not ns or not name:
        raise ValueError("namespace va model_name bo'sh bo'lmasligi shart")
    has_license = isinstance(license_name, str) and len(license_name.strip()) > 0
    has_metrics = isinstance(metrics, dict) and len(metrics) > 0
    return {
        "namespace": ns,
        "model_name": name,
        "ready_to_publish": bool(has_license and has_metrics),
    }


def filter_and_rank_dataset(records, min_tokens, query_vec):
    if min_tokens < 0 or not isinstance(query_vec, list) or len(query_vec) == 0:
        raise ValueError("min_tokens >= 0 va query_vec bo'sh bo'lmasligi shart")
    valid = [r for r in records if r.get("tokens", 0) >= min_tokens]
    valid.sort(
        key=lambda r: sum(a * b for a, b in zip(r.get("embedding", []), query_vec)),
        reverse=True,
    )
    return [r["id"] for r in valid]


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
    out = []
    i = 0
    while i < len(seq):
        if i < len(seq) - 1 and seq[i] == a and seq[i + 1] == b:
            out.append(new_id)
            i += 2
        else:
            out.append(seq[i])
            i += 1
    return out


def extract_answer_from_offsets(context, offsets, start_idx, end_idx):
    if (
        not isinstance(context, str)
        or not isinstance(offsets, list)
        or len(offsets) == 0
        or start_idx < 0
        or end_idx < start_idx
        or end_idx >= len(offsets)
    ):
        raise ValueError("Noto'g'ri offsets yoki start_idx/end_idx chegarasi")
    char_start = offsets[start_idx][0]
    char_end = offsets[end_idx][1]
    if char_start < 0 or char_end > len(context) or char_start > char_end:
        raise ValueError("Belgi indekslari context chegarasidan tashqarida")
    return context[char_start:char_end]


def align_labels_with_tokens(word_ids, word_labels, ignore_index=-100):
    if not isinstance(word_ids, list) or len(word_ids) == 0 or not isinstance(word_labels, list):
        raise ValueError("word_ids bo'sh bo'lmasligi shart")
    aligned = []
    prev_w_id = None
    for w_id in word_ids:
        if w_id is None or w_id == prev_w_id:
            aligned.append(ignore_index)
        else:
            if not isinstance(w_id, int) or w_id < 0 or w_id >= len(word_labels):
                raise ValueError("w_id word_labels chegarasidan tashqarida")
            aligned.append(word_labels[w_id])
        prev_w_id = w_id
    return aligned


def diagnose_pipeline_issue(vocab_size, token_ids, batch_shape, label_count):
    if (
        not isinstance(vocab_size, int)
        or vocab_size <= 0
        or not isinstance(batch_shape, (tuple, list))
        or len(batch_shape) != 2
    ):
        raise ValueError("vocab_size > 0 va batch_shape 2 o'lchamli bo'lishi shart")
    if any((not isinstance(t, int)) or t < 0 or t >= vocab_size for t in token_ids):
        return "TOKEN_ID_OUT_OF_BOUNDS"
    if batch_shape[0] != label_count:
        return "BATCH_LABEL_SHAPE_MISMATCH"
    return "OK"


def format_gradio_response(prompt, raw_score, threshold=0.5):
    if not isinstance(prompt, str) or len(prompt.strip()) == 0:
        raise ValueError("prompt bo'sh bo'lmagan satr bo'lishi shart")
    if (
        not isinstance(raw_score, (int, float))
        or raw_score < 0.0
        or raw_score > 1.0
        or threshold <= 0.0
        or threshold >= 1.0
    ):
        raise ValueError("raw_score [0, 1] va threshold (0, 1) oralig'ida bo'lishi shart")
    return {
        "text": prompt.strip(),
        "label": "POSITIVE" if raw_score >= threshold else "NEGATIVE",
        "score_pct": round(float(raw_score) * 100, 1),
    }


def compute_annotator_agreement(labels_a, labels_b):
    if (
        not isinstance(labels_a, list)
        or not isinstance(labels_b, list)
        or len(labels_a) == 0
        or len(labels_a) != len(labels_b)
    ):
        raise ValueError("labels_a va labels_b teng uzunlikdagi bo'sh bo'lmagan ro'yxatlar bo'lishi shart")
    consensus = [i for i in range(len(labels_a)) if labels_a[i] == labels_b[i]]
    return {
        "agreement": round(len(consensus) / len(labels_a), 4),
        "consensus_indices": consensus,
    }


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


def format_chatml_messages(messages):
    if not isinstance(messages, list) or len(messages) == 0:
        raise ValueError("messages bo'sh bo'lmagan ro'yxat bo'lishi shart")
    valid_roles = {"system", "user", "assistant"}
    parts = []
    for m in messages:
        if not isinstance(m, dict):
            raise ValueError("Har bir xabar dict bo'lishi shart")
        role = m.get("role")
        content = m.get("content")
        if role not in valid_roles or not isinstance(content, str) or not content.strip():
            raise ValueError("Noto'g'ri role yoki bo'sh content")
        parts.append(f"<|im_start|>{role}\n{content.strip()}<|im_end|>\n")
    return "".join(parts)


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


def score_reasoning_completion(response_text, expected_answer):
    if (
        not isinstance(response_text, str)
        or not isinstance(expected_answer, str)
        or len(expected_answer.strip()) == 0
    ):
        raise ValueError("response_text va bo'sh bo'lmagan expected_answer satr bo'lishi shart")
    t_start = response_text.find("<think>")
    t_end = response_text.find("</think>")
    if t_start != -1 and t_end != -1 and t_start < t_end:
        fmt_reward = 0.5
        tail = response_text[t_end + len("</think>") :]
    else:
        fmt_reward = 0.0
        tail = response_text
    acc_reward = 1.0 if expected_answer.strip() in tail else 0.0
    return {
        "format_reward": fmt_reward,
        "accuracy_reward": acc_reward,
        "total_reward": fmt_reward + acc_reward,
    }


if __name__ == "__main__":
    assert check_env_readiness(3, 11, True, ["transformers", "datasets", "accelerate"]) == {
        "ready": True,
        "missing": [],
    }
    assert select_transformer_arch("classification", 512) == {
        "arch": "encoder",
        "fits_context": True,
    }
    assert pad_batch([[11, 12], [21, 22, 23, 24]]) == (
        [[11, 12, 0, 0], [21, 22, 23, 24]],
        [[1, 1, 0, 0], [1, 1, 1, 1]],
    )
    assert logits_to_prediction([-1.5, 2.5], {0: "NEGATIVE", 1: "POSITIVE"}) == {
        "id": 1,
        "label": "POSITIVE",
        "confidence": 0.982,
    }
    assert diagnose_training_curve([0.9, 0.5, 0.2, 0.08], [0.85, 0.48, 0.42, 0.55]) == {
        "status": "overfitting",
        "best_epoch": 3,
    }
    assert validate_hub_repo_card("ai-atlas/uzbek-bert", "apache-2.0", {"f1": 0.91}) == {
        "namespace": "ai-atlas",
        "model_name": "uzbek-bert",
        "ready_to_publish": True,
    }
    assert filter_and_rank_dataset(
        [
            {"id": "d1", "tokens": 5, "embedding": [1.0, 0.0]},
            {"id": "d2", "tokens": 20, "embedding": [0.2, 0.9]},
            {"id": "d3", "tokens": 30, "embedding": [0.9, 0.1]},
        ],
        10,
        [1.0, 0.0],
    ) == ["d3", "d2"]
    assert bpe_merge_step([5, 5, 5], (5, 5), 9) == [9, 5]
    assert extract_answer_from_offsets("AI Atlas platformasi", [(0, 2), (3, 8), (9, 20)], 0, 1) == "AI Atlas"
    assert align_labels_with_tokens([None, 0, 1, 1, None], [3, 5]) == [-100, 3, 5, -100, -100]
    assert diagnose_pipeline_issue(30522, [101, 35000, 102], (2, 16), 2) == "TOKEN_ID_OUT_OF_BOUNDS"
    assert format_gradio_response("  Ajoyib model! ", 0.926) == {
        "text": "Ajoyib model!",
        "label": "POSITIVE",
        "score_pct": 92.6,
    }
    assert compute_annotator_agreement(["POS", "NEG", "POS", "NEU"], ["POS", "NEG", "NEU", "NEU"]) == {
        "agreement": 0.75,
        "consensus_indices": [0, 1, 3],
    }
    assert lora_layer_stats(1000, 1000, 10, 20) == {
        "base_params": 1000000,
        "lora_params": 20000,
        "scaling": 2.0,
    }
    assert format_chatml_messages([{"role": "user", "content": "Salom"}]) == "<|im_start|>user\nSalom<|im_end|>\n"
    assert compute_grpo_advantages([1.0, 0.0, 1.0, 0.0]) == [1.0, -1.0, 1.0, -1.0]
    assert score_reasoning_completion("<think>2+2=4</think>Javob: 4", "4") == {
        "format_reward": 0.5,
        "accuracy_reward": 1.0,
        "total_reward": 1.5,
    }
    print("All 15 HF chapter reference assertions passed.")
