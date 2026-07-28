import React from 'react';

export default function FinalSection({ visible }) {
  return (
    <section
      className={`nz-final${visible ? ' nz-final--visible' : ''}`}
      aria-hidden={!visible}
    >
      <p className="nz-final-brand">NETWORKZ SYSTEMS</p>

      <h2 className="nz-final-headline">
        {'SUCCESS BEGINS\nWITH LEARNING\nTODAY.'}
      </h2>

      <p className="nz-final-sub">Build the skills. Build the future.</p>

      <div className="nz-cta-group">
        <button
          className="nz-cta-primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Explore programs"
        >
          EXPLORE PROGRAMS
        </button>
        <a
          className="nz-cta-secondary"
          href="tel:08089030405"
          aria-label="Talk to an expert"
        >
          TALK TO AN EXPERT
        </a>
      </div>

      <div className="nz-final-meta">
        2ND FLOOR, PATTATHUVILA PLAZA · VADAYATTUKOTTA RD · KOLLAM, KERALA 691001<br />
        PH: 080890 30405 · WWW.NETWORKZSYSTEMS.COM<br />
        PEARSON VUE AUTHORIZED CENTRE · NSIM CERTIFIED · ISO 9001:2015
      </div>
    </section>
  );
}
