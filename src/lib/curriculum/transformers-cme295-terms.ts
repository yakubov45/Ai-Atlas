/**
 * AI Atlas — Color-Coded Technical Terminology Dictionary
 * for Stanford CME 295: Transformers & Large Language Models (Lectures 1–3).
 *
 * Groups every core Transformer & LLM term into 5 semantic color families:
 *  - token_embed     (cyan)    : Tokenization, BPE, Embeddings & Special Tokens
 *  - attention_arch  (violet)  : Attention, Q/K/V, Encoder/Decoder, GQA, MoE
 *  - position_scale  (emerald) : RoPE, Sinusoidal, RMSNorm, Pre-Norm, Chinchilla
 *  - training_align  (amber)   : Pre-Training, Mid-Training, SFT, LoRA, RLHF, DPO, GRPO
 *  - inference_cot   (fuchsia) : Autoregressive, Temperature, Top-K/P, Context Rot, CoT
 */

import {
  buildTermDictionary,
  type ColoredTermDictionary,
  type GenericColoredTerm,
  type GenericTextSegment,
  type TermFamilyStyle,
} from "./colored-terms-engine";

export type TransformerTermFamily =
  | "token_embed"
  | "attention_arch"
  | "position_scale"
  | "training_align"
  | "inference_cot";

export type TransformerColoredTerm = GenericColoredTerm<TransformerTermFamily>;
export type TransformerTextSegment = GenericTextSegment<TransformerTermFamily>;

export const TRANSFORMER_FAMILY_STYLES: Readonly<
  Record<TransformerTermFamily, TermFamilyStyle>
> = {
  token_embed: {
    labelUz: "Tokenizatsiya & Embedding",
    badgeCls:
      "bg-cyan-500/15 text-cyan-200 border border-cyan-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-cyan-400",
    legendCls: "border-cyan-500/40 bg-cyan-950/40 text-cyan-200",
  },
  attention_arch: {
    labelUz: "Attention & Arxitektura",
    badgeCls:
      "bg-violet-500/15 text-violet-200 border border-violet-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-violet-400",
    legendCls: "border-violet-500/40 bg-violet-950/40 text-violet-200",
  },
  position_scale: {
    labelUz: "Pozitsiya, Norm & Scaling",
    badgeCls:
      "bg-emerald-500/15 text-emerald-200 border border-emerald-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-emerald-400",
    legendCls: "border-emerald-500/40 bg-emerald-950/40 text-emerald-200",
  },
  training_align: {
    labelUz: "Trening, SFT & Alignment",
    badgeCls:
      "bg-amber-500/15 text-amber-200 border border-amber-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-amber-400",
    legendCls: "border-amber-500/40 bg-amber-950/40 text-amber-200",
  },
  inference_cot: {
    labelUz: "Dekodlash, Prompting & Reasoning",
    badgeCls:
      "bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-fuchsia-400",
    legendCls: "border-fuchsia-500/40 bg-fuchsia-950/40 text-fuchsia-200",
  },
};

