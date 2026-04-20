import { useEffect, useRef, useState, type ReactNode } from 'react';
import { portfolioData, type ChatMessage } from '../data/portfolio';
import { queryRag, type HistoryMessage } from '../services/ragService';

function ChevronDownIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" aria-hidden>
      <path
        d="M2 3.5L5.5 7L9 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageSources({ sourceIds }: { sourceIds: string[] }) {
  const [open, setOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const credentials = portfolioData.credentials.filter((c) => sourceIds.includes(c.id));
  if (credentials.length === 0) return null;

  const imageAssets = credentials.flatMap((c) =>
    c.assets.filter((a) => a.kind === 'image').map((a) => ({ ...a, credChip: c.chip, credTitle: c.shortTitle })),
  );

  return (
    <div className="msg-sources">
      <button
        type="button"
        className={`msg-sources-toggle${open ? ' msg-sources-toggle--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>Sources</span>
        <ChevronDownIcon />
      </button>

      {open && (
        <div className="msg-sources-body">
          {credentials.map((cred) => (
            <div key={cred.id} className="msg-source-group">
              <p className="msg-source-group-label">{cred.chip} · {cred.shortTitle}</p>
              <div className="msg-source-thumbs">
                {cred.assets.map((asset) =>
                  asset.kind === 'pdf' ? (
                    <a
                      key={asset.id}
                      href={asset.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="msg-source-thumb"
                      aria-label={`Open ${asset.label}`}
                    >
                      {cred.coverImageSrc ? (
                        <img src={cred.coverImageSrc} alt={asset.label} loading="lazy" />
                      ) : (
                        <div className="msg-source-pdf-icon">PDF</div>
                      )}
                    </a>
                  ) : (
                    <button
                      key={asset.id}
                      type="button"
                      className="msg-source-thumb"
                      onClick={() => setLightboxSrc(asset.src)}
                      aria-label={`View ${asset.label}`}
                    >
                      <img src={asset.src} alt={asset.label} loading="lazy" />
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {lightboxSrc && (
        <div
          className="msg-lightbox"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal
          aria-label="Document preview"
        >
          <img
            src={lightboxSrc}
            alt=""
            className="msg-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="msg-lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close preview"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M2 7.5H13M13 7.5L8.5 3M13 7.5L8.5 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="send-spinner" aria-hidden>
      <circle
        cx="7.5"
        cy="7.5"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeDasharray="26"
        strokeDashoffset="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExperienceRailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19.5h14M7.5 16V8.5M12 16V4.5M16.5 16v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RecordsRailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7.5 4.5h9A1.5 1.5 0 0 1 18 6v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18V6a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ContactRailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4.5 7.5A3 3 0 0 1 7.5 4.5h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m7.5 9 4.5 3.75L16.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type EyeOffset = {
  x: number;
  y: number;
};

function BotFaceIcon({
  eyeOffset,
  blink,
  size = 18,
}: {
  eyeOffset: EyeOffset;
  blink: boolean;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.45" stroke="currentColor" strokeWidth="1.95" />
      {blink ? (
        <>
          <line
            x1={3.8 + eyeOffset.x}
            y1={7.35 + eyeOffset.y}
            x2={7.6 + eyeOffset.x}
            y2={7.35 + eyeOffset.y}
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
          <line
            x1={10.4 + eyeOffset.x}
            y1={7.35 + eyeOffset.y}
            x2={14.2 + eyeOffset.x}
            y2={7.35 + eyeOffset.y}
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx={5.5 + eyeOffset.x} cy={7.35 + eyeOffset.y} r="2.05" fill="currentColor" />
          <circle cx={12.5 + eyeOffset.x} cy={7.35 + eyeOffset.y} r="2.05" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

type Status = 'online' | 'thinking' | 'streaming';

type Message = ChatMessage & {
  timestamp: Date;
  animDelay: number;
  sources?: string[];
};

const STREAM_MS = 13;

function fmtTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function renderInlineText(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <bdi key={`text-${lastIndex}`}>
          {text.slice(lastIndex, match.index)}
        </bdi>,
      );
    }

    if (match[1] !== undefined) {
      parts.push(
        <strong key={`bold-${match.index}`}>
          <bdi>{match[1]}</bdi>
        </strong>,
      );
    } else {
      parts.push(
        <a
          key={`link-${match.index}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {match[2]}
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <bdi key={`text-${lastIndex}`}>
        {text.slice(lastIndex)}
      </bdi>,
    );
  }

  return parts;
}

