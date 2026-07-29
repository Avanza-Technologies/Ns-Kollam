const NAV_ITEMS = [
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'INTERNSHIP', href: '#internship' },
  { label: 'LOCATIONS', href: '#locations' },
  { label: 'ABOUT', href: '#about' },
];

export default function Navigation() {
  return (
    <nav className="nz-nav" aria-label="Main navigation">
      <div className="nz-nav-logo" aria-label="Networkz Systems">
        NETWORKZ<br />SYSTEMS
      </div>

      <ul className="nz-nav-links" role="list">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      <a
        className="nz-nav-contact"
        href="tel:08089030405"
        aria-label="Contact Networkz Systems"
      >
        CONTACT
      </a>
    </nav>
  );
}
