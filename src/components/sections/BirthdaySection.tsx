import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionHeader from '../common/SectionHeader';
import { BIRTHDAY_MESSAGE } from '../../data/content';

interface BirthdaySectionProps {
  onFireworks: () => void;
}

export default function BirthdaySection({ onFireworks }: BirthdaySectionProps) {
  const { ref: cardRef, isVisible } = useScrollReveal<HTMLDivElement>(0.3);
  const [typed, setTyped]           = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const startedRef = useRef(false);

  // Start typewriter when card scrolls into view
  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    const chars = Array.from(BIRTHDAY_MESSAGE);
    let idx = 0;
    function type() {
      if (idx >= chars.length) { setShowCursor(false); return; }
      setTyped(prev => prev + chars[idx]);
      idx++;
      setTimeout(type, idx < 50 ? 60 : 35);
    }
    type();
  }, [isVisible]);

  return (
    <section id="birthday" className="relative z-[2] py-20 px-6 max-w-[1100px] mx-auto text-center">
      <SectionHeader title="生日卡片" sub="HAPPY BIRTHDAY, MY LOVE" />

      <div
        ref={cardRef}
        className="max-w-xl mx-auto relative rounded-2xl overflow-hidden transition-all duration-700"
        style={{
          background:  'linear-gradient(135deg,#1e1535,#2a1f45,#1a1330)',
          border:      '1px solid rgba(212,175,106,0.3)',
          padding:     '3rem 2.5rem',
          boxShadow:   '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,106,0.2)',
          opacity:     isVisible ? 1 : 0,
          transform:   isVisible ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(10deg)',
        }}
      >
        {/* Top glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(212,175,106,0.06) 0%,transparent 60%)' }}
        />

        <div className="text-3xl mb-4 animate-float">🌹</div>
        <p className="font-script text-3xl mb-4" style={{ color: '#E8A5AD' }}>生日快樂</p>
        <h3 className="font-headline text-4xl mb-6" style={{ color: '#F0D48A' }}>親愛的你</h3>

        {/* Typewriter message */}
        <p
          className="text-base leading-loose italic max-w-sm mx-auto mb-8"
          style={{ color: 'var(--color-ink-dim)', whiteSpace: 'pre-line' }}
        >
          {typed}
          {showCursor && (
            <span
              className="inline-block align-text-bottom ml-0.5 animate-blink"
              style={{ width: 2, height: '1em', background: '#D4AF6A' }}
            />
          )}
        </p>

        <div className="flex justify-center gap-3 text-xl mb-6">
          {['💫', '❤️', '💫'].map((h, i) => (
            <span key={i} className="animate-heartbeat" style={{ animationDelay: `${i * 0.2}s` }}>
              {h}
            </span>
          ))}
        </div>

        <p className="font-script text-2xl" style={{ color: '#D4AF6A' }}>永遠愛你的那個人</p>

        <button
          onClick={onFireworks}
          className="mt-8 px-8 py-3 rounded-full text-white border-none cursor-pointer font-body text-sm tracking-wide transition-transform duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#D4AF6A,#C97B84)' }}
        >
          🎉 慶祝我們的紀念日
        </button>
      </div>
    </section>
  );
}
