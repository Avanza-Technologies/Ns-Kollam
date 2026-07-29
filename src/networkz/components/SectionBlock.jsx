import { useRef, useEffect, useState } from 'react';
import { COURSE_DETAILS } from '../data/courseData';
import { CHAPTERS } from '../data/chapters';

/** A single course card — animates in when section is visible */
function CourseCard({ course, index, isVisible, accentColor }) {
  return (
    <div
      className={`nz-card${isVisible ? ' nz-card--visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
    >
      <div className="nz-card-top">
        <span className="nz-card-num" style={{ color: accentColor }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="nz-card-cert">{course.cert}</span>
      </div>
      <h3 className="nz-card-name">{course.name}</h3>
      <p className="nz-card-desc">{course.desc}</p>
      <div className="nz-card-meta">
        <span className="nz-card-level" style={{ color: accentColor, borderColor: `${accentColor}50` }}>
          {course.level}
        </span>
        <span className="nz-card-duration">{course.duration}</span>
      </div>
    </div>
  );
}

/** A full-page content section */
export default function SectionBlock({ chapterId }) {
  const sectionRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  const chapter = CHAPTERS[chapterId];
  const data = COURSE_DETAILS[chapterId];
  if (!chapter || !data) return null;

  useEffect(() => {
    const timeouts = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          // Stagger each card
          data.courses.forEach((_, i) => {
            const t = setTimeout(() => setVisibleCount(i + 1), 150 + i * 90);
            timeouts.push(t);
          });
        } else {
          setHeaderVisible(false);
          setVisibleCount(0);
        }
      },
      { threshold: 0.08, rootMargin: '-60px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [data.courses]);

  return (
    <section
      ref={sectionRef}
      id={chapter.key}
      className="nz-section"
      data-chapter={chapterId}
    >
      {/* Section header */}
      <div className={`nz-section-header${headerVisible ? ' nz-section-header--visible' : ''}`}>
        <span className="nz-section-label" style={{ color: data.accent }}>
          {chapter.label}
        </span>
        <h2 className="nz-section-headline">{chapter.headline}</h2>
        {chapter.subline && (
          <p className="nz-section-subline">{chapter.subline}</p>
        )}
      </div>

      {/* Card grid */}
      <div className="nz-cards-grid">
        {data.courses.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            index={i}
            isVisible={i < visibleCount}
            accentColor={data.accent}
          />
        ))}
      </div>
    </section>
  );
}
