import { coursePath } from '../seo/catalog.js';
import React, { useState, useEffect, useRef } from 'react';
import './NetworkzHome.css';
import { COURSE_DETAILS } from './data/courseData';

/* ─── DATA FOR ALL 13 HANDCRAFTED SECTIONS ───────────────────────── */

const FEATURES_DATA = [
  {
    num: '01',
    title: 'ISO 9001:2015 CERTIFIED ACADEMY',
    desc: 'Globally accredited technical curriculum engineered to meet rigorous international enterprise standards.'
  },
  {
    num: '02',
    title: 'PEARSON VUE AUTHORIZED LABS',
    desc: 'Official testing center infrastructure for Cisco CCNA, AWS, Azure, and CEH international certifications.'
  },
  {
    num: '03',
    title: '100% PLACEMENT CELL GUARANTEE',
    desc: 'Dedicated career placement cell offering resume engineering, mock interviews, and direct hiring drives.'
  }
];

const RECENT_PLACEMENTS_DATA = [
  {
    id: 1,
    name: 'Anoop A',
    role: 'Digital Marketing Specialist',
    company: 'Khadamath Accounts & Operations',
    companyDetail: '(UAE Billing Software)',
    location: 'UAE 🇦🇪',
    image: '/placements/anoop.jpg',
    badge: 'INTERNATIONAL PLACEMENT'
  },
  {
    id: 2,
    name: 'Belwin',
    role: 'Associate Deployment Engineer',
    company: 'ECS Fintech',
    companyDetail: 'Technopark, Phase 1, Tvm, Kerala',
    location: 'Technopark, Trivandrum 🇮🇳',
    image: '/placements/belwin.jpg',
    badge: 'TECHNOPARK PLACEMENT'
  },
  {
    id: 3,
    name: 'Reshma',
    role: 'Marketing Specialist',
    company: 'Castles Plaza Real Estate LLC',
    companyDetail: 'Dubai, UAE Enterprise',
    location: 'Dubai, UAE 🇦🇪',
    image: '/placements/reshma.jpg',
    badge: 'DUBAI ENTERPRISE'
  },
  {
    id: 4,
    name: 'Nahas',
    role: 'Digital Marketing Specialist',
    company: 'Khadamath Accounts & Operations',
    companyDetail: '(UAE Billing Software)',
    location: 'UAE 🇦🇪',
    image: '/placements/nahas.jpg',
    badge: 'INTERNATIONAL PLACEMENT'
  },
  {
    id: 5,
    name: 'Akshaya P',
    role: 'Security Analyst',
    company: 'EY (Ernst & Young)',
    companyDetail: 'Building a better working world',
    location: 'Global MNC 🌐',
    image: '/placements/akshaya.jpg',
    badge: 'BIG 4 GLOBAL MNC'
  }
];

const TESTIMONIALS_DATA = [
  {
    quote: "Networkz Systems transformed my career trajectory. Within 3 months of completing the Python Full Stack program, I secured a Senior Developer role at an MNC.",
    name: "Janeeta James",
    role: "Senior Full Stack Engineer",
    company: "Technopark"
  },
  {
    quote: "The live hands-on cyber lab experience in Kollam gave me real-world penetration testing skills that set me apart during technical interviews.",
    name: "Akhil P",
    role: "SOC Security Analyst",
    company: "Cyber Defense"
  },
  {
    quote: "Exceptional faculty and structured curriculum. The AWS Cloud Architecture course provided practical knowledge that directly translates to client projects.",
    name: "Rahul R",
    role: "Cloud Solutions Architect",
    company: "Infosys"
  }
];

const CATEGORIES_DATA = [
  {
    id: 1,
    title: "SOFTWARE PRODUCT TRAINING",
    count: "12 Advanced Programs",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    link: "#catalog"
  },
  {
    id: 2,
    title: "AI & ELECTRONICS",
    count: "6 Specialized Master Tracks",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    link: "#catalog"
  },
  {
    id: 3,
    title: "NETWORKING & CYBER SECURITY",
    count: "6 Enterprise Certifications",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    link: "#catalog"
  },
  {
    id: 4,
    title: "BUSINESS & DIGITAL MARKETING",
    count: "3 Professional Diplomas",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    link: "#catalog"
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "DISCOVERY & ADVISORY",
    desc: "1-on-1 career consultation with senior tech leads to select the optimal specialization aligned with your goal."
  },
  {
    num: "02",
    title: "HANDS-ON LAB MASTERY",
    desc: "Intensive 100% practical training in live server room environments and high-performance computing labs."
  },
  {
    num: "03",
    title: "REAL CLIENT PROJECTS",
    desc: "Build production-grade applications and conduct live security audits to construct an elite portfolio."
  },
  {
    num: "04",
    title: "GLOBAL CAREER PLACEMENT",
    desc: "Direct recruitment drives with top IT enterprises, resume engineering, and continuous interview mentoring."
  }
];

const FAQ_DATA = [
  {
    q: "What certifications will I receive upon completing a program at Networkz Systems?",
    a: "You receive official Networkz Systems course completion certificates along with preparation for international certifications including Cisco CCNA, AWS Solutions Architect, Microsoft Azure, and Pearson VUE accredited credentials."
  },
  {
    q: "Are the training programs 100% practical or theoretical?",
    a: "All programs are structured with an 80% practical live lab focus and 20% conceptual foundation. You work directly on enterprise hardware, server racks, and live codebases."
  },
  {
    q: "How does the 100% Placement Support program work?",
    a: "Our dedicated placement cell conducts mock technical interviews, resume refinement, soft-skills workshops, and routes your profile to our network of 200+ partner tech companies across Kerala, Tamil Nadu, and Karnataka."
  },
  {
    q: "Can non-computer science students enroll in Software and AI courses?",
    a: "Yes. Our foundation modules start from core logic building (C/C++ & Python fundamentals) before progressing to advanced full-stack framework engineering."
  }
];

