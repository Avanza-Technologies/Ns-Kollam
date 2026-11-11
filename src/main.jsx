import Lenis from 'lenis'
import CoursePage from './seo/CoursePage.jsx'
import { coursePages, directoryPages } from './seo/catalog.js'
import { useEffect } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Seo from './seo/Seo.jsx'
import NetworkzHome from './networkz/NetworkzHome.jsx'
import CyberSecurityLanding from './networkz/CyberSecurityLanding.jsx'
import DigitalMarketingLanding from './networkz/DigitalMarketingLanding.jsx'
import NotFound from './seo/NotFound.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

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

// ── Smooth Inertial Scrolling Motion ───────────────────────────────────────
function SmoothScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let lenis;

    let multiTouch = false;
    let touchTime = 0;
    let touchSpeed = 0;
    let lastTouchMove;

    function handleScrollInput(input) {
      const { event, deltaX, deltaY } = input;
      if (event.type === 'touchstart') {
        multiTouch = event.touches.length > 1;
        touchTime = event.timeStamp;
        touchSpeed = 0;
        lastTouchMove = undefined;
      }
      // Let the browser handle zoom and sideways swipes.
      if (event.touches && multiTouch) return false;
      if (event.ctrlKey || event.shiftKey || Math.abs(deltaX) > Math.abs(deltaY)) return false;

      if (event.type === 'touchmove') {
        touchSpeed = deltaY / Math.max(8, event.timeStamp - touchTime);
        touchTime = event.timeStamp;
        lastTouchMove = event;
      }
      if (event.type === 'touchend' && lastTouchMove?.defaultPrevented) {
        // Estimate the fling from the finger's speed. A pause before lifting cancels the coast.
        const releaseFactor = Math.max(0, 1 - (event.timeStamp - touchTime) / 100);
        const maxTravel = window.innerHeight * 0.85;
        const coast = Math.max(-maxTravel, Math.min(maxTravel, touchSpeed * 220 * releaseFactor));
        lenis.scrollTo(lenis.targetScroll + coast, {
          duration: 0.8,
          easing: (progress) => 1 - (1 - progress) ** 3,
        });
        return false;
      }
      if (event.type === 'wheel') {
        if (deltaY * (lenis.targetScroll - lenis.actualScroll) < 0) interruptScroll();
        // Add travel to larger wheel steps. Keep fine adjustments and page-sized steps exact.
        if (event.deltaMode !== WheelEvent.DOM_DELTA_PAGE) {
          const extraTravel = Math.min(Math.max(0, Math.abs(deltaY) - 12) * 1.6, window.innerHeight * 0.22);
          input.deltaY += Math.sign(deltaY) * extraTravel;
        }
      }
      return true;
    }

    function updatePreference() {
      lenis?.destroy();
      lenis = undefined;
      if (preference.matches) {
        lenis = new Lenis({
          autoRaf: true,
          allowNestedScroll: true,
          duration: 1.1,
          easing: (progress) => 1 - (1 - progress) ** 2,
          syncTouch: true,
          virtualScroll: handleScrollInput,
        });
      }
    }

    // Yield immediately when the user clicks a link, drags the scrollbar or uses the keyboard.
    function interruptScroll() {
      if (lenis?.isScrolling === 'smooth') {
        lenis.scrollTo(window.scrollY, { immediate: true });
      }
    }

    updatePreference();
    preference.addEventListener('change', updatePreference);
    window.addEventListener('pointerdown', interruptScroll);
    window.addEventListener('keydown', interruptScroll);

    return () => {
      preference.removeEventListener('change', updatePreference);
      window.removeEventListener('pointerdown', interruptScroll);
      window.removeEventListener('keydown', interruptScroll);
      lenis?.destroy();
    };
  }, [pathname]);

  useEffect(() => {
    if (navigationType === 'PUSH' && !hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash, navigationType]);

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
      <SmoothScrollManager />
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
