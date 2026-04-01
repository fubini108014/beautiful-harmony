import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number;
  r: number; a: number; da: number; sp: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d')!;
    let stars: Star[] = [];
    let raf: number;

    function resize() {
      cv!.width  = window.innerWidth;
      cv!.height = window.innerHeight;
    }

    function init() {
      stars = Array.from({ length: 220 }, () => ({
        x:  Math.random() * cv!.width,
        y:  Math.random() * cv!.height,
        r:  Math.random() * 1.4 + 0.3,
        a:  Math.random(),
        da: (Math.random() - 0.5) * 0.008,
        sp: Math.random() * 0.15 + 0.05,
      }));
    }

    function draw() {
      cx.clearRect(0, 0, cv!.width, cv!.height);
      for (const s of stars) {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da = -s.da;
        s.y += s.sp;
        if (s.y > cv!.height) s.y = 0;
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(255,248,231,${s.a})`;
        cx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener('resize', () => { resize(); init(); });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', () => { resize(); init(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
