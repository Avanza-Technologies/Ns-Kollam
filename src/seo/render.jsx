import CoursePage from './CoursePage.jsx';
import { coursePages, directoryPages } from './catalog.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import NetworkzHome from '../networkz/NetworkzHome.jsx';
import CyberSecurityLanding from '../networkz/CyberSecurityLanding.jsx';
import DigitalMarketingLanding from '../networkz/DigitalMarketingLanding.jsx';
import { aliases } from './pages.js';
export function render(path) {
  const canonical = aliases[path] || path;
  if (coursePages[canonical] || directoryPages[canonical]) return renderToString(<CoursePage path={canonical} />);
  const Page = canonical === '/' ? NetworkzHome : canonical === '/cybersecurity' ? CyberSecurityLanding : canonical === '/digital-marketing' ? DigitalMarketingLanding : null;
  return Page ? renderToString(<StaticRouter location={path}><Page /></StaticRouter>) : path === '/exam' ? '' : '<main><h1>Page not found</h1><p>This page could not be found.</p><a href="/">Return to Networkz Systems Kollam</a></main>';
}
