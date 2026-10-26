// Рисует мордочку котёнка в SVG по описанию окраса. Один и тот же код рисует котят
// и на сайте, и в прототипе в Figma, поэтому он лежит отдельным файлом.
// k = { sherst, pyatna, polosy, glaza, fon }
function kotSvg(k, razmer = 200) {
  const pyatna = (k.pyatna || []).map(([x, y, r, cvet]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${cvet}"/>`).join('');
  const polosy = k.polosy
    ? `<path d="M86 66 q14 -6 28 0 M80 78 q20 -8 40 0 M90 54 q10 -4 20 0" stroke="${k.polosy}" stroke-width="5" fill="none" stroke-linecap="round"/>
       <path d="M44 112 q10 2 16 -6 M156 112 q-10 2 -16 -6" stroke="${k.polosy}" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${razmer}" height="${razmer}" role="img" aria-hidden="true">
  <circle cx="100" cy="100" r="96" fill="${k.fon || '#ffe9d6'}"/>
  <path d="M40 92 L46 28 L92 62 Z" fill="${k.sherst}"/><path d="M50 78 L54 44 L80 64 Z" fill="#f6b3b8"/>
  <path d="M160 92 L154 28 L108 62 Z" fill="${k.sherst}"/><path d="M150 78 L146 44 L120 64 Z" fill="#f6b3b8"/>
  <clipPath id="golova-${k.id || 0}"><ellipse cx="100" cy="112" rx="66" ry="58"/></clipPath>
  <ellipse cx="100" cy="112" rx="66" ry="58" fill="${k.sherst}"/>
  <g clip-path="url(#golova-${k.id || 0})">${pyatna}</g>
  ${polosy}
  <ellipse cx="74" cy="108" rx="13" ry="15" fill="#fff"/><ellipse cx="126" cy="108" rx="13" ry="15" fill="#fff"/>
  <ellipse cx="75" cy="110" rx="9" ry="12" fill="${k.glaza}"/><ellipse cx="125" cy="110" rx="9" ry="12" fill="${k.glaza}"/>
  <ellipse cx="76" cy="112" rx="4" ry="8" fill="#2b1d16"/><ellipse cx="124" cy="112" rx="4" ry="8" fill="#2b1d16"/>
  <circle cx="79" cy="104" r="3" fill="#fff"/><circle cx="127" cy="104" r="3" fill="#fff"/>
  <ellipse cx="62" cy="134" rx="10" ry="6" fill="#f6a3a9" opacity=".55"/><ellipse cx="138" cy="134" rx="10" ry="6" fill="#f6a3a9" opacity=".55"/>
  <path d="M94 128 h12 l-6 7 z" fill="#e8868f"/>
  <path d="M100 135 q-6 8 -13 3 M100 135 q6 8 13 3" stroke="#5a3d33" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M60 128 l-26 -4 M60 134 l-26 4 M140 128 l26 -4 M140 134 l26 4" stroke="#5a3d33" stroke-width="2" stroke-linecap="round" opacity=".55"/>
</svg>`;
}
