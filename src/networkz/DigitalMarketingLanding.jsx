import { useState } from 'react';
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

/* ── 9 CORE MODULES DATA WITH HIGH-RES UN SPLASH GRAPHICS ── */
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

/* ── 6 TREE TIERS PAIRING PROGRAM HIGHLIGHTS & INDUSTRY TOOLS ALONG CENTER LINE ── */
const TREE_TIERS = [
  {
    level: '01',
    highlight: {
      title: '100% Practical Training',
      desc: 'Execute live campaigns on active ad budgets and real business accounts.',
      tag: 'NETWORKZ SPECIAL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    tools: [
      {
        name: 'Google Analytics 4',
        cat: 'ANALYTICS',
        desc: 'Traffic & conversion tracking',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      },
      {
        name: 'Meta Ads Manager',
        cat: 'PAID SOCIAL',
        desc: 'FB & Instagram campaign manager',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        )
      }
    ]
  },
  {
    level: '02',
    highlight: {
      title: 'Live Projects & Case Studies',
      desc: 'Work on real-world client briefs to build a job-ready digital portfolio.',
      tag: 'NETWORKZ SPECIAL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    tools: [
      {
        name: 'Google Ads',
        cat: 'PPC TRAFFIC',
        desc: 'Search, Display & YouTube Ads',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )
      },
      {
        name: 'SEMrush / Ahrefs',
        cat: 'SEO AUDITING',
        desc: 'Keyword research & backlink analysis',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )
      }
    ]
  },
  {
    level: '03',
    highlight: {
      title: 'Tools Worth ₹50,000+ Free',
      desc: 'Free access to premium SEO, AI, and graphics software licenses.',
      tag: 'NETWORKZ SPECIAL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      )
    },
    tools: [
      {
        name: 'Canva Pro',
        cat: 'GRAPHICS',
        desc: 'Visual poster & ad creative design',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          </svg>
        )
      },
      {
        name: 'ChatGPT 4',
        cat: 'AI COPYWRITING',
        desc: 'AI ad copy & content generation',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
          </svg>
        )
      }
    ]
  },
  {
    level: '04',
    highlight: {
      title: 'Industry Recognized Certificate',
      desc: 'Official Networkz Systems & ISO 9001:2015 accredited qualification.',
      tag: 'NETWORKZ SPECIAL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    tools: [
      {
        name: 'WordPress',
        cat: 'WEB BUILDING',
        desc: 'CMS & landing page builder',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
          </svg>
        )
      },
      {
        name: 'Mailchimp',
        cat: 'EMAIL DRIP',
        desc: 'Drip campaigns & newsletters',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )
      }
    ]
  },
  {
    level: '05',
    highlight: {
      title: '100% Placement Assistance',
      desc: 'Resume engineering, mock interviews & direct corporate placement drives.',
      tag: 'NETWORKZ SPECIAL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    tools: [
      {
        name: 'HubSpot CRM',
        cat: 'SALES FUNNEL',
        desc: 'Lead tracking & CRM pipeline',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        )
      },
      {
        name: 'Zapier',
        cat: 'WORKFLOW AI',
        desc: 'Marketing automation integration',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        )
      }
    ]
  },
  {
    level: '06',
    highlight: {
      title: 'Lifetime Support & Updates',
      desc: 'Continuous access to updated course modules, alumni network & guidance.',
      tag: 'NETWORKZ SPECIAL',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    tools: [
      {
        name: 'ISO 9001:2015 Accredited',
        cat: 'GLOBAL CERT',
        desc: 'ISO certified qualification',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        )
      },
      {
        name: 'Alumni Placement Network',
        cat: 'CAREER DRIVE',
        desc: 'Direct corporate referral network',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        )
      }
    ]
  }
];

const ROLE_OPTIONS = ['Student (Study)', 'Job Seeker (Job)', 'Business Owner / Entrepreneur', 'Working Professional', 'Other'];

