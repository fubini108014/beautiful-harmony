import { useMemo } from 'react';

const COLORS = ['#C97B84', '#E8A5AD', '#D4AF6A', '#F0D48A', '#e8c4cb'];

interface Petal {
  id: number;
  left: string;
  background: string;
  width: string;
  height: string;
  duration: string;
  delay: string;
}

export default function PetalContainer() {
  const petals = useMemo<Petal[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:       `${Math.random() * 100}vw`,
      background: COLORS[Math.floor(Math.random() * COLORS.length)],
      width:      `${8 + Math.random() * 8}px`,
      height:     `${10 + Math.random() * 10}px`,
      duration:   `${8 + Math.random() * 12}s`,
      delay:      `${Math.random() * 10}s`,
    })),
  []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute -top-10 opacity-70"
          style={{
            left:            p.left,
            background:      p.background,
            width:           p.width,
            height:          p.height,
            borderRadius:    '50% 0 50% 0',
            animationName:   'petalFall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDuration: p.duration,
            animationDelay:  p.delay,
          }}
        />
      ))}
    </div>
  );
}
