import { COURSE_DETAILS } from '../networkz/data/courseData.js';
const slugs = { cpp: 'c-cpp', python: 'python-full-stack', python_ai: 'python-with-ai', java: 'java-full-stack', java_ai: 'java-with-ai', mern: 'mern-stack', mean: 'mean-stack', webdev: 'web-development', ds: 'data-science', react: 'react-js', testing: 'software-testing', uiux: 'ui-ux-design', ml: 'machine-learning', dl: 'deep-learning', genai: 'generative-ai', embedded: 'embedded-systems', robotics: 'robotics', ai: 'artificial-intelligence', ccna: 'ccna', linux: 'linux-administration', azure: 'microsoft-azure', aws: 'aws-cloud' };
export function coursePath(id) {
  if (id === 'cyber' || id === 'ethical') return '/cybersecurity';
  if (id === 'digi' || id === 'digi_ai') return '/digital-marketing';
  if (id.startsWith('i') && ['i120', 'i3m', 'i6m', 'i1y'].includes(id)) return '/internships-kollam';
  return `/courses/${slugs[id] || (id === 'msoffice' ? 'microsoft-office' : id)}-course-kollam`;
}
export const catalog = Object.entries(COURSE_DETAILS).flatMap(([categoryId, group]) => group.courses.map(course => ({ ...course, categoryId, category: group.category, path: coursePath(course.id), topics: course.desc.split(' · ').filter(topic => !topic.includes('Course in Kollam')) })));
export const coursePages = Object.fromEntries(catalog.filter(course => !['cyber', 'ethical', 'digi', 'digi_ai', 'i120', 'i3m', 'i6m', 'i1y'].includes(course.id)).map(course => [course.path, { ...course, name: `${course.name} Course in Kollam`, title: `${course.name} Course in Kollam | Networkz Systems`, description: `Learn ${course.name} in Kollam. Explore ${course.topics.slice(0, 3).join(', ')}. View the ${course.duration} course and enquire about fees and batches.` }]));
export const directoryPages = {
  '/courses': { name: 'IT Courses in Kollam', title: 'IT Courses in Kollam | Networkz Systems', description: 'Explore software, AI, cyber security, networking and digital marketing courses at Networkz Systems Kollam. Compare topics and course durations.', kind: 'directory' },
  '/internships-kollam': { name: 'IT Internship Programs in Kollam', title: 'IT Internships in Kollam | Networkz Systems', description: 'Explore 120-hour, 3-month, 6-month and 1-year internship programs in Kollam. Compare project and mentoring options and enquire about availability.', kind: 'internships' },
};