/* ─── OFFICIAL TECHNOLOGY LOGOS FOR MEGA MENU ─────────────────────── */
function CourseLogo({ courseId }) {
  const iconProps = { width: 22, height: 22, className: 'nz-side-course-logo' };
  switch (courseId) {
    case 'java':
    case 'java_ai':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M11 25c5.5 0 9.5-1 12-2.5-3 .5-6 .5-9 .5-2 0-3.5 0-3 2z" fill="#E76F00"/>
          <path d="M8.5 28.5c7.5 1 14.5-.5 18-2-4 .5-8 .5-12.5.5-4 0-5.5 0-5.5 1.5z" fill="#E76F00"/>
          <path d="M21 17.5c2.5-3.5-1-6.5-1-6.5s3 2.5 1 5.5c-1.5 2.5-3 3-5 5 4-1 6.5-2.5 5-4z" fill="#5382A1"/>
          <path d="M15 13.5c2-2.5 0-5.5 0-5.5s2 2 0 4.5c-1.5 2-2.5 2.5-4 4 3-.5 5-1.5 4-3z" fill="#E76F00"/>
          <path d="M19.5 22c5-.5 7.5-2.5 7.5-2.5s-2 1-6.5 1.5c-4 .5-8 .5-11 0 0 0 3 1.5 10 1z" fill="#5382A1"/>
        </svg>
      );
    case 'python':
    case 'python_ai':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M15.9 3c-4.2 0-3.9 1.8-3.9 1.8l0 1.9h4.1v.6h-5.7c-2.3 0-4 1.4-4 4 0 2.6 1.5 3.9 3.5 3.9h1.2v-1.7c0-2 1.7-3.7 3.7-3.7h5.7c1.7 0 3-1.3 3-3 0-2.3-1.7-3.8-4-3.8h-3.6zm-1.8 1.4c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.5.4-.9.9-.9z" fill="#3776AB"/>
          <path d="M16.1 29c4.2 0 3.9-1.8 3.9-1.8l0-1.9h-4.1v-.6h5.7c2.3 0 4-1.4 4-4 0-2.6-1.5-3.9-3.5-3.9h-1.2v1.7c0 2-1.7 3.7-3.7 3.7h-5.7c-1.7 0-3 1.3-3 3 0 2.3 1.7 3.8 4 3.8h3.6zm1.8-1.4c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9s.9.4.9.9c0 .5-.4.9-.9.9z" fill="#FFD43B"/>
        </svg>
      );
    case 'cpp':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M16 3l11 6.5v13L16 29 5 22.5v-13L16 3z" fill="#00599C"/>
          <text x="16" y="20.5" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C++</text>
        </svg>
      );
    case 'react':
    case 'mern':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
          <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.5"/>
          <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)"/>
          <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)"/>
        </svg>
      );
    case 'mean':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M16 4l10 3.5-1.5 13.5L16 27l-8.5-6L6 7.5 16 4z" fill="#DD0031"/>
          <path d="M16 6.5l7 2.5-1 10.5-6 4.5-6-4.5-1-10.5 7-2.5z" fill="#C3002F"/>
          <path d="M16 9l4.5 11h-2l-1-2.5h-3l-1 2.5h-2L16 9zm1.2 6.5L16 13.5l-1.2 2h2.4z" fill="#ffffff"/>
        </svg>
      );
    case 'webdev':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M6 5l2 20 8 2.5 8-2.5 2-20H6z" fill="#E44D26"/>
          <path d="M16 7v18.5l6-2 1.5-16.5H16z" fill="#F16529"/>
          <path d="M11 11h10l-.4 4.5H13l.3 3.5 2.7.8 2.7-.8.2-2.2h2l-.3 3.8-4.6 1.4-4.6-1.4-.4-5.3h7.2l.2-2.3H10.7L11 11z" fill="#ffffff"/>
        </svg>
      );
    case 'ds':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="4" y="4" width="24" height="24" rx="4" fill="#0284C7"/>
          <path d="M8 22l4-7 4 4 6-9" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="22" cy="10" r="2" fill="#F59E0B"/>
        </svg>
      );
    case 'testing':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M16 4l10 4v8c0 6.5-5 11-10 12-5-1-10-5.5-10-12V8l10-4z" fill="#10B981"/>
          <polyline points="11 16 14.5 19.5 21 13" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'uiux':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M11 6h5v5h-5a2.5 2.5 0 0 1 0-5z" fill="#F24E1E"/>
          <path d="M16 6h5a2.5 2.5 0 0 1 0 5h-5V6z" fill="#FF7262"/>
          <path d="M11 11h5v5h-5a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
          <path d="M16 11h5a2.5 2.5 0 0 1 0 5h-5v-5z" fill="#1ABCFE"/>
          <path d="M11 16h5v2.5a2.5 2.5 0 0 1-5 0V16z" fill="#0ACF83"/>
        </svg>
      );
    case 'ml':
    case 'ai':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="5" y="5" width="22" height="22" rx="4" fill="#8B5CF6"/>
          <circle cx="16" cy="16" r="3.5" fill="#ffffff"/>
          <path d="M16 5v4M16 23v4M5 16h4M23 16h4M8.5 8.5l3 3M20.5 20.5l3 3M8.5 23.5l3-3M20.5 11.5l3-3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'dl':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="4" y="4" width="24" height="24" rx="4" fill="#4F46E5"/>
          <circle cx="10" cy="10" r="2.5" fill="#ffffff"/>
          <circle cx="10" cy="22" r="2.5" fill="#ffffff"/>
          <circle cx="22" cy="10" r="2.5" fill="#ffffff"/>
          <circle cx="22" cy="22" r="2.5" fill="#ffffff"/>
          <circle cx="16" cy="16" r="2.5" fill="#A5B4FC"/>
          <path d="M10 10l6 6 6-6M10 22l6-6 6 6M10 10v12M22 10v12" stroke="#C7D2FE" strokeWidth="1.2"/>
        </svg>
      );
    case 'genai':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="4" y="4" width="24" height="24" rx="5" fill="#10A37F"/>
          <path d="M16 8l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5L16 8zM23 19l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3z" fill="#ffffff"/>
        </svg>
      );
    case 'embedded':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="7" y="7" width="18" height="18" rx="2" fill="#00979D"/>
          <circle cx="12" cy="12" r="1.5" fill="#ffffff"/>
          <circle cx="20" cy="20" r="1.5" fill="#ffffff"/>
          <path d="M12 20h8v-5h-8v-3" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
          <path d="M11 4v3M16 4v3M21 4v3M11 25v3M16 25v3M21 25v3M4 11h3M4 16h3M4 21h3M25 11h3M25 16h3M25 21h3" stroke="#00979D" strokeWidth="1.8"/>
        </svg>
      );
    case 'robotics':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="6" y="8" width="20" height="16" rx="4" fill="#0284C7"/>
          <circle cx="12" cy="14" r="2" fill="#ffffff"/>
          <circle cx="20" cy="14" r="2" fill="#ffffff"/>
          <line x1="12" y1="19" x2="20" y2="19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="4" x2="16" y2="8" stroke="#0284C7" strokeWidth="2.5"/>
          <circle cx="16" cy="4" r="1.5" fill="#EF4444"/>
        </svg>
      );
    case 'ccna':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="4" y="6" width="24" height="20" rx="3" fill="#049FD9"/>
          <path d="M8 12h16M8 16h16M8 20h16" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 2"/>
          <circle cx="9" cy="12" r="1.5" fill="#ffffff"/>
          <circle cx="23" cy="16" r="1.5" fill="#ffffff"/>
          <circle cx="14" cy="20" r="1.5" fill="#ffffff"/>
          <text x="16" y="10" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle">CISCO</text>
        </svg>
      );
    case 'cyber':
    case 'ethical':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M16 4l11 4.5v7.5c0 6.5-5 11-11 12-6-1-11-5.5-11-12V8.5L16 4z" fill="#DC2626"/>
          <rect x="12" y="14" width="8" height="6" rx="1" fill="#ffffff"/>
          <path d="M13.5 14v-2a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="#ffffff" strokeWidth="1.8"/>
        </svg>
      );
    case 'linux':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M16 5c-3 0-5 2.5-5 5.5 0 2 .5 3.5 0 5-1 1-3 3-3 6.5 0 3 2.5 5 8 5s8-2 8-5c0-3.5-2-5.5-3-6.5-.5-1.5 0-3 0-5C21 7.5 19 5 16 5z" fill="#111827"/>
          <ellipse cx="16" cy="18" rx="4.5" ry="6" fill="#F3F4F6"/>
          <circle cx="14" cy="9.5" r="1" fill="#ffffff"/>
          <circle cx="18" cy="9.5" r="1" fill="#ffffff"/>
          <circle cx="14" cy="9.5" r="0.5" fill="#000000"/>
          <circle cx="18" cy="9.5" r="0.5" fill="#000000"/>
          <polygon points="16,11 14.5,13 17.5,13" fill="#F59E0B"/>
          <path d="M11 25c-2 1-3 2-2 3 1.5 1 4 0 4-1l-2-2zM21 25c2 1 3 2 2 3-1.5 1-4 0-4-1l2-2z" fill="#F59E0B"/>
        </svg>
      );
    case 'azure':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M7 25h9l4.5-8-6.5-12H8l6 10-7 10z" fill="#0078D4"/>
          <path d="M16 25h9l-7-14-3 5 4.5 9h-3.5z" fill="#50E6FF"/>
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="4" y="6" width="24" height="20" rx="4" fill="#232F3E"/>
          <text x="16" y="16.5" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">aws</text>
          <path d="M10 20c4 2.5 8 2.5 12 0" fill="none" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round"/>
          <polygon points="22.5,20 20,18.5 21,21" fill="#FF9900"/>
        </svg>
      );
    case 'digi':
    case 'digi_ai':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <path d="M7 11h3l7-5v18l-7-5H7a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" fill="#EA4335"/>
          <path d="M21 11c1.5 1.5 2.5 3 2.5 5s-1 3.5-2.5 5" fill="none" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 8c2.5 2.5 4 5 4 8s-1.5 5.5-4 8" fill="none" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'msoffice':
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="5" y="5" width="22" height="22" rx="4" fill="#D83B01"/>
          <path d="M12 10h8v12h-8z" fill="#ffffff" opacity="0.3"/>
          <text x="16" y="21.5" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">O</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" {...iconProps}>
          <rect x="5" y="8" width="22" height="16" rx="3" fill="#1E5D42"/>
          <path d="M11 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" fill="none" stroke="#1E5D42" strokeWidth="2"/>
          <circle cx="16" cy="16" r="2" fill="#ffffff"/>
        </svg>
      );
  }
}

