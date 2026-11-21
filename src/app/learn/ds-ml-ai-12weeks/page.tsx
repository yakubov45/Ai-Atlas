import type { Metadata } from "next";
import { Intensive12WeeksExplorer } from "@/components/curriculum/Intensive12WeeksExplorer";

export const metadata: Metadata = {
  title: "12-Haftalik Intensiv Dastur | Data Science & ML-AI Engineering | AI Atlas",
  description:
    "12 haftalik intensiv o'quv dasturi: uv, Polars, DuckDB, Klassik ML, PyTorch, Transformerlar, Ollama (16GB RAM), Gibrid RAG, FastAPI, Docker Compose, Langfuse va 3 ta yirik Portfolio loyihasi.",
};

export default function Intensive12WeeksPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-6">
      <Intensive12WeeksExplorer />
    </main>
  );
}
