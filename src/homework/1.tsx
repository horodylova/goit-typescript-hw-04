import React, { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
};

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onContentEndVisible();
            observer.disconnect();
          }
        });
      },
      options
    );

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      if (endContentRef.current) {
        observer.unobserve(endContentRef.current);
      }
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}

