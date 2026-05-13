export const adjustBrightness = (hex, percent) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

  const r = clamp(R);
  const g = clamp(G);
  const b = clamp(B);

  return (
    '#' +
    (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
};

