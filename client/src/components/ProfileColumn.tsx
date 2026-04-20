import { portfolioData } from '../data/portfolio';

const EXTERNAL_LINK_PATTERN = /^https?:\/\//i;

const PROFILE_SOCIAL_LINKS = [
  { label: 'LinkedIn', href: portfolioData.contactItems.find((item) => item.label === 'LinkedIn')?.href, social: 'linkedin' },
  { label: 'GitHub', href: portfolioData.contactItems.find((item) => item.label === 'GitHub')?.href, social: 'github' },
  { label: 'Mail', href: portfolioData.contactItems.find((item) => item.label === 'Email')?.href, social: 'mail' },
  { label: 'Phone', href: portfolioData.contactItems.find((item) => item.label === 'Phone')?.href, social: 'phone' },
] as const;

const PROFILE_SIGNALS = [
  {
    label: 'Studies',
    value: 'B.S. CS + Physics (in progress)',
  },
] as const;

function getExternalLinkProps(href: string) {
  return EXTERNAL_LINK_PATTERN.test(href)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}

function ContactItemIcon({ label }: { label: string }) {
  if (label === 'Phone') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    );
  }

  if (label === 'Email') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    );
  }

  if (label === 'GitHub') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
      </svg>
    );
  }

  if (label === 'LinkedIn') {
    return (
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );
}

function isWebsiteContact(label: string) {
  return label === 'GitHub' || label === 'LinkedIn';
}

function ProfileSocialLinks() {
  const socialLinks = PROFILE_SOCIAL_LINKS.filter(
    (item): item is (typeof PROFILE_SOCIAL_LINKS)[number] & { href: string } => Boolean(item.href),
  );

  return (
    <ul className="profile-social-links" aria-label="Quick contact links">
      {socialLinks.map((item) => (
        <li key={item.label} className="profile-social-item">
          <a href={item.href} aria-label={item.label} data-social={item.social} {...getExternalLinkProps(item.href)}>
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

function ContactItems() {
  return (
    <div className="contact-card-list">
      {portfolioData.contactItems.map((item) =>
        item.href ? (
          <a key={item.label} className="contact-card" data-contact={item.label.toLowerCase()} href={item.href} {...getExternalLinkProps(item.href)}>
            <span className="contact-card-icon">
              <ContactItemIcon label={item.label} />
            </span>
            <div className="contact-card-copy">
              {isWebsiteContact(item.label) ? null : <span>{item.label}</span>}
              <strong>{isWebsiteContact(item.label) ? item.label : item.value}</strong>
            </div>
          </a>
        ) : (
          <div key={item.label} className="contact-card" data-contact={item.label.toLowerCase()}>
            <span className="contact-card-icon">
              <ContactItemIcon label={item.label} />
            </span>
            <div className="contact-card-copy">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export function ProfileSectionContent() {
  return (
    <>
      <section className="profile-spotlight-card">
        <div className="profile-spotlight-ornaments" aria-hidden>
          <span className="profile-spotlight-orbit profile-spotlight-orbit--one" />
          <span className="profile-spotlight-orbit profile-spotlight-orbit--two" />
          <span className="profile-spotlight-grid" />
        </div>

        <div className="profile-hero">
          <div className="portrait-wrap">
            <img
              className="portrait"
              src={portfolioData.profilePhoto}
              alt={`${portfolioData.name} portrait`}
            />
            <span className="portrait-node portrait-node--one" aria-hidden />
            <span className="portrait-node portrait-node--two" aria-hidden />
          </div>
          <div className="profile-hero-copy">
            <div className="status-chip">Open to AI roles</div>
            <h1>{portfolioData.name}</h1>
            <p className="primary-role">{portfolioData.role}</p>
            <div className="profile-role-divider" aria-hidden>
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="profile-meta-strip">
          <span className="profile-meta-pill">{portfolioData.location}</span>
          <span className="profile-meta-pill">{portfolioData.education.institution}</span>
          <span className="profile-meta-pill">Active service</span>
        </div>

        <div className="profile-signal-grid" aria-label="Profile signals">
          {PROFILE_SIGNALS.map((item) => (
            <article key={item.label} className="profile-signal-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>

        <a
          href="/ori_zion_resume.pdf"
          download="Ori_Zion_Resume.pdf"
          className="resume-download-link"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden>
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
          </svg>
          Download Resume
        </a>
      </section>

      <section className="resume-section profile-section-card">
        <h2 className="resume-section-title">Core Stack</h2>
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

      <p className="muted-text">
        Want to know more? Check out the experience section.
      </p>

      <ProfileSocialLinks />
    </>
  );
}

function ExploreActions({
  onOpenExperience,
  onOpenCertificates,
}: {
  onOpenExperience: () => void;
  onOpenCertificates: () => void;
}) {
  return (
    <section className="profile-section-card profile-explore-card" aria-label="Explore more">
      <div className="profile-explore-copy">
        <p className="card-label">Explore More</p>
      </div>

      <div className="profile-explore-actions">
        <button type="button" className="profile-explore-button is-dark" onClick={onOpenExperience}>
          <span>Experience</span>
          <small>Timeline and projects</small>
        </button>
        <button type="button" className="profile-explore-button" onClick={onOpenCertificates}>
          <span>Certificates</span>
          <small>Records and proofs</small>
        </button>
      </div>
    </section>
  );
}

export function ContactSectionContent() {
  return (
    <section className="contact-section-content">
      <ContactItems />
    </section>
  );
}

export function ProfileColumn({
  onOpenExperience,
  onOpenCertificates,
}: {
  onOpenExperience: () => void;
  onOpenCertificates: () => void;
}) {
  return (
    <aside className="panel panel-left" id="profile">
      <div className="panel-inner">
        <ProfileSectionContent />
        <ExploreActions
          onOpenExperience={onOpenExperience}
          onOpenCertificates={onOpenCertificates}
        />
      </div>
    </aside>
  );
}
