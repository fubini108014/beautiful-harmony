import { type ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  slideFrom?: 'bottom' | 'left' | 'right';
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  slideFrom = 'bottom',
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  const hiddenTranslate =
    slideFrom === 'left'  ? '-translate-x-5' :
    slideFrom === 'right' ? 'translate-x-5'  : 'translate-y-8';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hiddenTranslate}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
