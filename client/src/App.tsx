import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChatColumn } from './components/ChatColumn';
import { ExperienceSectionContent } from './components/ExperienceSection';
import { MobileShell } from './components/MobileShell';
import { ProfileColumn } from './components/ProfileColumn';
import { RecordsColumn } from './components/RecordsColumn';

type ExperienceSpotlightStage = 'inactive' | 'spotlight' | 'expanded' | 'collapsing';

const EXPERIENCE_COLLAPSE_MS = 520;
const EXPERIENCE_EXPAND_MS = 280;

function App() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [experienceSpotlightStage, setExperienceSpotlightStage] = useState<ExperienceSpotlightStage>('inactive');
  const collapseTimeoutRef = useRef<number | null>(null);
  const expandTimeoutRef = useRef<number | null>(null);

  const isExperienceSpotlight = experienceSpotlightStage !== 'inactive';

  useEffect(() => {
    return () => {
      if (expandTimeoutRef.current !== null) {
        window.clearTimeout(expandTimeoutRef.current);
      }

      if (collapseTimeoutRef.current !== null) {
        window.clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  function openExperienceSpotlight() {
    if (expandTimeoutRef.current !== null) {
      window.clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }

    if (collapseTimeoutRef.current !== null) {
      window.clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    setExperienceSpotlightStage('spotlight');
    expandTimeoutRef.current = window.setTimeout(() => {
      setExperienceSpotlightStage('expanded');
      expandTimeoutRef.current = null;
    }, EXPERIENCE_EXPAND_MS);
  }

  function closeExperienceSpotlight() {
    if (expandTimeoutRef.current !== null) {
      window.clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }

    if (collapseTimeoutRef.current !== null) {
      window.clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    if (experienceSpotlightStage === 'expanded') {
      setExperienceSpotlightStage('collapsing');
      collapseTimeoutRef.current = window.setTimeout(() => {
        setExperienceSpotlightStage('inactive');
        collapseTimeoutRef.current = null;
      }, EXPERIENCE_COLLAPSE_MS);
      return;
    }

    setExperienceSpotlightStage('inactive');
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
          className={`desktop-shell${isExperienceSpotlight ? ' is-experience-spotlight' : ''}${experienceSpotlightStage === 'expanded' ? ' is-experience-expanded' : ''}${experienceSpotlightStage === 'collapsing' ? ' is-experience-collapsing' : ''}`}
        >
          {isExperienceSpotlight ? (
            <>
              <button
                type="button"
                className="experience-spotlight-backdrop"
                aria-label="Close experience spotlight"
                onClick={closeExperienceSpotlight}
              />
              <button
                type="button"
                className="experience-spotlight-exit"
                onClick={closeExperienceSpotlight}
              >
                Back to normal
              </button>
              <aside
                className={`experience-spotlight-panel panel panel-right is-experience-view${experienceSpotlightStage === 'expanded' ? ' is-expanded' : ''}${experienceSpotlightStage === 'collapsing' ? ' is-collapsing' : ''}`}
                aria-label="Experience spotlight"
              >
                <div className="panel-inner records-column-shell is-experience-view">
                  <div className="records-toggle-panel is-experience-view">
                    <div className="records-toggle-content">
                      <ExperienceSectionContent />
                    </div>
                  </div>
                </div>
              </aside>
            </>
          ) : null}
          <main className="app-grid">
            <ProfileColumn />
            <ChatColumn />
            <RecordsColumn
              onImageExpand={setExpandedImage}
              spotlightMode={experienceSpotlightStage}
            />
          </main>
        </div>
        <MobileShell />
      </div>
      {expandedPopup}
    </>
  );
}

export default App;
