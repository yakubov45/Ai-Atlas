# AI Engineering Academy — integratsiya rejasi

## 1. Scope va manbalar

- Mavjud 20 phase, 291 mikro-dars, 20 mini-loyiha, 20 visual lab va 6 published darsni saqlash.
- Repo: https://github.com/Asabeneh/30-Days-Of-AI-Engineering (Day 00–30).
- Curriculum: foydalanuvchi bergan AI Engineering roadmap; Python Academy mavjud IDlari bilan bog‘lanadi.
- Repo README, lesson template va Day 03/17/22/30 bo‘limlari ko‘rib chiqildi. To‘liq images/ inventari olinmadi. Mapping JSON tavsiya etilgan kunlarni beradi, aniq section havolalari tekshirilishi kerak.
- Repo README formal redistribution license qo‘shish kerakligini aytadi. Ochiq ko‘rinishi public qayta tarqatish huquqini bermaydi. Litsenziya/yozma ruxsat tasdiqlanmaguncha repo rasmlari, matni, diagrammasi va kodini public saytga import qilma; asl manbaga link ber, mustaqil diagramma va original kod yoz.

## 2. Phase mapping

| Phase | Mavjud mavzu | Repo kunlari (candidate) | Darslar |
|---|---|---|---:|
| 01 | AI Engineer kasbi va individual yo‘l | 01, 02, 03, 06, 14, 30 | 12 |
| 02 | Python / TypeScript dasturlash poydevori | 00 | 15 |
| 03 | Backend, API, Git va ma’lumotlar bazasi | 00, 06, 08, 09, 13, 14, 27, 29 | 15 |
| 04 | AI va LLM qanday ishlaydi? | 02, 03, 28 | 14 |
| 05 | Tayyor modellar, model tanlash va ekotizim | 01, 02, 03, 06, 08, 09, 27 | 13 |
| 06 | LLM API, SDK va lokal bo‘lmagan inference | 06, 08, 09, 13, 14 | 14 |
| 07 | Prompt Engineering asoslari | 04, 05, 07, 22, 23, 27 | 13 |
| 08 | Inference parametrlari, Structured Output, Tools | 03, 05, 06, 10, 11, 12, 13, 19 | 14 |
| 09 | Context Engineering va xotira | 03, 05, 17, 19, 20 | 14 |
| 10 | AI Safety, Ethics va Privacy | 28 | 15 |
| 11 | Open-weight modellar va lokal inference | 00, 02, 06 | 15 |
| 12 | Embeddings va vektor matematikasi | 03, 15, 16 | 14 |
| 13 | Vector Database va ANN Search | 16 | 15 |
| 14 | RAG: hujjat tayyorlash va indexing | 17, 21 | 14 |
| 15 | RAG: retrieval, generation, citation | 02, 17, 18, 21 | 14 |
| 16 | RAG sifatini tekshirish va optimallashtirish | 17, 18, 21, 27 | 15 |
| 17 | AI Agents, Tools va workflow | 11, 12, 22, 23, 24, 26, 27, 28 | 15 |
| 18 | MCP va agentlarni kengaytirish | 24, 25, 27, 28 | 15 |
| 19 | Evaluation, Observability va Production | 27, 29, 30 | 18 |
| 20 | Multimodal AI va yakuniy amaliy loyiha | 30 | 17 |

Mapping JSON har bir darsning asl ID, title, status, candidateRepoDays, sourceRefs va visualAssetIds maydonlarini saqlaydi. Candidate manbani tasdiqlangan citation sifatida chop etma.

## 3. Har bir dars formati

1. Learning objective va prerequisite (Python/AI lesson ID).
2. Original Uzbek explanation: nima, nega, qanday, cheklov va 1 real misol.
3. Visual: mos rasm yoki original diagramma; alt, caption, tushuntirish, manba.
4. 2 runnable example: minimal va amaliy. Bitta til yetarli; Python asosiy, TypeScript kerak bo‘lganda.
5. 3 knowledge check: tushuncha, output/trace, debugging.
6. 2 mustaqil practice: oddiy va challenge; input/output, edge cases, hidden tests yoki rubric. Hali o‘tilmagan mavzuni majburiy qilma.
7. Hintlar bosqichli: savol → algoritm → pseudocode; tayyor solution faqat urinishdan keyin.
8. Related lesson IDs, source references, phase mini-project milestone.

