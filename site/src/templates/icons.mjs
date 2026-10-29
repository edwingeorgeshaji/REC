export function arrow(direction = 'diagonal') {
  const path = direction === 'right' ? 'M4 12h16M13 5l7 7-7 7' : direction === 'down' ? 'M12 4v16M5 13l7 7 7-7' : 'M5 19 19 5M5 5h14v14';
  return `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${path}"/></svg>`;
}

