

import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const TypingEffect = ({ phrases, theme: propTheme }) => {
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  useEffect(() => {
    let timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting) {
      if (typingText === '') {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      } else {
        timeout = setTimeout(() => {
          setTypingText(typingText.substring(0, typingText.length - 1));
        }, 50);
      }
    } else {
      if (charIndex < phrases[phraseIndex].length) {
        timeout = setTimeout(() => {
          setTypingText(phrases[phraseIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        setIsPaused(true);
        setCharIndex(0);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [typingText, isDeleting, isPaused, charIndex, phraseIndex, phrases]);

  return (
    <>
      {typingText}
      <span 
        className={`inline-block ml-1 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} animate-pulse`}
        style={{
          animation: 'blink 1s infinite'
        }}
      >
        |
      </span>
    </>
  );
};

export default TypingEffect;