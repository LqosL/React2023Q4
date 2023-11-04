import { useEffect } from 'react';

export default function DoOnClickOutside(
  ref: React.RefObject<Element>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (ref.current && !ref.current.contains(target)) {
        onClickOutside();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
