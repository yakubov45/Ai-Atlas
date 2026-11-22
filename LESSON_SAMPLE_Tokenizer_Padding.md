# Tokenizer + Padding + Attention Mask

- **Source chapter:** Hugging Face LLM Course → Chapter 2: Using Transformers, "Handling multiple sequences".
- **Official chapter:** https://huggingface.co/learn/llm-course/chapter2/1
- **AI Atlas IDs:** `hf-02-05-01`, `hf-02-05-02`, `hf-02-05-03`, `hf-02-05-04`
- **Status:** original author-written sample (must be reviewed before production publishing).
- **Prerequisite:** Python list/function, tokens vs token IDs.
- **Learning objective:** turli uzunlikdagi tokenlar ketma-ketligini bir xil batch hajmiga keltirish va modelga qaysi pozitsiyalar mazmunli ekanini ko‘rsatish.

## Overview: nega bu kerak?

Tasavvur qiling, bir darsda ikkita gap bor. Birinchi gap 3 token, ikkinchi gap 5 token. Model ulardan bitta tensor batch yaratishi uchun har ikkala ketma-ketlikning uzunligi mos bo‘lishi kerak. Qisqa gapga maxsus **padding token** (`pad_token_id`) qo‘shiladi. **Attention mask** haqiqiy tokenlarga 1, padding pozitsiyalariga 0 qo‘yishning keng tarqalgan usulidir.

> Diqqat: `1/0` attention mask tushuntirishi odatiy Hugging Face tokenizer konventsiyasidir. Har bir model/arxitekturaning mask xatti-harakati bir xil deb qabul qilmang.

## Understand: qadamma-qadam

1. Tokenizatsiya natijasi — sonli ID ro‘yxati.
2. Batchdagi eng katta uzunlikni aniqlaymiz.
3. Har bir ro‘yxatni shu uzunlikka `pad_token_id` bilan to‘ldiramiz.
4. Haqiqiy pozitsiyalarga `1`, qo‘shilgan padding'ga `0` qo‘yib attention mask yaratamiz.
5. Har ikkala massivning uzunligi bir xil bo‘lishini tekshiramiz.
6. Real modelda max length/truncation/special tokens siyosati model va tokenizerga bog‘liq.

## Example 1 — ikki ketma-ketlik (tushuncha uchun sonli ID)

```python
sequences = [[11, 12], [21, 22, 23, 24]]
pad_id = 0
# result ids: [[11, 12, 0, 0], [21, 22, 23, 24]]
# result mask: [[1, 1, 0, 0], [1, 1, 1, 1]]
```

**Natija:** 2 ta ro‘yxatning har ikkalasi 4 tadan elementga ega bo‘ladi. `0` tokenning ma’nosi bu misolda padding ekanini ko‘rsatish uchun tanlangan; haqiqiy modelning pad ID si boshqa bo‘lishi mumkin.

## Example 2 — real Transformers tokenizer (internet va package kerak)

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("distilbert/distilbert-base-uncased")
sentences = ["I like AI", "I like learning about transformers"]
batch = tokenizer(sentences, padding=True, truncation=True, return_tensors="pt")
print(batch["input_ids"].shape)
print(batch["attention_mask"])
```

Bu misol `transformers`, `torch` va model tokenizer fayllarini yuklashni talab qiladi. **Token ID / batch o‘lchamlarini oldindan taxmin qilmang**: ularni haqiqiy ishga tushirilgan outputdan o‘qing. `truncation=True` modelning token uzunligi siyosatidan kelib chiqadi.

## Master — mustaqil Python mashq

`pad_batch(sequences, pad_id=0, max_length=None)` funksiyasini yozing.

Shartlar:

- `sequences` — manfiy bo‘lmagan butun sonlardan iborat ketma-ketliklar ro‘yxati.
- `max_length=None`: eng uzun ketma-ketlikka qarab batchni to‘ldiring.
- `max_length=int`: uzunlarni truncation qilib kesing; qolganlarni padding bilan to‘ldiring.
- Natija: `(input_ids, attention_mask)` shaklidagi ikkita bir xil o‘lchamli list-of-list.
- `max_length=0` ham to‘g‘ri natija berishi kerak (bo‘sh qatorlar).
- Manfiy ID, noto‘g‘ri tur yoki yaroqsiz uzunlik bo‘lsa `ValueError` chiqarilsin.

### Starter code

```python
def pad_batch(sequences, pad_id=0, max_length=None):
    # TODO: validate input, choose target length, pad and mask
    pass
```

### Tekshiruv namunalari

```python
assert pad_batch([[11, 12], [21, 22, 23, 24]]) == (
    [[11, 12, 0, 0], [21, 22, 23, 24]],
    [[1, 1, 0, 0], [1, 1, 1, 1]],
)
assert pad_batch([[1, 2, 3], [4]], max_length=2) == (
    [[1, 2], [4, 0]], [[1, 1], [1, 0]]
)
```

### Progressiv hintlar

1. Target uzunlik — `max(len(row) for row in sequences)` yoki berilgan `max_length`.
2. Har bir qatorni `row[:target]` bilan kesib oling.
3. `pad_count=target-len(cut)` hisoblang; mask uchun `[1]*len(cut)+[0]*pad_count`.

### Bajarilganlik mezoni

- 2 misol o‘rganildi.
- Mashq kodini o‘quvchi yozdi va **haqiqiy** testlardan o‘tkazdi.
- Mask va ID uzunligi mosligi tekshirildi.
- Talaba nima uchun padding kerakligini o‘z so‘zi bilan ayta oladi.

## Manim + React

- `examples/react/TokenPaddingLab.tsx`: demo batchni qayta hisoblaydigan interaktiv oynacha (synthetic ID data).
- `examples/manim/token_padding.py`: oldindan render qilinadigan tushuntirish sahnasi; video o‘zi hali render qilinmagan.
- Diagramma o‘quv maqsadida soddalashtirilgan, haqiqiy neural network'ning attention weights qiymatlarini ko‘rsatmaydi.

## Attribution

Asosiy manba: Hugging Face LLM Course, Chapter 2, Apache-2.0. Bu dars AI Atlas uchun o‘zbekcha yangidan yozilgan va amaliy mashq bilan kengaytirilgan. HF tomonidan rasman tasdiqlangan tarjima emas.
