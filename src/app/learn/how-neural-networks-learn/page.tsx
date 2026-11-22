import type { Metadata } from "next";
import { HowNeuralLearnExplorer } from "@/components/curriculum/HowNeuralLearnExplorer";

export const metadata: Metadata = {
  title: "Neyron Tarmoqlar Qanday O'rganadi? (12 Mikro-dars) | AI Atlas",
  description:
    "Sun'iy neyron, Weight va Bias, ReLU/Sigmoid/Tanh, Forward Propagation, Loss Functions, Chain Rule, Backpropagation, Gradient Descent, Learning Rate, Batch/Epoch, Overfitting va GPU Matrix Multiplication bo'yicha 12 ta interaktiv mikro-dars.",
};

export default function HowNeuralNetworksLearnPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-6">
      <HowNeuralLearnExplorer />
    </main>
  );
}
