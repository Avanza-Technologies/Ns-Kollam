import CoursePage from './CoursePage.jsx';
import { coursePages, directoryPages } from './catalog.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import NetworkzHome from '../networkz/NetworkzHome.jsx';
import CyberSecurityLanding from '../networkz/CyberSecurityLanding.jsx';
import DigitalMarketingLanding from '../networkz/DigitalMarketingLanding.jsx';
import NotFound from './NotFound.jsx';
import { aliases } from './pages.js';
export function render(path) {
  const canonical = aliases[path] || path;
  if (coursePages[canonical] || directoryPages[canonical]) return renderToString(<CoursePage path={canonical} />);
  const Page = canonical === '/' ? NetworkzHome : canonical === '/cybersecurity' ? CyberSecurityLanding : canonical === '/digital-marketing' ? DigitalMarketingLanding : canonical === '/404' ? NotFound : null;
  return Page ? renderToString(<StaticRouter location={path}><Page /></StaticRouter>) : path === '/exam' ? '' : renderToString(<NotFound />);
}
