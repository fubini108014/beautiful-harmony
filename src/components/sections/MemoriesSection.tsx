import ScrollReveal from '../common/ScrollReveal';
import SectionHeader from '../common/SectionHeader';
import { PHOTO_CARDS } from '../../data/content';

interface MemoriesSectionProps {
  onPhotoClick: (idx: number) => void;
}

export default function MemoriesSection({ onPhotoClick }: MemoriesSectionProps) {
  return (
    <section id="memories" className="relative z-[2] py-20 px-6 max-w-[1100px] mx-auto">
      <SectionHeader title="旅行相冊" sub="MEMORIES WE MADE TOGETHER" />

      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {PHOTO_CARDS.map((card, i) => (
          <ScrollReveal key={card.idx} delay={i * 0.12}>
            <div
              onClick={() => onPhotoClick(card.idx)}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: 'var(--color-surface)',
                border:     '1px solid rgba(212,175,106,0.15)',
                boxShadow:  '0 4px 20px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(212,175,106,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)')}
            >
              {/* Image placeholder */}
              <div
                className="flex flex-col items-center justify-center gap-2"
                style={{ background: card.bg, aspectRatio: '4/3', fontSize: '3.5rem' }}
              >
                <span>{card.icon}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {card.caption}
                </span>
              </div>

              {/* Info */}
              <div className="px-5 py-4">
                <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A5AD' }}>
                  {card.location}
                </p>
                <p className="font-headline text-base mb-1" style={{ color: 'var(--color-ink)' }}>
                  {card.caption}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-ink-dim)' }}>
                  {card.date}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
