export default function Footer() {
  return (
    <footer
      className="relative z-[2] text-center py-12 px-4 pb-20 text-sm tracking-widest"
      style={{
        color:       'var(--color-ink-dim)',
        borderTop:   '1px solid rgba(212,175,106,0.1)',
      }}
    >
      <p>✨ 願我們的故事，像星星一樣永不熄滅 ✨</p>
      <p className="mt-2">Since 2015.07.20 · With Love</p>
      <p className="mt-2 text-xs opacity-40">
        🎮 試試 ↑↑↓↓←→←→ · ⭐ 點擊頁面上的星星 · 📮 集齊所有紀念章
      </p>
    </footer>
  );
}
