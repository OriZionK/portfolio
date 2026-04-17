import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChatColumn } from './components/ChatColumn';
import { MobileShell } from './components/MobileShell';
import { ProfileColumn } from './components/ProfileColumn';
import { RecordsColumn } from './components/RecordsColumn';

function App() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const expandedPopup = expandedImage ? createPortal(
    <div
      className="credential-image-expanded-backdrop"
      role="presentation"
      onClick={() => setExpandedImage(null)}
    >
      <div
        className="credential-image-expanded-container"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="credential-image-expanded-close"
          onClick={() => setExpandedImage(null)}
          aria-label="Close expanded image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <img src={expandedImage} alt="Expanded view" />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div className="app-shell">
        <div className="desktop-shell">
          <main className="app-grid">
            <ProfileColumn />
            <ChatColumn />
            <RecordsColumn onImageExpand={setExpandedImage} />
          </main>
        </div>
        <MobileShell />
      </div>
      {expandedPopup}
    </>
  );
}

export default App;
