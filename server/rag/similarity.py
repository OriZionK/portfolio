import json
import math
from pathlib import Path

import numpy as np

EMBEDDINGS_FILE = Path(__file__).parent.parent / "data" / "embeddings.json"


def dot(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.sum(a * b))


def magnitude(a: np.ndarray) -> float:
    return float(math.sqrt(np.sum(a * a)))


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    mag = magnitude(a) * magnitude(b)
    if mag == 0:
        return 0.0
    return dot(a, b) / mag


def top_k(query_vector: list[float], k: int = 3) -> list[dict]:
    """Return the top-k chunks as dicts with 'text' and 'source' fields."""
    chunks = json.loads(EMBEDDINGS_FILE.read_text(encoding="utf-8"))

    q = np.array(query_vector, dtype=float)

    scored = [
        (cosine_similarity(q, np.array(chunk["vector"], dtype=float)), chunk)
        for chunk in chunks
    ]

    scored.sort(key=lambda x: x[0], reverse=True)

    return [
        {"text": chunk["text"], "source": chunk.get("source"), "score": score}
        for score, chunk in scored[:k]
    ]
