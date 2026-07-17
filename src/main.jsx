import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global Inspect & Copy Prevention
if (typeof window !== 'undefined') {
  // 1. Disable Right Click globally
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 2. Disable Text Selection globally
  document.addEventListener('selectstart', (e) => e.preventDefault());

  // 3. Disable Dragging globally
  document.addEventListener('dragstart', (e) => e.preventDefault());

  // 4. Disable standard DevTools keyboard shortcuts globally
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key)) ||
      (e.ctrlKey && ['u', 'U', 's', 'S', 'h', 'H'].includes(e.key))
    ) {
      e.preventDefault();
      return false;
    }
  });

  // 5. Anti-debugger trap (pauses execution repeatedly if DevTools is open)
  setInterval(() => {
    const startTime = +new Date();
    debugger;
    const endTime = +new Date();
    // If debugger check takes longer than 100ms, DevTools is active
    if (endTime - startTime > 100) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;font-size:18px;font-weight:bold;color:#ef4444;">DevTools detected. Access restricted.</div>';
    }
  }, 1000);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
