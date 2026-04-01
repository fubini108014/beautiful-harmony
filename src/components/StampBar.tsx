import { STAMP_ICONS } from '../data/content';

interface StampBarProps {
  stamps: Set<number>;
}

export default function StampBar({ stamps }: StampBarProps) {
  const count = stamps.size;
  const total = STAMP_ICONS.length;
  const pct   = (count / total) * 100;
  const show  = count > 0;

  const label =
    count < total
      ? `已集 ${count}/${total} · 還差 ${total - count} 個解鎖驚喜`
      : '🎉 全部集齊！驚喜已解鎖 ↓';

  const fillBg =
    count === total
      ? 'linear-gradient(to right,#D4AF6A,#C97B84,#D4AF6A)'
      : 'linear-gradient(to right,#D4AF6A,#C97B84)';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[98] flex items-center gap-4 px-6 py-3 transition-transform duration-500"
      style={{
        background:     'rgba(13,10,26,0.85)',
        borderTop:      '1px solid rgba(212,175,106,0.15)',
        backdropFilter: 'blur(8px)',
        transform:      show ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      {/* Stamp slots */}
      <div className="flex gap-2 text-lg">
        {STAMP_ICONS.map((icon, i) => (
          <span
            key={i}
            className="transition-all duration-300"
            style={{
              opacity:   stamps.has(i) ? 1 : 0.2,
              transform: stamps.has(i) ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: 3, background: 'rgba(212,175,106,0.15)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: fillBg }}
        />
      </div>

      {/* Label */}
      <span className="text-xs" style={{ color: 'var(--color-ink-dim)' }}>
        {label}
      </span>
    </div>
  );
}
