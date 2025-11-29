// A collection of lightweight SVG icons
// We use 'encodeURIComponent' to ensure special characters like '#' don't break the CSS

const svg = (content) => `data:image/svg+xml,${encodeURIComponent(content)}`;

export const ICONS = {
  // PYTHON (Blue/Yellow Snake)
  py: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#3776AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>'),
  
  // JAVASCRIPT (Yellow Block)
  js: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F7DF1E"><rect x="2" y="2" width="20" height="20" rx="4" ry="4"/><path d="M16 16c0-1.5-1-2-2.5-2h-1v4h1c1.5 0 2.5-.5 2.5-2z" fill="#000"/><path d="M10 18v-4h-2" stroke="#000" stroke-width="2"/></svg>'),
  
  // REACT (Blue Atom)
  jsx: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 24 24"><circle r="2" fill="#61dafb"/><ellipse rx="10" ry="4" fill="none" stroke="#61dafb"/><ellipse rx="10" ry="4" transform="rotate(60)" fill="none" stroke="#61dafb"/><ellipse rx="10" ry="4" transform="rotate(120)" fill="none" stroke="#61dafb"/></svg>'),
  
  // TYPESCRIPT (Blue TS)
  ts: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3178C6"><rect x="2" y="2" width="20" height="20" rx="4" ry="4"/><path d="M16 16c0-1.5-1-2-2.5-2h-1v4h1c1.5 0 2.5-.5 2.5-2z" fill="#fff"/><path d="M10 18v-4h-2" stroke="#fff" stroke-width="2"/></svg>'),
  tsx: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 24 24"><circle r="2" fill="#3178C6"/><ellipse rx="10" ry="4" fill="none" stroke="#3178C6"/><ellipse rx="10" ry="4" transform="rotate(60)" fill="none" stroke="#3178C6"/><ellipse rx="10" ry="4" transform="rotate(120)" fill="none" stroke="#3178C6"/></svg>'),
  
  // CSS (Blue Shield)
  css: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#264de4"><path d="M3 3h18l-2 18-7 2-7-2z"/><path d="M12 17l4-1.5.5-5.5h-9" stroke="#fff" stroke-width="2" fill="none"/></svg>'),
  
  // HTML (Orange Shield)
  html: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e34f26"><path d="M3 3h18l-2 18-7 2-7-2z"/><path d="M12 17l4-1.5.5-5.5h-9" stroke="#fff" stroke-width="2" fill="none"/></svg>'),
  
  // JSON (Curly Braces)
  json: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><path d="M8 4v4c0 2-2 2-2 4s2 2 2 4v4"/><path d="M16 4v4c0 2 2 2 2 4s-2 2-2 4v4"/></svg>'),
  
  // DEFAULT (Grey Page)
  default: svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#94a3b8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8" fill="#cbd5e1"/></svg>'),
};

export const getIcon = (filename) => {
  if (!filename) return ICONS.default;
  const ext = filename.split('.').pop().toLowerCase();
  
  // Special Cases
  if (filename === 'package.json') return ICONS.json;
  if (filename.endsWith('config.js')) return ICONS.json;
  if (ext === 'md') return ICONS.default;
  
  return ICONS[ext] || ICONS.default;
};