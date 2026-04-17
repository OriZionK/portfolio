import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { portfolioData } from '../data/portfolio';
import { ExperienceSectionContent } from './ExperienceSection';

const MODAL_ANIMATION_MS = 340;
const DESKTOP_RECORD_VIEWS = [
  { id: 'experience', label: 'Experience' },
  { id: 'records', label: 'Certificates & Records' },
] as const;

type DesktopRecordView = (typeof DESKTOP_RECORD_VIEWS)[number]['id'];

type Props = {
  onImageExpand?: (src: string) => void;
};

export function RecordsSectionContent({ onImageExpand }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [isModalReady, setIsModalReady] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalFromTransform, setModalFromTransform] = useState('translate(0px, 0px) scale(1, 1) rotate(0deg)');
  const selectedCredential = portfolioData.credentials.find((credential) => credential.id === selectedId);
  const activeAsset = selectedCredential?.assets[activeAssetIndex] ?? selectedCredential?.assets[0] ?? null;
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const modalRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  function closeModal() {
    if (!selectedCredential) {
      return;
    }

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    setIsModalReady(false);
    setIsClosing(true);

    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedId(null);
      setOriginRect(null);
      setIsClosing(false);
      setModalFromTransform('translate(0px, 0px) scale(1, 1) rotate(0deg)');
      closeTimeoutRef.current = null;
    }, MODAL_ANIMATION_MS);
  }

  function clearCloseTimeout() {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function openModal(credentialId: string) {
    clearCloseTimeout();
    setIsClosing(false);

    const sourceRect = cardRefs.current[credentialId]?.getBoundingClientRect() ?? null;
    setOriginRect(sourceRect);
    setSelectedId(credentialId);
    setActiveAssetIndex(0);
    setIsModalReady(false);
  }

  useEffect(() => {
    if (!selectedCredential) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCredential]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setActiveAssetIndex(0);
  }, [selectedId]);

  useLayoutEffect(() => {
    if (!selectedCredential || !modalRef.current) {
      return undefined;
    }

    const modalRect = modalRef.current.getBoundingClientRect();
    const sourceRect = originRect ?? modalRect;
    const translateX = sourceRect.left - modalRect.left;
    const translateY = sourceRect.top - modalRect.top;
    const scaleX = Math.max(sourceRect.width / modalRect.width, 0.12);
    const scaleY = Math.max(sourceRect.height / modalRect.height, 0.12);

    setModalFromTransform(
      `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) rotate(-2.2deg)`,
    );

    const animationFrame = window.requestAnimationFrame(() => {
      setIsModalReady(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [selectedCredential, originRect]);

  const modalStyle = {
    '--modal-from-transform': modalFromTransform,
  } as CSSProperties;

  return (
    <>
      <header className="records-header">
        <div className="records-header-top">
          <p className="card-label">Credentials</p>
          <span className="records-count">{portfolioData.credentials.length}</span>
        </div>
        <h2>Certificates &amp; Records</h2>
        <p className="muted-text">
          Click any card to expand the full certificate and details.
        </p>
      </header>

      <section className="credential-list" aria-label="Credential cards">
        {portfolioData.credentials.map((credential, index) => (
          <button
            key={credential.id}
            type="button"
            className="credential-list-card"
            onClick={() => openModal(credential.id)}
            ref={(element) => {
              cardRefs.current[credential.id] = element;
            }}
            aria-expanded={selectedCredential?.id === credential.id}
          >
            <div className="credential-list-index-col">
              <span className="credential-list-index">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="credential-list-body">
              <div className="credential-list-copy">
                <span className="credential-mini-chip">{credential.chip}</span>
                <strong>{credential.title}</strong>
                <p>{credential.summary}</p>
              </div>

              <div className="credential-list-right">
                <div className="credential-card-thumb" aria-hidden>
                  <img src={credential.assets[0].src} alt="" />
                </div>
                <div className="credential-list-meta">
                  <span>{credential.period}</span>
                  <div className="credential-status-badge">
                    <span
                      className={`credential-status-dot ${
                        credential.status.toLowerCase().includes('progress')
                          ? 'is-ongoing'
                          : 'is-done'
                      }`}
                    />
                    <span className="credential-status-text">{credential.status}</span>
                  </div>
                </div>
                <div className="credential-card-arrow" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </section>

      {selectedCredential ? (
        <div
          className={`credential-modal-backdrop ${isModalReady ? 'is-ready' : ''} ${isClosing ? 'is-closing' : ''}`}
          role="presentation"
          onClick={closeModal}
        >
          <section
            ref={modalRef}
            className={`credential-modal-fullscreen ${isModalReady ? 'is-ready' : ''} ${isClosing ? 'is-closing' : ''}`}
            style={modalStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="credential-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`credential-modal-fullscreen-content ${isModalReady ? 'is-ready' : ''}`}>
              <div className="credential-modal-fullscreen-header">
                <h3 id="credential-modal-title">{selectedCredential.title}</h3>
                <button
                  type="button"
                  className="credential-modal-close"
                  onClick={closeModal}
                  aria-label="Close credential popup"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="credential-images-stack">
                {selectedCredential.assets.map((asset) => (
                  <div key={asset.id} className="credential-image-wrapper">
                    <button
                      type="button"
                      className="credential-image-expand"
                      onClick={() => onImageExpand?.(asset.src)}
                      aria-label="Expand image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                    <img src={asset.src} alt={asset.label} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

type ColumnProps = {
  onImageExpand?: (src: string) => void;
};

export function RecordsColumn({ onImageExpand }: ColumnProps) {
  const [activeView, setActiveView] = useState<DesktopRecordView>('experience');
  const activeIndex = DESKTOP_RECORD_VIEWS.findIndex((view) => view.id === activeView);
  const isExperienceView = activeView === 'experience';

  return (
    <aside className={`panel panel-right${isExperienceView ? ' is-experience-view' : ''}`} id="academic-record">
      <div className={`panel-inner records-column-shell${isExperienceView ? ' is-experience-view' : ''}`}>
        <div className="records-toggle" role="tablist" aria-label="Right column sections">
          <span
            className="records-toggle-indicator"
            aria-hidden
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {DESKTOP_RECORD_VIEWS.map((view) => {
            const isActive = activeView === view.id;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`records-view-${view.id}`}
                id={`records-tab-${view.id}`}
                className={`records-toggle-button${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveView(view.id)}
              >
                {view.label}
              </button>
            );
          })}
        </div>

        <div
          className={`records-toggle-panel${isExperienceView ? ' is-experience-view' : ''}`}
          role="tabpanel"
          id={`records-view-${activeView}`}
          aria-labelledby={`records-tab-${activeView}`}
        >
          <div key={activeView} className="records-toggle-content">
            {activeView === 'experience' ? (
              <ExperienceSectionContent />
            ) : (
              <RecordsSectionContent onImageExpand={onImageExpand} />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
