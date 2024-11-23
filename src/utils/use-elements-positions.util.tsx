import { useLayoutEffect, useState } from "react";

export interface ElementPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

// Hook para retornar as posições de elementos selecionados por querySelectors
export const useElementPositionsBySelector = (selector: string): ElementPosition => {
  const [position, setPosition] = useState<ElementPosition>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const updatePositions = () => {
      const element = document.querySelector<HTMLElement>(selector);
      const rect = element?.getBoundingClientRect();
      setPosition(
        rect
          ? {
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }
          : { top: 0, right: 0, bottom: 0, left: 0, height: 0, width: 0 },
      );
      if (!rect) setTimeout(updatePositions, 1000);
    };

    updatePositions();
    // Adicionar listeners para eventos de scroll e resize
    window.addEventListener("scroll", updatePositions);
    window.addEventListener("resize", updatePositions);

    return () => {
      // Remover listeners quando o componente for desmontado
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, [selector]);

  return position;
};

export default useElementPositionsBySelector;
