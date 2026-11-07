export const categoryDescriptions = {
  'Software Product Training': `Learn {courseName} at Networkz Systems, a trusted software training institute in Kollam, Kerala. Develop in-demand technical skills through affordable, career-oriented training designed for students, graduates and aspiring IT professionals. Master {topics} through practical exercises, hands-on coding and real-world projects with an industry-focused learning approach at our Kollam campus. Build your technical expertise and prepare for opportunities in the software development industry.`,

  'AI & Electronics': `Explore {courseName} training at Networkz Systems, a trusted technology training institute in Kollam, Kerala. Gain practical knowledge through affordable, career-oriented training focused on emerging technologies and technical skills. Learn {topics} through hands-on exercises, practical applications and real-world projects with an industry-focused learning approach at our Kollam campus. Develop the technical expertise needed to explore opportunities in artificial intelligence, electronics and emerging technology fields.`,

  'Networking & Cyber Security': `Learn {courseName} at Networkz Systems, a trusted networking and cyber security training institute in Kollam, Kerala. Build technical expertise through affordable, career-oriented training focused on networking, system administration and information security. Master {topics} through practical lab sessions, hands-on exercises and real-world technical scenarios with an industry-focused learning approach at our Kollam campus. Develop essential skills to pursue professional opportunities in networking and cyber security.`,

  'Business & Digital Marketing': `Develop professional skills in {courseName} at Networkz Systems, a trusted business and digital marketing training institute in Kollam, Kerala. Explore affordable, career-oriented training designed to develop practical business, marketing and digital skills. Learn {topics} through hands-on activities, practical assignments and real-world applications with an industry-focused learning approach at our Kollam campus. Build the knowledge and skills needed to explore opportunities in business management and the digital marketing industry.`,

  'Internship Programs': `Gain practical experience through {courseName} at Networkz Systems in Kollam, Kerala. Explore career-oriented internship programs designed to help students and graduates develop industry-relevant technical skills. Work with {topics} through hands-on assignments, practical exercises and project-based learning under professional guidance at our Kollam campus. Strengthen your technical knowledge, gain practical exposure and develop the skills needed to prepare for professional opportunities.`
};

export const CATEGORY_MAP = {
  // Existing category names from courseData.js
  'Software Product Training': 'Software Product Training',
  'AI + Electronics': 'AI & Electronics',
  'AI & Electronics': 'AI & Electronics',
  'Networking & Security': 'Networking & Cyber Security',
  'Networking & Cyber Security': 'Networking & Cyber Security',
  'Business & Management': 'Business & Digital Marketing',
  'Business & Digital Marketing': 'Business & Digital Marketing',
  'Internship Programs': 'Internship Programs',
  // Numeric category ID fallback
  '1': 'Software Product Training',
  '2': 'AI & Electronics',
  '3': 'Networking & Cyber Security',
  '4': 'Business & Digital Marketing',
  '5': 'Internship Programs'
};

export function generateCourseDescription(page) {
  if (!page) return '';

  const mappedCategory = CATEGORY_MAP[page.category] || CATEGORY_MAP[page.categoryId];
  const template = categoryDescriptions[mappedCategory];

  if (!template) {
    console.warn(
      `SEO description template not found for category: ${page.category} (id: ${page.categoryId})`
    );
    return page.description || '';
  }

  const courseName = (page.name || '')
    .replace(/ Course in Kollam$/i, '')
    .trim();

  const topics = Array.isArray(page.topics)
    ? page.topics.filter(Boolean).join(', ')
    : '';

  return template
    .replaceAll('{courseName}', courseName)
    .replaceAll('{topics}', topics);
}
