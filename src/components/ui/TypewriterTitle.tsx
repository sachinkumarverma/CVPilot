'use client';

import { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  part1: string;
  part2: string;
  className?: string;
  part2ClassName?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterTitle({
  part1,
  part2,
  className = '',
  part2ClassName = '',
  speed = 45,
  delay = 200,
}: TypewriterTitleProps) {
  const [displayedPart1, setDisplayedPart1] = useState('');
  const [displayedPart2, setDisplayedPart2] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    const totalLength = part1.length + part2.length;

    const delayTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        charIndex++;
        if (charIndex <= part1.length) {
          setDisplayedPart1(part1.substring(0, charIndex));
        } else if (charIndex <= totalLength) {
          setDisplayedPart1(part1);
          setDisplayedPart2(part2.substring(0, charIndex - part1.length));
        }

        if (charIndex >= totalLength) {
          clearInterval(intervalId);
          setIsTypingDone(true);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [part1, part2, speed, delay]);

  return (
    <span className={className}>
      {displayedPart1 || '\u00A0'}
      {displayedPart1.length === part1.length && (
        <span className={part2ClassName}>{displayedPart2}</span>
      )}
      {!isTypingDone && (
        <span
          className="inline-block w-[3px] md:w-[4px] h-[0.75em] bg-blue-600 dark:bg-blue-400 ml-1.5 align-baseline animate-pulse"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
