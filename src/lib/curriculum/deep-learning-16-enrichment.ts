/**
 * AI Atlas — 16 Deep Learning Architectures Pedagogical Enrichment
 *
 * Provides Tensor Shape walkthroughs, PyTorch implementations, Training & Evaluation
 * examples, Experiments, Common Mistakes, Real-World Applications, and Side-by-Side
 * Architectural Comparisons (Section 8 of Complete Platform Restructuring).
 */

export interface DlArchitectureEnrichment {
  id: string;
  tensorShapesUz: string;
  pytorchCode: string;
  trainingExampleUz: string;
  evaluationExampleUz: string;
  experimentsUz: string[];
  commonMistakesUz: string[];
  connectionsUz: string;
  applicationsUz: string[];
}

export interface DlPracticalComparison {
  id: string;
  title: string;
  questionContextUz: string;
  leftName: string;
  rightName: string;
  middleName?: string;
  summaryUz: string;
  dimensions: Array<{
    criterionUz: string;
    leftValueUz: string;
    middleValueUz?: string;
    rightValueUz: string;
  }>;
  whenToUseUz: string;
  tradeOffWarningUz?: string;
}

export const DL_ARCHITECTURE_ENRICHMENT: Readonly<Record<string, DlArchitectureEnrichment>> = {
  perceptron: {
    id: "perceptron",
    tensorShapesUz: "Kirish X: (B, d_in), Vaznlar W: (d_in, 1), Bias b: (1,) -> Logit z = X @ W + b: (B, 1) -> Step(z): (B, 1).",
    pytorchCode: `import torch
import torch.nn as nn

# Bitta chiziqli neyron (Perceptron)
layer = nn.Linear(in_features=2, out_features=1)
x = torch.tensor([[0.0, 0.0], [1.0, 1.0]])  # (B=2, d_in=2)
with torch.no_grad():
    logits = layer(x)                       # (2, 1)
    preds = (logits >= 0).int()
print("Logits:", logits.shape, "Preds:", preds.squeeze(-1).tolist())`,
    trainingExampleUz: "Perceptron Learning Rule: faqat xato topilganda w <- w + lr * (y - y_hat) * x yangilanadi.",
    evaluationExampleUz: "AND/OR mantiqiy eshiklarida 100% aniqlik; XOR jadvalida esa chiziqli ajratish imkonsizligi sababli 50–75% da to'xtab qoladi.",
    experimentsUz: [
      "AND, OR va NAND ma'lumotlarida qadamlar sonini kuzating.",
      "XOR nuqtalari [(0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0] bilan konvergensiya yo'qligini tekshiring.",
    ],
    commonMistakesUz: [
      "Step funksiyasiga Backpropagation qo'llashga urinish (hosilasi deyarli hamma joyda 0).",
      "XOR kabi no-chiziqli muammoni bitta neyron bilan yechishga harakat qilish.",
    ],
    connectionsUz: "Bitta chiziqli blok — keyinchalik MLP (ko'p qatlam) va Logistic Regression ning eng kichik qurilish g'ishti.",
    applicationsUz: ["Binary linear classifiers", "Hardware logic gates", "Baseline linear separability check"],
  },
  mlp: {
    id: "mlp",
    tensorShapesUz: "X: (B, 2) -> Linear1(2->4): (B, 4) -> ReLU: (B, 4) -> Linear2(4->1): (B, 1).",
    pytorchCode: `import torch
import torch.nn as nn

mlp = nn.Sequential(
    nn.Linear(2, 8),
    nn.ReLU(),
    nn.Linear(8, 1),
    nn.Sigmoid(),
)
x = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])
y = torch.tensor([[0.], [1.], [1.], [0.]])  # XOR
out = mlp(x)  # Shape: (4, 1)
print("Output shape:", out.shape)`,
    trainingExampleUz: "BCEWithLogitsLoss + Adam(lr=0.05) bilan 300 epochda XOR ni 0.01 dan past xatolikka tushirish.",
    evaluationExampleUz: "4 ta XOR kirishi uchun chiqish ehtimolliklari [0.02, 0.98, 0.97, 0.03] atrofida ajraladi.",
    experimentsUz: [
      "ReLU ni olib tashlab faqat ikkita Linear qatlam qo'ying: XOR yechilmasligini ko'ring (chiziqli kollaps).",
      "Yashirin qatlam neyronlarini 2, 4, 16 ga oshirib qaror chegarasini solishtiring.",
    ],
    commonMistakesUz: [
      "Yashirin qatlamlar orasida nochiziqli aktivatsiya (ReLU/GELU) qo'yishni unutish.",
      "Chuqur MLP da barcha vaznlarni 0 bilan initsializatsiya qilish (simmetriya buzilmasligi).",
    ],
    connectionsUz: "Transformer blokining ikkinchi yarmi (Position-wise FFN) aslida aynan 2-qatlamli MLP dir.",
    applicationsUz: ["Tabular data modeling", "Transformer Feed-Forward Network (FFN)", "Classification heads"],
  },
  cnn: {
    id: "cnn",
    tensorShapesUz: "Tasvir X: (B, C_in=3, H=32, W=32) -> Conv2d(3->16, k=3, p=1): (B, 16, 32, 32) -> MaxPool2d(2): (B, 16, 16, 16) -> Flatten: (B, 4096).",
    pytorchCode: `import torch
import torch.nn as nn

net = nn.Sequential(
    nn.Conv2d(3, 16, kernel_size=3, padding=1),
    nn.ReLU(),
    nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(16 * 16 * 16, 10),
)
img = torch.randn(4, 3, 32, 32)
logits = net(img)  # (4, 10)
print("Logits shape:", logits.shape)`,
    trainingExampleUz: "CrossEntropyLoss + SGD/Adam bilan CIFAR-10 yoki MNIST da konvolyutsiya yadrolari qirralar va shakllarni o'rganadi.",
    evaluationExampleUz: "Top-1 aniqlik va Confusion Matrix yordamida qaysi sinflar (masalan, mushuk va it) aralashishini tahlil qilish.",
    experimentsUz: [
      "kernel_size=3 vs 5 va stride=2 ning chiqish (H, W) o'lchamiga ta'sirini tekshiring.",
      "Padding=0 va Padding=1 da qirra piksellari yo'qolishini solishtiring.",
    ],
    commonMistakesUz: [
      "Conv2d dan Linear qatlamga o'tishda Flatten o'lchamini noto'g'ri hisoblash.",
      "PyTorch `(B, C, H, W)` o'rniga `(B, H, W, C)` shaklini uzatish.",
    ],
    connectionsUz: "1D Conv Mamba bloklarining boshlang'ich lokal aralashuv qismida ham ishlatiladi.",
    applicationsUz: ["Medical imaging", "Object detection", "OCR & Document scanning"],
  },
  resnet: {
    id: "resnet",
    tensorShapesUz: "Kirish x: (B, C, H, W) -> Conv-BN-ReLU-Conv-BN F(x): (B, C, H, W) -> F(x) + x: (B, C, H, W).",
    pytorchCode: `import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, channels: int):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(channels, channels, 3, padding=1, bias=False),
            nn.BatchNorm2d(channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(channels, channels, 3, padding=1, bias=False),
            nn.BatchNorm2d(channels),
        )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.relu(self.block(x) + x)  # Residual skip connection

blk = ResidualBlock(32)
out = blk(torch.randn(2, 32, 16, 16))
print("ResNet block output:", out.shape)`,
    trainingExampleUz: "Identity skip connection gradientning `1 + dF/dx` ko'rinishida to'g'ridan-to'g'ri orqaga oqishini ta'minlaydi.",
    evaluationExampleUz: "56-qatlamli oddiy CNN ning training xatoligi 20-qatlamdan yomonroq (degradation), ResNet-56/152 da esa chuqurlik ortgani sari xatolik kamayadi.",
    experimentsUz: [
      "`+ x` ulanishini olib tashlab 50 qatlamda gradient normasi qanday so'nishini solishtiring.",
      "Kanallar soni o'zgarganda 1x1 projection shortcut (`nn.Conv2d(c_in, c_out, 1)`) qo'shing.",
    ],
    commonMistakesUz: [
      "F(x) va x ning `(B, C, H, W)` o'lchamlari har xil bo'lganda projection shortcut qo'shmasdan qo'shishga urinish.",
    ],
    connectionsUz: "Transformerlardagi har bir Attention va FFN qatlami atrofidagi `x + SubLayer(Norm(x))` aynan ResNet merosidir.",
    applicationsUz: ["ResNet-50/152 Vision Backbones", "Stable Diffusion U-Net", "Transformer Residual Streams"],
  },
  word_embeddings: {
    id: "word_embeddings",
    tensorShapesUz: "Token IDs: (B, T) -> nn.Embedding(V, d_model): (B, T, d_model). Masalan, V=10000, d=300 -> (4, 12, 300).",
    pytorchCode: `import torch
import torch.nn as nn

emb = nn.Embedding(num_embeddings=5000, embedding_dim=128)
token_ids = torch.tensor([[12, 45, 7], [9, 300, 1]])  # (B=2, T=3)
vectors = emb(token_ids)                              # (2, 3, 128)
print("Embeddings shape:", vectors.shape)`,
    trainingExampleUz: "Skip-Gram (markaziy so'z -> atrofdagi kontekst) va Negative Sampling orqali vektorlar o'qitiladi.",
    evaluationExampleUz: "Analogy testi (`king - man + woman ~ queen`) va Cosine Similarity orqali semantik klasterlash baholanadi.",
    experimentsUz: [
      "Omonim so'z ('bank' daryo vs moliya) bitta statik vektorga tushishini tahlil qiling.",
    ],
    commonMistakesUz: [
      "Statik Word2Vec ning kontekstga qarab ma'noni o'zgartira olmasligini unutish (buni BERT/Transformer hal qilgan).",
    ],
    connectionsUz: "Barcha zamonaviy LLM larning birinchi kirish qatlami (`wte`) va RAG vektor qidiruvi asosidir.",
    applicationsUz: ["Static semantic search", "Input embedding tables in LLMs", "Cold-start text features"],
  },
  rnn: {
    id: "rnn",
    tensorShapesUz: "Kirish X: (B, T, d_in), Hidden h_t: (B, d_hidden) -> Chiqish H: (B, T, d_hidden).",
    pytorchCode: `import torch
import torch.nn as nn

rnn = nn.RNN(input_size=16, hidden_size=32, batch_first=True)
x = torch.randn(4, 10, 16)       # (B=4, T=10, d_in=16)
out, h_n = rnn(x)                # out: (4, 10, 32), h_n: (1, 4, 32)
print("out:", out.shape, "h_n:", h_n.shape)`,
    trainingExampleUz: "Backpropagation Through Time (BPTT) + Gradient Clipping (`clip_grad_norm_`) bilan portlashni to'xtatish.",
    evaluationExampleUz: "Qisqa ketma-ketliklarda yaxshi Perplexity, 50+ token masofada kontekstni yo'qotish.",
    experimentsUz: [
      "Ketma-ketlik uzunligi T=5, 30, 100 da dL/dh_1 gradient normasini o'lchang.",
    ],
    commonMistakesUz: [
      "`batch_first=True` ni bermasdan `(B, T, d)` shaklidagi tensor uzatish.",
      "BPTT da gradient clipping ishlatmaslik (exploding gradients).",
    ],
    connectionsUz: "LSTM va GRU ning bevosita ota-onasi; Transformer kelguncha ketma-ketlik modellarining poydevori.",
    applicationsUz: ["Low-latency streaming sensor signals", "Simple time-series forecasting"],
  },
  lstm: {
    id: "lstm",
    tensorShapesUz: "X: (B, T, d_in) -> out: (B, T, d_h), h_n: (num_layers, B, d_h), c_n: (num_layers, B, d_h).",
    pytorchCode: `import torch
import torch.nn as nn

lstm = nn.LSTM(input_size=16, hidden_size=32, batch_first=True)
x = torch.randn(4, 25, 16)
out, (h_n, c_n) = lstm(x)
print("out:", out.shape, "h_n:", h_n.shape, "c_n (Cell):", c_n.shape)`,
    trainingExampleUz: "Adam(lr=1e-3) va gradient clipping bilan uzun ketma-ketlikli matn/sensor ma'lumotlarini o'qitish.",
    evaluationExampleUz: "1000+ qadamli sintetik Copying Memory vazifasida oddiy RNN 0% ga yaqin qolsa, LSTM ~100% ga yaqinlashadi.",
    experimentsUz: [
      "Forget gate biasini +1.0 ga o'rnatib dastlabki uzoq eslab qolish tezligini tekshiring.",
    ],
    commonMistakesUz: [
      "`h_n` (short-term hidden) va `c_n` (cell state CEC) ni aralashtirib yuborish.",
    ],
    connectionsUz: "Cell state `c_t` dagi additiv oqim ResNet skip connection ga juda o'xshash vaqt bo'yicha 'magistral' yaratadi.",
    applicationsUz: ["Real-time speech/audio frames", "Financial time series", "Legacy NMT & Robotics control"],
  },
  gru: {
    id: "gru",
    tensorShapesUz: "X: (B, T, d_in) -> out: (B, T, d_h), h_n: (num_layers, B, d_h) — alohida c_n yo'q.",
    pytorchCode: `import torch
import torch.nn as nn

gru = nn.GRU(input_size=16, hidden_size=32, batch_first=True)
x = torch.randn(4, 25, 16)
out, h_n = gru(x)  # Faqat h_n qaytaradi (3 ta eshik o'rniga 2 ta)
print("out:", out.shape, "h_n:", h_n.shape)`,
    trainingExampleUz: "LSTM ga nisbatan ~25% kam parametr va tezroq epochlar bilan o'qitish.",
    evaluationExampleUz: "Kichik va o'rta datasetlarda ko'pincha LSTM bilan teng F1 / BLEU, ba'zan kamroq overfitting ko'rsatadi.",
    experimentsUz: [
      "Xuddi bir xil `hidden_size` bilan LSTM vs GRU parametr soni va tezligini solishtiring.",
    ],
    commonMistakesUz: [
      "LSTM kodidan ko'chirib `(h_n, c_n) = gru(x)` deb ikkita holat kutish (GRU bitta `h_n` qaytaradi).",
    ],
    connectionsUz: "LSTM ning soddalashtirilgan ukasi; ResNet/Transformer gacha eng samarali ketma-ketlik bloki bo'lgan.",
    applicationsUz: ["Edge/IoT sequence inference", "Time-series anomaly detection", "Fast streaming audio"],
  },
  seq2seq: {
    id: "seq2seq",
    tensorShapesUz: "Src: (B, T_src) -> Encoder: h_T (1, B, d) -> Decoder input Tgt: (B, T_tgt) -> Logits: (B, T_tgt, V_tgt).",
    pytorchCode: `import torch
import torch.nn as nn

encoder = nn.LSTM(32, 64, batch_first=True)
decoder = nn.LSTM(32, 64, batch_first=True)
src_emb = torch.randn(2, 7, 32)
tgt_emb = torch.randn(2, 9, 32)
_, (h_ctx, c_ctx) = encoder(src_emb)      # Bottleneck: (1, 2, 64)
dec_out, _ = decoder(tgt_emb, (h_ctx, c_ctx))
print("Decoder out:", dec_out.shape)      # (2, 9, 64)`,
    trainingExampleUz: "Teacher Forcing (decoder ga oldingi qadam bashorati o'rniga haqiqiy nishon so'zni berish) bilan barqaror o'qitish.",
    evaluationExampleUz: "Tarjima uzunligi 20–30 so'zdan oshganda BLEU balli keskin tushadi (bitta vector bottleneck!).",
    experimentsUz: [
      "Gap uzunligi 10 vs 40 so'zda bottleneck sababli xatolik qanday ortishini kuzating.",
    ],
    commonMistakesUz: [
      "Training da Teacher Forcing ishlatib, inference da auto-regressive loop yozmaslik (Exposure bias).",
    ],
    connectionsUz: "Ushbu bottleneck muammosini bevosita keyingi qadam — **Attention (Bahdanau, 2014)** hal qildi.",
    applicationsUz: ["Machine translation baseline", "Text summarization", "Code-to-code seq translation"],
  },
  attention: {
    id: "attention",
    tensorShapesUz: "Encoder H: (B, T_src, d), Decoder state s_t: (B, 1, d) -> Weights alpha: (B, 1, T_src) -> Context c_t = alpha @ H: (B, 1, d).",
    pytorchCode: `import torch
import torch.nn.functional as F

H = torch.randn(2, 6, 32)       # Encoder all hidden states (B, T_src, d)
s_t = torch.randn(2, 1, 32)     # Current decoder hidden state
scores = torch.bmm(s_t, H.transpose(1, 2))  # (2, 1, 6)
alpha = F.softmax(scores, dim=-1)           # Alignment weights
context = torch.bmm(alpha, H)               # (2, 1, 32)
print("Alpha sum:", alpha.sum(dim=-1)[0].item(), "Context:", context.shape)`,
    trainingExampleUz: "Encoder va Alignment modeli birgalikda Cross-Entropy Loss bilan o'qitiladi.",
    evaluationExampleUz: "Uzun gaplarda (30–50+ so'z) Seq2Seq bottleneck ni bartaraf etib BLEU ballini sezilarli oshiradi.",
    experimentsUz: [
      "`alpha` vektorini heatmap qilib chizing: tarjima so'zlari bilan manba so'zlari mos kelishini ko'ring.",
    ],
    commonMistakesUz: [
      "Softmax ni `dim=1` o'rniga noto'g'ri o'lcham bo'yicha qo'llash (yig'indi 1 bo'lishi kerak T_src bo'yicha).",
    ],
    connectionsUz: "Cross-Attention ning birinchi avlodi bo'lib, keyin Transformer da **Self-Attention** ga aylandi.",
    applicationsUz: ["Neural Machine Translation", "Speech-to-text alignment", "Encoder-Decoder Cross-Attention"],
  },
  self_attention: {
    id: "self_attention",
    tensorShapesUz: "X: (B, T, d_model) -> Q, K, V: (B, T, d_k) -> Scores Q@K^T/sqrt(d_k): (B, T, T) -> Output: (B, T, d_k).",
    pytorchCode: `import math
import torch
import torch.nn.functional as F

B, T, d_k = 2, 5, 16
Q = torch.randn(B, T, d_k)
K = torch.randn(B, T, d_k)
V = torch.randn(B, T, d_k)
scores = (Q @ K.transpose(-2, -1)) / math.sqrt(d_k)  # (2, 5, 5)
weights = F.softmax(scores, dim=-1)
out = weights @ V                                     # (2, 5, 16)
print("Self-Attention out:", out.shape, "Attention matrix:", weights.shape)`,
    trainingExampleUz: "`sqrt(d_k)` ga bo'lish Softmax to'yinishini (gradient 0 ga tushishini) oldini oladi.",
    evaluationExampleUz: "Har bir so'z juftligi orasidagi eng uzun yo'l uzunligi O(1) — RNN dagi O(N) ketma-ketlik yo'q!",
    experimentsUz: [
      "`sqrt(d_k)` bo'lishini olib tashlab d_k=512 da Softmax bir-hot bo'lib gradient qanday so'nishini tekshiring.",
    ],
    commonMistakesUz: [
      "`sqrt(d_k)` bilan masshtablashni unutish.",
      "Causal vazifalarda yuqori uchburchak niqobini (`-inf`) qo'llamasdan kelajak tokenlarga qarab qo'yish (data leak!).",
    ],
    connectionsUz: "Transformer, BERT va GPT ning yuragi; Cosine Similarity ning dinamik matritsa shaklidir.",
    applicationsUz: ["Every modern LLM layer", "Vision Transformers (ViT)", "Protein folding (AlphaFold)"],
  },
  transformer: {
    id: "transformer",
    tensorShapesUz: "X: (B, T, d_model) -> x = x + MHA(LN(x)) -> x = x + FFN(LN(x)): (B, T, d_model).",
    pytorchCode: `import torch
import torch.nn as nn

layer = nn.TransformerEncoderLayer(
    d_model=64, nhead=4, dim_feedforward=256, batch_first=True
)
x = torch.randn(2, 12, 64)
out = layer(x)  # Shape saqlanadi: (2, 12, 64)
print("Transformer block output:", out.shape)`,
    trainingExampleUz: "AdamW + Warmup Learning Rate Schedule + Label Smoothing bilan millionlab/milliardlab tokenlarda parallel o'qitiladi.",
    evaluationExampleUz: "Perplexity (exp(loss)) va downstream NLP benchmarklari (MMLU, HumanEval).",
    experimentsUz: [
      "Pre-LN vs Post-LN joylashuvining o'qitish barqarorligiga ta'sirini tekshiring.",
      "Positional Encoding bo'lmaganda Transformer so'zlar tartibini ajrata olmasligini (permutation equivariance) sinang.",
    ],
    commonMistakesUz: [
      "Positional Encoding / RoPE qo'shmaslik (model 'it mushukni quvladi' va 'mushuk itni quvladi' ni farqlay olmaydi).",
      "Katta batch va chuqur tarmoqlarda Learning Rate Warmup ishlatmaslik.",
    ],
    connectionsUz: "BERT (Encoder-only), GPT (Decoder-only) va T5 (Encoder-Decoder) uchalasi ham shu blokdan yasaladi.",
    applicationsUz: ["All Frontier LLMs", "Code generation", "Multimodal Foundation Models"],
  },
  bert: {
    id: "bert",
    tensorShapesUz: "Token IDs: (B, T) -> Encoder Layers (Bidirectional, mask yo'q!) -> Contextual Vectors: (B, T, d_model=768) -> [CLS]: (B, 768).",
    pytorchCode: `import torch
import torch.nn as nn

encoder_layer = nn.TransformerEncoderLayer(d_model=128, nhead=4, batch_first=True)
bert_backbone = nn.TransformerEncoder(encoder_layer, num_layers=2)
x = torch.randn(2, 10, 128)  # [CLS] + tokens
hidden = bert_backbone(x)     # Bidirectional: causal mask yo'q!
cls_repr = hidden[:, 0, :]    # (2, 128) klassifikatsiya uchun
print("BERT [CLS] representation:", cls_repr.shape)`,
    trainingExampleUz: "15% tokenlarni [MASK] bilan berkitib (MLM) + Next Sentence Prediction orqali pre-training, keyin esa downstream classification da fine-tuning.",
    evaluationExampleUz: "Macro-F1, Accuracy, GLUE / NER F1 ballari.",
    experimentsUz: [
      "O'zbekcha sharhlarni ijobiy/salbiyga ajratishda TF-IDF + LogisticRegression vs BERT-style Encoder F1 ballarini taqqoslang.",
    ],
    commonMistakesUz: [
      "BERT bilan erkin matn generatsiya qilishga urinish (BERT causal decoder emas, MLM encoderdir).",
    ],
    connectionsUz: "RAG tizimlarida Embedding modeli (BGE, E5) va Cross-Encoder Reranker sifatida eng ko'p ishlatiladi.",
    applicationsUz: ["Embedding models & Rerankers (RAG)", "Named Entity Recognition (NER)", "Sentiment Classification"],
  },
  gpt: {
    id: "gpt",
    tensorShapesUz: "Input IDs: (B, T) -> Causal Masked Decoder Layers (M_ij=-inf for j>i) -> LM Head: (B, T, V_vocab).",
    pytorchCode: `import torch
import torch.nn as nn

T = 6
causal_mask = torch.triu(torch.ones(T, T) * float("-inf"), diagonal=1)
dec_layer = nn.TransformerEncoderLayer(d_model=64, nhead=4, batch_first=True)
x = torch.randn(2, T, 64)
out = dec_layer(x, src_mask=causal_mask)  # Faqat o'tmish tokenlariga qaraydi
print("Causal GPT block output:", out.shape)`,
    trainingExampleUz: "Keyingi tokenni bashorat qilish (`CrossEntropyLoss(logits[:, :-1], targets[:, 1:])`) bilan self-supervised pre-training.",
    evaluationExampleUz: "Perplexity, Pass@k (kod generatsiyasi), Temperature/Top-P sampling sifati.",
    experimentsUz: [
      "Inference paytida KV Cache borligida va KV Cache siz 500 token generatsiya vaqtini o'lchang.",
    ],
    commonMistakesUz: [
      "Loss hisobida tokenlarni 1 qadamga siljitishni (shifting inputs vs labels) unutish.",
    ],
    connectionsUz: "Barcha chat modellarining asosi; Fine-Tuning (SFT/LoRA) va RL Alignment (DPO/GRPO) bilan chat agentga aylanadi.",
    applicationsUz: ["Conversational AI assistants", "Code copilots", "Reasoning & Agentic Tool Use"],
  },
  moe: {
    id: "moe",
    tensorShapesUz: "Token x: (B*T, d) -> Router W_g: (B*T, E_experts) -> Top-K(k=2) mask -> Har token faqat 2 ta Expert E_i(x): (B*T, d) ga yo'naladi.",
    pytorchCode: `import torch
import torch.nn as nn
import torch.nn.functional as F

num_experts, top_k, d = 8, 2, 32
router = nn.Linear(d, num_experts)
experts = nn.ModuleList([nn.Sequential(nn.Linear(d, 64), nn.ReLU(), nn.Linear(64, d)) for _ in range(num_experts)])
x = torch.randn(4, d)
weights, indices = torch.topk(F.softmax(router(x), dim=-1), top_k, dim=-1)
weights = weights / weights.sum(dim=-1, keepdim=True)
out = sum(weights[:, k:k+1] * torch.stack([experts[idx](x[i:i+1]).squeeze(0) for i, idx in enumerate(indices[:, k])]) for k in range(top_k))
print("MoE Sparse Output:", out.shape)`,
    trainingExampleUz: "Cross-Entropy Loss ga qo'shimcha ravishda Load Balancing Auxiliary Loss qo'shiladi (aks holda Router hamma tokenni bitta ekspertga yuboradi!).",
    evaluationExampleUz: "Ekspert yuklamasi tengligi (load balance) va faol FLOPs ga nisbatan sifat (Active Params vs Total Params).",
    experimentsUz: [
      "Load balancing yo'qotishini 0 ga tushirib Routing Collapse hodisasini kuzating.",
    ],
    commonMistakesUz: [
      "MoE da faol parametrlar kam bo'lgani uchun VRAM ham kam ketadi deb o'ylash (XATO: barcha ekspertlar xotirada turishi shart!).",
    ],
    connectionsUz: "Dense Transformer FFN blokining to'g'ridan-to'g'ri siyrak o'rnini bosuvchisi (Mixtral 8x7B, DeepSeek-V3).",
    applicationsUz: ["Mixtral / DeepSeek frontier models", "Multi-domain specialization at low inference FLOPs"],
  },
  mamba: {
    id: "mamba",
    tensorShapesUz: "Kirish X: (B, L, D) -> Parametrlar (Delta, B, C): kirish x_t dan dinamik proyeksiyalanadi -> Recurrent holat h_t: (B, D, N_state) -> Chiqish Y: (B, L, D).",
    pytorchCode: `import torch
import torch.nn as nn

# Soddalashtirilgan Selective SSM (S6) qadami (KV cache yo'q!)
B, L, D, N = 2, 16, 32, 8
x = torch.randn(B, L, D)
A = -torch.ones(D, N)
proj_delta = nn.Linear(D, D)
proj_B = nn.Linear(D, N)
proj_C = nn.Linear(D, N)

h = torch.zeros(B, D, N)  # Doimiy O(1) xotira holati!
outputs = []
for t in range(L):
    xt = x[:, t, :]                             # (B, D)
    delta = torch.softplus(proj_delta(xt))      # (B, D)
    Bt = proj_B(xt)                             # (B, N)
    Ct = proj_C(xt)                             # (B, N)
    A_bar = torch.exp(delta.unsqueeze(-1) * A)  # (B, D, N)
    B_bar = delta.unsqueeze(-1) * Bt.unsqueeze(1)
    h = A_bar * h + B_bar * xt.unsqueeze(-1)
    yt = (h * Ct.unsqueeze(1)).sum(dim=-1)      # (B, D)
    outputs.append(yt)
y = torch.stack(outputs, dim=1)                 # (B, L, D)
print("Mamba S6 output shape:", y.shape)`,
    trainingExampleUz: "O'qitish vaqtida Parallel Associative Scan (Hardware-aware SRAM Flash Scan) yordamida O(L) da parallel hisoblanadi.",
    evaluationExampleUz: "100K–1M+ token uzunlikdagi Throughput (tokens/sec) va doimiy VRAM sarfi bo'yicha baholanadi.",
    experimentsUz: [
      "L = 1K dan L = 128K gacha cho'zilganda Transformer KV-cache xotirasi vs Mamba O(1) holat xotirasini taqqoslang.",
    ],
    commonMistakesUz: [
      "Mamba ni 'Transformerning yangiroq versiyasi' deb tasavvur qilish (XATO: Mamba Attention ishlatmaydi — u Selective State Space arxitekturasi!).",
      "Aniq ko'p-hop recall / verbatim nusxalashda Mamba da cheklov bo'lishini hisobga olmaslik.",
    ],
    connectionsUz: "Attention o'rniga uzluksiz chiziqli holatlar fazosi (Control Theory + LSTM selektiv eslab qolish g'oyasi) asosidagi muqobil yo'nalish. Zamonaviy gibridlar (Jamba, Zamba) Attention + Mamba ni birlashtiradi.",
    applicationsUz: ["Long-context Genomics / DNA", "Audio & Continuous Signals", "Hybrid Transformer-Mamba LLMs"],
  },
};

