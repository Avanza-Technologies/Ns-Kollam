import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NetworkzHome.css';
import './CyberSecurityLanding.css';

const WHATSAPP_PHONE = '918089030405';

const getWhatsAppUrl = (customMsg) => {
  const defaultMsg = [
    'NETWORKZ SYSTEMS KOLLAM',
    '══════════════════════',
    'Admissions Inquiry - Ethical Hacking & Cyber Security',
    '══════════════════════',
    '',
    'Hello Admissions Desk! I would like to inquire about your Cyber Security course, 20% discount offer, and batch schedules.',
    '',
    'Campus: Chinnakada, Kollam'
  ].join('\n');
  const msg = customMsg || defaultMsg;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
};

/* ── BRAND LOGO COMPONENT ── */
function NetworkzOfficialLogo() {
  return (
    <Link to="/" className="nz-cyber-logo-link">
      <div className="nz-cyber-logo-text-box">
        <div className="nz-cyber-logo-main">NETWORKZ</div>
        <div className="nz-cyber-logo-sub">SYSTEMS</div>
        <div className="nz-cyber-logo-divider" />
        <div className="nz-cyber-logo-iso">AN ISO 9001 : 2015 CERTIFIED COMPANY</div>
      </div>
      <div className="nz-cyber-emblem-wrap">
        <span className="nz-cyber-reg-mark">®</span>
        <div className="nz-cyber-emblem-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="15.2" cy="4" r="1.4" fill="#ffffff" stroke="none" />
            <path d="M11.5 16.5 L 16 9.5 L 20 4.5" />
            <path d="M14.5 11 L 11 13 L 13 9.5" />
            <path d="M 19.8 4.2 C 19.8 4.2 21 3 21 2 C 20 2.2 19 3.2 19.8 4.2 Z" fill="#ffffff" stroke="none" />
            <path d="M 15 13 L 9.5 20.5" />
            <path d="M 12 16.5 L 15 17 L 18 20.5" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ── SYLLABUS MODULE DATA ── */
const SYLLABUS_MODULES = [
  {
    num: '01',
    title: 'Ethical Hacking & OSINT Reconnaissance',
    dur: '20 Hours Practical',
    tag: 'FOUNDATION',
    desc: 'Master target discovery, open-source intelligence gathering, Google Dorking, footprinting, and vulnerability reconnaissance.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    skills: ['OSINT & Google Dorking', 'Footprinting & DNS Recon', 'Social Engineering Vectors', 'Legal Ethics & Compliance']
  },
  {
    num: '02',
    title: 'Network Scanning & Traffic Analysis',
    dur: '25 Hours Practical',
    tag: 'NETWORK LAB',
    desc: 'Perform active & passive network scanning, live host discovery, port enumeration, and packet inspection with Wireshark & Nmap.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    skills: ['Nmap Advanced Scans', 'Wireshark Packet Analysis', 'Nessus Auditing', 'SNMP & Banner Grabbing']
  },
  {
    num: '03',
    title: 'System Hacking & Malware Exploitation',
    dur: '25 Hours Practical',
    tag: 'EXPLOITATION',
    desc: 'Execute host exploitation, privilege escalation, password hash cracking, and malware analysis using Metasploit Framework.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&q=80',
    skills: ['Metasploit Exploitation', 'Password Hash Cracking', 'Trojans, Backdoors & Viruses', 'Privilege Escalation']
  },
  {
    num: '04',
    title: 'Web Application Security & OWASP Top 10',
    dur: '20 Hours Practical',
    tag: 'WEB DEFENSE',
    desc: 'Discover and mitigate SQL Injections, Cross-Site Scripting (XSS), CSRF, and web application flaws using Burp Suite Pro.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    skills: ['OWASP Top 10 Vulnerabilities', 'SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Burp Suite Testing']
  },
  {
    num: '05',
    title: 'Wireless Network & Mobile Auditing',
    dur: '15 Hours Practical',
    tag: 'WIRELESS',
    desc: 'Audit wireless networks, breach WPA2/WPA3 encryption, deploy rogue access points, and analyze mobile application risks.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    skills: ['WPA2/WPA3 Wi-Fi Cracking', 'Aircrack-ng Suite', 'Rogue Access Points', 'Man-in-the-Middle (MITM)']
  },
  {
    num: '06',
    title: 'SOC Operations & CEH v12 Certification Prep',
    dur: '15 Hours Practical',
    tag: 'SOC DEFENSE',
    desc: 'Build defensive capabilities with SIEM log analysis, incident response playbooks, firewall security, and CEH v12 exam prep.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    skills: ['SIEM & Log Monitoring', 'Incident Response Playbooks', 'Firewall & IDS/IPS Config', 'CEH v12 Exam Prep']
  }
];

/* ── SECURITY TOOLS STACK ── */
const SECURITY_TOOLS = [
  { name: 'Kali Linux', cat: 'SECURITY OS', desc: 'Debian-derived Linux distribution designed for digital forensics & pen testing.', icon: '💻' },
  { name: 'Metasploit', cat: 'EXPLOITATION', desc: 'World’s most used penetration testing framework for discovering vulnerabilities.', icon: '⚡' },
  { name: 'Wireshark', cat: 'PACKET ANALYSIS', desc: 'Industry-standard network protocol analyzer for deep packet inspection.', icon: '🦈' },
  { name: 'Nmap', cat: 'NETWORK SCANNER', desc: 'Free, open-source utility for network discovery & vulnerability auditing.', icon: '🔍' },
  { name: 'Burp Suite', cat: 'WEB AUDIT', desc: 'Leading graphical tool for testing web application security vulnerabilities.', icon: '🛡️' },
  { name: 'Nessus', cat: 'VULN SCANNER', desc: 'Comprehensive vulnerability assessment scanner for enterprise networks.', icon: '📡' },
  { name: 'Snort', cat: 'IDS / IPS', desc: 'Open-source intrusion prevention system capable of real-time traffic analysis.', icon: '🔒' },
  { name: 'Aircrack-ng', cat: 'WIRELESS', desc: 'Complete suite of tools to assess Wi-Fi network security & encryption.', icon: '📶' },
  { name: 'John the Ripper', cat: 'PASSWORDS', desc: 'Fast password cracker designed to detect weak passwords & hashes.', icon: '🔑' },
  { name: 'Python Hacking', cat: 'AUTOMATION', desc: 'Custom exploit development and security automation using Python scripts.', icon: '🐍' },
];

/* ── CAREER PATHS ── */
const CAREER_ROLES = [
  { role: 'Ethical Hacker / Pen Tester', pkg: '₹6.5L - ₹14.0L / yr', badge: 'HIGH DEMAND', desc: 'Authorized security specialist conducting vulnerability tests on live enterprise systems.' },
  { role: 'SOC Security Analyst', pkg: '₹5.5L - ₹12.0L / yr', badge: 'IMMEDIATE HIRING', desc: 'Monitors 24/7 Security Operations Centers (SOC) to stop cyber attacks in real time.' },
  { role: 'Cyber Security Engineer', pkg: '₹7.0L - ₹18.0L / yr', badge: 'HIGH DEMAND', desc: 'Architects and deploys enterprise security infrastructure, firewalls, and encryption.' },
  { role: 'Information Security Auditor', pkg: '₹8.0L - ₹20.0L / yr', badge: 'PREMIUM ROLE', desc: 'Audits IT organizations for compliance with ISO 27001, NIST, and data protection laws.' }
];

const ROLE_OPTIONS = ['Student (Study)', 'Job Seeker (Job)', 'Working Professional (Employee)', 'Other'];

export default function CyberSecurityLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', role: 'Student (Study)' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = [
      'NETWORKZ SYSTEMS KOLLAM',
      '══════════════════════',
      '🎉 20% OFFER CLAIM - ETHICAL HACKING & CYBER SECURITY',
      '══════════════════════',
      '',
      `Candidate Name : ${formData.name}`,
      `Phone Number   : ${formData.phone}`,
      `Current Status : ${formData.role}`,
      `Selected Course: Ethical Hacking & Cyber Security Masterclass`,
      'Special Offer  : 20% DISCOUNT CLAIM (THIS MONTH)',
      'Campus Location: Pattathuvila Plaza, 2nd Floor, Vadayattukotta Rd, Chinnakada, Kollam',
      '',
      '══════════════════════',
      'Hello Admissions Desk! I want to claim the 20% discount offer and enroll in the Ethical Hacking & Cyber Security course. Please call me back!'
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

        <nav className="nz-nav-links" aria-label="Cyber Security Landing Navigation">
          <a href="#overview" className="nz-nav-active">OVERVIEW</a>
          <a href="#syllabus">SYLLABUS</a>
          <a href="#tools">SECURITY STACK</a>
          <a href="#careers">CAREERS</a>
          <a href="#contact">KOLLAM CAMPUS</a>
        </nav>

        <div className="nz-nav-right" style={{ gap: '0.8rem' }}>
          <button className="nz-nav-portal" onClick={scrollToBooking} style={{ cursor: 'pointer' }}>
            CLAIM 20% OFFER ↗
          </button>
          <button className="nz-btn-ghost" onClick={() => navigate('/')} style={{ padding: '0.55rem 1rem', fontSize: '0.78rem' }}>
            ← HOME
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────
         TOP GLOWING RIBBON
      ───────────────────────────────────────────────────────── */}
      <div className="nz-cyber-ribbon">
        <div className="nz-cyber-ribbon-shimmer" />
        <span>🎉 25TH ANNIVERSARY SPECIAL: 20% DISCOUNT OFFER FOR THIS MONTH AT KOLLAM CAMPUS! 🎉</span>
      </div>

      {/* ─────────────────────────────────────────────────────────
         CINEMATIC HERO SECTION
      ───────────────────────────────────────────────────────── */}
      <section id="overview" className="nz-cyber-hero">
        <div className="nz-cyber-hero-bg">
          <div className="nz-cyber-orb-1" />
          <div className="nz-cyber-orb-2" />
          <div className="nz-cyber-grid-pattern" />
        </div>

        <div className="nz-cyber-hero-inner">
          {/* Hero Left Content */}
          <div className="nz-cyber-hero-content">
            <div className="nz-cyber-pill-tag">
              <span className="nz-cyber-pulse" /> AN ISO 9001:2015 CERTIFIED ACADEMY
            </div>

            <h1 className="nz-cyber-hero-title">
              BECOME A MASTER IN<br />
              <span className="nz-cyber-gradient-text">ETHICAL HACKING</span><br />
              & CYBER SECURITY
            </h1>

            <p className="nz-cyber-hero-subtitle">
              Master real-world penetration testing, network security auditing, vulnerability assessment, and SOC defense operations. Learn 100% hands-on in Kollam’s premier ISO-certified cyber lab with 100% placement support.
            </p>

            {/* Quick Metrics Bar */}
            <div className="nz-cyber-metrics-row">
              <div className="nz-cyber-metric-item">
                <span className="nz-metric-val">100%</span>
                <span className="nz-metric-lbl">Placement Support</span>
              </div>
              <div className="nz-cyber-metric-item">
                <span className="nz-metric-val">20% OFF</span>
                <span className="nz-metric-lbl">Limited Month Offer</span>
              </div>
              <div className="nz-cyber-metric-item">
                <span className="nz-metric-val">120+ HRS</span>
                <span className="nz-metric-lbl">Live Practical Labs</span>
              </div>
              <div className="nz-cyber-metric-item">
                <span className="nz-metric-val">LIFETIME</span>
                <span className="nz-metric-lbl">Membership</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="nz-cyber-cta-group">
              <button className="nz-cyber-btn-primary" onClick={scrollToBooking}>
                BOOK SEAT WITH 20% DISCOUNT 💬 ↗
              </button>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="nz-cyber-btn-whatsapp">
                TALK TO ADVISOR ON WHATSAPP
              </a>
            </div>
          </div>

          {/* Hero Right Showcase Card */}
          <div className="nz-cyber-hero-media">
            <div className="nz-cyber-glass-card">
              <div className="nz-cyber-media-container">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
                  alt="Cyber Security Command Center"
                  className="nz-cyber-media-img"
                />
                <div className="nz-cyber-media-gradient" />

                <div className="nz-cyber-live-badge">
                  <span className="nz-cyber-pulse-green" /> LIVE LAB SESSIONS ACTIVE
                </div>

                <div className="nz-cyber-trust-footer">
                  <div className="nz-trust-icon">🛡️</div>
                  <div>
                    <div className="nz-trust-title">ISO 9001:2015 Certified Academy</div>
                    <div className="nz-trust-sub">Official Pearson VUE Authorized Exam Center</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         4 POSTER PILLARS (WHY CHOOSE NETWORKZ SYSTEMS)
      ───────────────────────────────────────────────────────── */}
      <section className="nz-cyber-pillars-sec">
        <div className="nz-cyber-container">
          <div className="nz-cyber-sec-header">
            <span className="nz-cyber-tag-cyan">EXCELLENCE GUARANTEED</span>
            <h2 className="nz-cyber-sec-h2">Why Learn Ethical Hacking at Networkz Systems?</h2>
            <p className="nz-cyber-sec-p">Extracted directly from our official Kollam flagship poster & training standards.</p>
          </div>

          <div className="nz-cyber-pillars-grid">
            <div className="nz-cyber-pillar-card">
              <div className="nz-pillar-top">
                <span className="nz-pillar-icon-box">🛡️</span>
                <span className="nz-pillar-tag">CAREER PIPELINE</span>
              </div>
              <div className="nz-pillar-big">100%</div>
              <h3 className="nz-pillar-h3">100% Placement Assistance</h3>
              <p className="nz-pillar-p">Direct corporate placement drives with 200+ top IT firms, mock technical interviews & resume engineering.</p>
              <span className="nz-pillar-pill">200+ HIRING FIRMS</span>
            </div>

            <div className="nz-cyber-pillar-card nz-pillar-highlight">
              <div className="nz-pillar-top">
                <span className="nz-pillar-icon-box">💻</span>
                <span className="nz-pillar-tag">PRACTICAL FIRST</span>
              </div>
              <div className="nz-pillar-big">100%</div>
              <h3 className="nz-pillar-h3">100% Hands-on Practice</h3>
              <p className="nz-pillar-p">Execute penetration testing on Kali Linux, Metasploit, Nmap, Wireshark, Burp Suite & live CTF vulnerability labs.</p>
              <span className="nz-pillar-pill">LIVE PEN-TEST LABS</span>
            </div>

            <div className="nz-cyber-pillar-card">
              <div className="nz-pillar-top">
                <span className="nz-pillar-icon-box">♾️</span>
                <span className="nz-pillar-tag">MEMBERSHIP</span>
              </div>
              <div className="nz-pillar-big">LIFETIME</div>
              <h3 className="nz-pillar-h3">Lifetime Membership</h3>
              <p className="nz-pillar-p">Retake course modules anytime, access upgraded cyber lab tools, and receive lifetime career mentoring.</p>
              <span className="nz-pillar-pill">UNLIMITED ACCESS</span>
            </div>

            <div className="nz-cyber-pillar-card nz-pillar-highlight">
              <div className="nz-pillar-top">
                <span className="nz-pillar-icon-box">👨‍🏫</span>
                <span className="nz-pillar-tag">CERTIFIED LEADS</span>
              </div>
              <div className="nz-pillar-big">EXPERT</div>
              <h3 className="nz-pillar-h3">Professional Certified Trainers</h3>
              <p className="nz-pillar-p">Learn directly from CEH & CISSP certified active security engineers with 10+ years corporate experience.</p>
              <span className="nz-pillar-pill">CEH CERTIFIED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         WHAT YOU WILL LEARN (RICH VISUAL MODULE CARDS)
      ───────────────────────────────────────────────────────── */}
      <section id="syllabus" className="nz-cyber-syllabus-sec">
        <div className="nz-cyber-container">
          <div className="nz-cyber-sec-header">
            <span className="nz-cyber-tag-cyan">MASTERCLASS CURRICULUM</span>
            <h2 className="nz-cyber-sec-h2">What You Will Learn in This Program</h2>
            <p className="nz-cyber-sec-p">Step-by-step masterclass taking you from beginner to job-ready ethical hacker.</p>
          </div>

          <div className="nz-cyber-modules-grid">
            {SYLLABUS_MODULES.map((m) => (
              <div key={m.num} className="nz-cyber-module-card">
                <div className="nz-module-media">
                  <img src={m.image} alt={m.title} className="nz-module-img" loading="lazy" />
                  <span className="nz-module-tag">{m.tag}</span>
                  <span className="nz-module-dur">{m.dur}</span>
                  <div className="nz-module-num-watermark">{m.num}</div>
                </div>

                <div className="nz-module-body">
                  <h3 className="nz-module-title">{m.title}</h3>
                  <p className="nz-module-desc">{m.desc}</p>

                  <div className="nz-module-skills-grid">
                    {m.skills.map((sk) => (
                      <span key={sk} className="nz-skill-chip">
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
         SECURITY TOOLS STACK SHOWCASE
      ───────────────────────────────────────────────────────── */}
      <section id="tools" className="nz-cyber-tools-sec">
        <div className="nz-cyber-container">
          <div className="nz-cyber-sec-header">
            <span className="nz-cyber-tag-cyan">LAB STACK & EQUIPMENT</span>
            <h2 className="nz-cyber-sec-h2">Industry Standard Security Tools You Will Master</h2>
            <p className="nz-cyber-sec-p">Gain direct practical command over software used by global cybersecurity teams.</p>
          </div>

          <div className="nz-cyber-tools-grid">
            {SECURITY_TOOLS.map((t) => (
              <div key={t.name} className="nz-cyber-tool-card">
                <div className="nz-tool-header">
                  <span className="nz-tool-emoji">{t.icon}</span>
                  <span className="nz-tool-cat">{t.cat}</span>
                </div>
                <h4 className="nz-tool-title">{t.name}</h4>
                <p className="nz-tool-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         CAREER ROLES & SALARY POTENTIAL
      ───────────────────────────────────────────────────────── */}
      <section id="careers" className="nz-cyber-careers-sec">
        <div className="nz-cyber-container">
          <div className="nz-cyber-sec-header">
            <span className="nz-cyber-tag-cyan">HIGH DEMAND CAREERS</span>
            <h2 className="nz-cyber-sec-h2">Career Opportunities & Salary Packages</h2>
            <p className="nz-cyber-sec-p">Cybersecurity is among the fastest-growing sectors in global IT.</p>
          </div>

          <div className="nz-cyber-careers-grid">
            {CAREER_ROLES.map((c) => (
              <div key={c.role} className="nz-cyber-career-card">
                <div className="nz-career-head">
                  <h3 className="nz-career-title">{c.role}</h3>
                  <span className="nz-career-badge">{c.badge}</span>
                </div>
                <div className="nz-career-pkg">{c.pkg}</div>
                <p className="nz-career-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
         BOOKING AREA & KOLLAM CAMPUS CONTACT
      ───────────────────────────────────────────────────────── */}
      <section id="contact" className="nz-cyber-booking-sec">
        <div id="nz-booking-sec" className="nz-cyber-container">
          <div className="nz-cyber-booking-grid">
            
            {/* Left: Kollam Campus HQ Card */}
            <div className="nz-cyber-hq-card">
              <div className="nz-hq-tag">
                <span className="nz-cyber-pulse-green" /> KOLLAM HEADQUARTERS
              </div>

              <h2 className="nz-hq-title">Networkz Systems Kollam Campus</h2>
              <p className="nz-hq-desc">
                Visit our state-of-the-art campus or contact our admissions advisors today to lock in your 20% discount offer for this month.
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
                    <div className="nz-hq-lbl">Admission Hotline</div>
                    <div className="nz-hq-val">
                      <a href="https://wa.me/918089030405" target="_blank" rel="noopener noreferrer" className="nz-cyan-link">
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
                      <a href="mailto:support@nskollam.com" className="nz-cyan-link">support@nskollam.com</a>
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

            {/* Right: Booking Form */}
            <div className="nz-cyber-form-card">
              <div className="nz-form-head">
                <span className="nz-form-tag">LIMITED SEATS REMAINING</span>
                <h3 className="nz-form-h3">Claim 20% Discount Offer</h3>
                <p className="nz-form-p">Submit your name and phone number below to lock in your 20% discount for this month.</p>
              </div>

              {submitted ? (
                <div className="nz-cyber-success">
                  <div className="nz-success-check">✓</div>
                  <h4 className="nz-success-h4">20% DISCOUNT CLAIM SENT!</h4>
                  <p className="nz-success-p">
                    Thank you <strong>{formData.name}</strong>! Your 20% discount request has been dispatched to our Kollam admissions desk on WhatsApp.
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
                    CLAIM 20% DISCOUNT & BOOK SEAT 💬 ↗
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
            © 2025 Networkz Systems · ISO 9001:2015 Certified · Ethical Hacking & Cyber Security Masterclass · Kollam Campus
          </div>
        </div>
      </footer>
    </div>
  );
}