## 4. Visual source pipeline

1. Agent lokal repo checkout qiladi (`git clone https://github.com/Asabeneh/30-Days-Of-AI-Engineering.git`); `git rev-parse HEAD` bilan commit SHA yozadi. Checkout faqat ruxsat etilgan tahlil maqsadida, public asset import emas.
2. README, SYLLABUS, day_00..day_30, images/, projects/CAPSTONE.md va LICENSE/COPYING/NOTICE fayllarini tekshiradi. Litsenziya bo‘lmasa publish gate yopiq.
3. Markdown AST orqali rasm linklari, HTML img, Mermaid fenced blocks va source headinglarni inventarizatsiya qiladi. Har bir relative linkni markdown fayl papkasiga nisbatan resolve qiladi; path traversal, symlink escape, external URL tekshiriladi.
4. `asset-manifest.json`: id, type (image/mermaid/interactive), originalPath, sourceFile, heading, commitSha, sourceUrl, sha256, altUz, captionUz, licenseStatus, attribution, approvedForPublic, lessonIds, localPath. Bir rasm bir marta saqlanadi, ko‘p lesson IDga ulanadi.
5. Faqat verified rights bo‘lsa local static asset yoki mavjud storage/CDNga import; SVG sanitize, HTML disable, CSP, MIME tekshirish, size limit va image optimization. Mermaid strict security, untrusted contentni bajariladigan kodga aylantirma.
6. Ruxsat yo‘q bo‘lsa: manbaga link va mustaqil original diagrammalar, repo diagrammasini chizib nusxalash emas. Asl texnik g‘oyani o‘z tushuntirishing bilan ifodala. Lablar illustrative yoki real data bilan aniq markirovka qilinadi.
7. `lesson.visualAssetIds` orqali render; broken asset, orphan asset, duplicate hash, missing attribution va no-permission asset build validationda tekshirilsin.

## 5. Visual lab rejalari

| Phase | Mavjud vizual laboratoriya |
|---|---|
| 01 | AI ilovasi tarkibiy qismlari (UI → Backend → Model → Natija) vizual xaritasi |
| 02 | Kodning ishlash oqimi: input → function → output; async event timeline |
| 03 | Interaktiv HTTP request lifecycle va status code xaritasi |
| 04 | Token → ID → embedding → output oqimi va training/inference ikki yo‘lakli animatsiya |
| 05 | Model tanlash qaror daraxti; sifat–xarajat–latency trade-off slayderlari (faqat illustrativ) |
| 06 | Request lifecycle va streaming token oqimi |
| 07 | Bir xil modelga turli promptlarning javob formatini solishtirish (real API yoki oldindan belgilangan namuna) |
| 08 | Sampling distribution slayderi va tool-call state diagrammasi |
| 09 | Context window uchun token budjeti vizual bar; history compaction steps |
| 10 | Trust boundary oqimi va prompt injection xavfsiz demonstratsiyasi |
| 11 | Model → quantization → memory grafiklari; prefill/decode animatsiyasi |
| 12 | 2D vektor chizish, dot product va cosine similarity real hisoblash |
| 13 | Vektor fazosida query, nearest neighbors va top-k highlight |
| 14 | Document → chunks → embedding → VDB interaktiv animatsiya |
| 15 | Query → top-k chunks → context → answer; source highlight |
| 16 | Retrieval natijalari va manbalarga moslik interaktiv tekshiruvi |
| 17 | Agent state machine: plan/act/observe/stop; step-through tool calls |
| 18 | MCP Host → Client → Server → Tool request animatsiyasi |
| 19 | Request trace timeline, latency va cost breakdown (faqat real metrikalar) |
| 20 | Image/audio/text → model → result; modality routing oqimi |

