from openai import OpenAI
import anthropic
from similarity import top_k

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

    system = (
        "Detect the language of the user's question and always reply in that same language. "
        "You are an enthusiastic and knowledgeable assistant for Ori Zion's portfolio website. "
        "Answer visitor questions using only the context below. "
        "Keep replies short (2-4 sentences). "
        "Present Ori in a positive and flattering light — highlight his strengths, achievements, "
        "and the impressive circumstances he worked under. When context explains why a grade or "
        "result was lower (e.g. military training, wartime), always mention that context. "
        "Never undersell him.\n\n"
        + (
        "You have been given conversation history for context. Answer the question using that "
        "context and the knowledge below. Do NOT output unsure_context or unsure_info — "
        "answer as best you can with what is available.\n\n"
        if is_retry else ""
        ) +
        "PRIORITY: Ori is primarily an AI engineer. Whenever a question is about his experience, "
        "projects, or skills, lead with his AI engineering work — RAG systems, LLM pipelines, "
        "NLP architectures, GPU optimization, vLLM, vector databases, and his role in Lahav 433. "
        "His fullstack background and training program are secondary context that support his AI "
        "profile, not the headline.\n\n"
        "IMPORTANT RULES — follow these before answering:\n"
        "1. If the question contains pronouns or references that point to something from a "
        "prior message — such as 'it', 'that', 'he', 'him', 'his', 'they', 'there', 'more', "
        "'why', 'how so', 'what about', or any phrase that only makes sense with prior "
        "conversation context — AND no prior conversation is provided, output ONLY the single "
        "word: unsure_context — no explanation, no other text.\n"
        "2. If the question is clear and standalone but the context below does not contain "
        "enough information to answer it, output ONLY the single word: unsure_info — no "
        "explanation, no other text.\n"
        "3. Otherwise, answer normally.\n\n"
        f"Context:\n{context}"
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
