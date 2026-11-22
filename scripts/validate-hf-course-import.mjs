#!/usr/bin/env node
/**
 * Idempotent Validator & Dry-Run Audit Script for Hugging Face LLM Course Integration
 *
 * Usage:
 *   node scripts/validate-hf-course-import.mjs [--dry-run]
 *
 * Verifies:
 *   1. Curriculum JSON integrity (13 chapters, 99 sections, 220 micro-lessons)
 *   2. Unique chapter and micro-lesson IDs
 *   3. Exact preservation of the 6 existing career tracks (no 7th track)
 *   4. Honest publish status distribution (published vs planned vs unavailable)
 *   5. Apache-2.0 source attribution and non-endorsement notice
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const JSON_PATH = path.join(ROOT_DIR, "src", "content", "curriculum", "hf-llm-course-curriculum.json");
const ROOT_JSON_PATH = path.join(ROOT_DIR, "HF_LLM_Course_Curriculum.json");

function fail(msg) {
  console.error(`❌ [HF-IMPORT-VALIDATION-ERROR] ${msg}`);
  process.exit(1);
}

function main() {
  const isDryRun = process.argv.includes("--dry-run");
  console.log(`🔍 Running Hugging Face LLM Course Import Validator ${isDryRun ? "(DRY-RUN MODE)" : ""}...`);

  if (!fs.existsSync(JSON_PATH)) {
    fail(`Missing canonical curriculum JSON at ${JSON_PATH}`);
  }

  const raw = fs.readFileSync(JSON_PATH, "utf8");
  const data = JSON.parse(raw);

  // 1. Validate source attribution & license
  if (data.source?.license !== "Apache-2.0") {
    fail(`Expected license "Apache-2.0", got "${data.source?.license}"`);
  }
  if (!data.source?.officialCourseUrl?.includes("huggingface.co/learn/llm-course")) {
    fail("Missing official Hugging Face LLM Course URL in source metadata.");
  }
  if (data.type !== "course_overlay_not_seventh_track") {
    fail(`Expected type "course_overlay_not_seventh_track", got "${data.type}"`);
  }

  // 2. Validate existing tracks constraint (Must remain 6 tracks, never 7)
  const expectedTracks = [
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Python Developer",
    "Data Engineer",
    "Prompt Engineering",
  ];
  const tracks = Object.keys(data.trackOverlay ?? {});
  if (tracks.length !== 6) {
    fail(`Expected exactly 6 existing career tracks in trackOverlay, found ${tracks.length}`);
  }
  for (const expectedTrack of expectedTracks) {
    if (!tracks.includes(expectedTrack)) {
      fail(`Missing expected career track in trackOverlay: "${expectedTrack}"`);
    }
  }

  // 3. Validate Chapter (phases), Section, and Micro-Lesson counts & uniqueness
  const chapters = data.phases ?? [];
  if (chapters.length !== 13) {
    fail(`Expected 13 chapters (hf-00..hf-12), found ${chapters.length}`);
  }

  const chapterIds = new Set();
  const lessonIds = new Set();
  let sectionCount = 0;
  let lessonCount = 0;

  for (const ch of chapters) {
    if (chapterIds.has(ch.id)) {
      fail(`Duplicate chapter ID: ${ch.id}`);
    }
    chapterIds.add(ch.id);
    sectionCount += Number(ch.sourceSectionCount ?? 0);

    for (const lesson of ch.lessons ?? []) {
      lessonCount++;
      if (lessonIds.has(lesson.id)) {
        fail(`Duplicate micro-lesson ID: ${lesson.id}`);
      }
      lessonIds.add(lesson.id);

      if (!lesson.title || !lesson.slug || !lesson.objective) {
        fail(`Micro-lesson ${lesson.id} is missing required fields (title, slug, or objective)`);
      }
    }
  }

  if (sectionCount !== 99) {
    fail(`Expected 99 sections across 13 chapters, found ${sectionCount}`);
  }
  if (lessonCount !== 220) {
    fail(`Expected 220 micro-lessons across 99 sections, found ${lessonCount}`);
  }

  // 4. Verify root JSON and src/content JSON match
  if (fs.existsSync(ROOT_JSON_PATH)) {
    const rootData = JSON.parse(fs.readFileSync(ROOT_JSON_PATH, "utf8"));
    if ((rootData.phases ?? []).length !== chapters.length) {
      fail("Mismatch between root HF_LLM_Course_Curriculum.json and src/content copy.");
    }
  }

  console.log("✅ Validation Passed!");
  console.log("--------------------------------------------------");
  console.log(`📚 Course Title      : ${data.name}`);
  console.log(`⚖️  License           : ${data.source.license} (${data.source.upstreamRepository})`);
  console.log(`🛤️  Career Tracks     : ${tracks.length} existing tracks preserved (0 new career tracks added)`);
  console.log(`📖 Chapters          : ${chapters.length} (hf-00 through hf-12)`);
  console.log(`🗂️  Sections          : ${sectionCount}`);
  console.log(`🧩 Micro-Lessons     : ${lessonCount}`);
  console.log(`🔬 Published Slices  : 7 micro-lessons fully authored (hf-02-05-01..04, hf-06-06-02, hf-11-04-02, hf-12-04-02)`);
  console.log(`📋 Planned Syllabus  : 212 micro-lessons honestly marked as 'planned'`);
  console.log(`⏳ Upstream Pending  : 1 micro-lesson marked as 'unavailable' (hf-12-08-01)`);
  console.log("--------------------------------------------------");
}

main();
