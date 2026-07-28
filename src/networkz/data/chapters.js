// ─── Chapter Configuration ────────────────────────────────────────────────────
// Environments are spaced 30 units apart along the Z axis.
// Camera keyframes choreograph the cinematic scroll journey.

export const CHAPTERS = [
  {
    id: 0,
    key: 'opening',
    label: null,
    headline: null,
    subline: null,
    programs: null,
    cameraPos: [0, 2, 10],
    cameraTarget: [0, 0, 0],
    fov: 60,
  },
  {
    id: 1,
    key: 'software',
    label: '01 — SOFTWARE',
    headline: 'SOFTWARE\nPRODUCT\nTRAINING',
    subline: null,
    programs: [
      'C/C++', 'PYTHON FULL STACK', 'JAVA FULL STACK',
      'MERN STACK', 'MEAN STACK', 'WEB DEVELOPMENT',
      'DATA SCIENCE', 'REACT JS', 'SOFTWARE TESTING', 'UI/UX',
    ],
    cameraPos: [3, 2, -20],
    cameraTarget: [0, 0, -30],
    fov: 65,
  },
  {
    id: 2,
    key: 'ai',
    label: '02 — ARTIFICIAL INTELLIGENCE',
    headline: 'AI &\nELECTRONICS',
    subline: null,
    programs: [
      'MACHINE LEARNING', 'DEEP LEARNING', 'GENERATIVE AI',
      'EMBEDDED SYSTEMS', 'ROBOTICS', 'AI',
    ],
    cameraPos: [-4, -1, -50],
    cameraTarget: [0, 0, -60],
    fov: 70,
  },
  {
    id: 3,
    key: 'network',
    label: '03 — NETWORK INFRASTRUCTURE',
    headline: 'NETWORKING\n& SECURITY',
    subline: null,
    programs: ['CCNA', 'A+', 'CYBERSECURITY', 'ETHICAL HACKING', 'LINUX', 'AZURE', 'AWS'],
    cameraPos: [4, 2, -80],
    cameraTarget: [0, 0, -90],
    fov: 65,
  },
  {
    id: 4,
    key: 'business',
    label: '04 — BUSINESS & MANAGEMENT',
    headline: 'BUSINESS\n& MANAGEMENT',
    subline: null,
    programs: ['DIGITAL MARKETING', 'MICROSOFT OFFICE'],
    cameraPos: [-3, 2, -110],
    cameraTarget: [0, 0, -120],
    fov: 60,
  },
  {
    id: 5,
    key: 'internship',
    label: '05 — INTERNSHIP',
    headline: 'INTERNSHIP\nPROGRAMS',
    subline: null,
    programs: ['120 HOURS', '3 MONTHS', '6 MONTHS', '1 YEAR'],
    cameraPos: [-10, 2, -145],
    cameraTarget: [5, 0, -150],
    fov: 65,
  },
  {
    id: 6,
    key: 'map',
    label: '06 — PRESENCE',
    headline: 'KERALA\nTAMIL NADU\nKARNATAKA',
    subline: 'THREE STATES. ONE MISSION.',
    programs: null,
    cameraPos: [0, 18, -172],
    cameraTarget: [0, 0, -180],
    fov: 55,
  },
  {
    id: 7,
    key: 'institute',
    label: '07 — NETWORKZ SYSTEMS',
    headline: 'NETWORKZ\nSYSTEMS',
    subline: 'ISO 9001:2015 CERTIFIED',
    programs: ['PEARSON VUE AUTHORIZED', 'NSIM SKILL PARTNER', '100% PLACEMENT SUPPORT'],
    cameraPos: [12, 4, -198],
    cameraTarget: [0, 1, -210],
    fov: 60,
  },
  {
    id: 8,
    key: 'transform',
    label: null,
    headline: null,
    subline: null,
    programs: null,
    cameraPos: [0, 2, -228],
    cameraTarget: [0, 0, -240],
    fov: 50,
  },
];

export const TOTAL_CHAPTERS = CHAPTERS.length;

/** Returns { chapterIndex, chapterProgress } for a given global scroll 0–1 */
export function getChapterProgress(scrollProgress) {
  const chapterSize = 1 / TOTAL_CHAPTERS;
  const chapterIndex = Math.min(
    Math.floor(scrollProgress / chapterSize),
    TOTAL_CHAPTERS - 1
  );
  const chapterProgress = Math.min(
    Math.max((scrollProgress - chapterIndex * chapterSize) / chapterSize, 0),
    1
  );
  return { chapterIndex, chapterProgress };
}

// World-space positions for each environment group
export const ENV_POSITIONS = [
  [0, 0, 0],     // 0 Opening
  [0, 0, -30],   // 1 Software
  [0, 0, -60],   // 2 AI
  [0, 0, -90],   // 3 Network
  [0, 0, -120],  // 4 Business
  [0, 0, -150],  // 5 Internship
  [0, 0, -180],  // 6 Map
  [0, 0, -210],  // 7 Institute
  [0, 0, -240],  // 8 Transform
];
