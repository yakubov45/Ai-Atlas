import { NextResponse } from "next/server";
import { getContentRepository } from "@/lib/content/repository";
import { buildSearchIndex } from "@/lib/search/build-index";

export async function GET() {
  const repo = getContentRepository();
  const index = buildSearchIndex(repo);
  return NextResponse.json(index, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
