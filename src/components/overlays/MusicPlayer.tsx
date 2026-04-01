import { useState, useRef } from 'react';
import { MUSIC_TRACKS } from '../../data/content';

export default function MusicPlayer() {
  const [panelOpen,   setPanelOpen]   = useState(false);
  const [activeIdx,   setActiveIdx]   = useState<number | null>(null);
  const [nowPlaying,  setNowPlaying]  = useState('尚未播放');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playTrack(idx: number) {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    const track = MUSIC_TRACKS[idx];
    const audio = new Audio(track.url);
    audio.volume = 0.4;
    audio.loop   = true;
    audio.play().catch(() => {});
    audioRef.current = audio;
    setActiveIdx(idx);
    setNowPlaying(`♪ ${track.name}`);
  }

  return (
    <div className="fixed bottom-8 right-8 z-[99] flex flex-col items-end gap-3">
      {/* Panel */}
      <div
        className="rounded-2xl px-5 py-4 w-52 transition-all duration-300 pointer-events-none"
        style={{
          background:     'rgba(20,15,40,0.92)',
          border:         '1px solid rgba(212,175,106,0.25)',
          backdropFilter: 'blur(12px)',
          opacity:        panelOpen ? 1 : 0,
          transform:      panelOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
          pointerEvents:  panelOpen ? 'all' : 'none',
        }}
      >
        <h4 className="font-script text-base mb-3 text-center" style={{ color: '#F0D48A' }}>
          🎵 旅行歌單
        </h4>
        {MUSIC_TRACKS.map((t, i) => (
          <div
            key={t.url}
            onClick={() => playTrack(i)}
            className="flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer mb-1 text-sm transition-colors duration-200"
            style={{
              color:      activeIdx === i ? '#F0D48A' : 'var(--color-ink-dim)',
              background: activeIdx === i ? 'rgba(212,175,106,0.12)' : 'transparent',
            }}
          >
            <span className={activeIdx === i ? 'animate-note-bounce' : ''}>{t.icon}</span>
            {t.name}
          </div>
        ))}
        <p className="text-center mt-2 text-xs italic" style={{ color: '#C97B84', minHeight: '1.2em' }}>
          {nowPlaying}
        </p>
      </div>

      {/* FAB */}
      <button
        onClick={() => setPanelOpen(o => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-none cursor-pointer animate-glow-pulse transition-transform duration-300 hover:scale-110"
        style={{ background: 'linear-gradient(135deg,#D4AF6A,#C97B84)', boxShadow: '0 4px 20px rgba(212,175,106,0.4)' }}
      >
        {activeIdx !== null ? '🎶' : '🎵'}
      </button>
    </div>
  );
}
