import { useRef, useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeader from '../common/SectionHeader';
import { SECRET_CODE } from '../../data/content';

interface SecretLockSectionProps {
  onFireworks: () => void;
}

type HintState = 'idle' | 'error' | 'success';

export default function SecretLockSection({ onFireworks }: SecretLockSectionProps) {
  const [hint, setHint]       = useState('提示：是個很特別的夏天 🌻');
  const [hintState, setHintState] = useState<HintState>('idle');
  const [unlocked, setUnlocked]   = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function getCode() {
    return inputRefs.current.map(el => el?.value ?? '').join('');
  }

  function checkLock() {
    const v = getCode();
    if (v.length < 4) return;

    if (v === SECRET_CODE) {
      setHint('✨ 正確！信箱已開啟');
      setHintState('success');
      setUnlocked(true);
      onFireworks();
      inputRefs.current.forEach(el => {
        if (el) {
          el.style.borderColor = '#D4AF6A';
          el.style.boxShadow   = '0 0 16px rgba(212,175,106,0.4)';
        }
      });
    } else {
      setHint('❌ 再想想...');
      setHintState('error');
      setTimeout(() => {
        inputRefs.current.forEach(el => {
          if (el) { el.value = ''; el.style.borderColor = ''; el.style.boxShadow = ''; }
        });
        inputRefs.current[0]?.focus();
        setHint('提示：是個很特別的夏天 🌻');
        setHintState('idle');
      }, 1200);
    }
  }

  function handleInput(i: number) {
    const el = inputRefs.current[i];
    if (!el) return;
    el.value = el.value.replace(/\D/g, '').slice(-1);
    if (el.value && i < 3) inputRefs.current[i + 1]?.focus();
    checkLock();
  }

  function handleKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'Backspace' && !inputRefs.current[i]?.value && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  }

  const hintColor =
    hintState === 'error'   ? '#e88888' :
    hintState === 'success' ? '#8eb' : '#E8A5AD';

  return (
    <div id="secret-lock" className="relative z-[2] py-12 px-6 max-w-[500px] mx-auto text-center">
      <SectionHeader title="💌 隱藏信箱" />

      <ScrollReveal>
        <p className="text-sm mb-6" style={{ color: 'var(--color-ink-dim)' }}>
          輸入我們相遇的那一年，解鎖一封藏了很久的信
        </p>

        {/* 4-digit inputs */}
        <div className="flex gap-3 justify-center mb-3">
          {Array.from({ length: 4 }, (_, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              maxLength={1}
              type="text"
              inputMode="numeric"
              className="text-center text-3xl rounded-xl outline-none transition-all duration-300 font-headline"
              style={{
                width: 52, height: 62,
                background:  'rgba(212,175,106,0.08)',
                border:      '1px solid rgba(212,175,106,0.3)',
                color:       '#D4AF6A',
                caretColor:  '#D4AF6A',
              }}
              onInput={() => handleInput(i)}
              onKeyDown={e => handleKeyDown(e, i)}
              onFocus={e => (e.currentTarget.style.borderColor = '#D4AF6A')}
              onBlur={e => (e.currentTarget.style.borderColor  = 'rgba(212,175,106,0.3)')}
            />
          ))}
        </div>

        <p className="text-xs min-h-5 mb-6" style={{ color: hintColor }}>
          {hint}
        </p>
      </ScrollReveal>

      {/* Unlocked content */}
      {unlocked && (
        <div
          className="rounded-2xl p-10 text-center animate-fade-in-up mt-4"
          style={{
            background: 'linear-gradient(135deg,#1e1535,#2a1f45)',
            border:     '1px solid rgba(212,175,106,0.3)',
            boxShadow:  '0 0 60px rgba(212,175,106,0.15)',
          }}
        >
          <div className="text-4xl mb-3">📮</div>
          <h3 className="font-headline text-2xl mb-4" style={{ color: '#F0D48A' }}>
            給你的一封信
          </h3>
          <p className="leading-loose text-sm" style={{ color: 'var(--color-ink-dim)' }}>
            那一年的夏天，我不知道命運已經在我們之間輕輕牽了一條線。<br /><br />
            後來，我去過很多地方，看過很多風景。<br />
            但每一個「哇，好美」的當下，<br />
            我第一個想到的，都是你。<br /><br />
            謝謝你，讓每一趟旅程都有了意義。<br />
            謝謝你，讓「回家」這件事，成為我最期待的旅程。<br /><br />
            ——這封信，藏在這裡等你很久了。
          </p>
          <div className="mt-6 text-2xl">🌹✨💛</div>
        </div>
      )}
    </div>
  );
}
