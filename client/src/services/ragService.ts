const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  ? import.meta.env.VITE_API_BASE_URL.trim().replace(/\/$/, '')
  : import.meta.env.DEV
    ? 'http://localhost:8000'
    : '';

export type HistoryMessage = { role: 'user' | 'assistant'; content: string };

export type RagResult = { answer: string; sources: string[] };

function isHebrew(text: string): boolean {
  return /[\u0590-\u05FF]/.test(text);
}

const CONTACT_FALLBACK_EN =
  "I'm not sure about that. Feel free to reach out to Ori directly — [LinkedIn](https://www.linkedin.com/in/ori-zion-0387a4316/) or [email](mailto:orizionk@gmail.com)!";
const CONTACT_FALLBACK_HE =
  "לא בטוח בזה. מוזמן לפנות לאורי ישירות — [LinkedIn](https://www.linkedin.com/in/ori-zion-0387a4316/) או [אימייל](mailto:orizionk@gmail.com)!";
const CONTEXT_FALLBACK_EN = "I'm not sure what you're referring to. Could you rephrase with more detail?";
const CONTEXT_FALLBACK_HE = "לא בטוח למה אתה מתכוון. אפשר לנסח מחדש?";
const OFF_TOPIC_EN = "I'm Ori's portfolio assistant — I can only answer questions about him! Try asking about his AI engineering work, background, skills, or experience.";
const OFF_TOPIC_HE = "אני העוזר של תיק העבודות של אורי — אני יכול לענות רק על שאלות לגביו! נסה לשאול על עבודת ה-AI שלו, הרקע שלו, כישורים, או ניסיון.";

async function callApi(question: string, history?: HistoryMessage[], isRetry?: boolean): Promise<RagResult> {
  const res = await fetch(`${apiBaseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history: history ?? null, isRetry: isRetry ?? false }),
  });

  if (!res.ok) throw new Error(`Chat API error: ${res.status}`);

  const data = (await res.json()) as { answer: string; sources?: string[] };
  return { answer: data.answer, sources: data.sources ?? [] };
}

export async function queryRag(question: string, history: HistoryMessage[]): Promise<RagResult> {
  const hebrew = isHebrew(question);
  const result = await callApi(question);

  if (result.answer.trim().startsWith('off_topic')) {
    return { answer: hebrew ? OFF_TOPIC_HE : OFF_TOPIC_EN, sources: [] };
  }

  if (result.answer.trim().startsWith('unsure_context')) {
    const ctx = history.slice(-4);
    if (ctx.length === 0) {
      return { answer: hebrew ? CONTEXT_FALLBACK_HE : CONTEXT_FALLBACK_EN, sources: [] };
    }
    const retry = await callApi(question, ctx, true);
    if (retry.answer.trim().startsWith('unsure_info') || retry.answer.trim().startsWith('unsure_context')) {
      return { answer: hebrew ? CONTACT_FALLBACK_HE : CONTACT_FALLBACK_EN, sources: [] };
    }
    return retry;
  }

  if (result.answer.trim().startsWith('unsure_info')) {
    return { answer: hebrew ? CONTACT_FALLBACK_HE : CONTACT_FALLBACK_EN, sources: [] };
  }

  return result;
}
