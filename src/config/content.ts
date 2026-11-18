import type { ContentStatus } from "@/lib/content/schema";

/**
 * Content visibility.
 *
 * Production builds show only `published` content by default.
 * Preview mode (default in `next dev`) also shows draft / review / example
 * content so authors can check rendering before publishing.
 *
 * Override with AI_ATLAS_CONTENT_PREVIEW=1 (show all) or =0 (published only).
 */
export function isContentPreview(): boolean {
  const flag = process.env.AI_ATLAS_CONTENT_PREVIEW;
  if (flag === "1" || flag === "true") return true;
  if (flag === "0" || flag === "false") return false;
  return process.env.NODE_ENV === "development";
}

export function getVisibleStatuses(preview: boolean = isContentPreview()): readonly ContentStatus[] {
  return preview ? ["published", "review", "draft", "example"] : ["published"];
}
