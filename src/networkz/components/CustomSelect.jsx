import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

export default function CustomSelect({
  options = [],
  value = '',
  onChange = () => {},
  placeholder = 'Select an option...',
  className = '',
  theme = 'light', // 'light' | 'dark'
  dropUp = false,
  style = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUp, setIsUp] = useState(dropUp);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (dropUp || spaceBelow < 240) {
        setIsUp(true);
      } else {
        setIsUp(false);
      }
    }
    setIsOpen(!isOpen);
  };

  // Format options if passed as simple strings vs objects
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt;
    }
    return { label: opt, value: opt };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        handleToggle();
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen) {
        handleToggle();
      } else if (focusedIndex >= 0 && focusedIndex < normalizedOptions.length) {
        handleSelect(normalizedOptions[focusedIndex].value);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select-container custom-select-theme-${theme} ${isOpen ? 'is-open' : ''} ${isUp ? 'drop-up' : ''} ${className}`}
      style={style}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="custom-select-trigger"
        onClick={handleToggle}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={`custom-select-value ${!selectedOption ? 'placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="custom-select-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown" role="listbox">
          {normalizedOptions.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isFocused = idx === focusedIndex;
            return (
              <div
                key={opt.value || idx}
                className={`custom-select-option ${isSelected ? 'is-selected' : ''} ${isFocused ? 'is-focused' : ''}`}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setFocusedIndex(idx)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="option-label">{opt.label}</span>
                {isSelected && (
                  <span className="option-checkmark">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
