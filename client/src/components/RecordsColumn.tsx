import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { portfolioData } from '../data/portfolio';
import { ExperienceSectionContent } from './ExperienceSection';

const MODAL_ANIMATION_MS = 340;
const SECTION_EXIT_MS = 520;
const SECTION_ENTER_MS = 780;
const DESKTOP_RECORD_VIEWS = [
  { id: 'experience', label: 'Experience' },
  { id: 'records', label: 'Certificates & Records' },
] as const;

type DesktopRecordView = (typeof DESKTOP_RECORD_VIEWS)[number]['id'];
type SpotlightMode = 'inactive' | 'spotlight' | 'expanded' | 'collapsing';

import type { CredentialAsset, CredentialRecord } from '../data/portfolio';

type Props = {
  credentials?: CredentialRecord[];
  title?: string;
  onImageExpand?: (src: string) => void;
  showHeader?: boolean;
};

function getCredentialImageSources(asset: CredentialAsset) {
  return asset.kind === 'image' ? [asset.src, ...(asset.extraSrcs ?? [])] : [];
}

export function RecordsSectionContent({
  credentials,
  title = 'Certificates & Records',
  onImageExpand,
  showHeader = true,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [expandedPdf, setExpandedPdf] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [isModalReady, setIsModalReady] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalFromTransform, setModalFromTransform] = useState('translate(0px, 0px) scale(1, 1) rotate(0deg)');
  const activeCredentials = credentials ?? portfolioData.credentials;
  const selectedCredential = activeCredentials.find((credential) => credential.id === selectedId);
  const activeAsset = selectedCredential?.assets[activeAssetIndex] ?? selectedCredential?.assets[0] ?? null;
  const showAllImageAssets = Boolean(
    selectedCredential?.showAllImageAssets && selectedCredential.assets.every((asset) => asset.kind === 'image'),
  );
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
        if (expandedPdf) {
          setExpandedPdf(null);
        } else {
          closeModal();
        }
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
    setIsSidebarExpanded(false);
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
      {showHeader ? (
        <header className="records-header">
          <div className="records-header-top">
            <p className="card-label">{title === 'Course Summaries' ? 'Summaries' : 'Credentials'}</p>
            <span className="records-count">{activeCredentials.length}</span>
          </div>
          <h2>{title}</h2>
          <p className="muted-text">
            {title === 'Course Summaries'
              ? 'Self-written study notes and summaries from online courses.'
              : 'Click any card to expand the full certificate and details.'}
          </p>
        </header>
      ) : null}

      <section className="credential-list" aria-label="Credential cards">
        {activeCredentials.map((credential) => (
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
            <div className="credential-list-body">
              <div className="credential-card-thumb" aria-hidden>
                {credential.coverImageSrc ? (
                  <img src={credential.coverImageSrc} alt="" />
                ) : credential.assets[0].kind === 'pdf' ? (
                  <div className="credential-card-thumb-pdf">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                ) : (
                  <img src={credential.assets[0].src} alt="" />
                )}
              </div>

              <div className="credential-list-copy">
                <strong>{credential.title}</strong>
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

              <div className="credential-modal-body">
                {!showAllImageAssets && selectedCredential.assets.length > 1 && (
                  <aside className={`credential-asset-sidebar${isSidebarExpanded ? ' is-expanded' : ''}`}>
                    <button
                      type="button"
                      className="credential-sidebar-toggle"
                      onClick={() => setIsSidebarExpanded((v) => !v)}
                      aria-label={isSidebarExpanded ? 'Collapse list' : 'Expand list'}
                    >
                      <svg
                        width="13" height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`credential-sidebar-chevron${isSidebarExpanded ? ' is-expanded' : ''}`}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>

                    <ul className="credential-sidebar-list" role="tablist" aria-label="Assets">
                      {selectedCredential.assets.map((asset, i) => (
                        <li key={asset.id}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={i === activeAssetIndex}
                            className={`credential-sidebar-item${i === activeAssetIndex ? ' is-active' : ''}`}
                            onClick={() => setActiveAssetIndex(i)}
                            title={asset.label}
                          >
                            <span className="credential-sidebar-index">{String(i + 1).padStart(2, '0')}</span>
                            <span className="credential-sidebar-label">{asset.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {activeAsset && (
                  <div className="credential-asset-stage">
                    {showAllImageAssets ? (
                      <div className="credential-image-stack-view">
                        {selectedCredential.assets.flatMap((asset) =>
                          getCredentialImageSources(asset).map((src, si) => (
                            <div key={`${asset.id}-${src}`} className="credential-image-wrapper">
                              <button
                                type="button"
                                className="credential-image-expand"
                                onClick={() => onImageExpand?.(src)}
                                aria-label="Expand image"
                              >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                              </button>
                              <img src={src} alt={si === 0 ? asset.label : `${asset.label} (${si + 1})`} />
                            </div>
                          )),
                        )}
                      </div>
                    ) : activeAsset.kind === 'pdf' ? (
                      <div className="credential-pdf-viewer">
                        <button
                          type="button"
                          className="credential-pdf-expand"
                          onClick={() => setExpandedPdf(activeAsset.src)}
                          aria-label="Expand PDF"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                        </button>
                        <embed
                          src={activeAsset.src}
                          type="application/pdf"
                          title={activeAsset.label}
                        />
                      </div>
                    ) : (
                      <div className="credential-image-stack-view">
                        {getCredentialImageSources(activeAsset).map((src, si) => (
                          <div key={src} className="credential-image-wrapper">
                            <button
                              type="button"
                              className="credential-image-expand"
                              onClick={() => onImageExpand?.(src)}
                              aria-label="Expand image"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                              </svg>
                            </button>
                            <img src={src} alt={si === 0 ? activeAsset.label : `${activeAsset.label} (${si + 1})`} />
                          </div>
                        ))}
                      </div>
                    )}

                    {!showAllImageAssets && selectedCredential.assets.length > 1 && activeAsset && (
                      <div className="credential-stage-nav">
                        <button
                          type="button"
                          className="credential-stage-nav-btn"
                          onClick={() => setActiveAssetIndex((i) => Math.max(0, i - 1))}
                          disabled={activeAssetIndex === 0}
                          aria-label="Previous asset"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <div className="credential-stage-nav-center">
                          <span className="credential-stage-nav-label">{activeAsset.label}</span>
                          <span className="credential-stage-nav-count">{activeAssetIndex + 1} / {selectedCredential.assets.length}</span>
                        </div>
                        <button
                          type="button"
                          className="credential-stage-nav-btn"
                          onClick={() => setActiveAssetIndex((i) => Math.min(selectedCredential.assets.length - 1, i + 1))}
                          disabled={activeAssetIndex === selectedCredential.assets.length - 1}
                          aria-label="Next asset"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {expandedPdf ? createPortal(
        <div
          className="credential-pdf-expanded-backdrop"
          role="presentation"
          onClick={() => setExpandedPdf(null)}
        >
          <div
            className="credential-pdf-expanded-container"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="credential-pdf-expanded-close"
              onClick={() => setExpandedPdf(null)}
              aria-label="Close expanded PDF"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <embed
              src={expandedPdf}
              type="application/pdf"
              className="credential-pdf-expanded-embed"
            />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}

type ColumnProps = {
  onImageExpand?: (src: string) => void;
  spotlightMode?: SpotlightMode;
};

export function RecordsColumn({
  onImageExpand,
  spotlightMode = 'inactive',
}: ColumnProps) {
  const [activeView, setActiveView] = useState<DesktopRecordView>('experience');
  const [displayView, setDisplayView] = useState<DesktopRecordView>('experience');
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const exitTimeoutRef = useRef<number | null>(null);
  const enterTimeoutRef = useRef<number | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const activeIndex = DESKTOP_RECORD_VIEWS.findIndex((view) => view.id === activeView);
  const isExperienceView = displayView === 'experience';
  const isSpotlighted = spotlightMode !== 'inactive';

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isSpotlighted) {
      return;
    }

    if (exitTimeoutRef.current) {
      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }

    if (enterTimeoutRef.current) {
      window.clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }

    setActiveView('experience');
    setDisplayView('experience');
    setTransitionPhase('idle');
    asideRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isSpotlighted]);

  function handleViewChange(nextView: DesktopRecordView) {
    if (nextView === activeView || transitionPhase !== 'idle') {
      return;
    }

    if (exitTimeoutRef.current) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    if (enterTimeoutRef.current) {
      window.clearTimeout(enterTimeoutRef.current);
    }

    setActiveView(nextView);
    setTransitionPhase('exiting');

    exitTimeoutRef.current = window.setTimeout(() => {
      setDisplayView(nextView);
      setTransitionPhase('entering');
      exitTimeoutRef.current = null;

      enterTimeoutRef.current = window.setTimeout(() => {
        setTransitionPhase('idle');
        enterTimeoutRef.current = null;
      }, SECTION_ENTER_MS);
    }, SECTION_EXIT_MS);
  }

  return (
    <aside
      ref={asideRef}
      className={`panel panel-right${isExperienceView ? ' is-experience-view' : ''}${transitionPhase !== 'idle' ? ' is-transitioning' : ''}${isSpotlighted ? ' is-spotlighted' : ''}`}
      id="academic-record"
    >
      <div
        className={`panel-inner records-column-shell${isExperienceView ? ' is-experience-view' : ''}${transitionPhase !== 'idle' ? ` is-${transitionPhase}` : ''}`}
      >
        <div className="records-toggle-shell">
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
                  onClick={() => handleViewChange(view.id)}
                >
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`records-toggle-panel${isExperienceView ? ' is-experience-view' : ''}`}
          role="tabpanel"
          id={`records-view-${displayView}`}
          aria-labelledby={`records-tab-${displayView}`}
        >
          <div key={displayView} className={`records-toggle-content${transitionPhase !== 'idle' ? ` is-${transitionPhase}` : ''}`}>
            {displayView === 'experience' ? (
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
