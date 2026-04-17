"""
FastAPI RAG service.

Endpoints:
  POST /query   { "question": "..." }  →  { "answer": "...", "chunks": [...] }

Start:
    uvicorn main:app --port 8000 --reload
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# These modules are written by you (Missions 2-4)
from similarity import top_k
from rag import answer_question

app = FastAPI()


class HistoryMessage(BaseModel):
    role: str
    content: str


class QueryRequest(BaseModel):
    question: str
    history: list[HistoryMessage] | None = None
    is_retry: bool = False


class QueryResponse(BaseModel):
    answer: str
    chunks: list[str]


@app.post("/query", response_model=QueryResponse)
async def query(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="question is required")
    history = [m.model_dump() for m in req.history] if req.history else None
    result = await answer_question(req.question.strip(), history=history, is_retry=req.is_retry)
    return result
