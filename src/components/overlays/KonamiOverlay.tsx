interface KonamiOverlayProps {
  onClose: () => void;
}

export default function KonamiOverlay({ onClose }: KonamiOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)' }}
    >
      <div className="text-center animate-fade-in-up max-w-md px-6">
        <div className="text-5xl mb-4">🎮✨</div>
        <h2
          className="font-headline mb-4"
          style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', color: '#F0D48A' }}
        >
          你找到了最隱藏的彩蛋！
        </h2>
        <div className="text-4xl my-6 animate-heartbeat">💖</div>
        <p className="leading-loose text-sm mb-6" style={{ color: 'var(--color-ink-dim)' }}>
          旅途中我最喜歡的時刻，<br />不是到達某個地方，<br />
          而是和你並肩等待的那段路。<br /><br />
          無論去哪裡，只要有你，<br />我就已經到了最好的地方。
        </p>
        <button
          onClick={onClose}
          className="px-10 py-3 rounded-full text-white border-none cursor-pointer font-body"
          style={{ background: 'linear-gradient(135deg,#D4AF6A,#C97B84)' }}
        >
          收藏這份祕密 💛
        </button>
      </div>
    </div>
  );
}
