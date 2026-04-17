import { portfolioData } from '../data/portfolio';

const CONTACT_ICONS: Record<string, JSX.Element> = {
  Location: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
  Phone: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  ),
  Email: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  GitHub: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  ),
  Website: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
};

const LINKEDIN_URL = 'https://www.linkedin.com/in/ori-zion-0387a4316/';

const PROFILE_SOCIAL_LINKS = [
  { label: 'LinkedIn', href: LINKEDIN_URL, social: 'linkedin' },
  { label: 'GitHub', href: portfolioData.contactItems.find((item) => item.label === 'GitHub')?.href, social: 'github' },
  { label: 'Mail', href: portfolioData.contactItems.find((item) => item.label === 'Email')?.href, social: 'mail' },
  { label: 'Phone', href: portfolioData.contactItems.find((item) => item.label === 'Phone')?.href, social: 'phone' },
] as const;

function ProfileSocialLinks() {
  return (
    <ul className="profile-social-links" aria-label="Quick contact links">
      {PROFILE_SOCIAL_LINKS.filter((item) => item.href).map((item) => (
        <li key={item.label} className="profile-social-item">
          <a href={item.href} aria-label={item.label} data-social={item.social}>
            <div className="profile-social-fill" />
            {item.social === 'github' ? (
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            ) : null}
            {item.social === 'linkedin' ? (
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            ) : null}
            {item.social === 'mail' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            ) : null}
            {item.social === 'phone' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            ) : null}
          </a>
          <div className="profile-social-tooltip">{item.label}</div>
        </li>
      ))}
    </ul>
  );
}

function ContactItems({ detailed = false }: { detailed?: boolean }) {
  if (detailed) {
    return (
      <div className="contact-card-list">
        {portfolioData.contactItems.map((item) =>
          item.href ? (
            <a key={item.label} className="contact-card" href={item.href}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ) : (
            <div key={item.label} className="contact-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ),
        )}
      </div>
    );
  }

  return (
    <div className="resume-contact-list">
      {portfolioData.contactItems.map((item) => {
        const icon = CONTACT_ICONS[item.label];
        if (item.href) {
          return (
            <a key={item.label} className="resume-link" href={item.href}>
              {icon && <span className="resume-contact-icon">{icon}</span>}
              {item.value}
            </a>
          );
        }
        return (
          <p key={item.label} className="resume-line">
            {icon && <span className="resume-contact-icon">{icon}</span>}
            {item.value}
          </p>
        );
      })}
    </div>
  );
}

export function ProfileSectionContent({ includeContact = true }: { includeContact?: boolean }) {
  return (
    <>
      <section className="profile-spotlight-card">
        <div className="profile-hero">
          <div className="portrait-wrap">
            <img
              className="portrait"
              src={portfolioData.profilePhoto}
              alt={`${portfolioData.name} portrait`}
            />
          </div>
          <div className="profile-hero-copy">
            <h1>{portfolioData.name}</h1>
            <p className="primary-role">{portfolioData.role}</p>
            <div className="profile-meta-strip">
              <span className="profile-meta-pill">{portfolioData.location}</span>
              <span className="profile-meta-pill">{portfolioData.education.degree}</span>
            </div>
          </div>
        </div>

        <div className="profile-spotlight-copy">
          <div className="status-chip">Open to Work</div>
          <p className="profile-spotlight-line">{portfolioData.tagline}</p>
          <p className="muted-text">{portfolioData.biography}</p>
        </div>
      </section>

      <section className="profile-focus-card">
        <p className="card-label">Current focus</p>
        <p className="statement">{portfolioData.availability}</p>
        <div className="profile-focus-list" aria-label="Current focus areas">
          {portfolioData.focusAreas.map((area) => (
            <span key={area} className="profile-focus-pill">
              {area}
            </span>
          ))}
        </div>
        <p className="muted-text">{portfolioData.education.note}</p>
      </section>

      <section className="resume-section profile-section-card">
        <h2 className="resume-section-title">Education</h2>
        <div className="resume-education">
          <p className="resume-degree">{portfolioData.education.degree}</p>
          <p className="resume-school">{portfolioData.education.institution}</p>
          <p className="resume-note">{portfolioData.education.note}</p>
        </div>
      </section>

      <section className="resume-section profile-section-card">
        <h2 className="resume-section-title">Core stack</h2>
        <div className="profile-skill-grid">
          {portfolioData.skillGroups.map((group) => (
            <article key={group.title} className="profile-skill-card">
              <h3>{group.title}</h3>
              <div className="profile-skill-cloud">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {includeContact ? (
        <section className="resume-section profile-section-card">
          <h2 className="resume-section-title">Contact</h2>
          <ContactItems detailed />
        </section>
      ) : null}

      <ProfileSocialLinks />
    </>
  );
}

export function ContactSectionContent() {
  return (
    <section className="contact-section-content">
      <div className="mobile-section-intro">
        <p className="card-label">Contact Ori</p>
        <h2>Ways to reach him</h2>
        <p className="muted-text">
          Direct links for phone, email, GitHub, and the main portfolio site.
        </p>
      </div>

      <ContactItems detailed />
    </section>
  );
}

export function ProfileColumn() {
  return (
    <aside className="panel panel-left" id="profile">
      <div className="panel-inner">
        <ProfileSectionContent includeContact />
      </div>
    </aside>
  );
}
