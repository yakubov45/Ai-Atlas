# Hugging Face LLM Course → AI Atlas

**13 bob (0–12), 99 manbadagi section, 220 rejalashtirilgan mikro-dars.**
Bu fayl — kurs bo‘yicha AI Atlas’ning **syllabus rejasi**, to‘liq tayyor MDX darslar emas.
Manba: foydalanuvchi yuborgan Markdown kurs xaritasi va Hugging Face rasmiy LLM Course.

## Asosiy qaror
- Yangi 7-kasbiy track YARATILMAYDI; olti mavjud track ichiga content overlay qo‘shiladi.
- Source content va canonical ID har bir darsda saqlanadi.
- Dars ritmi: Nazariya → 2 misol → amaliy kod → test → feedback → keyingi dars.
- Manim — tushuntirish; React/SVG — real-time parametrlar; og‘ir modelni brauzerda train qilmaymiz.
- Hamma rejalashtirilgan darslar `planned` holatida; tekshirilmaguncha publish bo‘lmaydi.

## Kurs boblari

| Bob | Mavzu | Rejalashtirilgan mikro-dars | Amaliyot |
|---|---|---:|---|
| 0 | [Setup — Muhitni sozlash](https://huggingface.co/learn/llm-course/chapter0/1) | 11 | Muhit tekshirish: python --version, import checks, reproducible dependencies |
| 1 | [Transformer Models — Transformer modellari](https://huggingface.co/learn/llm-course/chapter1/1) | 28 | Model pipeline turini vazifaga moslash; prefill/decode animatsiyasi |
| 2 | [Using Transformers — Kutubxonadan foydalanish](https://huggingface.co/learn/llm-course/chapter2/1) | 20 | Tokenizer yordamida batch tayyorlab, attention_mask ni tekshirish |
| 3 | [Fine-tuning a Pretrained Model — Fine-tuning](https://huggingface.co/learn/llm-course/chapter3/1) | 17 | Kichik datasetda Trainer bilan fine-tuning (notebook/GPU kerak bo‘lishi mumkin) |
| 4 | [Sharing Models and Tokenizers — Hugging Face Hub](https://huggingface.co/learn/llm-course/chapter4/1) | 13 | Demo uchun model card shablonini to‘ldirish; real upload faqat rozilik bilan |
| 5 | [The Datasets Library — Datasetlar](https://huggingface.co/learn/llm-course/chapter5/1) | 17 | CSV datasetda map/filter; embedding izlashni tashqi notebookda ishlatish |
| 6 | [The Tokenizers Library — Tokenizerlar](https://huggingface.co/learn/llm-course/chapter6/1) | 22 | Toy BPE merge simulyatori; keyin HF Tokenizers bilan haqiqiy tajriba |
| 7 | [Classical NLP Tasks — NLP vazifalari](https://huggingface.co/learn/llm-course/chapter7/1) | 19 | Matnlar ustida NER/QA pipeline sinovi (mos muhitda) |
| 8 | [How to Ask for Help — Debugging](https://huggingface.co/learn/llm-course/chapter8/1) | 13 | Qasddan buzilgan namunani tuzatish va issue template yozish |
| 9 | [Building and Sharing Demos — Gradio](https://huggingface.co/learn/llm-course/chapter9/1) | 14 | Oddiy sentiment demo uchun Gradio interfeysi (shaxsiy token serverda saqlanadi) |
| 10 | [Curate High-Quality Datasets — Argilla](https://huggingface.co/learn/llm-course/chapter10/1) | 13 | Kichik sintetik dataset uchun annotation schema va sifat tekshiruvi |
| 11 | [Fine-tune Large Language Models — SFT va LoRA](https://huggingface.co/learn/llm-course/chapter11/1) | 15 | LoRA parametrlari uchun interaktiv rank/parameter hisoblash; haqiqiy train uchun notebook |
| 12 | [Build Reasoning Models — Open R1](https://huggingface.co/learn/llm-course/chapter12/1) | 18 | Toy reward normalization hisoblash; haqiqiy GRPO training faqat resursga mos GPUda |

## Tafsilotli syllabus

### Chapter 0: Setup — Muhitni sozlash
Source: https://huggingface.co/learn/llm-course/chapter0/1
**Maqsad:** Python developer muhiti va kutubxonalarni ishlatishga tayyorgarlik

**Introduction**
- `hf-00-01-01` Kursga kirish va maqsad
- `hf-00-01-02` Python versiyasini tekshirish

**Using a Google Colab notebook**
- `hf-00-02-01` Colab notebook ochish
- `hf-00-02-02` Runtime va accelerator holatini tekshirish
- `hf-00-02-03` GPU bo‘lmasa CPU fallback

**Using a Python virtual environment**
- `hf-00-03-01` venv yaratish
- `hf-00-03-02` Virtual muhitni faollashtirish
- `hf-00-03-03` Interpreterni tekshirish

**Installing dependencies**
- `hf-00-04-01` pip bilan paket o‘rnatish
- `hf-00-04-02` transformers / datasets / accelerate rollari
- `hf-00-04-03` Import va versiya testi

**Chapter mini-loyiha:** Muhit tekshirish: python --version, import checks, reproducible dependencies

### Chapter 1: Transformer Models — Transformer modellari
Source: https://huggingface.co/learn/llm-course/chapter1/1
**Maqsad:** NLP, Transformer va inference konsepsiyalarini tushunish

**Introduction**
- `hf-01-01-01` NLP va LLM doirasi
- `hf-01-01-02` Model va pipeline farqi

**Natural Language Processing and Large Language Models**
- `hf-01-02-01` NLP vazifalari
- `hf-01-02-02` LLM qobiliyatlari va chegaralari
- `hf-01-02-03` Task turini tanlash

**Transformers, what can they do?**
- `hf-01-03-01` pipeline() tushunchasi
- `hf-01-03-02` text-classification
- `hf-01-03-03` text-generation va summarization
- `hf-01-03-04` translation va zero-shot-classification

**How do Transformers work?**
- `hf-01-04-01` Tokenlar va embeddinglar
- `hf-01-04-02` Attention intuitsiyasi
- `hf-01-04-03` Transformer bloklari

**How Transformers solve tasks**
- `hf-01-05-01` Tokenizatsiya bosqichi
- `hf-01-05-02` Model forward bosqichi
- `hf-01-05-03` Natijani qayta ishlash

**Transformer Architectures**
- `hf-01-06-01` Encoder-only tuzilishi
- `hf-01-06-02` Decoder-only tuzilishi
- `hf-01-06-03` Encoder–Decoder tuzilishi

**Quick quiz**
- `hf-01-07-01` Arxitekturani vazifaga moslash testi

**Inference with LLMs**
- `hf-01-08-01` Prefill nima?
- `hf-01-08-02` Decode nima?
- `hf-01-08-03` Context length cheklovi
- `hf-01-08-04` Sampling boshqaruvi

**Bias and limitations**
- `hf-01-09-01` Bias va ma’lumot ta’siri
- `hf-01-09-02` Hallucination va noto‘g‘ri javob
- `hf-01-09-03` Tekshirish va xavfsizlik chegaralari

**Summary**
- `hf-01-10-01` Mavzular aloqasini xaritalash

**Certification exam**
- `hf-01-11-01` Bilimni tekshirish uchun mashq

**Chapter mini-loyiha:** Model pipeline turini vazifaga moslash; prefill/decode animatsiyasi

### Chapter 2: Using Transformers — Kutubxonadan foydalanish
Source: https://huggingface.co/learn/llm-course/chapter2/1
**Maqsad:** Tokenizer, config, model va batch jarayonini amalda bog‘lash

**Introduction**
- `hf-02-01-01` Transformers kutubxonasini ishlatish maqsadi

**Behind the pipeline**
- `hf-02-02-01` Matn → token ID
- `hf-02-02-02` Tensor → model output
- `hf-02-02-03` Logits → natija

**Models**
- `hf-02-03-01` Pretrained config o‘qish
- `hf-02-03-02` Model yuklash
- `hf-02-03-03` Modelni saqlash tamoyili

**Tokenizers**
- `hf-02-04-01` Token va token ID
- `hf-02-04-02` Encode va decode
- `hf-02-04-03` Special tokens

**Handling multiple sequences**
- `hf-02-05-01` Batch ketma-ketliklar
- `hf-02-05-02` Padding
- `hf-02-05-03` Truncation
- `hf-02-05-04` Attention mask

**Putting it all together**
- `hf-02-06-01` tokenizer() parametrlari
- `hf-02-06-02` Batch inference oqimi

**Basic usage completed!**
- `hf-02-07-01` Pipeline va manual flow taqqoslash

**Optimized Inference Deployment**
- `hf-02-08-01` Batching va latency trade-off
- `hf-02-08-02` Inference samaradorligi monitoringi

**End-of-chapter quiz**
- `hf-02-09-01` Tokenization va padding testi

**Chapter mini-loyiha:** Tokenizer yordamida batch tayyorlab, attention_mask ni tekshirish

### Chapter 3: Fine-tuning a Pretrained Model — Fine-tuning
Source: https://huggingface.co/learn/llm-course/chapter3/1
**Maqsad:** Tayyor modelni datasetga moslashtirish va sifatini tekshirish

**Introduction**
- `hf-03-01-01` Fine-tuning motivatsiyasi
- `hf-03-01-02` Dataset / Evaluate / Accelerate rollari

**Processing the data**
- `hf-03-02-01` Dataset split
- `hf-03-02-02` Tokenizatsiya va preprocessing
- `hf-03-02-03` Label mapping

**Fine-tuning a model with the Trainer API**
- `hf-03-03-01` TrainingArguments tushunchasi
- `hf-03-03-02` Trainer setup
- `hf-03-03-03` Training/evaluation oqimi

**A full training loop**
- `hf-03-04-01` Forward va loss
- `hf-03-04-02` Backward va optimizer
- `hf-03-04-03` Accelerate bilan loop

**Understanding Learning Curves**
- `hf-03-05-01` Training vs validation loss
- `hf-03-05-02` Overfitting belgilarini o‘qish
- `hf-03-05-03` Learning-rate va early stopping tushunchasi

**Fine-tuning, Check!**
- `hf-03-06-01` Natijani tekshirish
- `hf-03-06-02` Reproduktivlikni qayd qilish

**End-of-chapter quiz**
- `hf-03-07-01` Fine-tuning jarayoni testi

**Chapter mini-loyiha:** Kichik datasetda Trainer bilan fine-tuning (notebook/GPU kerak bo‘lishi mumkin)

### Chapter 4: Sharing Models and Tokenizers — Hugging Face Hub
Source: https://huggingface.co/learn/llm-course/chapter4/1
**Maqsad:** Modelni topish, hujjatlashtirish va Hub’da bo‘lishish

**The Hugging Face Hub**
- `hf-04-01-01` Hub modeli va repozitoriy
- `hf-04-01-02` Model / dataset / space farqlari

**Using pretrained models**
- `hf-04-02-01` Model card o‘qish
- `hf-04-02-02` Mos model tanlash
- `hf-04-02-03` Model versiyasini qayd qilish

**Sharing pretrained models**
- `hf-04-03-01` Hub autentifikatsiya oqimi
- `hf-04-03-02` Push va versioning
- `hf-04-03-03` Maxfiy fayllarni chiqarib yubormaslik

**Building a model card**
- `hf-04-04-01` Modelning vazifasi
- `hf-04-04-02` Limitations va evaluation
- `hf-04-04-03` README Model Card yozish

**Part 1 completed!**
- `hf-04-05-01` End-to-end model workflow

**End-of-chapter quiz**
- `hf-04-06-01` Hub xavfsizligi testi

**Chapter mini-loyiha:** Demo uchun model card shablonini to‘ldirish; real upload faqat rozilik bilan

### Chapter 5: The Datasets Library — Datasetlar
Source: https://huggingface.co/learn/llm-course/chapter5/1
**Maqsad:** Dataset yaratish, o‘zgartirish va semantik qidirish

**Introduction**
- `hf-05-01-01` Dataset va DatasetDict farqi
- `hf-05-01-02` Arrow umumiy tushunchasi

**What if my dataset isn't on the Hub?**
- `hf-05-02-01` CSV/JSON manbadan o‘qish
- `hf-05-02-02` Dataset validatsiyasi

**Time to slice and dice**
- `hf-05-03-01` Select va filter
- `hf-05-03-02` map va preprocessing
- `hf-05-03-03` Pandas integratsiyasi

**Big data? Datasets to the rescue!**
- `hf-05-04-01` Memory mapping
- `hf-05-04-02` Streaming tushunchasi
- `hf-05-04-03` Dataset hajmini nazorat qilish

**Creating your own dataset**
- `hf-05-05-01` Dataset sxemasi
- `hf-05-05-02` Datasets Hub ga joylash jarayoni

**Semantic search with FAISS**
- `hf-05-06-01` Embeddingdan vector
- `hf-05-06-02` FAISS index qurish
- `hf-05-06-03` Nearest neighbors natijalari

**Datasets, check!**
- `hf-05-07-01` Dataset pipeline ni qayta ko‘rib chiqish

**End-of-chapter quiz**
- `hf-05-08-01` Dataset operations testi

**Chapter mini-loyiha:** CSV datasetda map/filter; embedding izlashni tashqi notebookda ishlatish

### Chapter 6: The Tokenizers Library — Tokenizerlar
Source: https://huggingface.co/learn/llm-course/chapter6/1
**Maqsad:** Tokenizatsiya bosqichlari va subword algoritmlarini ko‘rish

**Introduction**
- `hf-06-01-01` Fast vs slow tokenizer
- `hf-06-01-02` Tokenizer vazifalari

**Training a new tokenizer from an old one**
- `hf-06-02-01` Korpus tanlash
- `hf-06-02-02` Tokenizer qayta o‘qitish

**Fast tokenizers' special powers**
- `hf-06-03-01` Offset mapping
- `hf-06-03-02` Character span → token span

**Fast tokenizers in the QA pipeline**
- `hf-06-04-01` Savoldan passage span topish
- `hf-06-04-02` Offset alignment

**Normalization and pre-tokenization**
- `hf-06-05-01` Normalization
- `hf-06-05-02` Pre-tokenization
- `hf-06-05-03` Token ID mapping

**Byte-Pair Encoding (BPE) tokenization**
- `hf-06-06-01` Pair frequency
- `hf-06-06-02` BPE merge qadamlari
- `hf-06-06-03` Vocabulary size

**WordPiece tokenization**
- `hf-06-07-01` Subword selection
- `hf-06-07-02` Unknown token handling

**Unigram tokenization**
- `hf-06-08-01` Token candidate probability
- `hf-06-08-02` Unigram segmentatsiya

**Building a tokenizer, block by block**
- `hf-06-09-01` Tokenizer components
- `hf-06-09-02` Tokenizer pipeline build
- `hf-06-09-03` Encode-decode consistency

**Tokenizers, check! & End-of-chapter quiz**
- `hf-06-10-01` Tokenizer qoidalari testi

**Chapter mini-loyiha:** Toy BPE merge simulyatori; keyin HF Tokenizers bilan haqiqiy tajriba

### Chapter 7: Classical NLP Tasks — NLP vazifalari
Source: https://huggingface.co/learn/llm-course/chapter7/1
**Maqsad:** NER, klassifikatsiya, tarjima, summarization va language modeling

**Introduction**
- `hf-07-01-01` Task va model head tanlash

**Token classification**
- `hf-07-02-01` Token labels
- `hf-07-02-02` NER metrikalari
- `hf-07-02-03` Entity extraction tekshiruvi

**Fine-tuning a masked language model**
- `hf-07-03-01` Mask token
- `hf-07-03-02` MLM objective
- `hf-07-03-03` Training data tayyorlash

**Translation**
- `hf-07-04-01` Seq2Seq input/output
- `hf-07-04-02` Teacher forcing tushunchasi

**Summarization**
- `hf-07-05-01` Abstractive vs extractive
- `hf-07-05-02` Evaluation cheklovlari

**Training a causal language model from scratch**
- `hf-07-06-01` Causal masking
- `hf-07-06-02` Next-token prediction
- `hf-07-06-03` Training compute va cheklovlar

**Question answering**
- `hf-07-07-01` Question-context pair
- `hf-07-07-02` Answer span
- `hf-07-07-03` No-answer holatlari

**Mastering LLMs**
- `hf-07-08-01` Task taqqoslash va model tanlash

**End-of-chapter quiz**
- `hf-07-09-01` NLP task tanlash testi

**Chapter mini-loyiha:** Matnlar ustida NER/QA pipeline sinovi (mos muhitda)

### Chapter 8: How to Ask for Help — Debugging
Source: https://huggingface.co/learn/llm-course/chapter8/1
**Maqsad:** Xatoni takrorlab ko‘rish va sifatli issue yozish

**Introduction**
- `hf-08-01-01` Debugging metodikasi

**What to do when you get an error**
- `hf-08-02-01` Traceback o‘qish
- `hf-08-02-02` Minimal reproducible example
- `hf-08-02-03` Versiya va environment yig‘ish

**Asking for help on the forums**
- `hf-08-03-01` Muammo konteksti
- `hf-08-03-02` To‘g‘ri forum savoli

**Debugging the training pipeline**
- `hf-08-04-01` NaN loss
- `hf-08-04-02` GPU OOM
- `hf-08-04-03` Overfitting holati

**How to write a good issue**
- `hf-08-05-01` Reproduction steps
- `hf-08-05-02` Expected vs actual behavior
- `hf-08-05-03` Sanitizing secrets

**Part 2 completed! & End-of-chapter quiz**
- `hf-08-06-01` Debugging checklist testi

**Chapter mini-loyiha:** Qasddan buzilgan namunani tuzatish va issue template yozish

### Chapter 9: Building and Sharing Demos — Gradio
Source: https://huggingface.co/learn/llm-course/chapter9/1
**Maqsad:** Model uchun ishlaydigan demo va Hugging Face Spaces

**Introduction to Gradio**
- `hf-09-01-01` Demo nima uchun kerak?

**Building your first demo**
- `hf-09-02-01` Gradio minimal app
- `hf-09-02-02` Input/output komponenti

**Understanding the Interface class**
- `hf-09-03-01` gr.Interface input types
- `hf-09-03-02` Response rendering

**Sharing demos with others**
- `hf-09-04-01` Share link tushunchasi
- `hf-09-04-02` Hugging Face Spaces deployment

**Integrations with the Hugging Face Hub**
- `hf-09-05-01` Hub modelni Gradio ga ulash
- `hf-09-05-02` Model card bilan demo bog‘lash

**Advanced Interface features**
- `hf-09-06-01` Interface validation
- `hf-09-06-02` Error/Loading states

**Introduction to Blocks**
- `hf-09-07-01` gr.Blocks arxitekturasi
- `hf-09-07-02` Event listeners

**Gradio, check! & End-of-chapter quiz**
- `hf-09-08-01` Demo sinov checklisti

**Chapter mini-loyiha:** Oddiy sentiment demo uchun Gradio interfeysi (shaxsiy token serverda saqlanadi)

### Chapter 10: Curate High-Quality Datasets — Argilla
Source: https://huggingface.co/learn/llm-course/chapter10/1
**Maqsad:** Dataset annotatsiyasi, sifat nazorati va feedback

**Introduction to Argilla**
- `hf-10-01-01` Data annotation nima?
- `hf-10-01-02` Human feedback ahamiyati

**Set up your Argilla instance**
- `hf-10-02-01` Argilla xizmatlari
- `hf-10-02-02` Access va environment konfiguratsiyasi

**Load your dataset to Argilla**
- `hf-10-03-01` Dataset import qilish
- `hf-10-03-02` Annotation schema

**Annotate your dataset**
- `hf-10-04-01` Annotation workflow
- `hf-10-04-02` Reviewer agreement
- `hf-10-04-03` Noaniq label bilan ishlash

**Use your annotated dataset**
- `hf-10-05-01` Annotation export
- `hf-10-05-02` Quality checks
- `hf-10-05-03` Hub bilan almashish

**Argilla, check! & End-of-chapter quiz**
- `hf-10-06-01` Annotation sifat testi

**Chapter mini-loyiha:** Kichik sintetik dataset uchun annotation schema va sifat tekshiruvi

### Chapter 11: Fine-tune Large Language Models — SFT va LoRA
Source: https://huggingface.co/learn/llm-course/chapter11/1
**Maqsad:** Chat templates, TRL, SFT va LoRA bilan moslashtirish

**Introduction (Supervised Fine-Tuning)**
- `hf-11-01-01` SFT maqsadi
- `hf-11-01-02` Instruction dataset formati

**Chat Templates**
- `hf-11-02-01` System/user/assistant xabarlar
- `hf-11-02-02` Chat template formatlash
- `hf-11-02-03` Special tokens joylashuvi

**Fine-Tuning with SFTTrainer**
- `hf-11-03-01` TRL SFTTrainer setup
- `hf-11-03-02` Training config
- `hf-11-03-03` Evaluation oqimi

**LoRA (Low-Rank Adaptation)**
- `hf-11-04-01` Low-rank update intuitsiyasi
- `hf-11-04-02` LoRA rank va adapters
- `hf-11-04-03` VRAM tejamkorligi cheklovlari

**Evaluation**
- `hf-11-05-01` Fine-tuned vs baseline
- `hf-11-05-02` Rubric va regression test

**Conclusion**
- `hf-11-06-01` Model kartasi va natijalar

**Exam Time!**
- `hf-11-07-01` SFT/LoRA tekshiruv testi

**Chapter mini-loyiha:** LoRA parametrlari uchun interaktiv rank/parameter hisoblash; haqiqiy train uchun notebook

### Chapter 12: Build Reasoning Models — Open R1
Source: https://huggingface.co/learn/llm-course/chapter12/1
**Maqsad:** RL, GRPO va reasoning modellari haqida ilg‘or laboratoriyalar

**Introduction (Open R1 for Students)**
- `hf-12-01-01` Open R1 tashabbusi
- `hf-12-01-02` Reasoning training umumiy g‘oyasi

**Reinforcement Learning on LLMs**
- `hf-12-02-01` Reward signals
- `hf-12-02-02` Policy update intuitsiyasi

**The Aha Moment in the DeepSeek R1 Paper**
- `hf-12-03-01` DeepSeek R1 research framing
- `hf-12-03-02` Reasoning behavior tahlili

**Advanced Understanding of GRPO in DeepSeekMath**
- `hf-12-04-01` Group rewards
- `hf-12-04-02` Relative advantage
- `hf-12-04-03` GRPO cheklovlari

**Implementing GRPO in TRL**
- `hf-12-05-01` TRL GRPO config
- `hf-12-05-02` Reward function API
- `hf-12-05-03` Training monitoring

**Practical Exercise to Fine-tune a model with GRPO**
- `hf-12-06-01` Dataset format
- `hf-12-06-02` GRPO training job
- `hf-12-06-03` Natijani tekshirish

**Practical Exercise with Unsloth**
- `hf-12-07-01` Unsloth ecosystem
- `hf-12-07-02` Memory trade-offs

**Coming soon...**
- `hf-12-08-01` Future material: not yet available

**Chapter mini-loyiha:** Toy reward normalization hisoblash; haqiqiy GRPO training faqat resursga mos GPUda

## Uch darajali o‘qitish
- **Overview** — nima va nima uchun? oddiy misol, minimal kod.
- **Understand** — kirish/chiqish, real hisoblash, qadamlar va vizual.
- **Master** — kodni o‘zgartirish, testlar, hyperparameter/edge-case, GPU notebook bo‘lsa qo‘shimcha.

## Status va manbalar
`planned` — metadata bor; dars to‘liq emas. `published` — content + manbalar + ikki misol + amaliy topshiriq + tekshiruv.
Barcha actual progress yoki certification exam statuslari faqat platformadagi haqiqiy natijalardan kelishi kerak.
