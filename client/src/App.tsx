import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChatColumn } from './components/ChatColumn';
import { ExperienceSectionContent } from './components/ExperienceSection';
import { MobileShell } from './components/MobileShell';
import { ContactSectionContent, ProfileColumn } from './components/ProfileColumn';
import { RecordsSectionContent } from './components/RecordsColumn';

type DesktopModalView = 'experience' | 'records' | 'contact' | null;

function App() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [activeDesktopModal, setActiveDesktopModal] = useState<DesktopModalView>(null);
  const [desktopModalBody, setDesktopModalBody] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeDesktopModal) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDesktopModal(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDesktopModal]);

  function openExperienceSpotlight() {
    setActiveDesktopModal('experience');
  }

  function openRecordsOverlay() {
    setActiveDesktopModal('records');
  }

  function openContactModal() {
    setActiveDesktopModal('contact');
  }

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
        <div
          className={`desktop-shell${activeDesktopModal ? ' has-desktop-modal' : ''}`}
        >
          <main className="app-grid">
            <ProfileColumn
              onOpenExperience={openExperienceSpotlight}
              onOpenCertificates={openRecordsOverlay}
            />
            <ChatColumn
              onOpenExperience={openExperienceSpotlight}
              onOpenCertificates={openRecordsOverlay}
              onOpenContact={openContactModal}
            />
          </main>
          {activeDesktopModal ? (
            <>
              <button
                type="button"
                className="desktop-content-modal-backdrop"
                aria-label="Close modal"
                onClick={() => setActiveDesktopModal(null)}
              />
              <section
                className={`desktop-content-modal panel${
                  activeDesktopModal === 'experience'
                    ? ' is-experience'
                    : activeDesktopModal === 'contact'
                      ? ' is-contact'
                      : ' is-records'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="desktop-content-modal-title"
              >
                <div className="panel-inner desktop-content-modal-inner">
                  <div className="desktop-content-modal-header">
                    <div className="desktop-content-modal-copy">
                      <p className="card-label">
                        {activeDesktopModal === 'experience'
                          ? 'Experience'
                          : activeDesktopModal === 'contact'
                            ? 'Contact'
                            : 'Records'}
                      </p>
                      <h2 id="desktop-content-modal-title">
                        {activeDesktopModal === 'experience'
                          ? 'Career Experience'
                          : activeDesktopModal === 'contact'
                            ? 'Contact'
                            : 'Certificates & More'}
                      </h2>
                    </div>
                    <button
                      type="button"
                      className="desktop-content-modal-close"
                      onClick={() => setActiveDesktopModal(null)}
                      aria-label="Close modal"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div
                    ref={setDesktopModalBody}
                    className={`desktop-content-modal-body${
                      activeDesktopModal === 'experience'
                        ? ' is-experience'
                        : activeDesktopModal === 'contact'
                          ? ' is-contact'
                          : ' is-records'
                    }`}
                  >
                    {activeDesktopModal === 'experience' ? (
                      <ExperienceSectionContent scrollRoot={desktopModalBody} showHeader={false} />
                    ) : activeDesktopModal === 'contact' ? (
                      <ContactSectionContent />
                    ) : (
                      <RecordsSectionContent onImageExpand={setExpandedImage} showHeader={false} />
                    )}
                  </div>
                </div>
              </section>
            </>
          ) : null}
        </div>
        <MobileShell />
      </div>
      {expandedPopup}
    </>
  );
}

export default App;
