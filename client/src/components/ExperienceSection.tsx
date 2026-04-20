import { portfolioData } from '../data/portfolio';

const EXPERIENCE_TOOL_ICON_SOURCES: Record<string, string> = {
  'Hugging Face': '/icons/huggingface-color.svg',
  ChromaDB: '/icons/Chroma--Streamline-Svg-Logos.svg',
  PyTorch: '/icons/pytorch-icon.svg',
  vLLM: '/icons/vllm-color.svg',
  pandas: '/icons/Pandas.svg',
};

function ExperienceToolIcon({ name }: { name: string }) {
  const iconSource = EXPERIENCE_TOOL_ICON_SOURCES[name];

  if (iconSource) {
    return (
      <img
        src={iconSource}
        alt={`${name} logo`}
        className="experience-simple-tool-icon-image"
        loading="lazy"
      />
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ExperienceSectionContent({
  scrollRoot = null,
  showHeader = true,
}: {
  scrollRoot?: HTMLElement | null;
  showHeader?: boolean;
}) {
  return (
    <section className="experience-shell experience-shell--simple" aria-label="AI engineering experience">
      {showHeader ? (
        <header className="experience-simple-header">
          <div className="experience-simple-heading">
            <p className="card-label">Experience</p>
            <h2>Career experience</h2>
            <p className="muted-text">{portfolioData.experienceSummary}</p>
          </div>
        </header>
      ) : null}

      <div className="experience-simple-list">
        {portfolioData.experienceBlocks.map((block) => (
          <article key={block.id} className="experience-simple-card">
            <div className="experience-simple-copy">
              <h3>{block.title}</h3>
              <p>{block.summary}</p>
            </div>

            <ul className="experience-simple-bullets">
              {block.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="experience-simple-stack">
        <div className="experience-simple-stack-head">
          <p className="card-label">Stack</p>
          <h3>Technologies used directly in production work.</h3>
        </div>

        <div className="experience-simple-tools">
          {portfolioData.experienceToolNotes.map((tool) => (
            <article key={tool.name} className="experience-simple-tool">
              <div className="experience-simple-tool-row">
                <span className="experience-simple-tool-icon">
                  <ExperienceToolIcon name={tool.name} />
                </span>
                <div className="experience-simple-tool-copy">
                  <strong>{tool.name}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
