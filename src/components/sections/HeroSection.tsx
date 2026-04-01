import { useRef } from 'react';
import { useDateCounter } from '../../hooks/useDateCounter';
import { START_DATE } from '../../data/content';

interface HeroSectionProps {
  onCrownClick: () => void;
  onFireworks: () => void;
}

export default function HeroSection({ onCrownClick, onFireworks }: HeroSectionProps) {
  const { totalDays, years, months, days, hours } = useDateCounter(START_DATE);
  const crownClicks = useRef(0);
  const crownTimer  = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleCrownClick() {
    crownClicks.current++;
    clearTimeout(crownTimer.current);
    crownTimer.current = setTimeout(() => (crownClicks.current = 0), 1200);
    if (crownClicks.current >= 5) {
      crownClicks.current = 0;
      onCrownClick();
      onFireworks();
    }
  }

  const counters = [
    { num: years,     label: '年' },
    { num: months,    label: '個月' },
    { num: days,      label: '天' },
    { num: hours,     label: '小時' },
  ];

  return (
    <div
      id="hero"
      className="relative z-[2] min-h-screen flex flex-col items-center justify-center text-center px-8 py-8"
    >
      <div className="hero-glow absolute inset-0 -z-10" />

      {/* Crown Easter Egg */}
      <div
        className="text-5xl mb-2 cursor-pointer select-none animate-float"
        onClick={handleCrownClick}
        title="試試快速點擊我"
      >
        ✨
      </div>

      <p className="font-script text-xl mb-3" style={{ color: '#E8A5AD' }}>
        Since July 20, 2015
      </p>
      <h1
        className="font-headline mb-4"
        style={{
          fontSize:   'clamp(2.2rem,6vw,4rem)',
          color:      '#F0D48A',
          textShadow: '0 0 40px rgba(212,175,106,0.4)',
          lineHeight: 1.2,
        }}
      >
        我們相遇，是最美的緣分
      </h1>
      <p className="mb-8 text-sm tracking-widest" style={{ color: 'var(--color-ink-dim)' }}>
        在一起 · <span>{totalDays.toLocaleString()}</span> 天
      </p>

      {/* Counter boxes */}
      <div className="flex gap-6 justify-center flex-wrap mb-10">
        {counters.map(({ num, label }) => (
          <div
            key={label}
            className="text-center min-w-20 rounded-xl px-6 py-3 transition-transform duration-300 hover:-translate-y-1"
            style={{
              background:     'rgba(212,175,106,0.08)',
              border:         '1px solid rgba(212,175,106,0.25)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span
              className="block font-headline text-3xl leading-none"
              style={{ color: '#D4AF6A' }}
            >
              {num}
            </span>
            <span className="text-xs tracking-widest mt-1 block" style={{ color: 'var(--color-ink-dim)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="absolute bottom-8 text-xs tracking-widest animate-bounce-hint" style={{ color: 'var(--color-ink-dim)' }}>
        ↓ 往下探索我們的故事 ↓
      </p>
    </div>
  );
}
