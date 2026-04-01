import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#hero',        label: '首頁' },
  { href: '#timeline',    label: '旅行足跡' },
  { href: '#memories',    label: '相冊' },
  { href: '#birthday',    label: '生日卡片' },
  { href: '#secret-lock', label: '隱藏信箱' },
  { href: '#stats',       label: '里程碑' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 flex justify-center gap-8 flex-wrap px-8 transition-all duration-300"
      style={{
        padding:         scrolled ? '0.8rem 2rem' : '1.2rem 2rem',
        background:      'linear-gradient(to bottom, rgba(13,10,26,0.9), transparent)',
        backdropFilter:  'blur(4px)',
      }}
    >
      {NAV_LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className="text-gold-light no-underline text-sm tracking-widest transition-colors duration-300 hover:text-white"
          style={{ textShadow: undefined }}
          onMouseEnter={e => (e.currentTarget.style.textShadow = '0 0 12px #D4AF6A')}
          onMouseLeave={e => (e.currentTarget.style.textShadow = '')}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
