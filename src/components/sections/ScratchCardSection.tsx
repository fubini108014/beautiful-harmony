import { useEffect, useRef, useState, useCallback } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeader from '../common/SectionHeader';
import { PRIZES, type Prize } from '../../data/content';

interface ScratchCardSectionProps {
  onFireworks: () => void;
}

export default function ScratchCardSection({ onFireworks }: ScratchCardSectionProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const isPainting  = useRef(false);
  const scratchDone = useRef(false);

  const [prize,     setPrize]     = useState<Prize | null>(null);
  const [pctText,   setPctText]   = useState('');
  const [showReset, setShowReset] = useState(false);

  const pickPrize = useCallback(() => {
    return PRIZES[Math.floor(Math.random() * PRIZES.length)];
  }, []);

  const drawSurface = useCallback(() => {
    const cv  = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;

    const W = wrap.offsetWidth || 300;
    const H = wrap.offsetHeight || 300;
    cv.width  = W;
    cv.height = H;
    const ctx = cv.getContext('2d')!;
    ctx.globalCompositeOperation = 'source-over';

    // Gradient foil
    const grd = ctx.createLinearGradient(0, 0, W, H);
    grd.addColorStop(0,   '#2a1f45');
    grd.addColorStop(0.4, '#3d2a5e');
    grd.addColorStop(0.7, '#2a1f45');
    grd.addColorStop(1,   '#1e1535');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Shimmer lines
    for (let i = 0; i < 12; i++) {
      const y = Math.random() * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + 20);
      ctx.strokeStyle = `rgba(212,175,106,${0.04 + Math.random() * 0.06})`;
      ctx.lineWidth   = 6 + Math.random() * 10;
      ctx.stroke();
    }

    // Text
    ctx.fillStyle    = 'rgba(212,175,106,0.55)';
    ctx.font         = 'bold 15px serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ 刮開看驚喜 ✦', W / 2, H / 2 - 18);
    ctx.font      = '12px serif';
    ctx.fillStyle = 'rgba(212,175,106,0.4)';
    ctx.fillText('用手指或滑鼠刮刮看', W / 2, H / 2 + 12);

    // Sparkle dots
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,212,138,${0.3 + Math.random() * 0.4})`;
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  function initScratch() {
    const p = pickPrize();
    setPrize(p);
    scratchDone.current = false;
    setPctText('');
    setShowReset(false);
    drawSurface();
  }

  useEffect(() => {
    const timeout = setTimeout(initScratch, 100);
    const onResize = () => { if (!scratchDone.current) initScratch(); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(timeout); window.removeEventListener('resize', onResize); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getPos(e: MouseEvent | TouchEvent) {
    const r = canvasRef.current!.getBoundingClientRect();
    const source = 'touches' in e ? e.touches[0] : e;
    return { x: source.clientX - r.left, y: source.clientY - r.top };
  }

  function scratch(x: number, y: number) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  }

  function checkReveal() {
    const cv = canvasRef.current;
    if (!cv || scratchDone.current) return;
    const { width: W, height: H } = cv;
    const data = cv.getContext('2d')!.getImageData(0, 0, W, H).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) clear++;
    const pct = Math.round((clear / (W * H)) * 100);
    if (pct > 3) setPctText(`已刮開 ${pct}%`);
    if (pct >= 60 && !scratchDone.current) {
      scratchDone.current = true;
      cv.getContext('2d')!.clearRect(0, 0, W, H);
      setPctText('🎉 完全刮開了！');
      setShowReset(true);
      onFireworks();
    }
  }

  // Mouse events
  function onMouseDown(e: React.MouseEvent) { isPainting.current = true; scratch(...Object.values(getPos(e.nativeEvent)) as [number, number]); }
  function onMouseMove(e: React.MouseEvent) { if (!isPainting.current) return; scratch(...Object.values(getPos(e.nativeEvent)) as [number, number]); }
  function onMouseUp()   { isPainting.current = false; }

  // Touch events
  function onTouchStart(e: React.TouchEvent) { e.preventDefault(); isPainting.current = true; scratch(...Object.values(getPos(e.nativeEvent)) as [number, number]); }
  function onTouchMove(e: React.TouchEvent)  { e.preventDefault(); if (!isPainting.current) return; scratch(...Object.values(getPos(e.nativeEvent)) as [number, number]); }
  function onTouchEnd()  { isPainting.current = false; }

  return (
    <div id="scratch-section" className="relative z-[2] py-12 px-6 max-w-[500px] mx-auto text-center">
      <SectionHeader title="🎰 刮刮樂" sub="SCRATCH TO REVEAL A SURPRISE" />

      <ScrollReveal>
        <p className="text-sm mb-2" style={{ color: 'var(--color-ink-dim)' }}>
          用滑鼠（或手指）刮開表面，看看今天的驚喜是什麼
        </p>
        <div className="text-2xl animate-bounce-hint mb-2">👇</div>

        {/* Scratch area */}
        <div
          ref={wrapRef}
          className="relative mx-auto rounded-2xl overflow-hidden"
          style={{
            width: 300, height: 300,
            boxShadow: '0 0 40px rgba(212,175,106,0.25)',
            cursor: 'crosshair',
          }}
        >
          {/* Prize beneath */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: 'linear-gradient(135deg,#1e1535,#2a1f45)', border: '1px solid rgba(212,175,106,0.3)' }}
          >
            <div className="text-5xl animate-float">{prize?.icon ?? '🎁'}</div>
            <div className="font-headline text-xl" style={{ color: '#F0D48A' }}>
              {prize?.title ?? '載入中…'}
            </div>
            <div className="text-sm px-6 leading-relaxed" style={{ color: 'var(--color-ink-dim)', maxWidth: 220 }}>
              {prize?.msg}
            </div>
          </div>

          {/* Scratch canvas on top */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 rounded-2xl"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        </div>

        <p className="text-xs mt-2 min-h-5" style={{ color: 'var(--color-ink-dim)' }}>
          {pctText}
        </p>

        {showReset && (
          <button
            onClick={initScratch}
            className="mt-3 px-6 py-2 rounded-full text-sm cursor-pointer transition-colors duration-200"
            style={{
              background:   'rgba(212,175,106,0.1)',
              border:       '1px solid rgba(212,175,106,0.3)',
              color:        '#F0D48A',
            }}
          >
            🔄 換一張再刮
          </button>
        )}
      </ScrollReveal>
    </div>
  );
}
