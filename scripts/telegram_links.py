#!/usr/bin/env python3
"""Map each sivochka.com blog post to its post in the Telegram channel @sivochka_ua.

Reads the public channel page t.me/s/sivochka_ua (paging back with ?before=), finds
the channel posts that link to https://sivochka.com/[<lang>/]blog/<slug>/ and writes
_data/telegram_posts.json as {"<slug>": <message id>}. The post layout uses it to link
"discuss this post" to the exact channel post. A later post for the same slug (a
repost) wins. Scraped ids are merged into the existing file, and an empty scrape
never wipes it, so a t.me outage only delays new links.

Usage: python3 scripts/telegram_links.py
"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path

CHANNEL = "sivochka_ua"
OUT = Path(__file__).resolve().parent.parent / "_data" / "telegram_posts.json"
POST_RE = re.compile(r'data-post="' + CHANNEL + r'/(\d+)"')
LINK_RE = re.compile(r'href="https://sivochka\.com/(?:[a-z]{2}/)?blog/([a-z0-9][a-z0-9-]*)/')
MAX_PAGES = 50


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "sivochka-telegram-links/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", "replace")


def scrape() -> dict[str, int]:
    found: dict[str, int] = {}
    before = None
    for _ in range(MAX_PAGES):
        url = f"https://t.me/s/{CHANNEL}" + (f"?before={before}" if before else "")
        page = fetch(url)
        marks = [(m.start(), int(m.group(1))) for m in POST_RE.finditer(page)]
        if not marks:
            break
        for i, (start, msg_id) in enumerate(marks):
            end = marks[i + 1][0] if i + 1 < len(marks) else len(page)
            for slug in set(LINK_RE.findall(page[start:end])):
                found[slug] = max(found.get(slug, 0), msg_id)
        lowest = min(msg_id for _, msg_id in marks)
        if lowest <= 1 or lowest == before:
            break
        before = lowest
    return found


def main() -> int:
    try:
        scraped = scrape()
    except Exception as exc:
        print(f"WARN: cannot read the channel: {exc}; keeping {OUT.name} as is.", file=sys.stderr)
        return 0
    if not scraped:
        print(f"WARN: no blog links found in the channel; keeping {OUT.name} as is.", file=sys.stderr)
        return 0
    current = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    merged = {**current, **scraped}
    text = json.dumps(dict(sorted(merged.items())), ensure_ascii=False, indent=2) + "\n"
    if OUT.exists() and OUT.read_text(encoding="utf-8") == text:
        print(f"{len(merged)} posts linked, no change.")
        return 0
    OUT.write_text(text, encoding="utf-8")
    print(f"{len(merged)} posts linked: {merged}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