export const DL_PRACTICAL_COMPARISONS: readonly DlPracticalComparison[] = [
  {
    id: "perceptron-vs-mlp",
    title: "Perceptron vs MLP (Multi-Layer Perceptron)",
    questionContextUz: "1-savol: Bitta neyron nimani o'rgana oladi?",
    leftName: "Perceptron (1958)",
    rightName: "MLP (1986)",
    summaryUz: "Bitta neyron fazodagi faqat bitta tekislik (chiziqli chegara) chiza oladi; MLP esa bir nechta qatlamlar va nochiziqli aktivatsiya (ReLU/Sigmoid) orqali ixtiyoriy murakkab funksiyani approksimatsiya qiladi.",
    dimensions: [
      { criterionUz: "Chiziqli bo'lmagan masalalar (XOR)", leftValueUz: "Yecha olmaydi (Minsky & Papert cheklovi)", rightValueUz: "Bemalol yechadi (Universal Approximation)" },
      { criterionUz: "O'qitish algoritmi", leftValueUz: "Perceptron qoidasi (faqat chiqish xatosi)", rightValueUz: "Backpropagation (Chain Rule bilan barcha qatlamlar)" },
      { criterionUz: "Ichki belgilar (Features)", leftValueUz: "Avtomatik feature yaratmaydi", rightValueUz: "Yashirin qatlamlarda avtomatik tasvirlar shakllanadi" },
    ],
    whenToUseUz: "Har doim nochiziqli bog'liqliklar uchun MLP (yoki zamonaviy bloklar ichida FFN) ishlatiladi; Perceptron faqat oddiy chiziqli ajratuvchilar va tarixiy poydevor uchun o'rganiladi.",
  },
  {
    id: "cnn-vs-resnet",
    title: "CNN vs ResNet",
    questionContextUz: "2-savol: Tasvirga qanday qarash kerak?",
    leftName: "Klassik CNN (1998)",
    rightName: "ResNet (2015)",
    summaryUz: "Klassik CNN qatlamlari ketma-ket chuqurlashgani sayin degradatsiyaga uchraydi (56 qatlam 20 qatlamdan yomonroq ishlaydi); ResNet `y = F(x) + x` residual skip connection bilan 152+ qatlamgacha gradientni olib o'tadi.",
    dimensions: [
      { criterionUz: "Maksimal samarali chuqurlik", leftValueUz: "~10–20 qatlamdan keyin o'qitish qiyinlashadi", rightValueUz: "50, 101, 152 va 1000+ qatlam barqaror o'qiydi" },
      { criterionUz: "Matematik maqsad", leftValueUz: "To'g'ridan-to'g'ri H(x) ni noldan o'rganish", rightValueUz: "Faqat qoldiq o'zgarish F(x) = H(x) - x ni o'rganish" },
      { criterionUz: "Gradient oqimi", leftValueUz: "Ko'p ko'paytirishlar tufayli so'nadi", rightValueUz: "`+ x` ayniyat magistrali orqali to'g'ridan-to'g'ri oqadi" },
    ],
    whenToUseUz: "Kichik 3–5 qatlamli tasvir filtrlari uchun oddiy CNN yetarli; chuqur kompyuter ko'rish modellari va deyarli barcha zamonaviy neyron tarmoqlarda Residual Connections majburiy standartdir.",
  },
  {
    id: "rnn-vs-lstm-vs-gru",
    title: "RNN vs LSTM vs GRU",
    questionContextUz: "3-savol: Gapni ketma-ket qanday o'qish mumkin?",
    leftName: "RNN (1990)",
    middleName: "LSTM (1997)",
    rightName: "GRU (2014)",
    summaryUz: "Oddiy RNN uzoq masofada xotirani unutadi (vanishing gradient); LSTM alohida Cell State (CEC) va 3 ta eshik bilan 1000+ qadamni saqlaydi; GRU esa cell state ni birlashtirib 2 ta eshik bilan tezroq ishlaydi.",
    dimensions: [
      { criterionUz: "Xotira holatlari", leftValueUz: "1 ta holat (h_t)", middleValueUz: "2 ta holat (h_t va Cell State c_t)", rightValueUz: "1 ta birlashgan holat (h_t)" },
      { criterionUz: "Eshiklar (Gates) soni", leftValueUz: "0 (eshiksiz tanh)", middleValueUz: "3 ta (Input, Forget, Output)", rightValueUz: "2 ta (Update, Reset)" },
      { criterionUz: "Parametrlar va Tezlik", leftValueUz: "Eng kam / eng tez, lekin qisqa xotira", middleValueUz: "Ko'proq parametr, uzun kontekstda kuchli", rightValueUz: "~25% kamroq parametr, kichik datasetlarda qulay" },
    ],
    whenToUseUz: "Uzoq kontekstli klassik ketma-ketliklarda LSTM, resurs cheklangan qurilmalarda GRU afzal; katta NLP da esa uchalasi ham parallel Transformerlar bilan almashtirilgan.",
  },
  {
    id: "seq2seq-vs-attention",
    title: "Seq2Seq vs Attention (Bahdanau)",
    questionContextUz: "4-savol: Bir gapni boshqa gapga qanday aylantirish mumkin?",
    leftName: "Sof Seq2Seq (2014)",
    rightName: "Attention (Bahdanau, 2014)",
    summaryUz: "Seq2Seq butun kirish gapini oxiridagi bitta qattiq uzunlikdagi vektorga siqishga majbur (bottleneck); Attention esa Decoder ga har bir so'zni tarjima qilayotganda Encoder ning barcha so'zlariga dinamik qarash imkonini beradi.",
    dimensions: [
      { criterionUz: "Axborot uzatish", leftValueUz: "Bitta yakuniy vektor h_T (Bottleneck)", rightValueUz: "Barcha kirish holatlarining vaznli yig'indisi c_t" },
      { criterionUz: "Uzun gaplar (30+ so'z)", leftValueUz: "Gap boshidagi ma'lumot unutiladi", rightValueUz: "Istalgan so'zga to'g'ridan-to'g'ri e'tibor qaratiladi" },
      { criterionUz: "Izohlanishi (Interpretability)", leftValueUz: "Qora quti", rightValueUz: "Alignment heatmap qaysi so'z qayerga mosligini ko'rsatadi" },
    ],
    whenToUseUz: "Har qanday tarjima, xulosa chiqarish yoki seq2seq tizimida sof bottleneck o'rniga har doim Attention ishlatiladi.",
  },
  {
    id: "attention-vs-self-attention",
    title: "Cross/Additive Attention vs Self-Attention",
    questionContextUz: "4–5-savol: Rekurrentlikdan to'liq parallelizmga o'tish",
    leftName: "RNN + Attention (2014)",
    rightName: "Self-Attention (2017)",
    summaryUz: "2014-yilgi Attention hali ham RNN ichida ketma-ket ishlagan (T qadam kutish shart); 2017-yilgi Self-Attention esa RNN ni butunlay olib tashlab, bitta gapning o'zida barcha so'zlararo bog'liqlikni parallel matritsa ko'paytmasida hisoblaydi.",
    dimensions: [
      { criterionUz: "Qaysi holatlar orasida?", leftValueUz: "Decoder (Query) va Encoder (Keys) orasida", rightValueUz: "Bitta ketma-ketlikning barcha tokenlari o'zaro (Q, K, V)" },
      { criterionUz: "O'qitishda parallelizm", leftValueUz: "Yo'q (RNN O(N) ketma-ket zanjir qoladi)", rightValueUz: "To'liq GPU parallelizmi — O(1) yo'l uzunligi" },
      { criterionUz: "Hisoblash murakkabligi", leftValueUz: "O(N * d^2 + N^2 * d)", rightValueUz: "O(N^2 * d) — matritsa ko'paytmasi (FlashAttention bilan tez)" },
    ],
    whenToUseUz: "Zamonaviy barcha katta modellarda RNN o'rniga to'liq parallel Self-Attention qatlamlari qo'llaniladi.",
  },
  {
    id: "bert-vs-gpt",
    title: "BERT vs GPT",
    questionContextUz: "5-savol: Tushunish (Encoder) vs Yaratish (Decoder)",
    leftName: "BERT (Encoder-only, 2018)",
    rightName: "GPT (Decoder-only, 2018)",
    summaryUz: "BERT gapni bir vaqtda ikkala tomondan (chap va o'ngdan) ko'rib tushunish uchun qurilgan; GPT esa faqat chapdan o'ngga (Causal Mask) qarab keyingi tokenni bashorat qilib matn generatsiya qiladi.",
    dimensions: [
      { criterionUz: "Diqqat (Attention) yo'nalishi", leftValueUz: "Ikki tomonlama (Bidirectional, barcha so'z ko'rinadi)", rightValueUz: "Bir tomonlama (Causal mask — kelajak yashirilgan)" },
      { criterionUz: "Pre-training maqsadi", leftValueUz: "Masked Language Modeling (MLM: 15% [MASK] ni topish)", rightValueUz: "Causal Next-Token Prediction" },
      { criterionUz: "Eng kuchli sohalari", leftValueUz: "Klassifikatsiya, Embeddinglar, RAG Reranking, NER", rightValueUz: "Matn/Kod generatsiyasi, Chatbot, Agentlar, Few-shot" },
    ],
    whenToUseUz: "Matnni tezkor klassifikatsiya qilish va vektor embedding olish uchun Encoder (BERT oilasi), ijodiy javob va mantiqiy suhbat uchun Decoder (GPT/Llama oilasi) tanlanadi.",
  },
  {
    id: "dense-ffn-vs-moe",
    title: "Dense FFN vs Mixture of Experts (MoE)",
    questionContextUz: "6-savol: Modelni hisob xarajatini oshirmasdan qanday kattalashtirish mumkin?",
    leftName: "Dense Transformer FFN",
    rightName: "Sparse MoE (Shazeer et al., 2017)",
    summaryUz: "Dense modelda har bir token barcha milliardlab parametrlardan o'tadi; MoE da esa Router har bir tokenga faqat 1–2 ta ixtisoslashgan ekspertni tanlaydi, natijada umumiy bilim hajmi keskin oshadi, inference FLOPs esa kichik qoladi.",
    dimensions: [
      { criterionUz: "Har tokendagi faol parametrlar", leftValueUz: "100% parametr ishga tushadi", rightValueUz: "Faqat Top-K (masalan, 2/8 = 25% yoki 37B/671B)" },
      { criterionUz: "VRAM xotira talabi", leftValueUz: "Parametrlar soniga proporsional", rightValueUz: "Yuqori (barcha ekspertlar VRAMda saqlanishi kerak)" },
      { criterionUz: "O'qitish murakkabligi", leftValueUz: "Barqaror va sodda", rightValueUz: "Router Load Balancing Loss va All-to-All kommunikatsiya kerak" },
    ],
    whenToUseUz: "Xotira (VRAM) yetarli bo'lib, yuqori token/sekund tezligi va ulkan bilim sig'imi kerak bo'lganda MoE tanlanadi; cheklangan GPU xotirada esa Dense modellar ixchamroq.",
  },
  {
    id: "transformer-vs-mamba",
    title: "Transformer vs Mamba (Selective SSM)",
    questionContextUz: "6-savol: O(N^2) Attention cheklovini yengish va cheksiz uzun kontekst",
    leftName: "Transformer (Self-Attention)",
    rightName: "Mamba (Selective SSM / S6, 2023)",
    summaryUz: "Mamba Transformerning shunchaki 'keyingi yangi versiyasi' EMAS. Ular butunlay ikki xil hisoblash falsafasi: Transformer har bir o'tmish tokenni alohida KV Cache da saqlab O(N^2) aniq qaraydi; Mamba esa kontekstni qat'iy o'lchamli holat h_t ga dinamik siqib, O(N) vaqt va O(1) xotirada ishlaydi.",
    dimensions: [
      { criterionUz: "Vaqt va Xotira murakkabligi", leftValueUz: "O(N^2) attention, Inference da O(N) o'suvchi KV Cache", rightValueUz: "O(N) chiziqli vaqt, Inference da O(1) doimiy xotira (KV cache yo'q)" },
      { criterionUz: "Aniq fakt nusxalash (In-context Recall)", leftValueUz: "Juda kuchli (istalgan eski tokenga bevosita to'g'ri murojaat)", rightValueUz: "Qattiq holat hajmi tufayli ko'p-hop aniq nusxalashda murosa mavjud" },
      { criterionUz: "Eng yaxshi qo'llanilishi", leftValueUz: "Murakkab mantiq, RAG, aniq matn/kod tahlili", rightValueUz: "100K–1M+ tokenli DNK, audio, sensor va tezkor oqimlar" },
    ],
    whenToUseUz: "Aniq xotira va ko'p-hop mantiq uchun Transformer (yoki Gibrid Transformer+Mamba — masalan, Jamba) kuchliroq; juda uzun uzluksiz ketma-ketliklarda va xotira chegaralangan tezlikda Mamba ustun.",
    tradeOffWarningUz: "Muhim eslatma: Mamba Transformerning o'rnini to'liq bosuvchi 'keyingi versiyasi' emas — balki KV-cache xotira portlashi muammosiga qarshi o'ziga xos afzallik va cheklovlarga (design trade-offs) ega muqobil Selective State Space arxitekturasidir.",
  },
];

export function getDlArchitectureEnrichment(id: string): DlArchitectureEnrichment | undefined {
  return DL_ARCHITECTURE_ENRICHMENT[id];
}
