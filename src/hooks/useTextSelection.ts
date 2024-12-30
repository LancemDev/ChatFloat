import { useState, useEffect } from 'react';

interface SelectionInfo {
  text: string;
  position: {
    x: number;
    y: number;
  } | null;
}

export const useTextSelection = () => {
  const [selection, setSelection] = useState<SelectionInfo>({
    text: '',
    position: null,
  });

  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection()?.toString() || '';
      
      if (selectedText) {
        const range = window.getSelection()?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        if (rect) {
          setSelection({
            text: selectedText,
            position: {
              x: rect.x + rect.width / 2,
              y: rect.y + window.scrollY - 10,
            },
          });
        }
      } else {
        setSelection({ text: '', position: null });
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  return selection;
};