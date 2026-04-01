interface ClickableStarsProps {
  onStarClick: () => void;
}

const STAR_POSITIONS = [
  { top: '18%', left: '6%',  icon: '⭐' },
  { top: '40%', right: '5%', icon: '🌟' },
  { top: '65%', left: '4%',  icon: '✨' },
] as const;

export default function ClickableStars({ onStarClick }: ClickableStarsProps) {
  return (
    <>
      {STAR_POSITIONS.map((star, i) => (
        <div
          key={i}
          onClick={onStarClick}
          className="fixed z-[5] text-lg opacity-60 cursor-pointer animate-star-wiggle transition-opacity hover:opacity-100"
          style={{ top: star.top, ...'left' in star ? { left: star.left } : { right: star.right } }}
        >
          {star.icon}
        </div>
      ))}
    </>
  );
}
