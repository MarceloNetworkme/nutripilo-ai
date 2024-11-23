import { useCallback, useEffect, useState } from "react";

// Hook personalizado para obter a altura de um elemento pelo seletor
export const useElementDimensions = (selector: string) => {
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [tries, setTries] = useState<number>(5);

  const load = useCallback(() => {
    const element = document.querySelector(selector) as HTMLElement;

    if (!element && tries > 0) {
      setTimeout(() => {
        setTries((p) => p - 1);
        load();
      }, 200);
    }

    const updateHeight = () => {
      if (element) {
        setHeight(element.offsetHeight);
        setWidth(element.offsetWidth);
      }
    };

    updateHeight(); // Atualiza a altura inicial

    // Opcional: se você quiser que a altura seja atualizada ao redimensionar a janela
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [selector, tries]);

  useEffect(() => {
    return load();
  }, [load]); // Dependência para reexecutar se o seletor mudar

  return { height, width };
};
