#!/usr/bin/env python3
"""
Manim Render Pipeline Script for AI Atlas Platform.
Executes Manim Community Edition rendering and copies artifacts to Next.js public directory.

Usage:
    python manim/scripts/render.py --all
    python manim/scripts/render.py --scene functions
    python manim/scripts/render.py --scene gradient_descent
    python manim/scripts/render.py --scene neural_network
"""

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
MANIM_DIR = PROJECT_ROOT / "manim"
SCENES_DIR = MANIM_DIR / "scenes"
OUTPUT_DIR = PROJECT_ROOT / "public" / "animations"
TEMP_MEDIA_DIR = PROJECT_ROOT / "manim_temp"

SCENE_CONFIG = {
    "functions": {
        "file": SCENES_DIR / "functions.py",
        "class": "FunctionsScene",
        "dest": OUTPUT_DIR / "functions" / "function_explorer.mp4",
    },
    "gradient_descent": {
        "file": SCENES_DIR / "gradient_descent.py",
        "class": "GradientDescentScene",
        "dest": OUTPUT_DIR / "gradient-descent" / "gradient_descent.mp4",
    },
    "neural_network": {
        "file": SCENES_DIR / "neural_network.py",
        "class": "NeuralNetworkScene",
        "dest": OUTPUT_DIR / "neural-network" / "neural_network.mp4",
    },
    "attention": {
        "file": SCENES_DIR / "attention.py",
        "class": "SelfAttentionScene",
        "dest": OUTPUT_DIR / "attention" / "self_attention.mp4",
    },
    "cosine_similarity": {
        "file": SCENES_DIR / "cosine_similarity.py",
        "class": "CosineSimilarityScene",
        "dest": OUTPUT_DIR / "vectors" / "cosine_similarity.mp4",
    },
}

def render_scene(key: str, quality: str = "l") -> bool:
    if key not in SCENE_CONFIG:
        print(f"❌ Noma'lum sahifa nomi: {key}. Mavjud sahifalar: {list(SCENE_CONFIG.keys())}")
        return False

    item = SCENE_CONFIG[key]
    scene_file = item["file"]
    scene_class = item["class"]
    dest_path = item["dest"]

    print(f"\n🎬 {scene_class} animatsiyasini render qilish boshlandi ({scene_file.name})...")

    dest_path.parent.mkdir(parents=True, exist_ok=True)
    TEMP_MEDIA_DIR.mkdir(parents=True, exist_ok=True)

    cmd = [
        sys.executable,
        "-m",
        "manim",
        f"-q{quality}",
        "--media_dir",
        str(TEMP_MEDIA_DIR),
        str(scene_file),
        scene_class,
    ]

    try:
        proc = subprocess.run(cmd, check=True)
        if proc.returncode != 0:
            print(f"❌ Manim render xatoligi: {proc.returncode}")
            return False

        # Find output mp4 in TEMP_MEDIA_DIR
        rendered_files = list(TEMP_MEDIA_DIR.glob(f"**/{scene_class}.mp4"))
        if not rendered_files:
            print(f"❌ Chiqish fayli topilmadi ({scene_class}.mp4)")
            return False

        source_mp4 = rendered_files[0]
        shutil.copy2(source_mp4, dest_path)
        size_kb = dest_path.stat().st_size / 1024
        print(f"✅ Tayyor: {dest_path.relative_to(PROJECT_ROOT)} ({size_kb:.1f} KB)")
        return True

    except Exception as e:
        print(f"❌ Xatolik yuz berdi: {e}")
        return False

def clean_temp():
    if TEMP_MEDIA_DIR.exists():
        shutil.rmtree(TEMP_MEDIA_DIR, ignore_errors=True)

def main():
    parser = argparse.ArgumentParser(description="AI Atlas Manim Animation Renderer")
    parser.add_argument("--all", action="store_true", help="Barcha sahifalarni render qilish")
    parser.add_argument("--scene", choices=list(SCENE_CONFIG.keys()), help="Muayyan sahifa nomi")
    parser.add_argument("--quality", choices=["l", "m", "h", "k"], default="l", help="Sifat: l=480p, m=720p, h=1080p, k=4K")
    parser.add_argument("--clean", action="store_true", help="Vaqtinchalik fayllarni tozalash")

    args = parser.parse_args()

    success = True
    if args.clean:
        clean_temp()
        print("🧹 Vaqtinchalik fayllar tozalandi.")
        return

    if args.all:
        for s in SCENE_CONFIG.keys():
            ok = render_scene(s, quality=args.quality)
            if not ok:
                success = False
    elif args.scene:
        success = render_scene(args.scene, quality=args.quality)
    else:
        parser.print_help()
        return

    clean_temp()

    if success:
        print("\n✨ Barcha belgilangan animatsiyalar muvaffaqiyatli render qilindi!")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
