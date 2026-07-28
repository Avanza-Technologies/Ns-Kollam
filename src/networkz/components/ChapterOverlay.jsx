import React from 'react';
import { CHAPTERS } from '../data/chapters';

export default function ChapterOverlay({ chapterIndex, chapterProgress, visible }) {
  const chapter = CHAPTERS[chapterIndex];
  if (!chapter || !chapter.label) return null;

  // How many programs to highlight based on chapter scroll progress
  const activeCount = chapter.programs
    ? Math.floor(chapterProgress * chapter.programs.length)
    : 0;

  return (
    <div
      className={`nz-chapter${visible ? '' : ' nz-chapter--hidden'}`}
      aria-hidden={!visible}
    >
      <p className="nz-chapter-label">{chapter.label}</p>

      <h2 className="nz-chapter-headline">{chapter.headline}</h2>

      {chapter.subline && (
        <p className="nz-chapter-subline">{chapter.subline}</p>
      )}

      {chapter.programs && (
        <div className="nz-programs" role="list" aria-label="Programs">
          {chapter.programs.map((prog, i) => (
            <span
              key={prog}
              role="listitem"
              className={`nz-program-item${i <= activeCount ? ' nz-program-item--active' : ''}`}
            >
              {prog}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
