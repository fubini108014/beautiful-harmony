import { useEffect, useRef } from 'react';
import SectionHeader from '../common/SectionHeader';
import { TIMELINE_ITEMS } from '../../data/content';

interface TimelineSectionProps {
  stamps: Set<number>;
  onCollectStamp: (idx: number) => void;
  onSceneChange: (scene: string) => void;
}

export default function TimelineSection({ stamps, onCollectStamp, onSceneChange }: TimelineSectionProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal + scene tint change
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const item = TIMELINE_ITEMS[i];
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            onSceneChange(item.scene);
          }
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [onSceneChange]);

  return (
    <section
      id="timeline"
      className="relative z-[2] py-20 px-6 max-w-[1100px] mx-auto"
    >
      <SectionHeader title="我們的旅行足跡" sub="TOGETHER WE WANDER THE WORLD" />

      {/* Vertical timeline */}
      <div
        className="relative pl-8"
        style={{
          // Left line
          backgroundImage: 'linear-gradient(to bottom, #D4AF6A, #C97B84, #D4AF6A)',
          backgroundSize:  '1px 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '8px 0',
        }}
      >
        {TIMELINE_ITEMS.map((item, i) => {
          const collected = stamps.has(item.stampIdx);
          return (
            <div
              key={item.stampIdx}
              ref={el => { itemRefs.current[i] = el; }}
              className="relative mb-12 transition-all duration-700"
              style={{ opacity: 0, transform: 'translateX(-20px)' }}
              /* CSS class added on intersection */
              data-scene={item.scene}
            >
              {/* Dot */}
              <div
                className="absolute rounded-full"
                style={{
                  left: '-2rem', top: '0.4rem',
                  width: 14, height: 14,
                  background: '#D4AF6A',
                  boxShadow:  '0 0 12px #D4AF6A',
                  border:     '2px solid #0D0A1A',
                }}
              />

              <p className="font-script text-base mb-1" style={{ color: '#E8A5AD' }}>
                {item.year}
              </p>
              <h3 className="font-headline text-lg mb-2" style={{ color: '#F0D48A' }}>
                {item.flag} {item.title}
              </h3>
              <p className="text-sm leading-loose" style={{ color: 'var(--color-ink-dim)' }}>
                {item.desc}
              </p>

              {/* Stamp button */}
              <div className="mt-3">
                <button
                  onClick={() => !collected && onCollectStamp(item.stampIdx)}
                  className={`text-xs tracking-wide px-4 py-1.5 rounded-md cursor-pointer transition-all duration-300 border-dashed border ${collected ? 'animate-stamp-pop' : ''}`}
                  style={collected
                    ? { background: 'rgba(212,175,106,0.18)', borderColor: '#D4AF6A', color: '#D4AF6A', boxShadow: '0 0 10px rgba(212,175,106,0.25)' }
                    : { background: 'rgba(212,175,106,0.08)', borderColor: 'rgba(212,175,106,0.35)', color: 'var(--color-ink-dim)' }
                  }
                >
                  {collected
                    ? `${item.stampIcon} 已收藏 ✓`
                    : `${item.stampIcon} ${item.stampLabel}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global visible style injected via CSS class */}
      <style>{`.visible { opacity: 1 !important; transform: translateX(0) !important; }`}</style>
    </section>
  );
}
