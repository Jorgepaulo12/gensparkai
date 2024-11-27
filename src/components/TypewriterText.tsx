import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  markdownComponents?: any;
  remarkPlugins?: any[];
  rehypePlugins?: any[];
}

export function TypewriterText({ 
  text, 
  speed = 30, 
  onComplete,
  markdownComponents,
  remarkPlugins,
  rehypePlugins
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length && !isPaused) {
      const currentChar = text[currentIndex];
      const nextChar = text[currentIndex + 1];
      
      // Pause longer for punctuation and new lines
      const delay = (() => {
        if (currentChar === '\n') return speed * 2;
        if ('.!?'.includes(currentChar) && nextChar === ' ') return speed * 3;
        if (',;:'.includes(currentChar) && nextChar === ' ') return speed * 2;
        return speed;
      })();

      // Check for code blocks and math equations
      if (currentChar === '`' || currentChar === '$') {
        setIsPaused(true);
        let endIndex = text.indexOf(currentChar === '`' ? '`' : '$', currentIndex + 1);
        if (currentChar === '`' && text[currentIndex + 1] === '`' && text[currentIndex + 2] === '`') {
          endIndex = text.indexOf('```', currentIndex + 3) + 2;
        }
        if (endIndex > currentIndex) {
          const specialContent = text.slice(currentIndex, endIndex + 1);
          setDisplayedText(prev => prev + specialContent);
          setCurrentIndex(endIndex + 1);
          setTimeout(() => setIsPaused(false), speed * 2);
          return;
        }
      }

      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentChar);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, isPaused]);

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={markdownComponents}
    >
      {displayedText}
    </ReactMarkdown>
  );
}