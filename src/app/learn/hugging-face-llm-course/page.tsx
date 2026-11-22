import React from "react";
import type { Metadata } from "next";
import { HuggingFaceCourseExplorer } from "@/components/curriculum/HuggingFaceCourseExplorer";

export const metadata: Metadata = {
  title: "Hugging Face LLM Course — AI Atlas Shared Learning Collection",
  description:
    "13 bob (Chapters 0–12), 99 bo'lim va 220 mikro-darsdan iborat Hugging Face LLM Course o'zbekcha adaptatsiyasi. Tokenizer, Padding, Attention Mask, BPE, LoRA va GRPO laboratoriyalari.",
};

export default function HuggingFaceLlmCoursePage() {
  return <HuggingFaceCourseExplorer />;
}
