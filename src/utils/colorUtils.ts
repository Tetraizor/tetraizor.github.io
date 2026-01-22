export function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  return [r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}
