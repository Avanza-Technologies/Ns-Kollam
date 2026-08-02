import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NetworkzHome.css';
import './CyberSecurityLanding.css';
import './DigitalMarketingLanding.css';

const WHATSAPP_PHONE = '918089030405';

const getWhatsAppUrl = (customMsg) => {
  const defaultMsg = [
    'NETWORKZ SYSTEMS KOLLAM',
    '══════════════════════',
    'Admissions Inquiry - Digital Marketing Professional Course',
    '══════════════════════',
    '',
    'Hello Admissions Desk! I want to claim the Special Offer (Actual Fee ₹35,000 → Now Only ₹15,000) for the Digital Marketing Course.',
    '',
    'Campus: Chinnakada, Kollam'
  ].join('\n');
  const msg = customMsg || defaultMsg;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};

/* ── 9 CORE MODULES DATA ── */
const MARKETING_MODULES = [
  {
    num: '01',
    title: 'Search Engine Optimization (SEO)',
    dur: '25 Hours Practical',
    tag: 'ORGANIC GROWTH',
    desc: 'Master On-Page, Off-Page, Technical SEO, Keyword Research, and Google Search Console to rank websites on Page 1 organically.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    skills: ['Keyword Research & Intent', 'On-Page & Technical SEO', 'Backlink Audits & Strategy', 'Google Search Console']
  },
  {
    num: '02',
    title: 'Google Ads (PPC Campaigns)',
    dur: '25 Hours Practical',
    tag: 'PAID TRAFFIC',
    desc: 'Learn Search Ads, Display Ads, Shopping Ads, YouTube Video Ads, Smart Bidding strategies, and conversion tracking.',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    skills: ['Google Search & Display Ads', 'YouTube Video Advertising', 'Quality Score Optimization', 'PPC Bidding Strategies']
  },
  {
    num: '03',
    title: 'Meta Ads (Facebook & Instagram)',
    dur: '20 Hours Practical',
    tag: 'SOCIAL MEDIA',
    desc: 'Create high-converting Meta Ad campaigns, custom lookalike audiences, Meta Pixel tracking, and retargeting funnels.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    skills: ['Facebook & IG Ad Setup', 'Lookalike & Custom Audiences', 'Meta Pixel & Conversion API', 'Ad Creative Strategy']
  },
  {
    num: '04',
    title: 'Google Business Handling & Local SEO',
    dur: '15 Hours Practical',
    tag: 'LOCAL SEO',
    desc: 'Set up & optimize Google My Business (GMB) profiles to dominate local map pack rankings and drive inbound calls.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    skills: ['GMB Profile Optimization', 'Local Map Pack Ranking', 'Review Management & Citation', 'Local Lead Generation']
  },
  {
    num: '05',
    title: 'Website Designing & Deployment',
    dur: '25 Hours Practical',
    tag: 'WEB ARCHITECTURE',
    desc: 'Build responsive business websites and high-converting landing pages using WordPress, Elementor, domains, hosting & SSL.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    skills: ['WordPress Site Building', 'Elementor Page Builder', 'Domain & Hosting Setup', 'UX/UI Landing Page Design']
  },
  {
    num: '06',
    title: 'CRM Tools & Lead Management',
    dur: '15 Hours Practical',
    tag: 'CRM AUTOMATION',
    desc: 'Integrate CRM systems (HubSpot, Zoho) to track leads, automate sales pipelines, and improve customer conversion rates.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    skills: ['HubSpot & Zoho CRM Setup', 'Lead Scoring & Tracking', 'Sales Funnel Automation', 'Customer Retention Systems']
  },
  {
    num: '07',
    title: 'Poster Design & Visual Branding',
    dur: '15 Hours Practical',
    tag: 'VISUAL BRANDING',
    desc: 'Design eye-catching ad banners, social media posts, stories, video reels, and brand assets using Canva Pro & Photoshop.',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=800&q=80',
    skills: ['Canva Pro Graphic Design', 'Social Media Layouts', 'Ad Banner Creation', 'Photoshop Essentials']
  },
  {
    num: '08',
    title: 'AI Tools Integration & Automations',
    dur: '15 Hours Practical',
    tag: 'AI AUTOMATIONS',
    desc: 'Harness ChatGPT, Midjourney, Jasper AI, and Zapier for automated ad copywriting, content creation & marketing workflows.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    skills: ['ChatGPT Copywriting', 'Midjourney AI Prompts', 'Zapier Automations', 'AI Content Generation']
  },
  {
    num: '09',
    title: 'Email Marketing & Automation',
    dur: '15 Hours Practical',
    tag: 'EMAIL DRIP',
    desc: 'Design automated drip campaigns, newsletter templates, audience list segmentation, and email analytics using Mailchimp.',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&q=80',
    skills: ['Mailchimp Drips', 'Newsletter Templates', 'Audience List Segment', 'A/B Testing & Analytics']
  }
];