export const TRANSFORMER_COLORED_TERMS: readonly TransformerColoredTerm[] = [
  // 1. Tokenization & Embeddings (cyan)
  { term: "Byte-Pair Encoding", family: "token_embed", meaningUz: "Matndagi eng ko'p birga uchraydigan juftliklarni bosqichma-bosqich bitta subword tokenga birlashtirish algoritmi" },
  { term: "Out-of-Vocabulary", family: "token_embed", meaningUz: "Lug'atda (Vocabulary) uchramagan yangi yoki noma'lum so'z muammosi (OOV)" },
  { term: "Latent Representation", family: "token_embed", meaningUz: "Neyron tarmoqning yashirin qatlamida hosil bo'ladigan siqilgan ma'no vektori" },
  { term: "One-Hot Encoding", family: "token_embed", meaningUz: "Faqat bitta 1 va qolgani 0 dan iborat ortogonal vektor; tokenlar o'xshashligini ko'rsata olmaydi" },
  { term: "Sequence Length", family: "token_embed", meaningUz: "Matn tokenlarga bo'lingandan keyingi jami tokenlar soni (n)" },
  { term: "Tokenization", family: "token_embed", meaningUz: "Matnni model tushunadigan bo'linmas birliklar — tokenlarga ajratish jarayoni" },
  { term: "Embeddings", family: "token_embed", meaningUz: "Har bir tokenning ma'nosini zich (dense) raqamlar vektori ko'rinishida ifodalash" },
  { term: "Vocabulary", family: "token_embed", meaningUz: "Model va tokenizer biladigan barcha ruxsat etilgan noyob tokenlar to'plami (V)" },
  { term: "Skip-Gram", family: "token_embed", meaningUz: "Word2Vec usuli: markaziy so'zdan uning atrofidagi kontekst so'zlarini bashorat qilish" },
  { term: "Word2Vec", family: "token_embed", meaningUz: "2013-yilda chiqqan, statik so'z vektorlarini proxy task orqali o'rgatuvchi usul (kontekstga qarab o'zgarmaydi)" },
  { term: "Tokenizer", family: "token_embed", meaningUz: "Matnni token ID lar ketma-ketligiga va teskarisiga o'giruvchi modul" },
  { term: "Subword", family: "token_embed", meaningUz: "So'z va harf orasidagi muvozanatli bo'linma (masalan, read + ing)" },
  { term: "[MASK]", family: "token_embed", meaningUz: "BERT kabi modellarda yashirilgan token o'rniga qo'yiladigan maxsus niqob tokeni" },
  { term: "[UNK]", family: "token_embed", meaningUz: "Lug'atda topilmagan notanish belgi yoki so'zni bildiruvchi maxsus token" },
  { term: "[CLS]", family: "token_embed", meaningUz: "BERT kirish boshiga qo'shilib, butun gap ma'nosini jamlovchi klassifikatsiya tokeni" },
  { term: "<BOS>", family: "token_embed", meaningUz: "Beginning of Sequence: generatsiya yoki gap boshlanishini bildiruvchi maxsus token" },
  { term: "<EOS>", family: "token_embed", meaningUz: "End of Sequence: model matn yaratishni to'xtatishi kerakligini bildiruvchi yakuniy token" },
  { term: "<PAD>", family: "token_embed", meaningUz: "Batchdagi qisqa gaplarni bir xil uzunlikka keltirish uchun qo'shiladigan to'ldiruvchi token" },
  { term: "CBOW", family: "token_embed", meaningUz: "Continuous Bag of Words: atrofdagi so'zlardan o'rtadagi so'zni topish (Word2Vec)" },
  { term: "BPE", family: "token_embed", meaningUz: "Byte-Pair Encoding qisqartmasi — zamonaviy LLM larda eng keng tarqalgan subword tokenizer" },

  // 2. Attention & Architecture (violet)
  { term: "Grouped Query Attention", family: "attention_arch", meaningUz: "Bir nechta Query boshlari umumiy Key va Value matritsalarini bo'lishib, KV Cache xotirasini keskin tejaydigan usul" },
  { term: "Sliding Window Attention", family: "attention_arch", meaningUz: "Har bir token barcha emas, faqat o'z atrofidagi yaqin qo'shnilarga (lokal oynaga) qaraydigan samarali attention" },
  { term: "Masked Self-Attention", family: "attention_arch", meaningUz: "Decoderda kelajakdagi tokenlarni -infinity bilan yopib, faqat o'tmishga qarashni ta'minlovchi diqqat qatlami" },
  { term: "Feed-Forward Network", family: "attention_arch", meaningUz: "Transformer blokida har bir token vektorini mustaqil qayta ishlovchi (d_model -> d_ff) qatlam; ko'p bilim shu yerda saqlanadi" },
  { term: "Residual Connection", family: "attention_arch", meaningUz: "x + f(x) yo'li orqali gradientlarning chuqur qatlamlardan yo'qolmay o'tishini ta'minlovchi sakrash aloqasi" },
  { term: "Multi-Head Attention", family: "attention_arch", meaningUz: "Matndagi grammatik, ma'no va tuzilma aloqalarini parallel (masalan, 8 ta boshda) ushlash mexanizmi" },
  { term: "Mixture of Experts", family: "attention_arch", meaningUz: "Har bir token uchun butun tarmoqni emas, faqat mos keladigan bir nechta ekspert (FFN) ni faollashtirish arxitekturasi" },
  { term: "Vanishing Gradient", family: "attention_arch", meaningUz: "Chuqur yoki uzun RNN zanjirlarida orqaga qaytuvchi gradientning nolga yaqinlashib, uzoq xotirani yo'qotishi" },
  { term: "Cross-Attention", family: "attention_arch", meaningUz: "Decoder (Query) ni Encoder chiqishlari (Key va Value) bilan bog'laydigan diqqat qatlami" },
  { term: "Encoder-Decoder", family: "attention_arch", meaningUz: "Kirishni tushunuvchi (Encoder) va chiqishni ketma-ket yozuvchi (Decoder) asl 2017-yilgi Transformer sxemasi" },
  { term: "Routing Collapse", family: "attention_arch", meaningUz: "MoE da router faqat 1-2 ta ekspertni tanlayverib, qolgan ekspertlar o'rganmay qolishi muammosi" },
  { term: "Self-Attention", family: "attention_arch", meaningUz: "Gapdagi har bir tokenni qolgan barcha tokenlar bilan bevosita bog'lab kontekstli ma'no yasash mexanizmi" },
  { term: "Shared Experts", family: "attention_arch", meaningUz: "DeepSeek/GLM kabi zamonaviy MoE larda har bir token uchun majburiy ishlaydigan umumiy ekspertlar" },
  { term: "Sparse MoE", family: "attention_arch", meaningUz: "Router faqat Top-K (masalan, 2 yoki 8 ta) ekspertni ishga tushirib, hisoblashni tejaydigan MoE turi" },
  { term: "KV Cache", family: "attention_arch", meaningUz: "Avvalgi tokenlarning Key va Value vektorlarini xotirada saqlab, yangi token generatsiyasini tezlashtirish texnikasi" },
  { term: "Attention", family: "attention_arch", meaningUz: "Ketma-ketlikdagi muhim oldingi tokenlarga to'g'ridan-to'g'ri vaznli bog'lanish mexanizmi" },
  { term: "Encoder", family: "attention_arch", meaningUz: "Kirish matnining barcha tokenlarini ikki tomondan o'qib, boy embeddings yasovchi qism (BERT asosi)" },
  { term: "Decoder", family: "attention_arch", meaningUz: "Keyingi tokenni chapdan o'ngga avtoregressiv tarzda bashorat qiluvchi qism (GPT asosi)" },
  { term: "Router", family: "attention_arch", meaningUz: "MoE qatlamida kiruvchi tokenni qaysi ekspertga yo'naltirishni hal qiluvchi darvoza (Gate)" },
  { term: "Query", family: "attention_arch", meaningUz: "Tokenning «Men kim bilan bog'lanishim kerak?» deb qidiruvchi so'rov vektori (Q)" },
  { term: "Value", family: "attention_arch", meaningUz: "Moslik topilgandan keyin uzatiladigan haqiqiy mazmun vektori (V)" },
  { term: "Key", family: "attention_arch", meaningUz: "Tokenning «Menda qanday ma'lumot bor?» degan kalit belgisi vektori (K)" },
  { term: "GQA", family: "attention_arch", meaningUz: "Grouped Query Attention — KV Cache ni kichraytirish uchun K/V larni guruhlarda bo'lishish" },
  { term: "MoE", family: "attention_arch", meaningUz: "Mixture of Experts — kam hisoblash bilan ulkan parametrli model qurish usuli" },
  { term: "LSTM", family: "attention_arch", meaningUz: "Long Short-Term Memory: uzoq xotirani cell state orqali saqlashga uringan RNN turi" },
  { term: "RNN", family: "attention_arch", meaningUz: "Recurrent Neural Network: matnni bir so'zdan ketma-ket o'qib, yagona hidden state saqlovchi eski model" },

  // 3. Position, Normalization & Scaling (emerald)
  { term: "Rotary Position Embedding", family: "position_scale", meaningUz: "Query va Key vektorlarini pozitsiya burchagiga qarab aylantirib, nisbiy masofani (n-m) saqlovchi usul" },
  { term: "Layer Normalization", family: "position_scale", meaningUz: "Har bir token aktivatsiyalarini o'rtacha 0 va dispersiya 1 ga keltirib treningni barqarorlashtirish" },
  { term: "Position Embedding", family: "position_scale", meaningUz: "Self-Attention so'z tartibini unutmasligi uchun token pozitsiyasini kodlovchi vektor" },
  { term: "Compute-Optimal", family: "position_scale", meaningUz: "Berilgan FLOPs byudjetida eng past xatoni beruvchi optimal model hajmi va token soni balansi" },
  { term: "Scaling Laws", family: "position_scale", meaningUz: "Parametrlar, tokenlar va hisoblash oshishi bilan Loss ning bashorat qilinadigan darajada kamayish qonuni" },
  { term: "Sinusoidal", family: "position_scale", meaningUz: "Turli chastotali sin/cos (soat millari kabi) orqali uzunroq matnlarga ham umumlashuvchi pozitsiya formulasi" },
  { term: "Chinchilla", family: "position_scale", meaningUz: "2022-yilgi tadqiqot: berilgan byudjetda har 1 parametrga ~20 ta o'quv tokeni to'g'ri kelishi optimal ekanini isbotlagan" },
  { term: "Pre-Norm", family: "position_scale", meaningUz: "Normalizatsiyani qatlam ichiga kirishdan oldin qo'yish (x + Sublayer(Norm(x))) — gradient oqimini yaxshilaydi" },
  { term: "Post-Norm", family: "position_scale", meaningUz: "2017-yilgi asl usul: Norm(x + Sublayer(x)) — chuqur modellarda treningni qiyinlashtirishi mumkin" },
  { term: "RMSNorm", family: "position_scale", meaningUz: "O'rtachani ayirmasdan faqat kvadrat ildiz o'rtachasi (RMS) bilan masshtablaydigan tezkor normalizatsiya" },
  { term: "ALiBi", family: "position_scale", meaningUz: "Attention ballariga masofa -(n-m) ga proporsional chiziqli jarima qo'shuvchi pozitsiya usuli" },
  { term: "FLOP/s", family: "position_scale", meaningUz: "Katta S bilan: apparat (GPU) ning sekundiga bajara oladigan hisoblash tezligi" },
  { term: "FLOPs", family: "position_scale", meaningUz: "Kichik s bilan: modelni o'qitish uchun zarur jami suzuvchi nuqtali amallar soni (~10^25)" },
  { term: "RoPE", family: "position_scale", meaningUz: "Rotary Position Embedding — zamonaviy LLM larda standart pozitsion kodlash usuli" },
  { term: "YaRN", family: "position_scale", meaningUz: "RoPE chastotalarini interpolyatsiya qilib 4K modelni 128K+ uzun kontekstga cho'zish usuli" },

  // 4. Training, Fine-Tuning & Alignment (amber)
  { term: "On-Policy Distillation", family: "training_align", meaningUz: "O'quvchi model o'zi yaratgan (on-policy) tokenlarda kuchliroq ustoz modeldan har bir tokenda zich signal olib o'rganishi" },
  { term: "Supervised Fine-Tuning", family: "training_align", meaningUz: "Buyruq–javob juftliklari asosida modelni foydali yordamchiga aylantirish (Loss faqat javobda hisoblanadi)" },
  { term: "Cross-Entropy Loss", family: "training_align", meaningUz: "To'g'ri keyingi token ehtimolini maksimal qilish uchun -(1/T) sum log P formulasi bilan xatoni o'lchash" },
  { term: "Verifiable Rewards", family: "training_align", meaningUz: "Matematika va kod testlari orqali reward modelisiz aniq to'g'ri/noto'g'ri mukofot olish (RLVR)" },
  { term: "Transfer Learning", family: "training_align", meaningUz: "Katta ma'lumotda orttirilgan umumiy bilimni keyingi aniq vazifalarga ko'chirish tamoyili" },
  { term: "Best-Fit Packing", family: "training_align", meaningUz: "Mid-Training da hujjatlarni kesib yubormasdan kontekst oynasiga ixcham joylash usuli" },
  { term: "Label Smoothing", family: "training_align", meaningUz: "To'g'ri javob maqsadini 100% emas 90% qilib yumshatish orqali umumlashtirishni yaxshilash" },
  { term: "Teacher Forcing", family: "training_align", meaningUz: "Treningda modelning o'zi topgan so'zini emas, haqiqiy matndagi to'g'ri so'zni keyingi qadamga kirish qilib parallel o'qitish" },
  { term: "Reward Hacking", family: "training_align", meaningUz: "LLM ning haqiqiy sifatni emas, faqat Reward Model ni «aldaydigan» javoblar topishga o'tib ketishi" },
  { term: "Bradley-Terry", family: "training_align", meaningUz: "Juftli solishtirish (Winning vs Losing) dan mukofot farqini sigmoid ehtimollikka aylantiruvchi model" },
  { term: "Model Collapse", family: "training_align", meaningUz: "AI yaratgan sintetik matnlarga haddan ziyod tayanish natijasida xilma-xillik va sifatning buzilishi" },
  { term: "Bits Per Byte", family: "training_align", meaningUz: "Turli tokenizerlarga ega modellarni adolatli taqqoslash uchun Loss ni bayt boshiga bitlarda o'lchash" },
  { term: "Reward Model", family: "training_align", meaningUz: "Inson afzallik ma'lumotlarida qaysi javob yaxshiligiga ball berishni o'rgangan yordamchi model" },
  { term: "Pre-Training", family: "training_align", meaningUz: "Trillionlab tokenlarda Next-Token Prediction orqali til, kod va bilimni o'rganishning 1-bosqichi" },
  { term: "Mid-Training", family: "training_align", meaningUz: "Pre-Training dan keyin sifatli kod/matematika qo'shish va kontekst uzunligini (masalan 128K gacha) oshirish bosqichi" },
  { term: "Off-Policy", family: "training_align", meaningUz: "Model o'zi yaratmagan tayyor statik dataset (masalan, DPO juftliklari) ustida o'qitish" },
  { term: "On-Policy", family: "training_align", meaningUz: "Model ayni damda o'zi generatsiya qilgan javoblar ustida baholanib o'rganishi (RLHF, GRPO)" },
  { term: "Dropout", family: "training_align", meaningUz: "O'qitishda tasodifiy neyronlarni o'chirib, yodlab olishni kamaytirish usuli" },
  { term: "GRPO", family: "training_align", meaningUz: "Group Relative Policy Optimization: bir nechta javob guruhi ichida eng yaxshisini rag'batlantiruvchi RL algoritmi" },
  { term: "RLHF", family: "training_align", meaningUz: "Reinforcement Learning from Human Feedback — inson afzalliklari va Reward Model orqali modelni moslash" },
  { term: "LoRA", family: "training_align", meaningUz: "Low-Rank Adaptation: asosiy vaznlarni (W0) muzlatib, faqat kichik B·A matritsalarni o'qitish" },
  { term: "DPO", family: "training_align", meaningUz: "Direct Preference Optimization — alohida Reward Model siz, to'g'ridan-to'g'ri juftli afzallikdan o'qitish" },
  { term: "SFT", family: "training_align", meaningUz: "Supervised Fine-Tuning qisqartmasi" },
  { term: "BPB", family: "training_align", meaningUz: "Bits Per Byte — tokenizerdan mustaqil universal til modeli baholash o'lchovi" },

  // 5. Inference, Prompting & Reasoning (fuchsia)
  { term: "In-Context Learning", family: "inference_cot", meaningUz: "Model vaznlarini o'zgartirmasdan, faqat prompt ichida misollar ko'rsatib yangi vazifani bajartirish" },
  { term: "Batch Invariance", family: "inference_cot", meaningUz: "Temp=0 bo'lsa ham GPU dagi batch qo'shish tartibi (floating-point) sabab natija ozgina farq qilishi hodisasi" },
  { term: "Knowledge Cutoff", family: "inference_cot", meaningUz: "Model o'qitilgan ma'lumotlarning tugash sanasi — undan keyingi voqealarni model o'zi bilmaydi" },
  { term: "Self-Consistency", family: "inference_cot", meaningUz: "Bir necha xil fikrlash zanjiri yaratib, eng ko'p ovoz olgan javobni tanlash" },
  { term: "Guided Decoding", family: "inference_cot", meaningUz: "Modelni 100% to'g'ri JSON yoki schema sintaksisida javob chiqarishga cheklovchi dekodlash" },
  { term: "Reasoning Model", family: "inference_cot", meaningUz: "Javob berishdan oldin ichki <think> fikrlash zanjirini tuzib murakkab masalalarni yechuvchi model" },
  { term: "Chain-of-Thought", family: "inference_cot", meaningUz: "Yakuniy javobdan oldin bosqichma-bosqich mantiqiy qadamlarni yozish texnikasi (CoT)" },
  { term: "Autoregressive", family: "inference_cot", meaningUz: "Har bir yangi yaratilgan tokenni yana kirishga qo'shib, keyingi tokenni bitta-bittadan chiqarish jarayoni" },
  { term: "Context Window", family: "inference_cot", meaningUz: "Model bir vaqtning o'zida ko'ra oladigan jami kirish + chiqish tokenlari sig'imi" },
  { term: "Context Rot", family: "inference_cot", meaningUz: "Kontekst oynasi juda cho'zilganda model o'rtadagi muhim faktni (needle in haystack) topishda qiynalishi" },
  { term: "Think Tokens", family: "inference_cot", meaningUz: "Reasoning model ning foydalanuvchiga yashirin (lekin hisoblanadigan) ichki fikrlash tokenlari" },
  { term: "Greedy Search", family: "inference_cot", meaningUz: "Har bir qadamda doim eng katta ehtimolli 1 ta tokenni tanlash; doim bir xil (deterministik) natija beradi" },
  { term: "Temperature", family: "inference_cot", meaningUz: "Softmax dan oldin logitlarni T ga bo'lib ehtimollar taqsimotini o'tkir (<1) yoki ijodiy (>1) qilish parametri" },
  { term: "Beam Search", family: "inference_cot", meaningUz: "Eng yaxshi K ta ketma-ketlik yo'lini parallel saqlab boruvchi qidiruv usuli" },
  { term: "Zero-Shot", family: "inference_cot", meaningUz: "Hech qanday misol ko'rsatmasdan to'g'ridan-to'g'ri topshiriq berish" },
  { term: "Few-Shot", family: "inference_cot", meaningUz: "Prompt ichida 2-5 ta tayyor savol-javob namunasini berib yo'l ko'rsatish" },
  { term: "Top-K", family: "inference_cot", meaningUz: "Keyingi tokenni faqat eng ehtimolli K ta nomzod ichidan tasodifiy tanlash" },
  { term: "Top-P", family: "inference_cot", meaningUz: "Nucleus Sampling: yig'indi ehtimolligi P (masalan 0.9) ga yetguncha bo'lgan minimal nomzodlardan tanlash" },
];

export const TRANSFORMER_TERM_DICTIONARY: ColoredTermDictionary<TransformerTermFamily> =
  buildTermDictionary(TRANSFORMER_COLORED_TERMS, TRANSFORMER_FAMILY_STYLES);

export function splitTransformerTextWithColoredTerms(
  input: string,
): TransformerTextSegment[] {
  return TRANSFORMER_TERM_DICTIONARY.tokenize(input);
}
