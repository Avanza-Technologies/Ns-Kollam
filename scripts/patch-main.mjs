import fs from 'node:fs';

let content = fs.readFileSync('src/main.jsx', 'utf8');

if (!content.includes("import Lenis from 'lenis'")) {
  content = "import Lenis from 'lenis';\r\n" + content;
}

const scrollManagerCode = `
// ── Smooth Inertial Scrolling Motion ───────────────────────────────────────
function SmoothScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const targetEl = document.getElementById(href.slice(1));
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -85, duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}
`;

if (!content.includes('function SmoothScrollManager')) {
  content = content.replace(
    'function PageTracker() {',
    `${scrollManagerCode.trim()}\r\n\r\nfunction PageTracker() {`
  );
}

if (!content.includes('<SmoothScrollManager />')) {
  content = content.replace(
    '<TrailingSlashNormalizer />',
    '<SmoothScrollManager />\r\n      <TrailingSlashNormalizer />'
  );
}

fs.writeFileSync('src/main.jsx', content, 'utf8');
console.log('Successfully patched src/main.jsx');
