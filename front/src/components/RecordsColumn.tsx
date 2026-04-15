import { portfolioData } from '../data/portfolio';

export function RecordsColumn() {
  return (
    <aside className="panel panel-right" id="academic-record">
      <div className="panel-inner">
        <header className="records-header">
          <p className="card-label">Academic records</p>
          <h2>Certificates, scores, and source records</h2>
          <p className="muted-text">
            The academic data below is extracted from the degree sheet you placed in the project.
          </p>
        </header>

        <section className="records-summary">
          {portfolioData.profileFacts.map((fact) => (
            <article key={fact.label} className="summary-card">
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </article>
          ))}
        </section>

        <section className="info-card results-card">
          <div className="section-heading">
            <div>
              <p className="card-label">Course results</p>
              <h3>Academic record</h3>
            </div>
            <span className="results-count">{portfolioData.records.length} entries</span>
          </div>

          <div className="results-table" role="table" aria-label="Academic results">
            {portfolioData.records.map((record) => (
              <article key={`${record.code}-${record.semester}`} className="result-row" role="row">
                <div className="result-main">
                  <div className="result-title-row">
                    <strong>{record.title}</strong>
                    <span className={`result-status ${record.status === 'Passed' ? 'passed' : 'enrolled'}`}>
                      {record.status}
                    </span>
                  </div>
                  <p>{record.originalTitle}</p>
                  <div className="result-meta">
                    <span>{record.code}</span>
                    <span>{record.semester}</span>
                    <span>{record.credits ? `${record.credits} credits` : 'Credit pending'}</span>
                  </div>
                </div>

                <div className="result-grade-block">
                  <span>Final</span>
                  <strong>{record.finalScore ?? '—'}</strong>
                  <small>Exam {record.examScore ?? '—'}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="info-card">
          <div className="section-heading">
            <div>
              <p className="card-label">Source document</p>
              <h3>Imported proof</h3>
            </div>
          </div>

          {portfolioData.documents.map((document) => (
            <article key={document.title} className="document-card">
              <img src={document.image} alt={document.title} />
              <div className="document-copy">
                <strong>{document.title}</strong>
                <span>{document.issuedAt}</span>
                <p>{document.description}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </aside>
  );
}
