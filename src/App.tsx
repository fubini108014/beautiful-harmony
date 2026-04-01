import { useState, useRef, useCallback } from 'react';

// Background
import Starfield       from './components/background/Starfield';
import PetalContainer  from './components/background/PetalContainer';
import SceneOverlay    from './components/background/SceneOverlay';

// Layout
import NavBar  from './components/layout/NavBar';
import Footer  from './components/layout/Footer';

// Sections
import HeroSection       from './components/sections/HeroSection';
import TimelineSection   from './components/sections/TimelineSection';
import MemoriesSection   from './components/sections/MemoriesSection';
import BirthdaySection   from './components/sections/BirthdaySection';
import SecretLockSection from './components/sections/SecretLockSection';
import ScratchCardSection from './components/sections/ScratchCardSection';
import StatsSection      from './components/sections/StatsSection';

// Overlays & fixed UI
import EggToast      from './components/overlays/EggToast';
import KonamiOverlay from './components/overlays/KonamiOverlay';
import Lightbox      from './components/overlays/Lightbox';
import MusicPlayer   from './components/overlays/MusicPlayer';
import StampBar      from './components/StampBar';
import ClickableStars from './components/ClickableStars';

// Hooks & data
import { useKonamiCode }    from './hooks/useKonamiCode';
import { EGG_MESSAGES, STAMP_ICONS } from './data/content';

// ── Fireworks util ────────────────────────────────────────
const PETAL_COLORS = ['#C97B84', '#E8A5AD', '#D4AF6A', '#F0D48A', '#e8c4cb'];

function launchFireworksDOM(container: HTMLDivElement) {
  for (let b = 0; b < 8; b++) {
    setTimeout(() => {
      const bx = 20 + Math.random() * 60;
      const by = 10 + Math.random() * 60;
      for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        const angle = (i / 20) * Math.PI * 2;
        const dist  = 60 + Math.random() * 80;
        spark.style.cssText = [
          'position:absolute',
          'width:4px', 'height:4px', 'border-radius:50%',
          `left:${bx}vw`, `top:${by}vh`,
          `background:${PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]}`,
          `--tx:${Math.cos(angle) * dist}px`,
          `--ty:${Math.sin(angle) * dist}px`,
          'animation:sparkFly 1s ease-out forwards',
          `animation-delay:${Math.random() * 0.3}s`,
        ].join(';');
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 1500);
      }
    }, b * 300);
  }
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  const fireworksRef = useRef<HTMLDivElement>(null);

  const [stamps,      setStamps]      = useState<Set<number>>(new Set());
  const [eggToast,    setEggToast]    = useState<{ icon: string; msg: string } | null>(null);
  const [konamiActive,setKonamiActive] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [currentScene,setCurrentScene] = useState('home');

  const eggIdx = useRef(0);

  // ── Callbacks ──────────────────────────────────────────
  const launchFireworks = useCallback(() => {
    if (fireworksRef.current) launchFireworksDOM(fireworksRef.current);
  }, []);

  const showEgg = useCallback((icon: string, msg: string) => {
    setEggToast({ icon, msg });
    launchFireworks();
  }, [launchFireworks]);

  const handleStarClick = useCallback(() => {
    const egg = EGG_MESSAGES[eggIdx.current % EGG_MESSAGES.length];
    eggIdx.current++;
    showEgg(egg.icon, egg.msg);
  }, [showEgg]);

  const handleCrownClick = useCallback(() => {
    showEgg('👑', '你真的很認真地在探索這個頁面！這份用心，就像你對待我們每一段旅行一樣——充滿溫柔與專注。');
  }, [showEgg]);

  const collectStamp = useCallback((idx: number) => {
    setStamps(prev => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      if (next.size === STAMP_ICONS.length) {
        // All collected – scroll to secret lock after a beat
        setTimeout(() => {
          document.getElementById('secret-lock')?.scrollIntoView({ behavior: 'smooth' });
          launchFireworks();
        }, 600);
      }
      return next;
    });
  }, [launchFireworks]);

  // Konami code
  useKonamiCode(() => {
    setKonamiActive(true);
    launchFireworks();
    setTimeout(launchFireworks, 800);
    setTimeout(launchFireworks, 1600);
  });

  // Auto-launch fireworks on mount
  // (original demo does this 2s after load)
  useCallback(() => {
    const t = setTimeout(launchFireworks, 2000);
    return () => clearTimeout(t);
  }, [launchFireworks]);

  return (
    <div
      className="min-h-screen overflow-x-hidden scroll-smooth"
      style={{ background: '#0D0A1A', color: '#F5EDD8', fontFamily: 'var(--font-body)' }}
    >
      {/* Background layers */}
      <Starfield />
      <SceneOverlay scene={currentScene} />
      <PetalContainer />

      {/* Fireworks container */}
      <div ref={fireworksRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Clickable secret stars */}
      <ClickableStars onStarClick={handleStarClick} />

      {/* Fixed UI */}
      <NavBar />
      <MusicPlayer />
      <StampBar stamps={stamps} />

      {/* Overlays */}
      {eggToast && (
        <EggToast
          icon={eggToast.icon}
          msg={eggToast.msg}
          onClose={() => setEggToast(null)}
        />
      )}
      {konamiActive && (
        <KonamiOverlay onClose={() => setKonamiActive(false)} />
      )}
      {lightboxIdx !== null && (
        <Lightbox idx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}

      {/* Page content */}
      <main>
        <HeroSection
          onCrownClick={handleCrownClick}
          onFireworks={launchFireworks}
        />
        <TimelineSection
          stamps={stamps}
          onCollectStamp={collectStamp}
          onSceneChange={setCurrentScene}
        />
        <MemoriesSection onPhotoClick={setLightboxIdx} />
        <BirthdaySection onFireworks={launchFireworks} />
        <SecretLockSection onFireworks={launchFireworks} />
        <ScratchCardSection onFireworks={launchFireworks} />
        <StatsSection />
      </main>

      <Footer />
    </div>
  );
}
