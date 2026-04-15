import { portfolioData } from '../data/portfolio';

export function ChatColumn() {
  return (
    <section className="panel panel-center" id="assistant">
      <div className="panel-inner chat-only-layout">
        <section className="chat-shell chatbot-only">
          <div className="chat-shell-header">
            <div>
              <p className="card-label">AI assistant</p>
              <h3>Chatbot</h3>
            </div>
            <div className="assistant-status">
              <span className="status-dot" />
              Starter prompts
            </div>
          </div>

          <div className="message-list">
            {portfolioData.chatMessages.map((message) => (
              <article key={message.id} className="message-bubble assistant-bubble">
                <span className="message-role">Assistant</span>
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          <div className="prompt-strip">
            {portfolioData.promptSuggestions.map((prompt) => (
              <button key={prompt} type="button" className="outline-pill prompt-pill">
                {prompt}
              </button>
            ))}
          </div>

          <div className="composer">
            <label className="composer-label" htmlFor="chat-input">
              Ask the chatbot
            </label>
            <div className="composer-row">
              <input
                id="chat-input"
                type="text"
                placeholder="Chat integration comes next"
                disabled
              />
              <button type="button" className="solid-button" disabled>
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
