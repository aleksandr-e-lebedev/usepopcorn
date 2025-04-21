import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const initialTitle = document.title;
    document.title = title;
    return () => {
      document.title = initialTitle;
    };
  }, [title]);
}
