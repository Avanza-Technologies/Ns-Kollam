import React from 'react';
import { catalog, coursePages, directoryPages } from './catalog.js';
import './CoursePage.css';
export default function CoursePage({ path }) {
  const page = coursePages[path] || directoryPages[path];
  const courses = page.kind === 'internships' ? catalog.filter(c => c.categoryId === '5') : catalog;
  const groups = [...new Set(courses.map(c => c.category))];
  const enquiry = `https://wa.me/918089030405?text=${encodeURIComponent(`Hello Networkz Systems Kollam, please share fees, prerequisites and upcoming batches for ${page.name}.`)}`;
  return <div className="course-local">
    <header><a href="/" className="course-brand">NETWORKZ SYSTEMS <span>KOLLAM</span></a><nav aria-label="Main navigation"><a href="/courses">All courses</a><a href="/cybersecurity">Cyber security</a><a href="/courses/artificial-intelligence-course-kollam">AI training</a><a href="/digital-marketing">Digital marketing</a></nav></header>
    <main>
      <nav aria-label="Breadcrumb" className="course-crumb"><a href="/">Home</a> / {page.kind ? null : <><a href="/courses">Courses</a> / </>}<span aria-current="page">{page.name}</span></nav>
      <section className="course-hero"><p className="course-eyebrow">{page.category || 'EXPLORE YOUR NEXT STEP'}</p><h1>{page.name}</h1><p>{page.kind ? page.description : `Study ${page.name.replace(' Course in Kollam', '')} at Networkz Systems in Chinnakada, Kollam. The published course covers ${page.topics.join(', ')}.`}</p><div className="course-actions"><a href={enquiry} className="course-button">Enquire about this {page.kind ? 'program' : 'course'}</a><a href="tel:+918089030405">Call +91 80890 30405</a></div></section>
      {page.kind ? groups.map(group => <section key={group}><h2>{group}</h2><div className="course-cards">{courses.filter(c => c.category === group).map(course => <article key={course.id}><h3>{page.kind === 'internships' ? `${course.name} Internship` : <a href={course.path}>{course.name}</a>}</h3><p>{course.desc.replace('100% placement', 'placement support')}</p><p><strong>Duration:</strong> {course.duration}</p>{page.kind === 'internships' && <a href={`https://wa.me/918089030405?text=${encodeURIComponent(`Please share details of the ${course.name} internship in Kollam.`)}`}>Ask about this internship</a>}</article>)}</div></section>) : <>
        <section className="course-facts"><div><span>Duration</span><strong>{page.duration}</strong></div><div><span>Course level</span><strong>{page.level}</strong></div><div><span>Location</span><strong>Chinnakada, Kollam</strong></div></section>
        <section><h2>What you will study</h2><ul className="course-topics">{page.topics.map(topic => <li key={topic}>{topic}</li>)}</ul><p>Contact the training team for the detailed syllabus, practical assignments and current batch schedule.</p></section>
        <section><h2>Plan your {page.name.replace(' Course in Kollam', '')} training</h2><p>This course is listed at {page.level.toLowerCase()} level with a duration of {page.duration}. Ask the admissions team which prior skills are expected and how the timetable fits your studies or work.</p><h3>Fees and certification</h3><p>Request the current fee breakdown, assessment requirements and certificate details before enrolling. For vendor certification preparation, confirm examination arrangements and any separate exam fees with the team.</p></section>
        <section><h2>Related courses in Kollam</h2><div className="course-cards">{catalog.filter(c => c.categoryId === page.categoryId && c.id !== page.id).map(c => <article key={c.id}><h3><a href={c.path}>{c.name}</a></h3><p>{c.desc}</p></article>)}</div></section>
      </>}
      <section><h2>Visit Networkz Systems Kollam</h2><address>2nd Floor, Pattathuvila Plaza, Vadayattukotta Road,<br />Chinnakada, Kollam, Kerala 691001</address><p>Monday–Sunday: 9:00 AM–5:30 PM</p><div className="course-actions"><a href="https://maps.google.com/?q=Networkz+Systems+Pattathuvila+Plaza+Chinnakada+Kollam">Get directions</a><a href={enquiry}>Ask about fees and batches</a></div></section>
    </main><footer><a href="/courses">Browse all IT courses in Kollam</a><a href="/internships-kollam">Internship programs</a><a href="/">Networkz Systems Kollam</a></footer>
  </div>;
}
