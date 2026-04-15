const navItems = ['Profile', 'Assistant', 'Academic Record'];

export function Header() {
  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand-kicker">Academic Portfolio</span>
        <div className="brand-title">
          <span>ORI</span>
          <span className="brand-slash">/</span>
          <span>ZION</span>
        </div>
      </div>

      <nav className="topnav" aria-label="Primary">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="topbar-actions">
        <button type="button" className="ghost-button">
          Black / White UI
        </button>
        <button type="button" className="solid-button">
          Chat Coming Next
        </button>
      </div>
    </header>
  );
}
