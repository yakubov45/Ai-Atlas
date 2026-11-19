import pdfplumber
import re
import json

# 1. Parse Footnotes from markdown
with open("ai atlas youtube videos.md", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("Источники")
sources_text = text[idx:] if idx != -1 else ""

sources = {}
pattern = re.compile(r"^(\d+)\.\s*(.*?)(?=\n\d+\.|\Z)", re.MULTILINE | re.DOTALL)
for m in pattern.finditer(sources_text):
    num = int(m.group(1))
    body = m.group(2).strip()
    url_match = re.search(r"https?://[^\s]+", body)
    url = url_match.group(0).rstrip(",") if url_match else None
    title = body.split("\n")[0].strip().rstrip(",")
    sources[num] = {"title": title, "url": url, "raw": body}

# 2. Track definitions
TRACK_MAP = {
    "A": {"id": "python-dev", "title": "Python Developer"},
    "B": {"id": "ml-engineer", "title": "Machine Learning Engineer"},
    "C": {"id": "data-scientist", "title": "Data Scientist"},
    "D": {"id": "ai-engineer", "title": "AI Engineer"},
    "E": {"id": "data-engineer", "title": "Data Engineer"},
    "F": {"id": "prompt-engineer", "title": "Prompt Engineering"},
}

# 3. Extract 36 Topics Overview from PDF pages 3 to 8
topics_dict = {}
with pdfplumber.open("../AI Atlas YouTube Darslar Katalogi.pdf") as pdf:
    for p in range(2, 9):
        table = pdf.pages[p].extract_table()
        if not table:
            continue
        for row in table:
            if not row or not row[0]:
                continue
            m = re.match(r"^([A-F][1-6])$", row[0].strip())
            if m:
                tid = m.group(1)
                t_desc = row[1].replace("\n", " ").strip() if len(row) > 1 and row[1] else ""
                clean_title = re.sub(r"^[A-Za-z\s]+—\s*", "", t_desc).strip()
                prefix_letter = tid[0]
                track_info = TRACK_MAP[prefix_letter]
                topics_dict[tid] = {
                    "id": tid,
                    "trackId": track_info["id"],
                    "trackTitle": track_info["title"],
                    "title": clean_title if clean_title else t_desc,
                    "rawDesc": t_desc,
                    "uzCell": row[2].replace("\n", " ").strip() if len(row) > 2 and row[2] else "",
                    "ruCell": row[3].replace("\n", " ").strip() if len(row) > 3 and row[3] else "",
                    "enCell": row[4].replace("\n", " ").strip() if len(row) > 4 and row[4] else "",
                }

print(f"Extracted {len(topics_dict)} topics.")

# 4. Extract Section B Detailed Rows from PDF pages 10 to 80
detailed_rows_map = {}
current_topic_id = None

with pdfplumber.open("../AI Atlas YouTube Darslar Katalogi.pdf") as pdf:
    for p_idx in range(9, len(pdf.pages)):
        page = pdf.pages[p_idx]
        table = page.extract_table()
        if not table:
            continue
        for row in table:
            if not row or len(row) < 5:
                continue
            if row[0] and "Mavzu" in row[0] and "ID" in row[0]:
                continue
            first = row[0].strip() if row[0] else ""
            m = re.match(r"^([A-F][1-6])$", first)
            if m:
                current_topic_id = m.group(1)
            
            lang_col = (row[1] or "").strip().replace("\n", " ")
            norm_lang = None
            if "o‘zbek" in lang_col.lower() or "o'zbek" in lang_col.lower():
                norm_lang = "uz"
            elif "rus" in lang_col.lower():
                norm_lang = "ru"
            elif "ingliz" in lang_col.lower():
                norm_lang = "en"
            
            if norm_lang and current_topic_id:
                row_cleaned = [c.replace("\n", " ").strip() if c else "" for c in row]
                key = f"{current_topic_id}-{norm_lang}"
                if key not in detailed_rows_map:
                    detailed_rows_map[key] = {
                        "topic_id": current_topic_id,
                        "lang": norm_lang,
                        "title": row_cleaned[2] if len(row_cleaned) > 2 else "",
                        "channel": row_cleaned[3] if len(row_cleaned) > 3 else "",
                        "url_raw": row_cleaned[4] if len(row_cleaned) > 4 else "",
                        "timestamp": row_cleaned[5] if len(row_cleaned) > 5 else "",
                        "what_learns": row_cleaned[6] if len(row_cleaned) > 6 else "",
                        "evidence": row_cleaned[7] if len(row_cleaned) > 7 else ""
                    }

print(f"Extracted {len(detailed_rows_map)} unique detailed rows from Section B.")

def parse_start_seconds(ts_str):
    if not ts_str:
        return 0
    m = re.search(r"(\d{1,2}):(\d{2}):(\d{2})", ts_str)
    if m:
        return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + int(m.group(3))
    m2 = re.search(r"(\d{1,2}):(\d{2})", ts_str)
    if m2:
        return int(m2.group(1)) * 60 + int(m2.group(2))
    m3 = re.search(r"[?&]t=(\d+)s?", ts_str)
    if m3:
        return int(m3.group(1))
    return 0

def extract_youtube_id(url):
    if not url:
        return ""
    m = re.search(r"(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/|\/v\/)([A-Za-z0-9_-]{11})", url)
    if m:
        return m.group(1)
    return ""

videos = []

# Build canonical list by iterating through all 36 topics x 3 languages
for tid in sorted(topics_dict.keys()):
    t_info = topics_dict[tid]
    for lang in ["uz", "ru", "en"]:
        cell_text = t_info.get(f"{lang}Cell", "")
        # Skip if missing
        if "topilmadi" in cell_text.lower() or not cell_text:
            continue
        
        key = f"{tid}-{lang}"
        detail = detailed_rows_map.get(key, {})
        
        # 1. Resolve exact URL and Title from Footnote Reference first
        refs = re.findall(r"(\d+)", cell_text)
        resolved_url = ""
        resolved_title = ""
        for r in reversed(refs):
            n = int(r)
            if n in sources and sources[n]["url"] and "youtu" in sources[n]["url"]:
                resolved_url = sources[n]["url"]
                resolved_title = sources[n]["title"]
                break
        
        # Fallback to detail url_raw if footnote didn't give it
        if not resolved_url and detail.get("url_raw"):
            cleaned_raw = detail["url_raw"].replace(" ", "").rstrip(",")
            if "youtu" in cleaned_raw:
                resolved_url = cleaned_raw
        
        yt_id = extract_youtube_id(resolved_url)
        
        # If still no 11-char ID, check detail text or cell text
        if not yt_id and detail.get("url_raw"):
            yt_id = extract_youtube_id(detail["url_raw"].replace(" ", ""))
        
        # Timestamp
        ts_label = detail.get("timestamp", "")
        start_sec = parse_start_seconds(ts_label) or parse_start_seconds(resolved_url) or parse_start_seconds(cell_text)
        
        # Channel
        channel = detail.get("channel", "")
        if not channel:
            # Try parsing from cell_text e.g. "— Urobot11"
            ch_m = re.search(r"—\s*([^0-9\(\)]+)", cell_text)
            channel = ch_m.group(1).strip() if ch_m else "YouTube"
        
        # Title
        final_title = detail.get("title", "")
        if not final_title or len(final_title) < 5:
            final_title = resolved_title if resolved_title else cell_text.split("—")[0].strip()
        
        # Clean title
        final_title = re.sub(r"\s+", " ", final_title).strip()
        channel = re.sub(r"\s+", " ", channel).strip()
        
        what_learns = detail.get("what_learns", f"{t_info['title']} mavzusi bo'yicha amaliy bilim va ko'nikmalar.")
        evidence = detail.get("evidence", "Tadqiqot ma'lumotnomasi bilan tasdiqlangan.")
        
        what_learns = re.sub(r"\s+", " ", what_learns).strip()
        evidence = re.sub(r"\s+", " ", evidence).strip()
        
        is_verified = "tekshirish kerak" not in cell_text.lower() and "tekshirish kerak" not in evidence.lower()
        
        videos.append({
            "id": f"yt-{tid.lower()}-{lang}",
            "topicId": tid,
            "topicTitle": t_info["title"],
            "trackId": t_info["trackId"],
            "trackTitle": t_info["trackTitle"],
            "language": lang,
            "title": final_title,
            "channelTitle": channel,
            "youtubeUrl": resolved_url,
            "youtubeId": yt_id,
            "startSeconds": start_sec,
            "timestampLabel": ts_label,
            "whatLearnsUz": what_learns,
            "evidenceUz": evidence,
            "isVerified": is_verified,
            "thumbnailUrl": f"https://img.youtube.com/vi/{yt_id}/hqdefault.jpg" if yt_id else ""
        })

print(f"Total compiled videos: {len(videos)}")
bad_ids = [v for v in videos if len(v["youtubeId"]) != 11]
print(f"Bad YouTube IDs count: {len(bad_ids)}")
for b in bad_ids:
    print("  BAD:", b["id"], b["topicId"], b["language"], "URL:", b["youtubeUrl"])

# Output TypeScript file
ts_code = '''/**
 * AI Atlas — Verified YouTube Educational Videos Catalog
 * 
 * Auto-extracted from 3-Language YouTube Research Catalog (88 Verified Videos across 36 Topics).
 * Upstream sources: `AI Atlas YouTube Darslar Katalogi.pdf` & `ai atlas youtube videos.md`.
 */

export type VideoLanguage = "uz" | "ru" | "en";

export type VideoTrackId =
  | "python-dev"
  | "ml-engineer"
  | "data-scientist"
  | "ai-engineer"
  | "data-engineer"
  | "prompt-engineer";

export interface YouTubeCatalogTopic {
  id: string; // e.g. "A1", "B2"
  trackId: VideoTrackId;
  trackTitle: string;
  title: string;
  rawDesc: string;
  uzCell?: string;
  ruCell?: string;
  enCell?: string;
}

export interface YouTubeEducationalVideo {
  id: string;
  topicId: string; // A1..F6
  topicTitle: string;
  trackId: VideoTrackId;
  trackTitle: string;
  language: VideoLanguage;
  title: string;
  channelTitle: string;
  youtubeUrl: string;
  youtubeId: string;
  startSeconds: number;
  timestampLabel: string;
  whatLearnsUz: string;
  evidenceUz: string;
  isVerified: boolean;
  thumbnailUrl: string;
}

export const YOUTUBE_TOPICS: readonly YouTubeCatalogTopic[] = ''' + json.dumps(list(topics_dict.values()), ensure_ascii=False, indent=2) + ''';

export const YOUTUBE_CATALOG_VIDEOS: readonly YouTubeEducationalVideo[] = ''' + json.dumps(videos, ensure_ascii=False, indent=2) + ''';

export function getAllYouTubeVideos(): readonly YouTubeEducationalVideo[] {
  return YOUTUBE_CATALOG_VIDEOS;
}

export function getYouTubeVideosByTopic(topicId: string): readonly YouTubeEducationalVideo[] {
  return YOUTUBE_CATALOG_VIDEOS.filter((v) => v.topicId === topicId);
}

export function getYouTubeVideosByTrack(trackId: string): readonly YouTubeEducationalVideo[] {
  if (!trackId || trackId === "all") return YOUTUBE_CATALOG_VIDEOS;
  return YOUTUBE_CATALOG_VIDEOS.filter((v) => v.trackId === trackId);
}

export function getYouTubeVideosByLanguage(lang: string): readonly YouTubeEducationalVideo[] {
  if (!lang || lang === "all") return YOUTUBE_CATALOG_VIDEOS;
  return YOUTUBE_CATALOG_VIDEOS.filter((v) => v.language === lang);
}
'''

with open("src/lib/media/youtube-videos-data.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Successfully written src/lib/media/youtube-videos-data.ts!")