function renderRichText(text: string, cursor: boolean) {
  const lines = text.split('\n');

  return lines.map((line, index) => (
    <span key={`line-${index}`} className="rich-text-line" dir="auto">
      {renderInlineText(line)}
      {index === lines.length - 1 && cursor && <span className="stream-cursor" aria-hidden />}
    </span>
  ));
}

function buildInitialMessages(messages: ChatMessage[]) {
  return messages.map((message, index) => ({
    ...message,
    timestamp: new Date(),
    animDelay: index * 80,
  }));
}

export function ChatExperience({
  rootClassName = '',
  inputId = 'chat-input',
}: {
  rootClassName?: string;
  inputId?: string;
}) {
  const [blink, setBlink] = useState(false);
  const [eyeOffset, setEyeOffset] = useState<EyeOffset>({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>(buildInitialMessages(portfolioData.chatMessages));
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('online');
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<number | null>(null);
  const [isConversationStarting, setIsConversationStarting] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);
  const historyRef = useRef<HistoryMessage[]>([]);
  const streamRef = useRef<{ fullText: string; msgId: number; idx: number } | null>(null);
  const blinkTimeoutRef = useRef<number | null>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  const introTimeoutRef = useRef<number | null>(null);
  const streamScrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages.length]);

  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    textarea.style.height = '0px';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [input]);

  useEffect(() => {
    const maxOffset = 1.35;
    const mobileLookTargets: EyeOffset[] = [
      { x: -1.1, y: -0.18 },
      { x: 1.05, y: -0.12 },
      { x: 0.62, y: 0.34 },
      { x: -0.7, y: 0.28 },
      { x: 0, y: 0 },
    ];
    const pointerMode = window.matchMedia('(pointer: coarse), (hover: none)');
    let randomLookTimeout: number | null = null;
    let lastTargetIndex = -1;

    function scheduleRandomLook() {
      if (!pointerMode.matches) {
        return;
      }

      let nextIndex = Math.floor(Math.random() * mobileLookTargets.length);
      if (mobileLookTargets.length > 1) {
        while (nextIndex === lastTargetIndex) {
          nextIndex = Math.floor(Math.random() * mobileLookTargets.length);
        }
      }

      lastTargetIndex = nextIndex;
      const target = mobileLookTargets[nextIndex];

      setEyeOffset({
        x: target.x * maxOffset,
        y: target.y * maxOffset,
      });

      randomLookTimeout = window.setTimeout(
        scheduleRandomLook,
        1400 + Math.floor(Math.random() * 2200),
      );
    }

    function clearRandomLook() {
      if (randomLookTimeout) {
        window.clearTimeout(randomLookTimeout);
        randomLookTimeout = null;
      }
    }

    function handlePointerMove(event: MouseEvent) {
      if (pointerMode.matches) {
        return;
      }

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (event.clientX - centerX) / centerX;
      const dy = (event.clientY - centerY) / centerY;

      setEyeOffset({
        x: Math.max(-1, Math.min(1, dx)) * maxOffset,
        y: Math.max(-1, Math.min(1, dy)) * maxOffset,
      });
    }

    function resetEyes() {
      if (pointerMode.matches) {
        return;
      }

      setEyeOffset({ x: 0, y: 0 });
    }

    function handlePointerModeChange() {
      clearRandomLook();

      if (pointerMode.matches) {
        scheduleRandomLook();
        return;
      }

      setEyeOffset({ x: 0, y: 0 });
    }

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', resetEyes);
    handlePointerModeChange();

    if (typeof pointerMode.addEventListener === 'function') {
      pointerMode.addEventListener('change', handlePointerModeChange);
    } else {
      pointerMode.addListener(handlePointerModeChange);
    }

    return () => {
      clearRandomLook();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', resetEyes);

      if (typeof pointerMode.removeEventListener === 'function') {
        pointerMode.removeEventListener('change', handlePointerModeChange);
      } else {
        pointerMode.removeListener(handlePointerModeChange);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBlink(true);
      blinkTimeoutRef.current = window.setTimeout(() => setBlink(false), 180);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      if (blinkTimeoutRef.current) {
        window.clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (introTimeoutRef.current) {
        window.clearTimeout(introTimeoutRef.current);
      }
      if (streamScrollFrameRef.current) {
        window.cancelAnimationFrame(streamScrollFrameRef.current);
      }
    };
  }, []);

  function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior });
  }

  function followStreamingMessage() {
    if (streamScrollFrameRef.current) {
      window.cancelAnimationFrame(streamScrollFrameRef.current);
    }

    streamScrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollToBottom('auto');
      streamScrollFrameRef.current = null;
    });
  }

  function handleListScroll() {
    const element = listRef.current;
    if (!element) return;
    setShowScrollBtn(element.scrollHeight - element.scrollTop - element.clientHeight > 80);
  }

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(event.target.value);
  }

  function tickStream() {
    const stream = streamRef.current;
    if (!stream) return;

    stream.idx += 1;
    const nextCharacter = stream.fullText[stream.idx - 1];

    setMessages((prev) =>
      prev.map((message) =>
        message.id === stream.msgId ? { ...message, text: message.text + nextCharacter } : message,
      ),
    );
    followStreamingMessage();

    if (stream.idx < stream.fullText.length) {
      window.setTimeout(tickStream, STREAM_MS);
      return;
    }

    streamRef.current = null;
    setStatus('online');
    inputRef.current?.focus();
  }

  async function handleSend(text: string = input) {
    const trimmed = text.trim();
    if (!trimmed || status !== 'online') return;
    const isFirstMessage = messages.length === 0;

    if (isFirstMessage) {
      setIsConversationStarting(true);
      if (introTimeoutRef.current) {
        window.clearTimeout(introTimeoutRef.current);
      }
      introTimeoutRef.current = window.setTimeout(() => {
        setIsConversationStarting(false);
      }, 520);
    }

    const userMsg: Message = {
      id: nextId.current++,
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
      animDelay: 0,
    };

    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom('smooth');
    setInput('');
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    setStatus('thinking');

    try {
      const { answer, sources } = await queryRag(trimmed, historyRef.current);
      historyRef.current = ([
        ...historyRef.current,
        { role: 'user', content: trimmed },
        { role: 'assistant', content: answer },
      ] satisfies HistoryMessage[]).slice(-4); // keep last 2 exchanges
      const assistantId = nextId.current++;
      const assistantMsg: Message = {
        id: assistantId,
        sender: 'assistant',
        text: '',
        sources,
        timestamp: new Date(),
        animDelay: 0,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      scrollToBottom('smooth');
      setStatus('streaming');
      streamRef.current = { fullText: answer, msgId: assistantId, idx: 0 };
      window.setTimeout(tickStream, STREAM_MS);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          sender: 'assistant',
          text: 'Something went wrong. Please try again.',
          timestamp: new Date(),
          animDelay: 0,
        },
      ]);
      setStatus('online');
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSend();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && canSend) {
      event.preventDefault();
      void handleSend();
    }
  }

  async function handleCopy(message: Message) {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopiedMsgId(message.id);

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedMsgId(null);
      }, 1800);
    } catch {
      setCopiedMsgId(null);
    }
  }

  const isDisabled = status !== 'online';
  const canSend = !isDisabled && input.trim().length > 0;
  const hasMessages = messages.length > 0;
  const lastMsgId = messages[messages.length - 1]?.id;
  const showEmptyState = (!hasMessages && status === 'online') || isConversationStarting;

  return (
    <section className={`chat-shell chatbot-only ${rootClassName}`.trim()}>
      <div className={`chat-stage${isConversationStarting ? ' chat-stage--starting' : ''}`}>
        <div className="message-list" ref={listRef} onScroll={handleListScroll}>
          {showEmptyState ? (
                <div className={`chat-empty${isConversationStarting ? ' chat-empty--exit' : ''}`}>
                  <div className="chat-empty-badge" aria-hidden>
                    <BotFaceIcon eyeOffset={eyeOffset} blink={blink} size={36} />
                  </div>
              <h2 className="chat-empty-title">Ask anything about {portfolioData.name.split(' ')[0]}</h2>
              <p className="chat-empty-copy">
                Questions about coursework, grades, profile, and current focus areas.
              </p>
              <div className="starter-grid" role="list" aria-label="Suggested questions">
                {portfolioData.promptSuggestions.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="starter-button"
                    onClick={() => void handleSend(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <article
                  key={message.id}
                  className={`message-row message-row--${message.sender}${
                    isConversationStarting && message.id === messages[0]?.id
                      ? ' message-row--intro'
                      : ''
                  }`}
                  style={{ animationDelay: `${message.animDelay}ms` }}
                >
                  {message.sender === 'assistant' && (
                    <div
                      className="message-avatar-badge message-avatar-badge--assistant"
                      aria-hidden
                    >
                      <BotFaceIcon eyeOffset={eyeOffset} blink={blink} />
                    </div>
                  )}

                  <div className={`message-stack message-stack--${message.sender}`}>
                    {message.sender === 'assistant' ? (
                      <div className="assistant-response">
                        {renderRichText(
                          message.text,
                          status === 'streaming' && message.id === lastMsgId,
                        )}
                      </div>
                    ) : (
                      <div className="message-bubble user-bubble">
                        <p dir="auto">{message.text}</p>
                      </div>
                    )}

                    {message.sender === 'assistant' && message.sources && message.sources.length > 0 && (
                      <MessageSources sourceIds={message.sources} />
                    )}

                    <div className={`message-toolbar message-toolbar--${message.sender}`}>
                      <time className="msg-time">{fmtTime(message.timestamp)}</time>
                      {message.sender === 'assistant' ? (
                        <button
                          type="button"
                          className="message-action"
                          onClick={() => void handleCopy(message)}
                        >
                          {copiedMsgId === message.id ? 'Copied' : 'Copy'}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}

              {status === 'thinking' && (
                <article className="message-row message-row--assistant">
                  <div className="message-avatar-badge message-avatar-badge--assistant" aria-hidden>
                    <BotFaceIcon eyeOffset={eyeOffset} blink={blink} />
                  </div>
                  <div className="message-stack message-stack--assistant">
                    <div className="assistant-response typing-response">
                      <div className="typing-indicator">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </div>
                </article>
              )}
            </>
          )}
        </div>

        {showScrollBtn && hasMessages && (
          <button
            type="button"
            className="scroll-fab"
            onClick={() => scrollToBottom()}
            aria-label="Scroll to latest message"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path
                d="M2 4.5L6.5 9L11 4.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="composer">
        <form className="composer-form" onSubmit={handleSubmit}>
          <div className="composer-input-wrap">
            <textarea
              ref={inputRef}
              id={inputId}
              name={inputId}
              className="composer-textarea"
              placeholder="Ask anything about Ori..."
              value={input}
              dir="auto"
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              autoComplete="off"
            />
            <button
              type="submit"
              className={`composer-send${canSend ? ' composer-send--ready' : ''}${
                isDisabled ? ' composer-send--busy' : ''
              }`}
              disabled={!canSend}
              aria-label="Send message"
            >
              {isDisabled ? <SpinnerIcon /> : <SendIcon />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function DesktopChatRail({
  onOpenExperience,
  onOpenCertificates,
  onOpenContact,
}: {
  onOpenExperience: () => void;
  onOpenCertificates: () => void;
  onOpenContact: () => void;
}) {
  const actions = [
    {
      id: 'experience',
      label: 'Experience',
      tone: 'is-experience',
      icon: <ExperienceRailIcon />,
      onClick: onOpenExperience,
    },
    {
      id: 'records',
      label: 'Certificates & more',
      tone: 'is-records',
      icon: <RecordsRailIcon />,
      onClick: onOpenCertificates,
    },
    {
      id: 'contact',
      label: 'Contact',
      tone: 'is-contact',
      icon: <ContactRailIcon />,
      onClick: onOpenContact,
    },
  ] as const;

  return (
    <nav className="chat-action-rail" aria-label="Chat quick actions">
      <ul className="chat-action-list">
        {actions.map((action) => (
          <li key={action.id} className={`chat-action-item ${action.tone}`}>
            <button type="button" className="chat-action-button" onClick={action.onClick}>
              <span className="chat-action-icon">{action.icon}</span>
              <span className="chat-action-label">{action.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ChatColumn({
  onOpenExperience,
  onOpenCertificates,
  onOpenContact,
}: {
  onOpenExperience: () => void;
  onOpenCertificates: () => void;
  onOpenContact: () => void;
}) {
  return (
    <section className="panel panel-center" id="assistant">
      <div className="panel-inner chat-only-layout">
        <DesktopChatRail
          onOpenExperience={onOpenExperience}
          onOpenCertificates={onOpenCertificates}
          onOpenContact={onOpenContact}
        />
        <ChatExperience />
      </div>
    </section>
  );
}