/* ── 5 STAT CARDS (EXACT PASTEL BADGES) ── */
const STAT_CARDS = [
  {
    value: '1,000+',
    label: 'Graduates Trained & Placed in Top Firms',
    icon: '🎓',
    theme: 'pink'
  },
  {
    value: '₹500K+',
    label: 'Live Ad Budgets Managed in Campaigns',
    icon: '🚀',
    theme: 'green'
  },
  {
    value: '70%',
    label: 'Practical Hands-On & Live Projects',
    icon: '⚡',
    theme: 'purple'
  },
  {
    value: '100%',
    label: 'Placement & Direct Referral Drives',
    icon: '🏆',
    theme: 'lime'
  },
  {
    value: '2,000+',
    label: '5-Star Reviews from Alumni',
    icon: '⭐',
    theme: 'blue'
  }
];

/* ── 6 TREE TIERS PAIRING HIGHLIGHTS & TOOLS ── */
const TREE_TIERS = [
  {
    level: '01',
    highlight: {
      title: '100% Practical Training',
      desc: 'Execute live campaigns on active ad budgets and real business accounts.'
    },
    tools: [
      { name: 'Google Analytics 4', desc: 'Traffic & conversion tracking' },
      { name: 'Meta Ads Manager', desc: 'FB & Instagram campaign manager' }
    ]
  },
  {
    level: '02',
    highlight: {
      title: 'Live Projects & Case Studies',
      desc: 'Work on real-world client briefs to build a job-ready digital portfolio.'
    },
    tools: [
      { name: 'Google Ads', desc: 'Search, Display & YouTube Ads' },
      { name: 'SEMrush / Ahrefs', desc: 'Keyword research & backlink analysis' }
    ]
  },
  {
    level: '03',
    highlight: {
      title: 'Tools Worth ₹50,000+ Free',
      desc: 'Free access to premium SEO, AI, and graphics software licenses.'
    },
    tools: [
      { name: 'Canva Pro', desc: 'Visual poster & ad creative design' },
      { name: 'ChatGPT 4', desc: 'AI ad copy & content generation' }
    ]
  },
  {
    level: '04',
    highlight: {
      title: 'Industry Recognized Certificate',
      desc: 'Official Networkz Systems & ISO 9001:2015 accredited qualification.'
    },
    tools: [
      { name: 'WordPress', desc: 'CMS & landing page builder' },
      { name: 'Mailchimp', desc: 'Drip campaigns & newsletters' }
    ]
  },
  {
    level: '05',
    highlight: {
      title: '100% Placement Assistance',
      desc: 'Resume engineering, mock interviews & direct corporate placement drives.'
    },
    tools: [
      { name: 'HubSpot CRM', desc: 'Lead tracking & CRM pipeline' },
      { name: 'Zapier', desc: 'Marketing automation integration' }
    ]
  },
  {
    level: '06',
    highlight: {
      title: 'Lifetime Support & Updates',
      desc: 'Continuous access to updated course modules, alumni network & guidance.'
    },
    tools: [
      { name: 'ISO Accredited', desc: 'ISO certified qualification' },
      { name: 'Alumni Network', desc: 'Direct corporate referral network' }
    ]
  }
];

/* ── RADIAL TOOL NODES (EXACT POSITIONS) ── */
const RADIAL_NODES = [
  { icon: '🔍', x: 22, y: 22 },
  { icon: '🎯', x: 78, y: 20 },
  { icon: '📱', x: 88, y: 50 },
  { icon: '📊', x: 76, y: 80 },
  { icon: '🎨', x: 50, y: 88 },
  { icon: '🤖', x: 24, y: 80 },
  { icon: '🌐', x: 12, y: 50 },
  { icon: '✉️', x: 50, y: 12 }
];

