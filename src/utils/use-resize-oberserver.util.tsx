import { useEffect, useRef, useState } from "react";

export const useCustomResizeObserver = () => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const observer = useRef(
    new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    }),
  );

  useEffect(() => {
    const currentObserver = observer.current;
    if (ref.current) {
      currentObserver.observe(ref.current);
    }
    return () => {
      currentObserver.disconnect();
    };
  }, []);

  return { ref, width };
};