export default function DigitalMarketingLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', role: 'Student (Study)' });
  const [submitted, setSubmitted] = useState(false);

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
    <div className="nz-cyber-luxury-root">
      {/* ─────────────────────────────────────────────────────────
         TOP NAVIGATION (EXACT HOMEPAGE HEADER & LOGO)
      ───────────────────────────────────────────────────────── */}
      <header className="nz-nav nz-nav--scrolled">
        <div className="nz-nav-left">
          <Link to="/" className="nz-nav-brand">
            <span className="nz-brand-title">NETWORKZ <span className="nz-brand-accent">SYSTEMS</span></span>
            <span className="nz-brand-badge">KOLLAM</span>
          </Link>
        </div>

        <nav className="nz-nav-links" aria-label="Digital Marketing Navigation">
          <a href="#overview" className="nz-nav-active">OVERVIEW</a>
          <a href="#syllabus">SYLLABUS</a>
          <a href="#benefits">BENEFITS</a>
          <a href="#tools">TOOLS STACK</a>
          <a href="#contact">KOLLAM CAMPUS</a>
        </nav>

        <div className="nz-nav-right" style={{ gap: '0.8rem' }}>
          <button className="nz-nav-portal" onClick={scrollToBooking} style={{ cursor: 'pointer' }}>
            CLAIM ₹15,000 OFFER ↗
          </button>
          <button className="nz-btn-ghost" onClick={() => navigate('/')} style={{ padding: '0.55rem 1rem', fontSize: '0.78rem' }}>
            ← HOME
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────
         OFFER BANNER
      ───────────────────────────────────────────────────────── */}
      <div className="nz-cyber-top-banner">
        <div className="nz-cyber-banner-shimmer" />
        <span>🎉 SPECIAL FESTIVAL OFFER: ACTUAL FEE ₹35,000 → NOW ONLY ₹15,000 (SAVE ₹20,000 / 57% OFF) AT KOLLAM CAMPUS! 🎉</span>
      </div>

      {/* ─────────────────────────────────────────────────────────
         INTERNATIONAL LUXURY HERO SECTION
      ───────────────────────────────────────────────────────── */}
      <section id="overview" className="nz-dm-hero-sec">
        <div className="nz-dm-hero-bg">
          <div className="nz-dm-hero-orb-1" />
          <div className="nz-dm-hero-orb-2" />
          <div className="nz-dm-hero-grid-pattern" />
          <div className="nz-dm-hero-light-beam" />
        </div>

        <div className="nz-cyber-container">
          <div className="nz-dm-hero-inner">
            
            {/* Left Column: Hero Content & Luxury Offer Box */}
            <div className="nz-dm-hero-content">
              
              {/* Live ISO Certification Pill */}
              <div className="nz-dm-hero-pill-badge">
                <span className="nz-dm-pulse-dot" />
                <span className="nz-dm-pill-text">BUILD SKILLS. BUILD CAREER. — ISO 9001:2015 CERTIFIED</span>
              </div>

              {/* Main Headline */}
              <h1 className="nz-dm-hero-title">
                DIGITAL MARKETING<br />
                <span className="nz-dm-hero-gradient-text">PROFESSIONAL COURSE</span>
              </h1>

              {/* Subtitle */}
              <p className="nz-dm-hero-subtitle">
                Learn. Practice. Grow. From Basics to Advanced Level. Master SEO, Google Ads, Meta Ads, AI Automations, Web Design & CRM tools with 100% practical hands-on training.
              </p>

              {/* Luxury Fintech Offer Card */}
              <div className="nz-dm-offer-card">
                <div className="nz-dm-offer-card-shimmer" />
                
                {/* Header Row: Actual Fee vs Save Badge */}
                <div className="nz-dm-offer-top-bar">
                  <div className="nz-dm-fee-old">
                    <span className="nz-dm-fee-label">ACTUAL FEE</span>
                    <del className="nz-dm-fee-strike">₹35,000</del>
                  </div>
                  <div className="nz-dm-save-badge">
                    <span className="nz-dm-save-pulse" />
                    <span>SAVE ₹20,000 (57% OFF)</span>
                  </div>
                </div>

                {/* Main Special Price Counter */}
                <div className="nz-dm-price-row">
                  <span className="nz-dm-price-label">SPECIAL OFFER:</span>
                  <div className="nz-dm-price-amount">
                    ₹15,000 <span className="nz-dm-price-sub">/ Complete Course</span>
                  </div>
                </div>

                {/* Bonus License Inclusion Bar */}
                <div className="nz-dm-offer-bonus-bar">
                  <div className="nz-dm-bonus-icon">🎁</div>
                  <div className="nz-dm-bonus-info">
                    <strong>BONUS INCLUDED:</strong> Free Premium Tools Access Worth ₹50,000+ (SEO, AI Copywriting, Meta Ads & Graphics Licenses)
                  </div>
                </div>

                {/* Micro-Ticker footer inside card */}
                <div className="nz-dm-offer-footer">
                  <span className="nz-dm-offer-chip">⚡ 100% Practical Training</span>
                  <span className="nz-dm-offer-chip">🏆 Corporate Placement Assistance</span>
                </div>
              </div>

              {/* CTA Group */}
              <div className="nz-dm-hero-cta-group">
                <button className="nz-dm-btn-primary" onClick={scrollToBooking}>
                  <span>CLAIM OFFER @ ₹15,000</span>
                  <span className="nz-dm-btn-arrow">↗</span>
                </button>

                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="nz-dm-btn-whatsapp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>TALK TO ADVISOR ON WHATSAPP</span>
                </a>
              </div>

            </div>

            {/* Right Column: International 3D Media Showcase with Floating Glass Chips */}
            <div className="nz-dm-hero-media-showcase">
              <div className="nz-dm-showcase-backdrop-glow" />
              
              <div className="nz-dm-showcase-frame">
                
                {/* Main Dashboard Image */}
                <div className="nz-dm-showcase-img-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
                    alt="Digital Marketing Campaign Analytics & Strategy"
                    className="nz-dm-showcase-img"
                  />
                  <div className="nz-dm-showcase-gradient-overlay" />
                </div>

                {/* Top Badge: Batch Status */}
                <div className="nz-dm-badge-top-left">
                  <span className="nz-dm-pulse-green" />
                  <span>BATCH STARTING SOON — LIMITED SEATS</span>
                </div>

                {/* Floating Glass Chip 1: Live Campaign ROI */}
                <div className="nz-dm-float-chip nz-dm-float-chip--top-right">
                  <div className="nz-dm-chip-icon">📈</div>
                  <div>
                    <div className="nz-dm-chip-title">+420% ROI</div>
                    <div className="nz-dm-chip-sub">Live Campaign Traffic</div>
                  </div>
                </div>

                {/* Floating Glass Chip 2: Tools Access */}
                <div className="nz-dm-float-chip nz-dm-float-chip--bottom-left">
                  <div className="nz-dm-chip-icon">🛠️</div>
                  <div>
                    <div className="nz-dm-chip-title">₹50,000+ Tools</div>
                    <div className="nz-dm-chip-sub">SEO, AI & Ad Software</div>
                  </div>
                </div>

                {/* Bottom Trust Overlay Bar */}
                <div className="nz-dm-showcase-trust-bar">
                  <div className="nz-dm-trust-badge-icon">🏆</div>
                  <div className="nz-dm-trust-text">
                    <div className="nz-dm-trust-h4">100% Practical Training & Live Client Projects</div>
                    <div className="nz-dm-trust-p">ISO 9001:2015 Certified Qualification • Direct Placement Drives</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         WHAT YOU WILL LEARN (9 MODULES WITH EXACT VISUAL CARDS)
      ───────────────────────────────────────────────────────── */}
      <section id="syllabus" className="nz-cyber-syllabus-sec">
        <div className="nz-cyber-container">
          <div className="nz-cyber-sec-header">
            <span className="nz-cyber-tag-cyan">COMPREHENSIVE SYLLABUS</span>
            <h2 className="nz-cyber-sec-h2">What You Will Learn (From Basics to Advanced)</h2>
            <p className="nz-cyber-sec-p">9 core modules designed to turn you into a complete Digital Marketing Specialist.</p>
          </div>

          <div className="nz-cyber-modules-grid">
            {MARKETING_MODULES.map((m) => (
              <div key={m.num} className="nz-cyber-module-card">
                <div className="nz-module-media">
                  <img src={m.image} alt={m.title} className="nz-module-img" />
                  <span className="nz-module-tag">{m.tag}</span>
                  <span className="nz-module-dur">{m.dur}</span>
                  <span className="nz-module-num-watermark">{m.num}</span>
                </div>

                <div className="nz-module-body">
                  <h3 className="nz-module-title">{m.title}</h3>
                  <p className="nz-module-desc">{m.desc}</p>

                  <div className="nz-module-skills">
                    {m.skills.map((sk) => (
                      <span key={sk} className="nz-cyber-skill-chip">
                        ✦ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         CENTER LINE TREE TIMELINE: PROGRAM HIGHLIGHTS & TOOLS
      ───────────────────────────────────────────────────────── */}
      <section id="highlights-and-tools" className="nz-dm-tree-sec">
        <div className="nz-cyber-container">
          
          {/* Section Main Header */}
          <div className="nz-dm-tree-main-header">
            <div className="nz-dm-tree-tags-group">
              <span className="nz-cyber-tag-cyan" id="benefits">WHY CHOOSE US</span>
              <span className="nz-dm-tree-tag-divider">✦</span>
              <span className="nz-cyber-tag-cyan" id="tools">INDUSTRY STACK</span>
            </div>
            <h2 className="nz-cyber-sec-h2">Program Highlights & Tools You Will Master</h2>
            <div className="nz-dm-header-glow-line" />
            <p className="nz-cyber-sec-p">
              Explore our masterclass tree — pairing core practical benefits on the left with elite agency tools on the right, connected by a central learning stem.
            </p>
          </div>

          {/* Tree Outer Wrapper with Central Line */}
          <div className="nz-dm-tree-wrapper">
            
            {/* Central Vertical Trunk Line */}
            <div className="nz-dm-tree-center-line">
              <div className="nz-dm-tree-laser-pulse" />
            </div>

            {/* Tree Rows (Levels 01 - 06) */}
            <div className="nz-dm-tree-rows-list">
              {TREE_TIERS.map((tier) => (
                <div key={tier.level} className="nz-dm-tree-row">
                  
                  {/* Left Branch: Program Highlight Card */}
                  <div className="nz-dm-tree-branch nz-dm-tree-branch--left">
                    <div className="nz-dm-tree-card nz-dm-tree-card--highlight">
                      <div className="nz-dm-card-header">
                        <span className="nz-dm-card-index">0{tier.level}</span>
                        <div className="nz-dm-card-icon-box">
                          {tier.highlight.icon}
                        </div>
                        <span className="nz-dm-card-badge">{tier.highlight.tag}</span>
                      </div>
                      <h3 className="nz-dm-card-title">{tier.highlight.title}</h3>
                      <p className="nz-dm-card-desc">{tier.highlight.desc}</p>
                      <div className="nz-dm-branch-connector-dot nz-dm-branch-connector-dot--right" />
                    </div>
                    <div className="nz-dm-branch-line nz-dm-branch-line--left" />
                  </div>

                  {/* Center Node Badge */}
                  <div className="nz-dm-tree-center-node">
                    <div className="nz-dm-node-halo" />
                    <div className="nz-dm-node-circle">
                      <span className="nz-dm-node-num">{tier.level}</span>
                    </div>
                  </div>

                  {/* Right Branch: Industry Tools Cards */}
                  <div className="nz-dm-tree-branch nz-dm-tree-branch--right">
                    <div className="nz-dm-branch-line nz-dm-branch-line--right" />
                    <div className="nz-dm-tree-card nz-dm-tree-card--tools">
                      <div className="nz-dm-tools-mini-grid">
                        {tier.tools.map((t) => (
                          <div key={t.name} className="nz-dm-tool-item-mini">
                            <div className="nz-dm-tool-item-icon">
                              {t.icon}
                            </div>
                            <div className="nz-dm-tool-item-body">
                              <div className="nz-dm-tool-item-top">
                                <h4 className="nz-dm-tool-item-name">{t.name}</h4>
                                <span className="nz-dm-tool-item-cat">{t.cat}</span>
                              </div>
                              <p className="nz-dm-tool-item-desc">{t.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="nz-dm-branch-connector-dot nz-dm-branch-connector-dot--left" />
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Tree Roots / Bottom Accent Badge */}
            <div className="nz-dm-tree-footer-badge">
              <span className="nz-dm-footer-icon">⚡</span>
              <span>100% PRACTICAL HANDS-ON LEARNING ECOSYSTEM</span>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────
         BOOKING AREA & KOLLAM CAMPUS CONTACT
      ───────────────────────────────────────────────────────── */}
      <section id="contact" className="nz-cyber-booking-sec">
        <div id="nz-booking-sec" className="nz-cyber-container">
          <div className="nz-cyber-booking-grid">
            
            {/* Left: Kollam HQ Card */}
            <div className="nz-cyber-hq-card">
              <div className="nz-hq-tag">
                <span className="nz-cyber-pulse-green" /> KOLLAM CAMPUS
              </div>

              <h2 className="nz-hq-title">Networkz Systems Kollam Campus</h2>
              <p className="nz-hq-desc">
                Visit our campus or contact our admissions desk today to lock in your ₹15,000 offer price before limited seats fill up!
              </p>

              <div className="nz-hq-details">
                <div className="nz-hq-item">
                  <span className="nz-hq-icon">📍</span>
                  <div>
                    <div className="nz-hq-lbl">Campus Address</div>
                    <div className="nz-hq-val">Pattathuvila Plaza, 2nd Floor, Vadayattukotta Rd, Chinnakada, Kollam, Kerala 691001</div>
                  </div>
                </div>

                <div className="nz-hq-item">
                  <span className="nz-hq-icon">📞</span>
                  <div>
                    <div className="nz-hq-lbl">Call Us / WhatsApp</div>
                    <div className="nz-hq-val">
                      <a href="https://wa.me/918089030405" target="_blank" rel="noopener noreferrer" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold' }}>
                        +91 8089 03 04 05
                      </a>
                    </div>
                  </div>
                </div>

                <div className="nz-hq-item">
                  <span className="nz-hq-icon">✉️</span>
                  <div>
                    <div className="nz-hq-lbl">Official Email</div>
                    <div className="nz-hq-val">
                      <a href="mailto:support@nskollam.com" style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 'bold' }}>support@nskollam.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Networkz+Systems+Kollam+Chinnakada"
                target="_blank"
                rel="noopener noreferrer"
                className="nz-hq-maps-btn"
              >
                📍 GET DIRECTIONS ON GOOGLE MAPS ↗
              </a>
            </div>

            {/* Right: Booking Form Card */}
            <div className="nz-cyber-form-card">
              <div className="nz-form-head">
                <span className="nz-form-tag">BATCH STARTING SOON</span>
                <h3 className="nz-form-h3">Enroll Now @ ₹15,000</h3>
                <p className="nz-form-p">Submit your name and phone number below to lock in the ₹15,000 special price offer.</p>
              </div>

              {submitted ? (
                <div className="nz-cyber-success">
                  <div className="nz-success-check">✓</div>
                  <h4 className="nz-success-h4">₹15,000 OFFER CLAIM SENT!</h4>
                  <p className="nz-success-p">
                    Thank you <strong>{formData.name}</strong>! Your offer seat reservation has been sent to our Kollam admissions team on WhatsApp.
                  </p>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="nz-cyber-btn-primary" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
                    RE-OPEN WHATSAPP 💬 →
                  </a>
                  <button className="nz-cyber-btn-outline" onClick={() => setSubmitted(false)} style={{ marginTop: '0.5rem' }}>BOOK ANOTHER SEAT</button>
                </div>
              ) : (
                <form className="nz-cyber-form" onSubmit={handleSubmit}>
                  <div className="nz-form-group">
                    <label className="nz-form-label">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Nair"
                      className="nz-form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="nz-form-group">
                    <label className="nz-form-label">PHONE / WHATSAPP NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 80890 30405"
                      className="nz-form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="nz-form-group">
                    <label className="nz-form-label">CURRENT STATUS / ROLE</label>
                    <select
                      className="nz-form-input"
                      style={{ background: '#0f172a', color: '#ffffff' }}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r} style={{ background: '#0f172a', color: '#ffffff' }}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="nz-cyber-btn-primary" style={{ width: '100%', marginTop: '0.8rem' }}>
                    CLAIM ₹15,000 OFFER & ENROLL NOW 💬 ↗
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         FOOTER
      ───────────────────────────────────────────────────────── */}
      <footer className="nz-cyber-footer">
        <div className="nz-cyber-container">
          <div className="nz-footer-text">
            © 2025 Networkz Systems · ISO 9001:2015 Certified · Digital Marketing Professional Course · Kollam Campus
          </div>
        </div>
      </footer>
    </div>
  );
}
