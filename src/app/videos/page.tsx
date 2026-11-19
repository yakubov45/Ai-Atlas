import React from "react";
import type { Metadata } from "next";
import { VideoCatalogClient } from "@/components/videos/VideoCatalogClient";

export const metadata: Metadata = {
  title: "Video Darslar Katalogi — 3 Tilda Saralangan Darslar | AI Atlas",
  description:
    "Python, Machine Learning, Data Science, AI Engineering, Data Engineering va Prompt Engineering bo'yicha 36 ta asosiy mavzuning o'zbek, rus va ingliz tillaridagi YouTube darslari.",
};

export default function VideosPage() {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8">
      <VideoCatalogClient />
    </div>
  );
}
