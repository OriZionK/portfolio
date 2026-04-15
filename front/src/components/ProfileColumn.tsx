import { portfolioData } from '../data/portfolio';

export function ProfileColumn() {
  return (
    <aside className="panel panel-left" id="profile">
      <div className="panel-inner">
        <div className="status-chip">Open to Work</div>

        <div className="portrait-wrap">
          <img
            className="portrait"
            src={portfolioData.profilePhoto}
            alt={`${portfolioData.name} portrait`}
          />
        </div>

        <div className="profile-copy">
          <p className="eyebrow">Personal overview</p>
          <h1>{portfolioData.name}</h1>
          <p className="primary-role">{portfolioData.role}</p>
          <p className="muted-text">
            {portfolioData.institution} · {portfolioData.location}
          </p>
          <p className="availability-copy">{portfolioData.availability}</p>
        </div>

        <section className="info-card inset-card">
          <p className="card-label">Profile statement</p>
          <p className="statement">{portfolioData.tagline}</p>
          <p className="muted-text">{portfolioData.biography}</p>
        </section>

        <section className="fact-grid">
          {portfolioData.profileFacts.map((fact) => (
            <article key={fact.label} className="fact-tile">
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </article>
          ))}
        </section>

        <section className="info-card">
          <p className="card-label">Focus areas</p>
          <div className="pill-cloud">
            {portfolioData.focusAreas.map((area) => (
              <span key={area} className="outline-pill">
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="info-card compact-list">
          <p className="card-label">Verified details</p>
          <div className="detail-row">
            <span>Student ID</span>
            <strong>{portfolioData.studentId}</strong>
          </div>
          <div className="detail-row">
            <span>Record issued</span>
            <strong>{portfolioData.recordIssuedAt}</strong>
          </div>
          <div className="detail-row">
            <span>Source folder</span>
            <strong>my career data</strong>
          </div>
        </section>
      </div>
    </aside>
  );
}
