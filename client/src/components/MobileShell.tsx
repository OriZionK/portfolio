import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatExperience } from './ChatColumn';
import { ExperienceSectionContent } from './ExperienceSection';
import { ContactSectionContent, ProfileSectionContent } from './ProfileColumn';
import { RecordsSectionContent } from './RecordsColumn';

type MobileSectionId = 'chatbot' | 'profile' | 'experience' | 'records' | 'contact';

type MobileSection = {
  id: MobileSectionId;
  label: string;
  kicker: string;
};

const mobileSections: MobileSection[] = [
  { id: 'chatbot', label: 'Chatbot', kicker: 'Ask Ori' },
  { id: 'profile', label: 'Profile', kicker: 'About Ori' },
  { id: 'experience', label: 'Experience', kicker: 'AI + Vector DBs' },
  { id: 'records', label: 'Certificates and Projects', kicker: 'Verified work' },
  { id: 'contact', label: 'Contact Ori', kicker: 'Reach out' },
];

export function MobileShell() {
  const [activeSection, setActiveSection] = useState<MobileSectionId>('chatbot');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);
  const openTimerRef = useRef<number | null>(null);
  const collapseTimerRef = useRef<number | null>(null);
  const currentSection = useMemo(
    () => mobileSections.find((section) => section.id === activeSection) ?? mobileSections[0],
    [activeSection],
  );

  function clearNavTimers() {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => () => clearNavTimers(), []);

  function scheduleCollapseAfterClose() {
    if (!hasAutoCollapsed) {
      return;
    }

    collapseTimerRef.current = window.setTimeout(() => {
      setIsNavCollapsed(true);
      collapseTimerRef.current = null;
    }, 180);
  }

  function closeMenu() {
    clearNavTimers();
    setIsMenuOpen(false);
    scheduleCollapseAfterClose();
  }

  function handleStageInteraction() {
    if (hasAutoCollapsed || isMenuOpen) {
      return;
    }

    setHasAutoCollapsed(true);
    setIsNavCollapsed(true);
  }

  function handleSelect(sectionId: MobileSectionId) {
    setActiveSection(sectionId);
    closeMenu();
  }

  function handleCommandBarClick() {
    clearNavTimers();

    if (isMenuOpen) {
      closeMenu();
      return;
    }

    if (isNavCollapsed) {
      setIsNavCollapsed(false);
      openTimerRef.current = window.setTimeout(() => {
        setIsMenuOpen(true);
        openTimerRef.current = null;
      }, 240);
      return;
    }

    setIsMenuOpen(true);
  }

  return (
    <div className="mobile-shell">
      <header className="mobile-topbar">
        <button
          type="button"
          className={`mobile-command-bar${isNavCollapsed ? ' is-collapsed' : ''}${isMenuOpen ? ' is-open' : ''}`}
          onClick={handleCommandBarClick}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-drawer"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="mobile-command-bar-icon" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="mobile-command-bar-copy">
            <strong>{currentSection.label}</strong>
            <span>{currentSection.kicker}</span>
          </span>
        </button>
      </header>

      <div className={`mobile-drawer-backdrop${isMenuOpen ? ' is-open' : ''}`} onClick={closeMenu}>
        <nav
          id="mobile-drawer"
          className={`mobile-drawer${isMenuOpen ? ' is-open' : ''}`}
          aria-label="Mobile sections"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-drawer-orb" aria-hidden />
          <div className="mobile-drawer-header">
            <p className="mobile-drawer-label">Sections</p>
            <strong>{currentSection.label}</strong>
          </div>
          {mobileSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`mobile-drawer-link${section.id === activeSection ? ' is-active' : ''}`}
              onClick={() => handleSelect(section.id)}
            >
              <span>{section.label}</span>
              <small>{section.kicker}</small>
            </button>
          ))}
        </nav>
      </div>

      <main
        className="mobile-stage"
        onPointerDownCapture={handleStageInteraction}
        onTouchStartCapture={handleStageInteraction}
        onScrollCapture={handleStageInteraction}
      >
        {activeSection === 'chatbot' ? (
          <div className="mobile-screen mobile-screen--chat">
            <ChatExperience rootClassName="mobile-chat-surface" inputId="mobile-chat-input" />
          </div>
        ) : null}

        {activeSection === 'profile' ? (
          <div className="mobile-screen">
            <section className="mobile-panel">
              <div className="mobile-panel-inner">
                <div className="mobile-section-intro">
                  <p className="card-label">Profile</p>
                  <h2>Snapshot</h2>
                  <p className="muted-text">
                    Background, education, and current technical strengths.
                  </p>
                </div>
                <ProfileSectionContent />
              </div>
            </section>
          </div>
        ) : null}

        {activeSection === 'experience' ? (
          <div className="mobile-screen is-experience-view">
            <section className="mobile-panel is-experience-view">
              <div className="mobile-panel-inner is-experience-view">
                <ExperienceSectionContent />
              </div>
            </section>
          </div>
        ) : null}

        {activeSection === 'records' ? (
          <div className="mobile-screen">
            <section className="mobile-panel">
              <div className="mobile-panel-inner">
                <RecordsSectionContent />
              </div>
            </section>
          </div>
        ) : null}

        {activeSection === 'contact' ? (
          <div className="mobile-screen is-contact-view">
            <section className="mobile-panel is-contact-view">
              <div className="mobile-panel-inner is-contact-view">
                <ContactSectionContent />
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
