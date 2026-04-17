"""
Incremental embed script: reads knowledge.txt, embeds only new or changed
chunks (detected via SHA-256 hash), and saves the result to data/embeddings.json.

Run from server/rag/:
    python scripts/embed.py
"""

import hashlib
import json
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(Path(__file__).parent.parent / ".env")

DATA_DIR       = Path(__file__).parent.parent.parent / "data"
KNOWLEDGE_FILE = DATA_DIR / "knowledge.txt"
OUTPUT_FILE    = DATA_DIR / "embeddings.json"
EMBED_MODEL    = "text-embedding-3-small"

client = OpenAI()


def hash_chunk(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def load_chunks(path: Path) -> list[str]:
    """Split knowledge.txt on --- separators, drop empty chunks."""
    raw = path.read_text(encoding="utf-8")
    chunks = [c.strip() for c in raw.split("---")]
    return [c for c in chunks if c]


def load_existing(path: Path) -> dict[str, dict]:
    """Load existing embeddings keyed by hash. Returns {} if file missing."""
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    return {entry["hash"]: entry for entry in data if "hash" in entry}


def embed_texts(texts: list[str]) -> list[list[float]]:
    """Embed a batch of texts and return their vectors."""
    response = client.embeddings.create(model=EMBED_MODEL, input=texts)
    return [item.embedding for item in response.data]


def main():
    print(f"Reading  → {KNOWLEDGE_FILE}")
    chunks = load_chunks(KNOWLEDGE_FILE)

    existing = load_existing(OUTPUT_FILE)
    print(f"Existing embeddings: {len(existing)}")

    # Split chunks into cached vs. needs embedding
    to_embed: list[tuple[int, str, str]] = []   # (original_index, text, hash)
    results: list[dict] = [None] * len(chunks)  # type: ignore[list-item]

    for i, text in enumerate(chunks):
        h = hash_chunk(text)
        if h in existing:
            results[i] = existing[h]
        else:
            to_embed.append((i, text, h))

    if to_embed:
        print(f"Embedding {len(to_embed)} new/changed chunk(s)...")
        texts = [t for _, t, _ in to_embed]
        vectors = embed_texts(texts)
        for (i, text, h), vector in zip(to_embed, vectors):
            results[i] = {"hash": h, "text": text, "vector": vector}
            print(f"  embedded chunk {i + 1}")
    else:
        print("All chunks up to date — nothing to embed.")

    skipped = len(chunks) - len(to_embed)
    removed = len(existing) - skipped
    if removed > 0:
        print(f"Removed {removed} deleted chunk(s).")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"Saved {len(results)} embeddings → {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
