import React, { useEffect, useState } from 'react';

const TypingEffect = ({ phrases }) => {
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < phrases[phraseIndex].length) {
      const timeout = setTimeout(() => {
        setTypingText(phrases[phraseIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setCharIndex(0);
        setTypingText('');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, phraseIndex, phrases]);

  return (
    <>
      {typingText}
      <span className="animate-pulse">|</span>
    </>
  );
};

export default TypingEffect;