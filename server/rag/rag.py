from datetime import date
from pathlib import Path
from openai import OpenAI
import anthropic
from similarity import top_k

PROMPT_FILE = Path(__file__).parent / "prompt.txt"

openai_client = OpenAI()
anthropic_client = anthropic.Anthropic()

EMBED_MODEL        = "text-embedding-3-small"
CHAT_MODEL_CLAUDE  = "claude-haiku-4-5-20251001"
CHAT_MODEL_OPENAI  = "gpt-4o-mini"


def is_hebrew(text: str) -> bool:
    return any('\u0590' <= c <= '\u05FF' for c in text)


def translate_to_english(text: str) -> str:
    response = openai_client.chat.completions.create(
        model=CHAT_MODEL_OPENAI,
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"Translate this to English. Output only the translation, nothing else:\n{text}"
        }],
    )
    return response.choices[0].message.content.strip()


def embed_question(question: str) -> list[float]:
    query = translate_to_english(question) if is_hebrew(question) else question
    response = openai_client.embeddings.create(model=EMBED_MODEL, input=[query])
    return response.data[0].embedding


async def answer_question(question: str, history: list[dict] | None = None, is_retry: bool = False) -> dict:
    vector = embed_question(question)
    chunks = top_k(vector, k=3)
    context = "\n\n".join(chunks)

    messages = (history or []) + [{"role": "user", "content": question}]

    retry_note = (
        "You have been given conversation history for context. Answer the question using that "
        "context and the knowledge below. Do NOT output unsure_context or unsure_info — "
        "answer as best you can with what is available.\n\n"
        if is_retry else ""
    )

    system = (
        PROMPT_FILE.read_text(encoding="utf-8")
        .replace("{{date}}", date.today().strftime("%B %d, %Y"))
        .replace("{{retry_note}}", retry_note)
        .replace("{{context}}", context)
    )

    if is_hebrew(question):
        response = openai_client.chat.completions.create(
            model=CHAT_MODEL_OPENAI,
            max_tokens=512,
            messages=[{"role": "system", "content": system}] + messages,
        )
        answer = response.choices[0].message.content
    else:
        response = anthropic_client.messages.create(
            model=CHAT_MODEL_CLAUDE,
            max_tokens=512,
            system=system,
            messages=messages,
        )
        answer = response.content[0].text

    return {
        "answer": answer,
        "chunks": chunks,
    }