export default function NetworkzHome() {
  const [activeCategoryTab, setActiveCategoryTab] = useState('SOFTWARE');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [selectedEnrollmentCourse, setSelectedEnrollmentCourse] = useState(null);
  const [enrollmentSubmitted, setEnrollmentSubmitted] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [placementIndex, setPlacementIndex] = useState(0);
  const [isPlacementPaused, setIsPlacementPaused] = useState(false);
  const [placementModalImage, setPlacementModalImage] = useState(null);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [activeNavCategory, setActiveNavCategory] = useState('1');
  const dropdownTimerRef = useRef(null);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setCoursesDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setCoursesDropdownOpen(false);
    }, 250);
  };

  // Auto-slide effect for recent placements
  useEffect(() => {
    if (isPlacementPaused) return;
    const timer = setInterval(() => {
      setPlacementIndex((prev) => (prev + 1) % RECENT_PLACEMENTS_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlacementPaused]);

  const handlePrevPlacement = () => {
    setPlacementIndex((prev) => (prev === 0 ? RECENT_PLACEMENTS_DATA.length - 1 : prev - 1));
  };

  const handleNextPlacement = () => {
    setPlacementIndex((prev) => (prev + 1) % RECENT_PLACEMENTS_DATA.length);
  };

  const handleModalPrev = () => {
    if (!placementModalImage) return;
    const currentIndex = RECENT_PLACEMENTS_DATA.findIndex((p) => p.id === placementModalImage.id);
    const prevIndex = currentIndex === 0 ? RECENT_PLACEMENTS_DATA.length - 1 : currentIndex - 1;
    setPlacementModalImage(RECENT_PLACEMENTS_DATA[prevIndex]);
  };

  const handleModalNext = () => {
    if (!placementModalImage) return;
    const currentIndex = RECENT_PLACEMENTS_DATA.findIndex((p) => p.id === placementModalImage.id);
    const nextIndex = (currentIndex + 1) % RECENT_PLACEMENTS_DATA.length;
    setPlacementModalImage(RECENT_PLACEMENTS_DATA[nextIndex]);
  };

  useEffect(() => {
    if (!placementModalImage) return;
    const handleModalKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handleModalPrev();
      if (e.key === 'ArrowRight') handleModalNext();
      if (e.key === 'Escape') setPlacementModalImage(null);
    };
    window.addEventListener('keydown', handleModalKeyDown);
    return () => window.removeEventListener('keydown', handleModalKeyDown);
  }, [placementModalImage]);

  // Flatten courses for searching/filtering
  const allCourses = Object.entries(COURSE_DETAILS).flatMap(([catId, cat]) =>
    cat.courses.map((c) => ({ ...c, catId, catName: cat.category }))
  );

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.level.toLowerCase().includes(searchQuery.toLowerCase());

    // If searching, search across all categories regardless of active category tab
    if (searchQuery.trim() !== '') {
      return matchesSearch;
    }

    const matchesTab =
      activeCategoryTab === 'ALL' ||
      (activeCategoryTab === 'SOFTWARE' && course.catId === '1') ||
      (activeCategoryTab === 'AI' && course.catId === '2') ||
      (activeCategoryTab === 'NETWORK' && course.catId === '3') ||
      (activeCategoryTab === 'BUSINESS' && course.catId === '4') ||
      (activeCategoryTab === 'INTERNSHIP' && course.catId === '5');

    return matchesTab;
  });



  // Close mobile drawer on desktop resize or escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1250) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="nz-luxury-root">

      {/* ─── SECTION 1: LUXURY STICKY HEADER NAVIGATION ─────────────── */}
      <nav className="nz-luxury-nav nz-asymmetric-nav">
        <div className="nz-nav-brand-wrap">
          <a href="/" className="nz-nav-brand">
            <img src="/nsk.jpeg" alt="Networkz Systems" className="nz-brand-emblem-img" />
          <span className="nz-brand-name">NETWORKZ SYSTEMS</span>
          <span className="nz-brand-tag">KOLLAM CAMPUS</span>
        </a>

        </div>

        {/* Desktop Navigation Links */}
        <ul className="nz-nav-menu">
          <li><a href="#features" className="nz-nav-link">HOME</a></li>
          <li
            className="nz-nav-dropdown-wrapper"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <button
              type="button"
              className="nz-nav-link nz-dropdown-trigger"
              onClick={() => setCoursesDropdownOpen((prev) => !prev)}
              aria-expanded={coursesDropdownOpen}
            >
              <span>COURSES</span>
              <svg className={`nz-caret ${coursesDropdownOpen ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {coursesDropdownOpen && (
              <div
                className="nz-side-flyout-dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                {/* Left side: Category List */}
                <div className="nz-side-cat-list">
                  {[
                    {
                      key: '1',
                      name: 'Software Product Training',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nz-side-cat-icon">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )
                    },
                    {
                      key: '2',
                      name: 'AI & Electronics',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nz-side-cat-icon">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                        </svg>
                      )
                    },
                    {
                      key: '3',
                      name: 'Networking & Cyber Security',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nz-side-cat-icon">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )
                    },
                    {
                      key: '4',
                      name: 'Business & Digital Marketing',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nz-side-cat-icon">
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                      )
                    },
                    {
                      key: '5',
                      name: 'Internship Programs',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nz-side-cat-icon">
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      )
                    },
                  ].map((cat) => {
                    const isOpen = activeNavCategory === cat.key;
                    return (
                      <div key={cat.key} className="nz-side-cat-wrapper">
                        <button
                          type="button"
                          className={`nz-side-cat-item ${isOpen ? 'is-active' : ''}`}
                          onMouseEnter={() => setActiveNavCategory(cat.key)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNavCategory((prev) => (prev === cat.key ? null : cat.key));
                          }}
                        >
                          <span className="nz-side-cat-content">
                            {cat.icon}
                            <span>{cat.name}</span>
                          </span>
                          <svg className="nz-side-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right side: Active Sub-Category Courses Flyout */}
                {activeNavCategory && COURSE_DETAILS[activeNavCategory] && (
                  <div className="nz-side-sub-panel">
                    <div className="nz-side-sub-header">
                      <span className="nz-side-sub-cat-title">
                        {COURSE_DETAILS[activeNavCategory].name}
                      </span>
                      <span className="nz-side-sub-count">
                        {COURSE_DETAILS[activeNavCategory].courses.length} Courses
                      </span>
                    </div>

                    <div className="nz-side-courses-list">
                      {COURSE_DETAILS[activeNavCategory].courses.map((c) => (
                        <a
                          key={c.id}
                          href={coursePath(c.id)}
                          className="nz-side-course-row"
                          onClick={() => setCoursesDropdownOpen(false)}
                        >
                          <span className="nz-side-course-title">{c.name}</span>
                          <span className="nz-side-course-dur">{c.duration}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
          <li><a href="#catalog" className="nz-nav-link">PROGRAMS</a></li>
          <li><a href="#why-us" className="nz-nav-link">ABOUT</a></li>
          <li><a href="#success" className="nz-nav-link">SUCCESS</a></li>
          <li><a href="#faq" className="nz-nav-link">FAQ</a></li>
        </ul>

        {/* Desktop CTA & Mobile Hamburger Toggle */}
        <div className="nz-nav-actions">
          <a
            href="https://script.google.com/a/macros/nskollam.com/s/AKfycbxGEQdDZ0eAyhgPTKpZM1denEs7A5Ui15Ak1gEMWkYYvDsBpR7ViaN2Rzm0LWCjJ_k_/exec"
            target="_blank"
            rel="noopener noreferrer"
            className="nz-nav-login-btn"
            title="Employee Timesheet Login"
            aria-label="Employee Timesheet Login"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            <span>EMPLOYEE LOGIN</span>
          </a>
          <a href="/exam" className="nz-nav-cta">
            SKILL EXAM PORTAL →
          </a>
          <button
            type="button"
            className={`nz-hamburger-btn ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="nz-hamburger-icon">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`nz-mobile-nav-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Dropdown List */}
      <div className={`nz-mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <ul className="nz-mobile-nav-list">
          <li>
            <button
              type="button"
              className="nz-mobile-nav-item nz-mobile-courses-trigger"
              onClick={() => setMobileCoursesOpen((prev) => !prev)}
            >
              <span>Explore All Courses ({allCourses.length})</span>
              <span className="nz-mobile-nav-arrow">{mobileCoursesOpen ? '▲' : '▼'}</span>
            </button>
            {mobileCoursesOpen && (
              <div className="nz-mobile-courses-list">
                {Object.entries(COURSE_DETAILS).map(([catKey, category]) => (
                  <div key={catKey} className="nz-mobile-cat-group">
                    <div className="nz-mobile-cat-name">{category.category}</div>
                    {category.courses.map((c) => (
                      <a
                        key={c.id}
                        href={coursePath(c.id)}
                        className="nz-mobile-course-subitem"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{c.name}</span>
                        <span className="nz-mobile-sub-dur">{c.duration}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>
          <li>
            <a href="#features" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Pillars of Excellence</span>
              <span className="nz-mobile-nav-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#catalog" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Course Catalog</span>
              <span className="nz-mobile-nav-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="/cybersecurity" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Cyber Security & Ethical Hacking</span>
              <span className="nz-mobile-nav-item-badge">HOT</span>
            </a>
          </li>
          <li>
            <a href="/digital-marketing" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Digital Marketing & AI</span>
              <span className="nz-mobile-nav-item-badge">HOT</span>
            </a>
          </li>
          <li>
            <a href="#why-us" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Why Choose Us</span>
              <span className="nz-mobile-nav-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#success" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Placement Success</span>
              <span className="nz-mobile-nav-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#faq" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>FAQ & Answers</span>
              <span className="nz-mobile-nav-arrow">→</span>
            </a>
          </li>
          <li>
            <a
              href="https://script.google.com/a/macros/nskollam.com/s/AKfycbxGEQdDZ0eAyhgPTKpZM1denEs7A5Ui15Ak1gEMWkYYvDsBpR7ViaN2Rzm0LWCjJ_k_/exec"
              target="_blank"
              rel="noopener noreferrer"
              className="nz-mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Employee Timesheet Login</span>
              <span className="nz-mobile-nav-item-badge" style={{ background: '#2563eb' }}>STAFF ↗</span>
            </a>
          </li>
          <li>
            <a href="#contact" className="nz-mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
              <span>Contact Kollam Campus</span>
              <span className="nz-mobile-nav-arrow">→</span>
            </a>
          </li>
        </ul>

        <div className="nz-mobile-nav-actions">
          <a
            href="https://script.google.com/a/macros/nskollam.com/s/AKfycbxGEQdDZ0eAyhgPTKpZM1denEs7A5Ui15Ak1gEMWkYYvDsBpR7ViaN2Rzm0LWCjJ_k_/exec"
            target="_blank"
            rel="noopener noreferrer"
            className="nz-mobile-login-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            EMPLOYEE LOGIN (TIMESHEET) ↗
          </a>
          <a href="/exam" className="nz-mobile-cta-btn" onClick={() => setMobileMenuOpen(false)}>
            SKILL EXAM PORTAL →
          </a>
          <a href="tel:08089030405" className="nz-mobile-secondary-btn">
            📞 CALL CAMPUS: +91 80890 30405
          </a>
        </div>

        <div className="nz-mobile-nav-socials">
          <a
            href="https://www.instagram.com/networkz_systems_kollam/"
            target="_blank"
            rel="noopener noreferrer"
            className="nz-mobile-social-link nz-mobile-social-ig"
            aria-label="Instagram Profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/Networkzsystemskollam"
            target="_blank"
            rel="noopener noreferrer"
            className="nz-mobile-social-link nz-mobile-social-fb"
            aria-label="Facebook Page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </a>
        </div>

        <div className="nz-mobile-nav-footer">
          <span>Kollam Campus • Chinnakada</span>
          <a href="https://wa.me/918089030405" target="_blank" rel="noopener noreferrer">WhatsApp Support ↗</a>
        </div>
      </div>

      {/* ─── SECTION 2: HERO FULL VIEWPORT EXPERIENCE ───────────────── */}
      <section className="nz-hero-section">
        <div className="nz-hero-glow-emerald" />
        <div className="nz-hero-glow-dark" />
        <div className="nz-container">
          <div className="nz-hero-grid">
            <div className="nz-hero-left">
              <span className="nz-eyebrow">AN ISO 9001:2015 CERTIFIED ACADEMY</span>

              <h1 className="nz-hero-title">
                IT TRAINING<br />
                IN KOLLAM FOR<br />
                <span>TECHNOLOGY CAREERS.</span>
              </h1>

              <p className="nz-body-lead">
                Kerala’s premier technology academy delivering high-impact programs in Software Full Stack, Artificial Intelligence, Cyber Security, and Cloud Architecture with practical training and placement assistance.
              </p>

              <div className="nz-hero-actions">
                <a href="#catalog" className="nz-btn-primary nz-btn-emerald">
                  EXPLORE CATALOG →
                </a>
                <a href="#contact" className="nz-btn-secondary">
                  ADMISSIONS ADVISORY
                </a>
              </div>
            </div>

            <div className="nz-hero-right">
              <div className="nz-hero-media-card">
                <img
                  src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80"
                  alt="Enterprise Network Server Rack Infrastructure"
                  className="nz-hero-img"
                />
                <div className="nz-hero-floating-badge">
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                      ANNIVERSARY SPECIAL
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                      20% DISCOUNT THIS MONTH
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'var(--color-primary)', color: 'var(--color-secondary)', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
                    KOLLAM LABS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* INTEGRATED CORE PILLARS DECK IN HERO MAIN AREA */}
          <div className="nz-hero-pillars-deck" id="features">
            {/* Left Forest-Green Section */}
            <div className="nz-hero-pillars-banner">
              <div className="nz-pillars-banner-content">
                <span className="nz-pillars-eyebrow">CORE PILLARS</span>
                <h2 className="nz-pillars-title">
                  ENGINEERED<br />
                  FOR<br />
                  EXCELLENCE.
                </h2>
              </div>
              <svg className="nz-pillars-waves" viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,90 C90,130 170,50 320,110 L320,180 L0,180 Z" fill="#134e32" opacity="0.85" />
                <path d="M0,120 C110,80 190,150 320,95 L320,180 L0,180 Z" fill="#18633f" opacity="0.65" />
                <path d="M0,145 C100,125 210,170 320,130 L320,180 L0,180 Z" fill="#22c55e" opacity="0.3" />
              </svg>
            </div>

            {/* Right Cards Deck */}
            <div className="nz-hero-pillars-grid">
              {FEATURES_DATA.map((feat, idx) => {
                const isOrange = idx === 1;
                return (
                  <div key={idx} className={`nz-hero-pillar-card-wrapper ${isOrange ? 'nz-theme-orange' : 'nz-theme-green'}`}>
                    {/* Layered background card/tab */}
                    <div className="nz-hero-pillar-shadow-layer" />

                    {/* Main White Floating Card */}
                    <div className="nz-hero-pillar-card">
                      <div className="nz-hero-pillar-top">
                        <div className={`nz-hero-pillar-icon-box ${isOrange ? 'nz-icon-orange' : 'nz-icon-green'}`}>
                          {idx === 0 && (
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="9" r="6" />
                              <circle cx="12" cy="9" r="2.5" />
                              <path d="M8.2 13.8L6.5 21.5l5.5-2.5 5.5 2.5-1.7-7.7" />
                            </svg>
                          )}
                          {idx === 1 && (
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="14" rx="2" />
                              <line x1="8" y1="21" x2="16" y2="21" />
                              <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                          )}
                          {idx === 2 && (
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="7" width="20" height="14" rx="2" />
                              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                              <path d="M12 12v2" />
                              <path d="M2 13h20" />
                            </svg>
                          )}
                        </div>
                        <div className="nz-hero-pillar-meta">
                          <span className="nz-hero-pillar-num">{feat.num}</span>
                          <h3 className="nz-hero-pillar-title">{feat.title}</h3>
                        </div>
                      </div>
                      <p className="nz-hero-pillar-desc">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="nz-hero-scroll-indicator">
            <div className="nz-scroll-line" />
            <span>SCROLL TO EXPLORE DISCIPLINES</span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PROGRAMS & COURSE CATALOG (Magazine Grid) ────── */}
      <section id="catalog" className="nz-catalog-section nz-section-padding">
        <div className="nz-container">
          <div className="nz-catalog-header">
            <div>
              <span className="nz-eyebrow">ACADEMIC DISCIPLINES</span>
              <h2 className="nz-heading-lg">IT COURSES IN KOLLAM.</h2>
            </div>

            <div className="nz-catalog-controls">
              <div className="nz-filter-pills">
                {[
                  { id: 'SOFTWARE', label: 'SOFTWARE' },
                  { id: 'AI', label: 'AI & ROBOTICS' },
                  { id: 'NETWORK', label: 'NETWORKING & CYBER' },
                  { id: 'BUSINESS', label: 'BUSINESS' },
                  { id: 'INTERNSHIP', label: 'INTERNSHIPS' },
                  { id: 'ALL', label: 'ALL DISCIPLINES' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`nz-filter-pill ${activeCategoryTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveCategoryTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="nz-search-bar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search courses or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="nz-search-input"
                />
              </div>
            </div>
          </div>

          <div className="nz-course-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="nz-course-card">
                <div className="nz-course-media">
                  <img src={course.image} alt={course.name} className="nz-course-img" />
                  <span className="nz-course-badge">{course.level}</span>
                </div>
                <div className="nz-course-content">
                  <div>
                    <h3 className="nz-course-title"><a href={coursePath(course.id)} style={{color: "inherit", textDecoration: "none"}}>{course.name}</a></h3>
                    <p className="nz-course-desc" style={{ marginTop: '0.6rem' }}>{course.desc}</p>
                  </div>
                  <div>
                    <div className="nz-course-meta">
                      <span>DURATION: {course.duration}</span>
                      <span>{course.cert}</span>
                    </div>
                    <button
                      className="nz-btn-primary"
                      style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem 1.5rem', fontSize: '0.8rem' }}
                      onClick={() => setSelectedCourseModal(course)}
                    >
                      VIEW SYLLABUS →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: WHY CHOOSE US (COS High-Fashion Composition) ─── */}
      <section id="why-us" className="nz-why-section nz-section-padding">
        <div className="nz-container">
          <div className="nz-why-grid">
            <div>
              <span className="nz-eyebrow">THE NETWORKZ ADVANTAGE</span>
              <h2 className="nz-heading-lg">WHERE AMBITION MEETS INFRASTRUCTURE.</h2>
              <p className="nz-body-lead" style={{ marginTop: '1.5rem' }}>
                We bridge the gap between academic theory and enterprise execution. Our state-of-the-art campus in Kollam offers dedicated server rooms, AI compute clusters, and direct Pearson VUE test authorization.
              </p>
            </div>

            <div className="nz-why-stats">
              <div className="nz-why-stat-box">
                <div className="nz-why-stat-num">24+</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', marginTop: '0.5rem', color: 'var(--color-primary)' }}>
                  YEARS OF EXCELLENCE
                </div>
              </div>
              <div className="nz-why-stat-box">
                <div className="nz-why-stat-num">100%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', marginTop: '0.5rem', color: 'var(--color-primary)' }}>
                  PLACEMENT SUPPORT
                </div>
              </div>
              <div className="nz-why-stat-box">
                <div className="nz-why-stat-num">3</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', marginTop: '0.5rem', color: 'var(--color-primary)' }}>
                  STATES PRESENCE
                </div>
              </div>
              <div className="nz-why-stat-box">
                <div className="nz-why-stat-num">50K+</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', marginTop: '0.5rem', color: 'var(--color-primary)' }}>
                  GRADUATES PLACED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: RECENT PLACEMENTS SLIDER & MOVING CAROUSEL ──── */}
      <section id="success" className="nz-success-section nz-section-padding">
        <div className="nz-container">
          <div className="nz-placement-header">
            <div>
              <span className="nz-eyebrow">PROVEN PLACEMENT RECORDS</span>
              <h2 className="nz-heading-lg">RECENT PLACEMENTS.</h2>
              <p className="nz-body-lead" style={{ marginTop: '0.8rem' }}>
                Congratulations to Networkz Systems Kollam students placed at top international & Technopark IT companies.
              </p>
            </div>

            {/* Slider Nav Buttons */}
            <div className="nz-placement-nav-controls">
              <button
                type="button"
                className="nz-placement-arrow-btn"
                onClick={handlePrevPlacement}
                aria-label="Previous placement slide"
              >
                ←
              </button>
              <button
                type="button"
                className="nz-placement-pause-btn"
                onClick={() => setIsPlacementPaused((prev) => !prev)}
                title={isPlacementPaused ? "Resume auto play" : "Pause auto play"}
              >
                {isPlacementPaused ? "▶ PLAY" : "❚❚ PAUSE"}
              </button>
              <button
                type="button"
                className="nz-placement-arrow-btn"
                onClick={handleNextPlacement}
                aria-label="Next placement slide"
              >
                →
              </button>
            </div>
          </div>

          {/* Featured Spotlight Card with Active Poster Slide */}
          <div
            className="nz-placement-spotlight"
            onMouseEnter={() => setIsPlacementPaused(true)}
            onMouseLeave={() => setIsPlacementPaused(false)}
          >
            {/* Active Poster Image Frame */}
            <div
              className="nz-placement-poster-frame"
              onClick={() => setPlacementModalImage(RECENT_PLACEMENTS_DATA[placementIndex])}
              title="Click to expand official poster"
            >
              <img
                src={RECENT_PLACEMENTS_DATA[placementIndex].image}
                alt={`${RECENT_PLACEMENTS_DATA[placementIndex].name} - ${RECENT_PLACEMENTS_DATA[placementIndex].role}`}
                className="nz-placement-poster-img"
              />
              <div className="nz-poster-zoom-hint">
                <span>🔍 CLICK TO ENLARGE POSTER</span>
              </div>
            </div>

            {/* Candidate & Placement Info */}
            <div className="nz-placement-info">
              <span className="nz-placement-badge">
                {RECENT_PLACEMENTS_DATA[placementIndex].badge}
              </span>
              <h3 className="nz-placement-name">
                {RECENT_PLACEMENTS_DATA[placementIndex].name}
              </h3>
              <p className="nz-placement-role">
                {RECENT_PLACEMENTS_DATA[placementIndex].role}
              </p>

              <div className="nz-placement-company-box">
                <div className="nz-company-label">PLACED AT</div>
                <div className="nz-company-title">
                  {RECENT_PLACEMENTS_DATA[placementIndex].company}
                </div>
                <div className="nz-company-sub">
                  {RECENT_PLACEMENTS_DATA[placementIndex].companyDetail}
                </div>
                <div className="nz-company-loc">
                  📍 {RECENT_PLACEMENTS_DATA[placementIndex].location}
                </div>
              </div>

              <div className="nz-placement-actions">
                <button
                  type="button"
                  className="nz-nav-cta"
                  onClick={() => setPlacementModalImage(RECENT_PLACEMENTS_DATA[placementIndex])}
                >
                  VIEW OFFICIAL POSTER ↗
                </button>
                <a
                  href={`https://wa.me/918089030405?text=Hello%20Admissions!%20I%20saw%20${RECENT_PLACEMENTS_DATA[placementIndex].name}'s%20placement%20at%20${RECENT_PLACEMENTS_DATA[placementIndex].company}%20and%20would%20like%20to%20know%20more%20about%20the%20course.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nz-nav-login-btn"
                  style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  💬 ENQUIRE THIS COURSE
                </a>
              </div>

              {/* Slider Dots */}
              <div className="nz-placement-dots">
                {RECENT_PLACEMENTS_DATA.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`nz-placement-dot ${idx === placementIndex ? 'is-active' : ''}`}
                    onClick={() => setPlacementIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Continuous Moving Slide Marquee Track */}
          <div className="nz-placement-marquee-sec">
            <div className="nz-marquee-label">
              <span>⚡ MOVING RECENT PLACEMENT GALLERY (CLICK ANY POSTER TO VIEW)</span>
            </div>
            <div className="nz-placement-marquee-track">
              {/* Duplicated items to create seamless infinite loop */}
              {[...RECENT_PLACEMENTS_DATA, ...RECENT_PLACEMENTS_DATA, ...RECENT_PLACEMENTS_DATA].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className={`nz-marquee-card ${RECENT_PLACEMENTS_DATA[placementIndex].id === p.id ? 'is-highlighted' : ''}`}
                  onClick={() => {
                    setPlacementIndex(p.id - 1);
                    setPlacementModalImage(p);
                  }}
                >
                  <img src={p.image} alt={p.name} className="nz-marquee-img" />
                  <div className="nz-marquee-overlay">
                    <span className="nz-marquee-name">{p.name}</span>
                    <span className="nz-marquee-role">{p.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Handcrafted High-End Lightbox Modal */}
      {placementModalImage && (
        <div className="nz-luxury-modal-backdrop" onClick={() => setPlacementModalImage(null)}>
          <div className="nz-luxury-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header Bar */}
            <div className="nz-luxury-modal-header">
              <div className="nz-modal-brand-tag">
                <img src="/nsk.jpeg" alt="NSK Logo" className="nz-modal-brand-logo" />
                <div>
                  <div className="nz-modal-brand-title">NETWORKZ SYSTEMS KOLLAM</div>
                  <div className="nz-modal-brand-sub">VERIFIED ALUMNI PLACEMENT SPOTLIGHT</div>
                </div>
              </div>

              <div className="nz-modal-header-actions">
                <span className="nz-modal-counter">
                  SLIDE {RECENT_PLACEMENTS_DATA.findIndex((p) => p.id === placementModalImage.id) + 1} OF {RECENT_PLACEMENTS_DATA.length}
                </span>
                <button
                  type="button"
                  className="nz-luxury-modal-close"
                  onClick={() => setPlacementModalImage(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body / Main Content */}
            <div className="nz-luxury-modal-body">
              
              {/* Left Column: Poster Display with Side Nav Buttons */}
              <div className="nz-modal-stage">
                <button
                  type="button"
                  className="nz-modal-stage-arrow nz-arrow-left"
                  onClick={handleModalPrev}
                  aria-label="Previous Poster"
                  title="Previous Poster (Left Arrow)"
                >
                  ‹
                </button>
                
                <div className="nz-modal-poster-canvas">
                  <img
                    src={placementModalImage.image}
                    alt={`${placementModalImage.name} - ${placementModalImage.role}`}
                    className="nz-modal-main-poster"
                  />
                </div>

                <button
                  type="button"
                  className="nz-modal-stage-arrow nz-arrow-right"
                  onClick={handleModalNext}
                  aria-label="Next Poster"
                  title="Next Poster (Right Arrow)"
                >
                  ›
                </button>
              </div>

              {/* Right Column: Handcrafted Details Panel */}
              <div className="nz-modal-details-panel">
                <span className="nz-modal-badge">
                  {placementModalImage.badge}
                </span>
                
                <h3 className="nz-modal-candidate-name">
                  {placementModalImage.name}
                </h3>
                <p className="nz-modal-candidate-role">
                  {placementModalImage.role}
                </p>

                <div className="nz-modal-company-card">
                  <div className="nz-modal-company-hdr">PLACED AT</div>
                  <div className="nz-modal-company-name">
                    {placementModalImage.company}
                  </div>
                  <div className="nz-modal-company-desc">
                    {placementModalImage.companyDetail}
                  </div>
                  <div className="nz-modal-company-location">
                    📍 {placementModalImage.location}
                  </div>
                </div>

                <div className="nz-modal-highlights">
                  <div className="nz-highlight-item">
                    <span className="nz-highlight-icon">🎓</span>
                    <span><strong>Certification:</strong> ISO 9001:2015 Certified Academy</span>
                  </div>
                  <div className="nz-highlight-item">
                    <span className="nz-highlight-icon">💼</span>
                    <span><strong>Career Support:</strong> 100% Direct Placement Support</span>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="nz-modal-ctas">
                  <a
                    href={`https://wa.me/918089030405?text=Hello%20Networkz%20Systems!%20I%20saw%20${placementModalImage.name}'s%20placement%20at%20${placementModalImage.company}%20and%20want%20to%20know%20batch%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nz-modal-primary-btn"
                  >
                    <span>💬 ENQUIRE ABOUT THIS COURSE</span>
                  </a>
                  <a
                    href="tel:08089030405"
                    className="nz-modal-secondary-btn"
                  >
                    <span>📞 CALL CAMPUS: +91 80890 30405</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Modal Bottom Thumbnail Gallery Switcher */}
            <div className="nz-modal-thumbs-bar">
              <div className="nz-thumbs-title">SWITCH PLACEMENT POSTER:</div>
              <div className="nz-thumbs-list">
                {RECENT_PLACEMENTS_DATA.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`nz-thumb-btn ${item.id === placementModalImage.id ? 'is-active' : ''}`}
                    onClick={() => setPlacementModalImage(item)}
                  >
                    <img src={item.image} alt={item.name} className="nz-thumb-img" />
                    <span className="nz-thumb-name">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── SECTION 7: PLACEMENT LOGO TICKER ─────────────────────── */}
      <section className="nz-placements-section">
        <div className="nz-container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            RECRUITMENT PARTNERS & ENTERPRISE EMPLOYERS
          </div>
          <div className="nz-logo-cloud">
            <span className="nz-partner-tag">TCS</span>
            <span className="nz-partner-tag">INFOSYS</span>
            <span className="nz-partner-tag">WIPRO</span>
            <span className="nz-partner-tag">UST GLOBAL</span>
            <span className="nz-partner-tag">COGNIZANT</span>
            <span className="nz-partner-tag">ACCENTURE</span>
            <span className="nz-partner-tag">IBM</span>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: TESTIMONIAL CAROUSEL GRID ──────────────────── */}
      <section className="nz-testimonials-section nz-section-padding">
        <div className="nz-container">
          <span className="nz-eyebrow">TESTIMONIALS</span>
          <h2 className="nz-heading-lg">WHAT OUR ALUMNI SAY.</h2>

          <div className="nz-testimonial-grid">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div key={idx} className="nz-testimonial-card">
                <p className="nz-testimonial-text">"{t.quote}"</p>
                <div>
                  <div style={{ fontWeight: '800', color: 'var(--color-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{t.role} — {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: COURSE CATEGORIES GRID (Aesop Tile Grid) ───── */}
      <section className="nz-categories-section nz-section-padding">
        <div className="nz-container">
          <span className="nz-eyebrow">EXPLORE DISCIPLINES</span>
          <h2 className="nz-heading-lg">SPECIALIZED ACADEMIC PATHWAYS.</h2>

          <div className="nz-category-grid">
            {CATEGORIES_DATA.map((cat) => (
              <a key={cat.id} href={cat.link} className="nz-category-card" aria-label={cat.title}>
                <img src={cat.img} alt={cat.title} className="nz-category-bg" loading="lazy" />
                <div className="nz-category-overlay" />
                <div className="nz-category-content">
                  <span className="nz-category-badge">
                    {cat.count}
                  </span>
                  <h3 className="nz-category-title">{cat.title}</h3>
                  <div className="nz-category-cta">
                    <span>Explore Track</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 10: LEARNING PROCESS ─────────────────────────── */}
      <section id="process" className="nz-process-section nz-section-padding">
        <div className="nz-container">
          <span className="nz-eyebrow">METHODOLOGY</span>
          <h2 className="nz-heading-lg">THE 4-STEP LEARNING ROADMAP.</h2>

          <div className="nz-process-grid">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="nz-process-step">
                <span className="nz-process-num">{step.num}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-primary)' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 11: ACHIEVEMENTS & STAT COUNTER ──────────────── */}
      <section className="nz-achievements-section nz-section-padding">
        <div className="nz-container">
          <div className="nz-achievements-grid">
            <div>
              <div className="nz-achievement-num">24<span>+</span></div>
              <div className="nz-achievement-label">Years Experience</div>
            </div>
            <div>
              <div className="nz-achievement-num">50K<span>+</span></div>
              <div className="nz-achievement-label">Students Trained</div>
            </div>
            <div>
              <div className="nz-achievement-num">100<span>%</span></div>
              <div className="nz-achievement-label">Placement Cell</div>
            </div>
            <div>
              <div className="nz-achievement-num">200<span>+</span></div>
              <div className="nz-achievement-label">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 12: FAQ ACCORDION ─────────────────────────────── */}
      <section id="faq" className="nz-faq-section nz-section-padding">
        <div className="nz-container">
          <div style={{ textAlign: 'center' }}>
            <span className="nz-eyebrow">COMMON QUESTIONS</span>
            <h2 className="nz-heading-lg">FREQUENTLY ASKED QUESTIONS.</h2>
          </div>

          <div className="nz-faq-list">
            {FAQ_DATA.map((faq, idx) => (
              <div key={idx} className="nz-faq-item">
                <div
                  className="nz-faq-question"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: '900' }}>
                    {openFaqIndex === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaqIndex === idx && (
                  <div className="nz-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 13: CONTACT FORM & FOOTER ────────────────────── */}
      <section id="contact" className="nz-contact-section nz-section-padding">
        <div className="nz-container">
          <div style={{ textAlign: 'center' }}>
            <span className="nz-eyebrow">ADMISSIONS ADVISORY</span>
            <h2 className="nz-heading-lg">CONNECT WITH A SENIOR COUNSELOR.</h2>
          </div>

          <div className="nz-contact-card">
            {contactFormSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-accent)' }}>
                  APPLICATION SUBMITTED SUCCESSFULLY
                </h3>
                <p style={{ marginTop: '1rem', color: 'var(--color-text-sub)' }}>
                  Thank you. Our Kollam admissions counselor will reach out to you within 2 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactFormSubmitted(true);
                }}
              >
                <div className="nz-form-group">
                  <label className="nz-form-label">Full Name</label>
                  <input type="text" placeholder="John Doe" required className="nz-form-input" />
                </div>

                <div className="nz-form-group">
                  <label className="nz-form-label">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" required className="nz-form-input" />
                </div>

                <div className="nz-form-group">
                  <label className="nz-form-label">Preferred Course Specialization</label>
                  <input type="text" placeholder="e.g. Python Full Stack / Cyber Security" required className="nz-form-input" />
                </div>

                <div className="nz-form-group">
                  <label className="nz-form-label">Your Message or Inquiry</label>
                  <textarea rows="4" placeholder="Tell us about your educational background or career goal..." className="nz-form-textarea"></textarea>
                </div>

                <button type="submit" className="nz-btn-primary nz-btn-emerald" style={{ width: '100%', marginTop: '1rem' }}>
                  SUBMIT ADMISSIONS INQUIRY →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nz-footer">
        <div className="nz-container">
          <div className="nz-footer-grid">
            <div className="nz-footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src="/nsk.jpeg" alt="Networkz Systems" className="nz-brand-emblem-img" />
                <span className="nz-brand-name" style={{ color: '#ffffff' }}>NETWORKZ SYSTEMS</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.6', margin: '0.75rem 0' }}>
                An ISO 9001:2015 Certified Academy delivering enterprise IT & Cyber Security education across South India.
              </p>
              <div className="nz-footer-contact-clean">
                <div className="nz-contact-row">
                  <svg className="nz-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <a href="https://maps.google.com/?q=Networkz+Systems+Pattathuvila+Plaza+Chinnakada+Kollam" target="_blank" rel="noopener noreferrer" className="nz-address-link">
                    2nd Floor, Pattathuvila Plaza, Vadayattukotta Rd, Chinnakada, Kollam, Kerala 691001
                  </a>
                </div>

                <div className="nz-contact-row">
                  <svg className="nz-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href="tel:+918089030405" className="nz-phone-link">+91 80890 30405</a>
                </div>

                <div className="nz-contact-row">
                  <svg className="nz-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Monday – Sunday: 9:00 AM – 5:30 PM</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="nz-footer-social-wrap">
                <span className="nz-social-label">OFFICIAL SOCIAL CHANNELS</span>
                <div className="nz-social-btns">
                  <a
                    href="https://www.instagram.com/networkz_systems_kollam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nz-social-btn nz-social-btn--ig"
                    aria-label="Follow Networkz Systems Kollam on Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/Networkzsystemskollam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nz-social-btn nz-social-btn--fb"
                    aria-label="Follow Networkz Systems Kollam on Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="nz-footer-title">DISCIPLINE TRACKS</div>
              <ul className="nz-footer-links">
                <li><a href="#catalog">Software Product Training</a></li>
                <li><a href="#catalog">AI & Electronics</a></li>
                <li><a href="#catalog">Networking & Security</a></li>
                <li><a href="#catalog">Business & Digital Marketing</a></li>
                <li><a href="#catalog">Internship Programs</a></li>
              </ul>
            </div>

            <div>
              <div className="nz-footer-title">CAMPUS LOCATIONS</div>
              <ul className="nz-footer-links">
                <li><a href="#contact">Kollam Campus</a></li>
                <li><a href="#contact">Trivandrum Campus</a></li>
                <li><a href="#contact">Ernakulam Campus</a></li>
                <li><a href="#contact">Chennai Campus</a></li>
              </ul>
            </div>

            <div>
              <div className="nz-footer-title">STUDENT & EMPLOYEE PORTAL</div>
              <ul className="nz-footer-links">
                <li>
                  <a
                    href="https://script.google.com/a/macros/nskollam.com/s/AKfycbxGEQdDZ0eAyhgPTKpZM1denEs7A5Ui15Ak1gEMWkYYvDsBpR7ViaN2Rzm0LWCjJ_k_/exec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nz-footer-employee-link"
                  >
                    Employee Timesheet Login ↗
                  </a>
                </li>
                <li><a href="/exam">Skill Exam Portal</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
                <li><a href="#success">Placement Records</a></li>
                <li><a href="#contact">Admissions Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="nz-footer-bottom">
            <span>© {new Date().getFullYear()} NETWORKZ SYSTEMS. ALL RIGHTS RESERVED.</span>
            <div className="nz-footer-bottom-socials">
              <a
                href="https://www.instagram.com/networkz_systems_kollam/"
                target="_blank"
                rel="noopener noreferrer"
                className="nz-footer-social-link"
              >
                Instagram ↗
              </a>
              <span className="nz-footer-dot">•</span>
              <a
                href="https://www.facebook.com/Networkzsystemskollam"
                target="_blank"
                rel="noopener noreferrer"
                className="nz-footer-social-link"
              >
                Facebook ↗
              </a>
            </div>
            <span>DESIGN DIRECTOR EDITORIAL SPECIFICATION</span>
          </div>
        </div>
      </footer>

      {/* SYLLABUS MODAL POPUP */}
      {selectedCourseModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', color: '#111111', borderRadius: '16px', maxWidth: '580px', width: '100%', padding: '2.5rem', boxShadow: '0 25px 60px rgba(0,0,0,0.35)', position: 'relative' }}>
            <button
              onClick={() => setSelectedCourseModal(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', fontWeight: '900', cursor: 'pointer', color: '#111111' }}
            >
              ✕
            </button>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
              {selectedCourseModal.catName}
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.4rem', marginBottom: '1rem' }}>
              {selectedCourseModal.name}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-sub)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {selectedCourseModal.desc}
            </p>
            <div style={{ background: 'var(--color-bg-light)', padding: '1rem 1.25rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>DURATION: {selectedCourseModal.duration}</span>
              <span>LEVEL: {selectedCourseModal.level}</span>
            </div>
            <button
              onClick={() => {
                setSelectedEnrollmentCourse(selectedCourseModal);
                setSelectedCourseModal(null);
                setEnrollmentSubmitted(false);
              }}
              className="nz-btn-primary nz-btn-emerald"
              style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer' }}
            >
              ENROLL IN THIS PROGRAM →
            </button>
          </div>
        </div>
      )}

      {/* REGISTRATION POP-UP FORM MODAL (IMAGE 2 PROMOTIONAL SIGN-UP DESIGN) */}
      {selectedEnrollmentCourse && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#ffffff', color: '#111111', borderRadius: '16px', maxWidth: '480px', width: '100%', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', position: 'relative', animation: 'fade-up 0.3s ease' }}>

            {/* Close Button */}
            <button
              onClick={() => setSelectedEnrollmentCourse(null)}
              style={{ position: 'absolute', top: '1rem', right: '1.2rem', zIndex: 10, background: 'rgba(0,0,0,0.2)', color: '#ffffff', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>

            {/* Top Dark Header Card Banner */}
            <div style={{ background: '#111111', color: '#ffffff', padding: '2rem 1.5rem 1.8rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                ANNIVERSARY SPECIAL
              </div>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#ffffff', lineHeight: '1', margin: '0.3rem 0 0.1rem' }}>
                20% OFF
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', opacity: 0.85, letterSpacing: '0.05em' }}>
                KOLLAM CAMPUS BATCH ADMISSION
              </div>
            </div>

            {/* Modal Form Body */}
            <div style={{ padding: '2rem 2.2rem 2.2rem', textAlign: 'center' }}>
              {enrollmentSubmitted ? (
                <div style={{ padding: '1.5rem 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                    REGISTRATION CONFIRMED!
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)', marginTop: '0.8rem', lineHeight: '1.6' }}>
                    Thank you! Your 20% discount offer seat for <strong>{selectedEnrollmentCourse.name}</strong> has been reserved. Our admissions team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSelectedEnrollmentCourse(null)}
                    className="nz-btn-primary"
                    style={{ width: '100%', marginTop: '1.8rem', background: '#111111', color: '#ffffff' }}
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEnrollmentSubmitted(true);
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555' }}>
                    UNLOCK
                  </div>
                  <h3 style={{ fontSize: '1.9rem', fontWeight: '900', color: '#111111', lineHeight: '1.1', margin: '0.2rem 0 0.4rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                    20% OFF ADMISSION
                  </h3>
                  <p style={{ fontSize: '0.88rem', fontWeight: '700', color: '#111111', marginBottom: '0.3rem' }}>
                    {selectedEnrollmentCourse.name}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#666666', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    Register your details below to claim your discount seat for Kollam batch
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      style={{ width: '100%', background: '#f0f0f2', border: '1px solid #e0e0e4', borderRadius: '10px', padding: '0.9rem 1.1rem', fontSize: '0.9rem', color: '#111111', outline: 'none' }}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      required
                      style={{ width: '100%', background: '#f0f0f2', border: '1px solid #e0e0e4', borderRadius: '10px', padding: '0.9rem 1.1rem', fontSize: '0.9rem', color: '#111111', outline: 'none' }}
                    />
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      required
                      style={{ width: '100%', background: '#f0f0f2', border: '1px solid #e0e0e4', borderRadius: '10px', padding: '0.9rem 1.1rem', fontSize: '0.9rem', color: '#111111', outline: 'none' }}
                    />

                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', background: '#111111', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '1.05rem', fontSize: '0.95rem', fontWeight: '900', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s ease', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                  >
                    CONFIRM & REGISTER →
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
