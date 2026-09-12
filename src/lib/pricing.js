export function getPlanPrice({ annual }) {
  return annual ? 12 : 15;
}

export function formatPrice(value) {
  return `$${value}`;
}
