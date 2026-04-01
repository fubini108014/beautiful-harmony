import ScrollReveal from '../common/ScrollReveal';
import SectionHeader from '../common/SectionHeader';
import { STATS } from '../../data/content';
import { useDateCounter } from '../../hooks/useDateCounter';
import { START_DATE } from '../../data/content';

export default function StatsSection() {
  const { totalDays } = useDateCounter(START_DATE);

  return (
    <section id="stats" className="relative z-[2] py-20 px-6 max-w-[1100px] mx-auto">
      <ScrollReveal>
        <SectionHeader title="我們的里程碑" sub="OUR MILESTONES" />
      </ScrollReveal>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {STATS.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.08}>
            <div
              className="text-center rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(212,175,106,0.06)',
                border:     '1px solid rgba(212,175,106,0.2)',
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-headline text-3xl mb-1" style={{ color: '#D4AF6A' }}>
                {stat.dynamic ? totalDays.toLocaleString() : stat.num}
              </div>
              <div className="text-xs tracking-widest mt-1" style={{ color: 'var(--color-ink-dim)' }}>
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
