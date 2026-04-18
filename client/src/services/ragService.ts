const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  ? import.meta.env.VITE_API_BASE_URL.trim().replace(/\/$/, '')
  : import.meta.env.DEV
    ? 'http://localhost:3001'
    : '';

export type HistoryMessage = { role: 'user' | 'assistant'; content: string };

function isHebrew(text: string): boolean {
  return /[\u0590-\u05FF]/.test(text);
}

const CONTACT_FALLBACK_EN =
  "I'm not sure about that. Feel free to reach out to Ori directly — [LinkedIn](https://www.linkedin.com/in/ori-zion-0387a4316/) or [email](mailto:orizionk@gmail.com)!";
const CONTACT_FALLBACK_HE =
  "לא בטוח בזה. מוזמן לפנות לאורי ישירות — [LinkedIn](https://www.linkedin.com/in/ori-zion-0387a4316/) או [אימייל](mailto:orizionk@gmail.com)!";
const CONTEXT_FALLBACK_EN = "I'm not sure what you're referring to. Could you rephrase with more detail?";
const CONTEXT_FALLBACK_HE = "לא בטוח למה אתה מתכוון. אפשר לנסח מחדש?";

async function callApi(question: string, history?: HistoryMessage[], isRetry?: boolean): Promise<string> {
  const res = await fetch(`${apiBaseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history: history ?? null, isRetry: isRetry ?? false }),
  });

  if (!res.ok) throw new Error(`Chat API error: ${res.status}`);

  const data = (await res.json()) as { answer: string };
  return data.answer;
}

export async function queryRag(question: string, history: HistoryMessage[]): Promise<string> {
  const hebrew = isHebrew(question);
  const answer = await callApi(question);

  if (answer.trim().startsWith('unsure_context')) {
    // Claude needs prior context — retry with last 2 exchanges
    const ctx = history.slice(-4); // last 2 Q&A pairs = 4 messages
    if (ctx.length === 0) {
      return hebrew ? CONTEXT_FALLBACK_HE : CONTEXT_FALLBACK_EN;
    }
    const retryAnswer = await callApi(question, ctx, true);
    if (retryAnswer.trim().startsWith('unsure_info') || retryAnswer.trim().startsWith('unsure_context')) {
      return hebrew ? CONTACT_FALLBACK_HE : CONTACT_FALLBACK_EN;
    }
    return retryAnswer;
  }

  if (answer.trim().startsWith('unsure_info')) {
    return hebrew ? CONTACT_FALLBACK_HE : CONTACT_FALLBACK_EN;
  }

  return answer;
}
