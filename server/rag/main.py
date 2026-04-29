"""
Single backend service — FastAPI serving the RAG chatbot.

Endpoints:
  POST /api/chat   { "question": "...", "history": [...], "isRetry": false }
                →  { "answer": "...", "sources": [...] }

Start locally:
    uvicorn main:app --port 8000 --reload

Deploy on Render:
    uvicorn main:app --host 0.0.0.0 --port $PORT
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

from rag import answer_question  # noqa: E402

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class HistoryMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str
    history: list[HistoryMessage] | None = None
    is_retry: bool = Field(default=False, alias="isRetry")

    class Config:
        populate_by_name = True


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="question is required")

    history = [m.model_dump() for m in req.history] if req.history else None
    result = await answer_question(req.question.strip(), history=history, is_retry=req.is_retry)

    return ChatResponse(answer=result["answer"], sources=result["sources"])
