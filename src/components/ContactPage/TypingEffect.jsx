

import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

const TypingEffect = ({ phrases, theme: propTheme }) => {
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  // Theme-based timing
  const typeSpeed = theme === 'dark' ? 80 : 100; // Faster in dark mode
  const deleteSpeed = theme === 'dark' ? 40 : 50; // Faster delete in dark mode
  const pauseTime = theme === 'dark' ? 1200 : 2000; // Shorter pause in dark mode

  useEffect(() => {
    let timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting) {
      if (typingText === '') {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      } else {
        timeout = setTimeout(() => {
          setTypingText(typingText.substring(0, typingText.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (charIndex < phrases[phraseIndex].length) {
        timeout = setTimeout(() => {
          setTypingText(phrases[phraseIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typeSpeed);
      } else {
        setIsPaused(true);
        setCharIndex(0);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [typingText, isDeleting, isPaused, charIndex, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="relative">
      {typingText}
      <span 
        className={`inline-block w-[2px] ml-[1px] transition-all duration-300 ${
          theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'
        } ${
          isPaused ? 'h-6 opacity-100' : 'h-5 opacity-100'
        }`}
        style={{
          animation: 'pulse 1.5s infinite'
        }}
      />
    </span>
  );
};



export default TypingEffect;