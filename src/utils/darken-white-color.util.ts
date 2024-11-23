// Definição da interface para o formato RGB
interface RGB {
  r: number;
  g: number;
  b: number;
}

// Função para converter HEX para RGB
const hexToRgb = (hex: string): RGB | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Função para converter RGB para HEX
const rgbToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

// Função para escurecer a cor
const darkenColor = (rgb: RGB, amount: number): RGB => {
  return {
    r: Math.max(0, rgb.r - amount),
    g: Math.max(0, rgb.g - amount),
    b: Math.max(0, rgb.b - amount),
  };
};

export const handleColorChange = (setColorState: (color: string) => void) => (updatedColor: string) => {
  const rgb = hexToRgb(updatedColor);

  // Define o limite para tons de branco
  const whiteThreshold = 230; // Ajuste conforme necessário
  const darkenAmount = 50; // Quantidade de escurecimento

  // Verifica se a cor está muito próxima do branco
  if (rgb && rgb.r > whiteThreshold && rgb.g > whiteThreshold && rgb.b > whiteThreshold) {
    // Se for próximo do branco, escurece a cor
    const darkenedColor = darkenColor(rgb, darkenAmount) as RGB;
    const darkenedHex = rgbToHex(darkenedColor.r, darkenedColor.g, darkenedColor.b);
    setColorState(darkenedHex); // Define a cor escurecida
  } else {
    setColorState(updatedColor); // Caso contrário, aceita a cor normalmente
  }
};
