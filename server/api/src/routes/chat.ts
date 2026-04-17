import { Router, Request, Response } from 'express';
import { queryRag } from '../services/rag.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { question, history, isRetry } = req.body as {
    question?: string;
    history?: { role: string; content: string }[];
    isRetry?: boolean;
  };

  if (!question || typeof question !== 'string' || !question.trim()) {
    res.status(400).json({ error: 'question is required' });
    return;
  }

  try {
    const result = await queryRag(question.trim(), history, isRetry);
    res.json(result);
  } catch (err) {
    console.error('[chat] RAG error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