## 6. Python prerequisite crosswalk

| AI darslar | Python phase |
|---|---|
| 02.01–02.09 | PY-02, PY-04, PY-05, PY-06, PY-07 |
| 02.10 | PY-11 |
| 02.11–02.12 | PY-07, PY-15 |
| 02.13–02.14 | PY-18, PY-17 |
| 02.15 | PY-06, PY-08–PY-10 (zarurat bo‘yicha) |
| 03.01–03.11, 03.15 | PY-16, PY-17, PY-18, PY-19, PY-20 |
| 08.06–08.11 | PY-18, PY-16 |
| 14.03–14.14 | PY-07, PY-13, PY-06 |
| 16 / 19 | PY-19, PY-20 |

SQL/Git kabi mavzular uchun mavjud Python micro-ID o‘ylab topilmasin. Repositorydagi haqiqiy lesson IDlarni tekshir va prerequisite linklarni aniq ID bilan yoz. Phase darajasidagi jadval candidate, avtomatik barcha darsga bog‘lamaslik kerak.

## 7. Cumulative project

Mavjud 20 mini-loyiha o‘z nomi va talablari bilan qoladi. Qo‘shimcha optional track StudySpark g‘oyasidan ilhomlangan original Study Assistant bo‘lsin: prompt helper → chat + structured quiz → notes retrieval + citation → bounded agent + eval + deployment docs. Mavjud phase loyihalarini bekor qilmaydi.

## 8. Implementation tartibi

A. Audit: mavjud architecture, routing, IDs, published data, source license, asset inventory. Read-only.
B. Source registry va mapping: candidate kunlarni exact file/headingga tekshirib bog‘lash; qamrov yetishmasa rasmiy docs yoki original lesson.
C. Pilot: 12.07 Cosine similarity, 14.06 Chunk, 15.08 Citation published kontentini overwrite qilmasdan preview; bitta yangi dars 17.05 ReAct loop. Vizual, source, practice va progress sinovi.
D. Phase 01–06 → 07–11 → 12–16 → 17–20. Har batchda test va review, keyin draft content. Published status o‘zgarmasin.
E. 20 visual lab, 20 mini-project rubric; optional capstone track; accessibility, responsive, sandbox code runner va no-key demo sinovi.
F. Review / staging: progress migration kerak bo‘lsa idempotent va backup; release faqat explicit approval.

## 9. Acceptance criteria

- 20 phase, 291 unique lesson ID, 6 published status saqlangan; sequence unchanged.
- Har bir lesson uchun original content, 2 namuna, 3 quiz, 2 practice, 1 source yoki original explanation status; bo‘sh placeholder yo‘q.
- 20 phase project va 20 visual lab ishlaydi; relevant visualAssets, source links, rights verified, barcha asset references mavjud.
- 582 code examples, 873 quiz, 582 practical tasks — maqsad; real content/test natijalari bilan tasdiqlansin.
- Python prerequisite exact IDga link; mavjud progress yo‘qolmasin; AI feedback hints-first.
- No fake benchmark, no hardcoded secret, no arbitrary unsafe code execution. Isolated runner (CPU/memory/time limits, network off by default), API exercise server proxy, real cost opt-in.
- No production deployment, no destructive migration, no unrelated modifications.

## 10. Source links

- https://github.com/Asabeneh/30-Days-Of-AI-Engineering
- https://github.com/Asabeneh/30-Days-Of-AI-Engineering/blob/main/.github/LESSON_TEMPLATE.md
- https://github.com/Asabeneh/30-Days-Of-AI-Engineering/blob/main/day_03/day_03_tokens_context_windows_and_embeddings.md
- https://github.com/Asabeneh/30-Days-Of-AI-Engineering/blob/main/day_17/day_17_rag.md
- https://github.com/Asabeneh/30-Days-Of-AI-Engineering/blob/main/day_22/day_22_what_are_ai_agents.md
- https://github.com/Asabeneh/30-Days-Of-AI-Engineering/blob/main/day_30/day_30_capstone_project.md
