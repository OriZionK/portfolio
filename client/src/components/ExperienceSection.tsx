import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolio';

export function ExperienceSectionContent() {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [activeBlockId, setActiveBlockId] = useState(portfolioData.experienceBlocks[0]?.id ?? '');
  const [isToolSectionInView, setIsToolSectionInView] = useState(false);
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});
  const toolRefs = useRef<Record<string, HTMLElement | null>>({});
  const proofSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observedElements = [
      ...portfolioData.experienceBlocks.map((block) => blockRefs.current[block.id]),
      ...portfolioData.experienceToolNotes.map((tool) => toolRefs.current[tool.name]),
    ].filter((element): element is HTMLElement => element !== null);

    if (!observedElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          if (!(entry.target instanceof HTMLElement)) {
            return;
          }

          const revealId = entry.target.dataset.revealId;
          const kind = entry.target.dataset.revealKind;

          if (revealId) {
            setRevealedIds((current) => (current.includes(revealId) ? current : [...current, revealId]));
          }

          if (kind === 'block' && revealId) {
            setActiveBlockId(revealId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -14% 0px',
      },
    );

    observedElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!proofSectionRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsToolSectionInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '-8% 0px -55% 0px',
      },
    );

    observer.observe(proofSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeBlockIndex = Math.max(
    0,
    portfolioData.experienceBlocks.findIndex((block) => block.id === activeBlockId),
  );
  const activeBlock = portfolioData.experienceBlocks[activeBlockIndex] ?? portfolioData.experienceBlocks[0];
  const progress = `${((activeBlockIndex + 1) / portfolioData.experienceBlocks.length) * 100}%`;
  const activeThemeClass = activeBlockIndex % 2 === 0 ? 'is-dark' : 'is-light';

  function scrollToExperienceTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="experience-shell" aria-label="AI engineering experience">
      <header className="experience-hero">
        <div className="experience-hero-copy">
          <p className="card-label">Experience</p>
          <h2>AI systems work, with the important parts staying in view as you scroll.</h2>
          <p className="muted-text">
            {portfolioData.experienceSummary}
          </p>
        </div>

        <div className="experience-readout">
          {portfolioData.experienceSignals.map((signal) => (
            <div key={signal.label} className="experience-readout-row">
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
          ))}
        </div>
      </header>

      <section className={`experience-progress-shell ${activeThemeClass}`} aria-live="polite">
        <div className="experience-progress-head">
          <div className="experience-progress-copy">
            <span className="experience-command-label">Now in focus</span>
            <strong>{activeBlock?.title}</strong>
          </div>
          <div className="experience-progress-actions">
            <div className="experience-progress-count">
              <span>{String(activeBlockIndex + 1).padStart(2, '0')}</span>
              <small>{String(portfolioData.experienceBlocks.length).padStart(2, '0')}</small>
            </div>
            <button
              type="button"
              className="experience-top-button"
              onClick={scrollToExperienceTop}
              aria-label="Scroll to top"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        <p className="experience-progress-summary">{activeBlock?.summary}</p>

        {!isToolSectionInView ? (
          <>
            <div className="experience-command-meter" aria-hidden>
              <span style={{ width: progress }} />
            </div>

            <div className="experience-progress-steps" aria-hidden>
              {portfolioData.experienceBlocks.map((block, index) => {
                const isActive = block.id === activeBlockId;
                const isPassed = index <= activeBlockIndex;

                return (
                  <span
                    key={block.id}
                    className={`experience-progress-step${isActive ? ' is-active' : ''}${isPassed ? ' is-passed' : ''}`}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </section>

      <div className="experience-chapters">
        {portfolioData.experienceBlocks.map((block, index) => {
          const isVisible = revealedIds.includes(block.id);
          const isActive = block.id === activeBlockId;
          const themeClass = index % 2 === 0 ? 'is-dark' : 'is-light';

          return (
            <article
              key={block.id}
              ref={(element) => {
                blockRefs.current[block.id] = element;
              }}
              data-reveal-id={block.id}
              data-reveal-kind="block"
              className={`experience-chapter ${themeClass}${isVisible ? ' is-visible' : ''}${isActive ? ' is-active' : ''}`}
            >
              <div className="experience-chapter-grid">
                <div className="experience-chapter-meta">
                  <span className="experience-chapter-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="experience-chapter-kicker">{block.kicker}</span>
                </div>

                <div className="experience-chapter-copy">
                  <h3>{block.title}</h3>
                  <p>{block.summary}</p>
                  <ul className="experience-bullet-list">
                    {block.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section ref={proofSectionRef} className="experience-proof-note">
        <div className="experience-proof-head">
          <h3>Use these by name only if they were actually used directly.</h3>
        </div>

        <div className="experience-tool-grid">
          {portfolioData.experienceToolNotes.map((tool) => {
            const revealId = `tool-${tool.name}`;
            const isVisible = revealedIds.includes(revealId);

            return (
              <article
                key={tool.name}
                ref={(element) => {
                  toolRefs.current[tool.name] = element;
                }}
                data-reveal-id={revealId}
                data-reveal-kind="tool"
                className={`experience-tool-strip${isVisible ? ' is-visible' : ''}`}
              >
                <div className="experience-tool-side">
                  <strong>{tool.name}</strong>
                  <span>Resume-safe</span>
                </div>

                <div className="experience-tool-body">
                  <p>{tool.safe}</p>
                  <div className="experience-tool-divider" />
                  <span className="experience-tool-note">If true in practice</span>
                  <p>{tool.onlyIfTrue}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
