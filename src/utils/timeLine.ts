export function polarToCartesian(
  cx: number,
  cy: number,
  minutes: number,
  radius: number
) {
  const angle = ((minutes / 1440) * 360 - 90) * (Math.PI / 180);
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

  return { x: Number(x.toFixed(4)), y: Number(y.toFixed(4)), angle };
}

export function describeArc(
  cx: number,
  cy: number,
  start: number,
  end: number,
  radius: number
) {
  const startCoord = polarToCartesian(cx, cy, start, radius);
  const endCoord = polarToCartesian(cx, cy, end, radius);
  const largeArc = end - start > 720 ? 1 : 0;

  return [
    `M ${cx},${cy}`,
    `L ${startCoord.x},${startCoord.y}`,
    `A ${radius},${radius} 0 ${largeArc},1 ${endCoord.x},${endCoord.y}`,
    "Z",
  ].join(" ");
}
