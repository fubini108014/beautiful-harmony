import { useEffect, useRef } from 'react';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
];

export function useKonamiCode(callback: () => void) {
  const bufferRef = useRef<string[]>([]);
  // Keep stable reference to callback
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      bufferRef.current.push(e.key);
      if (bufferRef.current.length > KONAMI.length) bufferRef.current.shift();
      if (bufferRef.current.join(',') === KONAMI.join(',')) {
        bufferRef.current = [];
        callbackRef.current();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
}
