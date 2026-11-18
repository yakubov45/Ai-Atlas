import React from "react";
import { getContentRepository } from "@/lib/content/repository";
import { HeroSection } from "@/components/home/HeroSection";
import { LearningTracksGrid } from "@/components/home/LearningTracksGrid";
import { FeaturedVideoSection } from "@/components/home/FeaturedVideoSection";
import { InteractiveShowcaseSection } from "@/components/home/InteractiveShowcaseSection";
import { HowLearningWorksSection } from "@/components/home/HowLearningWorksSection";
import { PracticalProjectsSection } from "@/components/home/PracticalProjectsSection";
import { PersonalizedLearningSection } from "@/components/home/PersonalizedLearningSection";
import { RoadmapPreviewAndCta } from "@/components/home/RoadmapPreviewAndCta";

export const metadata = {
  title: "AI Atlas — Sun'iy intellektni shunchaki o‘qima. Uni yaratishni o‘rgan.",
  description:
    "Python, AI Engineering, Machine Learning Engineering va Data Science bo‘yicha interaktiv ta'lim platformasi. Manim videolari, jonli laboratoriyalar va amaliy kod yozish.",
};

export default function HomePage() {
  const repo = getContentRepository();
  const publishedLessons = repo.lessons
    .filter((l) => l.status === "published")
    .map((l) => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      description: l.description,
    }));

  return (
    <div className="flex flex-col w-full space-y-16 sm:space-y-20 pb-20">
      {/* 2. HERO SECTION */}
      <HeroSection />

      {/* 3. FOUR LEARNING TRACKS */}
      <LearningTracksGrid />

      {/* 4. FEATURED VIDEO LESSONS & VIDEO EXPLORER */}
      <FeaturedVideoSection />

      {/* 5. INTERACTIVE LEARNING SHOWCASE ("Ko‘rib tushun. Kod yozib o‘rgan.") */}
      <InteractiveShowcaseSection />

      {/* 6. HOW LEARNING WORKS (6-Step Workflow) */}
      <HowLearningWorksSection />

      {/* 7. REAL PRACTICAL PROJECTS */}
      <PracticalProjectsSection />

      {/* 8. PERSONALIZED LEARNING PROGRESS (Authenticated / Guest Discovery) */}
      <PersonalizedLearningSection publishedLessons={publishedLessons} />

      {/* 9 & 10. LEARNING ROADMAP PREVIEW & FINAL CTA BANNER */}
      <RoadmapPreviewAndCta />
    </div>
  );
}
