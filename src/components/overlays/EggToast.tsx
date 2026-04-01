interface EggToastProps {
  icon: string;
  msg: string;
  onClose: () => void;
}

export default function EggToast({ icon, msg, onClose }: EggToastProps) {
  return (
    <div
      className="fixed top-1/2 left-1/2 z-[300] text-center rounded-2xl p-8 max-w-sm w-[90%] animate-fade-in-up"
      style={{
        transform:    'translate(-50%, -50%)',
        background:   'rgba(20,15,40,0.96)',
        border:       '1px solid #D4AF6A',
        boxShadow:    '0 0 60px rgba(212,175,106,0.3)',
      }}
    >
      <div className="text-5xl mb-3">{icon}</div>
      <p className="font-headline text-base leading-relaxed mb-4" style={{ color: '#F0D48A' }}>
        {msg}
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2 rounded-full text-sm text-white cursor-pointer border-none"
        style={{ background: 'linear-gradient(135deg,#D4AF6A,#C97B84)' }}
      >
        收下這份心意 ✨
      </button>
    </div>
  );
}
