import { useMemo } from 'react';

/** Tall vertical card — portrait format like a premium key card */
function VerticalCard({ course, index, isActive, accentColor }) {
  return (
    <div className={`nz-vcard${isActive ? ' nz-vcard--active' : ''}`}>
      {/* Accent strip */}
      <div className="nz-vcard-strip" style={{ background: accentColor }} />

      {/* Index + cert */}
      <div className="nz-vcard-head">
        <span className="nz-vcard-num" style={{ color: accentColor }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="nz-vcard-cert">{course.cert}</span>
      </div>

      {/* Main title */}
      <h3 className="nz-vcard-name">{course.name}</h3>

      {/* Description */}
      <p className="nz-vcard-desc">{course.desc}</p>

      {/* Footer */}
      <div className="nz-vcard-footer">
        <span className="nz-vcard-level" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
          {course.level}
        </span>
        <span className="nz-vcard-duration">{course.duration}</span>
      </div>
    </div>
  );
}

/**
 * 3D rotating wheel carousel.
 * Cards are arranged on a vertical circle (ferris-wheel / clock).
 * chapterProgress (0→1) rotates the wheel so each card visits the front.
 */
export default function CourseWheel({ courses, chapterProgress, accentColor }) {
  const N = courses.length;
  const RADIUS = 240; // px — radius of the invisible wheel

  // Which card index is at the "front" (6 o'clock / closest to viewer)
  const activeIndex = chapterProgress * (N - 1);

  // Build sorted card positions (back → front for correct z-layering)
  const slots = useMemo(() => {
    const raw = courses.map((course, i) => {
      // Angle in radians: 0 = front (bottom of clock), increases clockwise
      const angle = ((i - activeIndex) / N) * Math.PI * 2;

      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle); // +1 = front, -1 = back

      const y = RADIUS * sinA;
      // normalizedDepth: 1 = front, 0 = back
      const depth = (cosA + 1) / 2;

      const scale   = 0.52 + 0.48 * depth;
      const opacity = 0.12 + 0.88 * depth;
      const blur    = (1 - depth) * 2.5;
      const isActive = Math.abs(angle) < Math.PI / N;

      return { course, i, y, cosA, depth, scale, opacity, blur, isActive };
    });

    // Sort back to front so front card renders on top
    return raw.sort((a, b) => a.cosA - b.cosA);
  }, [courses, activeIndex, N, RADIUS]);

  return (
    <div className="nz-wheel-wrap">
      {/* Active card label */}
      <div className="nz-wheel-counter">
        <span style={{ color: accentColor }}>
          {String(Math.round(activeIndex) + 1).padStart(2, '0')}
        </span>
        <span className="nz-wheel-counter-sep">/</span>
        <span>{String(N).padStart(2, '0')}</span>
      </div>

      {/* The wheel */}
      <div className="nz-wheel" style={{ height: `${RADIUS * 2 + 320}px` }}>
        {slots.map(({ course, i, y, depth, scale, opacity, blur, isActive }) => (
          <div
            key={course.id}
            className="nz-wheel-slot"
            style={{
              transform: `translateY(calc(-50% + ${y}px)) scale(${scale})`,
              opacity,
              zIndex: Math.round(depth * 100),
              filter: blur > 0.3 ? `blur(${blur}px)` : 'none',
              transition: 'transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.42s ease, filter 0.42s ease',
            }}
          >
            <VerticalCard
              course={course}
              index={i}
              isActive={isActive}
              accentColor={accentColor}
            />
          </div>
        ))}
      </div>

      {/* Wheel axis indicator */}
      <div className="nz-wheel-axis" />

      {/* Rotation progress arc */}
      <svg className="nz-wheel-arc" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="26" stroke="rgba(232,230,224,0.06)" strokeWidth="1" />
        <circle
          cx="30" cy="30" r="26"
          stroke={accentColor}
          strokeWidth="1"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - chapterProgress)}`}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
    </div>
  );
}
