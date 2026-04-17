const RAG_URL = process.env.RAG_URL ?? 'http://localhost:8000';

type HistoryMessage = { role: string; content: string };

export async function queryRag(
  question: string,
  history?: HistoryMessage[],
  isRetry?: boolean,
): Promise<{ answer: string; retrievedContext: string }> {
  const res = await fetch(`${RAG_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history: history ?? null, is_retry: isRetry ?? false }),
  });

  if (!res.ok) throw new Error(`RAG service error: ${res.status}`);

  const data = (await res.json()) as { answer: string; chunks: string[] };
  return { answer: data.answer, retrievedContext: data.chunks.join('\n\n') };
}
