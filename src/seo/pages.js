import { coursePages, directoryPages } from './catalog.js';
export const origin = 'https://nskollam.com';
export const pages = {
  ...coursePages, ...directoryPages,
  '/': { title: 'IT Training Institute in Kollam | Networkz Systems', name: 'IT Training Institute in Kollam', description: 'Explore IT training in Kollam for Cyber Security, CCNA, Python, Java, AI, Cloud and Digital Marketing. Practical learning and placement assistance.' },
  '/cybersecurity': { title: 'Cyber Security Course in Kollam | Networkz Systems', name: 'Cyber Security Course in Kollam', description: 'Learn cyber security and ethical hacking in Kollam with practical training in penetration testing, network security and SOC operations. Enquire about batches.' },
  '/digital-marketing': { title: 'Digital Marketing Course in Kollam | Networkz Systems', name: 'Digital Marketing Course in Kollam', description: 'Study digital marketing in Kollam: SEO, Google Ads, Meta Ads, content marketing and AI tools. Contact Networkz Systems for course fees and batch details.' },
};
export const aliases = { '/cyber-security': '/cybersecurity', '/cyber': '/cybersecurity', '/ethical-hacking': '/cybersecurity', '/digitalmarketing': '/digital-marketing', '/dm': '/digital-marketing' };
export function getSeo(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const canonicalPath = aliases[path] || path;
  const page = pages[canonicalPath];
  return { ...(page || { title: path === '/exam' || path.startsWith('/exam/') ? 'Skill Exam Portal | Networkz Systems' : 'Page Not Found | Networkz Systems', description: 'Networkz Systems Kollam', name: 'Page Not Found' }), canonical: origin + canonicalPath, robots: page ? 'index, follow' : 'noindex, follow' };
}
export function schemaFor(pathname) {
  const page = getSeo(pathname);
  if (page.robots.startsWith('noindex')) return null;
  const organization = { '@type': 'EducationalOrganization', '@id': origin + '/#organization', name: 'Networkz Systems Kollam', url: origin + '/', logo: origin + '/nsk.jpeg', telephone: '+918089030405', address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, Pattathuvila Plaza, Vadayattukotta Road, Chinnakada', addressLocality: 'Kollam', addressRegion: 'Kerala', postalCode: '691001', addressCountry: 'IN' } };
  const graph = [organization];
  if (page.canonical === origin + '/') graph.push({ '@type': 'WebSite', name: organization.name, url: origin + '/' });
  else graph.push({ '@type': page.kind ? 'CollectionPage' : 'Course', name: page.name, description: page.description, url: page.canonical, ...(page.kind ? {} : { provider: { '@id': organization['@id'] } }) }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: page.name, item: page.canonical }] });
  return { '@context': 'https://schema.org', '@graph': graph };
}
