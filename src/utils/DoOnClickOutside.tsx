import { useEffect } from 'react';

export default function DoOnClickOutside(
  ref: React.RefObject<Element>,
  onClickOutside: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target: Node | null = event.target as Node | null;
      if (ref.current && !ref.current.contains(target)) {
        onClickOutside();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return (): void => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