const ROLE_OPTIONS = ['Student (Study)', 'Job Seeker (Job)', 'Business Owner / Entrepreneur', 'Working Professional', 'Other'];

export default function DigitalMarketingLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', role: 'Student (Study)' });
  const [submitted, setSubmitted] = useState(false);

  /* ── 3D ROTATING CAROUSEL STATE ── */
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev === 0 ? MARKETING_MODULES.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev === MARKETING_MODULES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => (prev === MARKETING_MODULES.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = [
      'NETWORKZ SYSTEMS KOLLAM',
      '══════════════════════',
      '🎉 SPECIAL OFFER CLAIM - DIGITAL MARKETING PROFESSIONAL COURSE',
      '══════════════════════',
      '',
      `Candidate Name : ${formData.name}`,
      `Phone Number   : ${formData.phone}`,
      `Current Status : ${formData.role}`,
      `Course Selected: Digital Marketing Professional Course`,
      'Special Offer  : ACTUAL FEE ₹35,000 → NOW ONLY ₹15,000',
      'Bonus Package  : FREE PREMIUM TOOLS ACCESS (WORTH ₹50,000+)',
      'Campus Location: Pattathuvila Plaza, 2nd Floor, Vadayattukotta Rd, Chinnakada, Kollam',
      '',
      '══════════════════════',
      'Hello Admissions Desk! I want to claim the ₹15,000 special offer price and enroll in the Digital Marketing Course. Please call me back!'
    ].join('\n');
    const waUrl = getWhatsAppUrl(msg);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToBooking = () => {
    const el = document.getElementById('nz-booking-sec');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="ix-theme-root">
      {/* ─────────────────────────────────────────────────────────
         STICKY HEADER WRAPPER (TOP BANNER + NAV BAR)
      ───────────────────────────────────────────────────────── */}
      <div className="ix-header-sticky-wrapper">
        {/* TOP FESTIVAL OFFER BANNER */}

        {/* NAVIGATION BAR */}
        <header className="ix-nav-bar">
          <div className="ix-nav-container">
            <Link to="/" className="ix-brand">
              <span className="ix-brand-name">NETWORKZ <span style={{ color: '#a5f3fc', fontWeight: 800 }}>SYSTEMS</span></span>
              <span className="ix-brand-badge">KOLLAM</span>
            </Link>

            <nav className="ix-nav-links">
              <a href="#overview" className="ix-nav-link active">About</a>
              <a href="#syllabus" className="ix-nav-link">Features</a>
              <a href="#tools" className="ix-nav-link">Integration</a>
              <a href="#contact" className="ix-nav-link">Services</a>
            </nav>

            <div className="ix-nav-actions">
              <button className="ix-btn-pill-outline" onClick={scrollToBooking}>
                Request Demo ↗
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ─────────────────────────────────────────────────────────
         SECTION 1: DEEP TEAL HERO HEADER (EXACT INTEGRATEX STYLE)
      ───────────────────────────────────────────────────────── */}
      <section id="overview" className="ix-hero-sec">
        <div className="ix-hero-bg-overlay">
          <div className="ix-hero-orb-1" />
          <div className="ix-hero-orb-2" />
        </div>

        {/* HERO CONTENT */}
        <div className="ix-container">
          <div className="ix-hero-content">
            <h1 className="ix-hero-serif-title">
              Unlock the power of<br />Digital Marketing Excellence
            </h1>

            <p className="ix-hero-subtitle">
              Learn. Practice. Grow. From Basics to Advanced Level. Master SEO, Google Ads, Meta Ads, AI Automations, Web Design & CRM tools with 100% practical hands-on training.
            </p>

            <div className="ix-hero-ctas">
              <button className="ix-btn-pill-solid-dark" onClick={scrollToBooking}>
                Start Free Trial
              </button>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="ix-btn-pill-outline-hero">
                Book a Demo
              </a>
            </div>

            {/* 3D HELIX RIBBON GRAPHIC */}
            <div className="ix-hero-ribbon-wrap">
              <svg className="ix-hero-ribbon-svg" viewBox="0 0 1000 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 90C120 150 250 30 380 90C510 150 640 30 770 90C900 150 1000 90 1000 90" stroke="url(#cyan-helix-1)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
                <path d="M0 105C140 40 270 160 410 95C550 30 680 150 820 95C930 50 1000 105 1000 105" stroke="url(#cyan-helix-2)" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
                <defs>
                  <linearGradient id="cyan-helix-1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="cyan-helix-2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* LOGO STRIP AT HERO BOTTOM */}
            <div className="ix-brand-strip">
              <div className="ix-brand-cloud">
                <span className="ix-cloud-item">✦ Google Analytics</span>
                <span className="ix-cloud-item">✦ Meta Ads</span>
                <span className="ix-cloud-item">✦ Google Ads</span>
                <span className="ix-cloud-item">✦ HubSpot</span>
                <span className="ix-cloud-item">✦ Mailchimp</span>
                <span className="ix-cloud-item">✦ Canva Pro</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         ENTERPRISE TRUST METRICS STRIP (CLEAN STATIC DESIGN)
      ───────────────────────────────────────────────────────── */}
      <section className="ix-trust-metrics-strip">
        <div className="ix-container">
          <div className="ix-trust-metrics-grid">
            <div className="ix-trust-metric-item">
              <div className="ix-metric-val-large">1,000+</div>
              <div className="ix-metric-lbl-sub">Graduates Placed in Top Firms</div>
            </div>

            <div className="ix-trust-metric-item">
              <div className="ix-metric-val-large">₹500K+</div>
              <div className="ix-metric-lbl-sub">Live Ad Budgets Managed</div>
            </div>

            <div className="ix-trust-metric-item">
              <div className="ix-metric-val-large">70%</div>
              <div className="ix-metric-lbl-sub">Practical Hands-On Campaign Ratio</div>
            </div>

            <div className="ix-trust-metric-item">
              <div className="ix-metric-val-large">100%</div>
              <div className="ix-metric-lbl-sub">Placement & Referral Support</div>
            </div>

            <div className="ix-trust-metric-item">
              <div className="ix-metric-val-large">4.9 ★</div>
              <div className="ix-metric-lbl-sub">2,000+ 5-Star Alumni Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         SECTION 3: ULTRA-PREMIUM 3-CARD FEATURE SUITE
      ───────────────────────────────────────────────────────── */}
      <section className="ix-features-sec">
        <div className="ix-container">
          <div className="ix-sec-header text-center">
            <span className="ix-sub-tag">ENTERPRISE GROWTH PLATFORM</span>
            <h2 className="ix-serif-heading">Key Features of Networkz Systems</h2>
            <p className="ix-sec-desc">
              Connect and manage multi-channel marketing campaigns, automated CRM pipelines, and real-time ROAS attribution models.
            </p>
          </div>

          <div className="ix-prem-features-grid">
            
            {/* Card 1: Search & Paid Traffic */}
            <div className="ix-prem-feature-card">
              <div className="ix-prem-card-preview dark-emerald-mesh">
                <div className="ix-preview-top-bar">
                  <span className="ix-status-dot green" />
                  <span className="ix-preview-label">Live Google Ads Console</span>
                </div>

                <div className="ix-preview-hero-stat">
                  <div className="ix-hero-stat-value">Rank #1</div>
                  <div className="ix-hero-stat-sub">Organic Search & Paid Traffic</div>
                </div>

                <div className="ix-preview-badges">
                  <span className="ix-badge-pill">Quality Score: 9.8/10</span>
                  <span className="ix-badge-pill highlight">+420% ROI</span>
                </div>
              </div>

              <div className="ix-prem-card-body">
                <span className="ix-prem-category">01 • TRAFFIC & AD ACQUISITION</span>
                <h3 className="ix-prem-title">Search Engine Optimization & Paid Ads</h3>
                <p className="ix-prem-desc">
                  Dominate Google Page 1 with On-Page, Off-Page & Technical SEO. Master Search, Display, Shopping, and YouTube Ads to maximize conversion efficiency.
                </p>
                <div className="ix-prem-skills-row">
                  <span>Google Ads</span>
                  <span>Meta Ads</span>
                  <span>SEO Audit</span>
                </div>
                <button className="ix-prem-cta-btn" onClick={scrollToBooking}>
                  Explore Search & Ads ↗
                </button>
              </div>
            </div>

            {/* Card 2: CRM & Lead Automation */}
            <div className="ix-prem-feature-card">
              <div className="ix-prem-card-preview dark-cyan-mesh">
                <div className="ix-preview-top-bar">
                  <span className="ix-status-dot cyan" />
                  <span className="ix-preview-label">Automated CRM Funnel</span>
                </div>

                <div className="ix-preview-pipeline-widget">
                  <div className="ix-pipeline-node">
                    <span className="ix-node-lbl">Inbound Lead</span>
                    <span className="ix-node-val">Rahul N.</span>
                  </div>
                  <div className="ix-pipeline-connector">→</div>
                  <div className="ix-pipeline-node">
                    <span className="ix-node-lbl">Stage</span>
                    <span className="ix-node-val active">Qualified</span>
                  </div>
                </div>

                <div className="ix-preview-badges">
                  <span className="ix-badge-pill">HubSpot CRM</span>
                  <span className="ix-badge-pill">Zoho Pipelines</span>
                </div>
              </div>

              <div className="ix-prem-card-body">
                <span className="ix-prem-category">02 • CRM & CONVERSION FUNNELS</span>
                <h3 className="ix-prem-title">Automated Sales Funnels & Lead CRM</h3>
                <p className="ix-prem-desc">
                  Set up HubSpot and Zoho CRM tools to track inbound leads, assign automated lead scores, schedule email drips, and convert prospects into loyal buyers.
                </p>
                <div className="ix-prem-skills-row">
                  <span>HubSpot</span>
                  <span>Zoho CRM</span>
                  <span>Email Drips</span>
                </div>
                <button className="ix-prem-cta-btn" onClick={scrollToBooking}>
                  Explore CRM Funnels ↗
                </button>
              </div>
            </div>

            {/* Card 3: GA4 & ROAS Analytics */}
            <div className="ix-prem-feature-card">
              <div className="ix-prem-card-preview dark-mint-mesh">
                <div className="ix-preview-top-bar">
                  <span className="ix-status-dot mint" />
                  <span className="ix-preview-label">GA4 Financial Revenue Hub</span>
                </div>

                <div className="ix-preview-hero-stat">
                  <div className="ix-hero-stat-value" style={{ color: '#34d399' }}>4.8x ROAS</div>
                  <div className="ix-hero-stat-sub">Live Ad Budgets Optimization</div>
                </div>

                <div className="ix-preview-badges">
                  <span className="ix-badge-pill">GA4 Events</span>
                  <span className="ix-badge-pill">Meta Pixel API</span>
                </div>
              </div>

              <div className="ix-prem-card-body">
                <span className="ix-prem-category">03 • FINANCIAL REVENUE & ATTRIBUTION</span>
                <h3 className="ix-prem-title">Real-Time Campaign ROI & Analytics</h3>
                <p className="ix-prem-desc">
                  Track every ad rupee spent across channels with GA4 & Meta Pixel conversion APIs. Make data-backed budget decisions with multi-touch attribution models.
                </p>
                <div className="ix-prem-skills-row">
                  <span>GA4</span>
                  <span>Meta Pixel</span>
                  <span>Looker Studio</span>
                </div>
                <button className="ix-prem-cta-btn" onClick={scrollToBooking}>
                  Explore GA4 Analytics ↗
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         SECTION 5: PREMIUM 3D ROTATING HORIZONTAL MODULES CAROUSEL
      ───────────────────────────────────────────────────────── */}
      <section id="syllabus" className="ix-syllabus-sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="ix-bg-decor-wrapper">
          <div className="ix-tech-grid-light" />
          <div className="ix-ambient-orb-cyan" style={{ bottom: '-15%', right: '-10%' }} />
        </div>

        <div className="ix-container">
          <div className="ix-sec-header text-center">
            <h2 className="ix-serif-heading">What You Will Learn</h2>
            <p className="ix-sec-desc">9 core modules designed to turn you into a complete Digital Marketing Specialist. Rotate left & right to explore.</p>
          </div>

          {/* 3D ROTATING CAROUSEL STAGE */}
          <div 
            className="ix-carousel-3d-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Nav Arrow */}
            <button 
              className="ix-carousel-btn ix-btn-prev" 
              onClick={handlePrevCard} 
              aria-label="Previous Module"
            >
              ‹
            </button>

            {/* Carousel Stage Container */}
            <div className="ix-carousel-stage">
              {MARKETING_MODULES.map((m, idx) => {
                let offset = idx - activeCardIndex;
                const total = MARKETING_MODULES.length;

                // Handle circular wrap-around
                if (offset > Math.floor(total / 2)) offset -= total;
                if (offset < -Math.floor(total / 2)) offset += total;

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                const isVisible = absOffset <= 2;

                return (
                  <div
                    key={m.num}
                    className={`ix-module-card ix-carousel-card ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${offset * 310}px) scale(${1 - absOffset * 0.12}) rotateY(${offset * -14}deg) translateZ(${-absOffset * 90}px)`,
                      opacity: isVisible ? Math.max(1 - absOffset * 0.35, 0) : 0,
                      pointerEvents: isVisible ? 'auto' : 'none',
                      zIndex: 20 - absOffset,
                    }}
                    onClick={() => setActiveCardIndex(idx)}
                  >
                    <div className="ix-module-media">
                      <img src={m.image} alt={m.title} className="ix-module-img" />
                      <span className="ix-module-tag">{m.tag}</span>
                      <span className="ix-module-dur">{m.dur}</span>
                      <span className="ix-module-num-badge">{m.num}</span>
                    </div>

                    <div className="ix-module-body">
                      <h3 className="ix-module-title">{m.title}</h3>
                      <p className="ix-module-desc">{m.desc}</p>

                      <div className="ix-module-skills">
                        {m.skills.map((sk) => (
                          <span key={sk} className="ix-skill-chip">
                            ✦ {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Nav Arrow */}
            <button 
              className="ix-carousel-btn ix-btn-next" 
              onClick={handleNextCard} 
              aria-label="Next Module"
            >
              ›
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="ix-carousel-pagination">
            {MARKETING_MODULES.map((m, idx) => (
              <button
                key={m.num}
                className={`ix-pagination-dot ${idx === activeCardIndex ? 'active' : ''}`}
                onClick={() => setActiveCardIndex(idx)}
              >
                <span className="ix-dot-num">{m.num}</span>
                <span className="ix-dot-label">{m.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         SECTION 7: 6-TIER CENTER-LINE MASTERCLASS TREE
      ───────────────────────────────────────────────────────── */}
      <section id="benefits" className="ix-tree-sec">
        <div className="ix-container">
          <div className="ix-sec-header text-center">
            <h2 className="ix-serif-heading">Program Highlights & Master Tools</h2>
            <p className="ix-sec-desc">
              Pairing practical course highlights with agency tool suites along a center stem.
            </p>
          </div>

          <div className="ix-tree-wrapper">
            <div className="ix-tree-stem" />

            <div className="ix-tree-rows">
              {TREE_TIERS.map((tier) => (
                <div key={tier.level} className="ix-tree-row">
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="ix-tree-card">
                      <h3 className="ix-card-title">{tier.highlight.title}</h3>
                      <p className="ix-card-desc">{tier.highlight.desc}</p>
                    </div>
                  </div>

                  <div className="ix-tree-node-circle">
                    <span>{tier.level}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div className="ix-tree-card">
                      {tier.tools.map((t) => (
                        <div key={t.name} style={{ marginBottom: '0.4rem' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--ix-text-dark)' }}>{t.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--ix-text-body)' }}>{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         SECTION 9: KOLLAM CAMPUS & OFFER BOOKING FORM
      ───────────────────────────────────────────────────────── */}
      <section id="contact" className="ix-booking-sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="ix-bg-decor-wrapper">
          <div className="ix-tech-grid-light" />
          <div className="ix-ambient-orb-mint" style={{ bottom: '-10%', left: '-5%' }} />
        </div>
        <div id="nz-booking-sec" className="ix-container">
          <div className="ix-booking-grid">

            {/* Left: Kollam HQ */}
            <div className="ix-hq-card">
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--ix-text-dark)', background: '#dce8e4', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                KOLLAM CAMPUS HQ
              </span>
              <h2 style={{ fontFamily: 'var(--ix-font-serif)', fontSize: '2rem', margin: '0.8rem 0 0.5rem 0', color: 'var(--ix-text-dark)' }}>
                Networkz Systems Kollam
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--ix-text-body)', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                Pattathuvila Plaza, 2nd Floor, Vadayattukotta Rd, Chinnakada, Kollam, Kerala 691001
              </p>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                📞 Phone / WhatsApp: <a href="https://wa.me/918089030405" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ix-text-dark)' }}>+91 8089 03 04 05</a>
              </div>
              <a href="https://maps.google.com/?q=Networkz+Systems+Kollam+Chinnakada" target="_blank" rel="noopener noreferrer" className="ix-btn-pill-white" style={{ display: 'inline-block', textDecoration: 'none' }}>
                📍 View on Google Maps ↗
              </a>
            </div>

            {/* Right: Booking Form */}
            <div className="ix-form-card">
              <h3 style={{ fontFamily: 'var(--ix-font-serif)', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>Enroll Now @ ₹15,000</h3>
              <p style={{ fontSize: '0.85rem', color: '#bce5e8', margin: '0 0 1.4rem 0' }}>Submit your details to lock in the special offer price immediately.</p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <h4 style={{ fontFamily: 'var(--ix-font-serif)', fontSize: '1.5rem' }}>₹15,000 OFFER CLAIM SENT!</h4>
                  <p style={{ fontSize: '0.85rem', color: '#bce5e8' }}>Thank you <strong>{formData.name}</strong>! Your offer seat reservation has been sent on WhatsApp.</p>
                  <button className="ix-btn-pill-solid-dark" style={{ background: '#ffffff', color: 'var(--ix-teal-dark)', marginTop: '1rem' }} onClick={() => setSubmitted(false)}>Book Another Seat</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', color: '#bce5e8' }}>YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Nair"
                      className="ix-form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', color: '#bce5e8' }}>PHONE / WHATSAPP NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 80890 30405"
                      className="ix-form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', color: '#bce5e8' }}>CURRENT STATUS / ROLE</label>
                    <select
                      className="ix-form-input"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="ix-btn-pill-solid-dark" style={{ background: '#ffffff', color: 'var(--ix-teal-dark)', width: '100%', marginTop: '0.5rem' }}>
                    CLAIM ₹15,000 OFFER & ENROLL NOW 💬 ↗
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         SECTION 10: CRISP PURE WHITE FOOTER (EXACT MATCH)
      ───────────────────────────────────────────────────────── */}
      <footer className="ix-footer">
        <div className="ix-container">
          <div className="ix-footer-grid">

            {/* Col 1 */}
            <div>
              <div className="ix-footer-logo">NETWORKZ <span style={{ color: '#0d3a3f', fontWeight: 800 }}>SYSTEMS</span></div>
              <p className="ix-footer-desc">
                Networkz Systems Kollam — ISO 9001:2015 accredited technology & digital marketing training institute. Empowering career breakthroughs.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="ix-footer-heading">Resources</h4>
              <ul className="ix-footer-links">
                <li><a href="#overview">Overview</a></li>
                <li><a href="#syllabus">Features</a></li>
                <li><a href="#benefits">Integration</a></li>
                <li><a href="#tools">Services</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="ix-footer-heading">Instruction</h4>
              <ul className="ix-footer-links">
                <li><a href="#syllabus">SEO & Google Ads</a></li>
                <li><a href="#syllabus">Meta Ads</a></li>
                <li><a href="#syllabus">WordPress</a></li>
                <li><a href="#syllabus">CRM & AI Tools</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="ix-footer-heading">Legal</h4>
              <ul className="ix-footer-links">
                <li><a href="#contact">Privacy Policy</a></li>
                <li><a href="#contact">Terms of Service</a></li>
                <li><span>ISO 9001:2015 Accredited</span></li>
              </ul>
            </div>

          </div>

          <div className="ix-footer-bottom">
            <span>NETWORKZ SYSTEMS KOLLAM</span>
            <span>© 2025 Networkz Systems Kollam. ISO 9001:2015 Certified. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
