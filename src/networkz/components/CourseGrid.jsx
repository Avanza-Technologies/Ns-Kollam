import { useMemo } from 'react';
import { COURSE_DETAILS } from '../data/courseData';

/** A single course card */
function CourseCard({ course, index, chapterProgress, accentColor, totalCards }) {
  // Each card appears when chapterProgress passes its threshold
  const threshold = 0.1 + index * (0.55 / Math.max(totalCards - 1, 1));
  const isVisible = chapterProgress >= threshold;

  return (
    <div
      className="nz-card"
      style={{
        transitionDelay: isVisible ? `${index * 55}ms` : '0ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.98)',
      }}
    >
      {/* Card index + certification */}
      <div className="nz-card-top">
        <span className="nz-card-index" style={{ color: accentColor }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="nz-card-cert">{course.cert}</span>
      </div>

      {/* Course name */}
      <h3 className="nz-card-name">{course.name}</h3>

      {/* Description */}
      <p className="nz-card-desc">{course.desc}</p>

      {/* Meta row */}
      <div className="nz-card-meta">
        <span className="nz-card-level" style={{ borderColor: `${accentColor}40`, color: accentColor }}>
          {course.level}
        </span>
        <span className="nz-card-duration">{course.duration}</span>
      </div>
    </div>
  );
}

/** Full animated course grid for the current chapter */
export default function CourseGrid({ chapterIndex, chapterProgress, visible }) {
  const data = COURSE_DETAILS[chapterIndex];
  if (!data) return null;

  return (
    <div className={`nz-course-section${visible ? ' nz-course-section--visible' : ''}`}>
      <div className="nz-course-grid">
        {data.courses.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            index={i}
            chapterProgress={chapterProgress}
            accentColor={data.accent}
            totalCards={data.courses.length}
          />
        ))}
      </div>
    </div>
  );
}
