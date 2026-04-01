import { useEffect } from 'react';
import { PHOTO_CARDS } from '../../data/content';

interface LightboxProps {
  idx: number;
  onClose: () => void;
}

export default function Lightbox({ idx, onClose }: LightboxProps) {
  const card = PHOTO_CARDS[idx];

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 p-8 cursor-pointer"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-8 text-3xl cursor-pointer bg-transparent border-none"
        style={{ color: 'var(--color-ink-dim)' }}
        onClick={onClose}
      >
        ✕
      </button>
      <div
        className="max-w-xl w-full text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-8xl leading-none mb-4">{card.icon}</div>
        <p className="font-headline text-2xl mb-2" style={{ color: '#F0D48A' }}>
          {card.lbCaption}
        </p>
        <p className="leading-loose" style={{ color: 'var(--color-ink-dim)' }}>
          {card.lbDesc}
        </p>
      </div>
    </div>
  );
}
