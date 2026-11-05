import CoursePage from './seo/CoursePage.jsx'
import { coursePages, directoryPages } from './seo/catalog.js'
import { useEffect } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Seo from './seo/Seo.jsx'
import NetworkzHome from './networkz/NetworkzHome.jsx'
import CyberSecurityLanding from './networkz/CyberSecurityLanding.jsx'
import DigitalMarketingLanding from './networkz/DigitalMarketingLanding.jsx'
import NotFound from './seo/NotFound.jsx'

// ── Trailing Slash Normalizer (Ensures clean slash-free URLs match canonical) ──
function TrailingSlashNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
      const cleanPath = location.pathname.replace(/\/+$/, '') + location.search + location.hash;
      navigate(cleanPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

// ── Google Tag SPA Route Tracker ───────────────────────────────────────────
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'AW-456823062', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

// ── DevTools guard — only active on /exam route ───────────────────────────
if (typeof window !== 'undefined' && window.location.pathname.startsWith('/exam')) {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('selectstart', (e) => e.preventDefault());
  document.addEventListener('dragstart', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['i','I','j','J','c','C'].includes(e.key)) ||
      (e.ctrlKey && ['u','U','s','S','h','H'].includes(e.key))
    ) {
      e.preventDefault();
      return false;
    }
  });

  setInterval(() => {
    const t0 = +new Date();
    // eslint-disable-next-line no-debugger
    debugger;
    if (+new Date() - t0 > 100) {
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;font-size:18px;font-weight:bold;color:#ef4444;">DevTools detected. Access restricted.</div>';
    }
  }, 1000);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TrailingSlashNormalizer />
      <Seo />
      <PageTracker />
      <Routes>
        {Object.keys({...coursePages, ...directoryPages}).map(path => <Route key={path} path={path} element={<CoursePage path={path} />} />)}
        {/* Networkz Systems cinematic experience — flagship route */}
        <Route path="/" element={<NetworkzHome />} />

        {/* Dedicated Cyber Security & Ethical Hacking Course Landing Page */}
        <Route path="/cybersecurity" element={<CyberSecurityLanding />} />
        <Route path="/cyber-security" element={<CyberSecurityLanding />} />
        <Route path="/cyber" element={<CyberSecurityLanding />} />
        <Route path="/ethical-hacking" element={<CyberSecurityLanding />} />

        {/* Dedicated Digital Marketing Professional Course Landing Page */}
        <Route path="/digital-marketing" element={<DigitalMarketingLanding />} />
        <Route path="/digitalmarketing" element={<DigitalMarketingLanding />} />
        <Route path="/dm" element={<DigitalMarketingLanding />} />

        {/* Existing exam portal — preserved as a sub-route */}
        <Route path="/exam" element={<App />} />
        <Route path="/exam/*" element={<App />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
