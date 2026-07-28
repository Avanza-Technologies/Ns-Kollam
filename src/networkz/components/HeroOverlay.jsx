import React from 'react';

export default function HeroOverlay({ visible }) {
  return (
    <div
      className={`nz-hero${visible ? '' : ' nz-hero--hidden'}`}
      aria-hidden={!visible}
    >
      <p className="nz-hero-eyebrow">AN ISO 9001 : 2015 CERTIFIED COMPANY</p>
      <h1 className="nz-hero-headline">{'NETWORKZ\nSYSTEMS'}</h1>
      <p className="nz-hero-tagline">
        {'SUCCESS BEGINS WITH\nLEARNING TODAY.'}
      </p>
    </div>
  );
}
