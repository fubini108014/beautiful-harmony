import { SCENE_TINTS } from '../../data/content';

interface SceneOverlayProps {
  scene: string;
}

export default function SceneOverlay({ scene }: SceneOverlayProps) {
  const tint = SCENE_TINTS[scene] ?? SCENE_TINTS.home;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: tint, transition: 'background 1.2s ease' }}
    />
  );
}
