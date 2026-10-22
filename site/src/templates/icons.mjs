export const icon = (name, className = '') => {
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    external: '<path d="M7 17 17 7M7 7h10v10"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4"/>',
    moon: '<path d="M20.7 13.1A8.8 8.8 0 0 1 10.9 3.3a9 9 0 1 0 9.8 9.8Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M5 8h14M5 16h14"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    certificate: '<path d="M14 19H5V3h14v9M8 7h8M8 11h5"/><circle cx="17" cy="16" r="3"/><path d="m15 18-1 4 3-1 3 1-1-4"/>'
  };
  return `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
};
