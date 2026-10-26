// Человечек-пиктограмма: скелет из 11 точек, вид сбоку. У каждого упражнения две позы,
// между ними человечек плавно двигается, поэтому видно, как делать упражнение.
// Точки: g голова, sh плечи, ta таз, kl/kr колени, sl/sr стопы, ll/lr локти, rl/rr кисти (l дальняя сторона, r ближняя).

const STOIT = { g: [50, 18], sh: [50, 30], ta: [50, 55], kl: [50, 72], kr: [50, 72], sl: [50, 90], sr: [50, 90], ll: [53, 42], lr: [53, 42], rl: [56, 53], rr: [56, 53] };
// dve(): одна точка на обе стороны, когда сбоку дальняя рука или нога закрыта ближней
const dve = (izm) => {
  const p = { ...izm };
  for (const [k, a, b] of [['k', 'kl', 'kr'], ['s', 'sl', 'sr'], ['l', 'll', 'lr'], ['r', 'rl', 'rr']]) if (izm[k]) { p[a] = izm[k]; p[b] = izm[k]; }
  return p;
};
const PLANKA = dve({ g: [74, 62], sh: [64, 66], ta: [38, 72], k: [24, 80], s: [10, 88], l: [64, 78], r: [64, 90] });
const NA_SPINE = dve({ g: [14, 84], sh: [24, 86], ta: [48, 86], k: [62, 72], s: [70, 90], l: [34, 88], r: [44, 88] });

const POZY = {
  prised: [{ ...STOIT, ...dve({ l: [60, 32], r: [72, 32] }) }, dve({ g: [57, 33], sh: [52, 45], ta: [37, 66], k: [57, 70], s: [51, 90], l: [64, 45], r: [76, 45] })],
  vypady: [STOIT, { ...STOIT, g: [48, 29], sh: [48, 41], ta: [48, 65], kl: [41, 86], sl: [25, 90], kr: [63, 70], sr: [63, 90], ll: [47, 53], rl: [47, 63], lr: [49, 53], rr: [49, 63] }],
  mostik: [NA_SPINE, { ...NA_SPINE, ta: [47, 70], kl: [64, 68], kr: [64, 68] }],
  stulchik: [dve({ g: [31, 32], sh: [31, 44], ta: [31, 66], k: [51, 66], s: [51, 90], l: [39, 54], r: [44, 46] }), dve({ g: [31, 33], sh: [31, 45], ta: [31, 66], k: [51, 66], s: [51, 90], l: [39, 55], r: [44, 47] })],
  otzhimaniya_koleni: [dve({ g: [72, 62], sh: [62, 66], ta: [38, 76], k: [24, 88], s: [12, 85], l: [62, 78], r: [62, 90] }), dve({ g: [71, 80], sh: [60, 83], ta: [36, 84], k: [24, 88], s: [12, 85], l: [53, 78], r: [62, 90] })],
  otzhimaniya: [PLANKA, dve({ g: [73, 79], sh: [62, 82], ta: [36, 84], k: [22, 86], s: [10, 89], l: [55, 77], r: [64, 90] })],
  planka: [dve({ g: [72, 74], sh: [62, 79], ta: [38, 80], k: [24, 84], s: [10, 88], l: [62, 90], r: [76, 90] }), dve({ g: [72, 73], sh: [62, 78], ta: [38, 79], k: [24, 84], s: [10, 88], l: [62, 90], r: [76, 90] })],
  bokovaya: [dve({ g: [72, 70], sh: [64, 76], ta: [40, 82], k: [27, 85], s: [14, 88], l: [64, 90], r: [76, 90] }), { ...dve({ g: [72, 69], sh: [64, 75], ta: [40, 79], k: [27, 84], s: [14, 88], l: [64, 90], r: [76, 90] }), lr: [64, 63], rr: [64, 51] }],
  skruchivaniya: [{ ...NA_SPINE, g: [16, 84], sh: [26, 86], ll: [22, 78], lr: [22, 78], rl: [14, 82], rr: [14, 82] }, { ...NA_SPINE, g: [22, 72], sh: [31, 78], ll: [29, 70], lr: [29, 70], rl: [20, 72], rr: [20, 72] }],
  velosiped: [{ ...NA_SPINE, ...dve({ g: [20, 74], sh: [29, 80], l: [31, 69], r: [17, 74] }), kl: [44, 68], sl: [55, 75], kr: [63, 79], sr: [80, 77] }, { ...NA_SPINE, ...dve({ g: [20, 74], sh: [29, 80], l: [31, 69], r: [17, 74] }), kl: [63, 79], sl: [80, 77], kr: [44, 68], sr: [55, 75] }],
  supermen: [dve({ g: [76, 84], sh: [64, 86], ta: [40, 86], k: [26, 87], s: [12, 88], l: [74, 85], r: [86, 84] }), dve({ g: [76, 78], sh: [64, 82], ta: [40, 86], k: [26, 84], s: [12, 79], l: [76, 77], r: [88, 72] })],
  ptica: [dve({ g: [74, 66], sh: [64, 70], ta: [38, 70], k: [38, 90], s: [22, 90], l: [64, 80], r: [64, 90] }), { ...dve({ g: [74, 66], sh: [64, 70], ta: [38, 70], k: [38, 90], s: [22, 90], l: [64, 80], r: [64, 90] }), lr: [75, 67], rr: [87, 65], kl: [24, 69], sl: [10, 69] }],
  zvezdochka: [{ g: [50, 18], sh: [50, 30], ta: [50, 55], kl: [46, 72], kr: [54, 72], sl: [44, 90], sr: [56, 90], ll: [43, 42], rl: [41, 54], lr: [57, 42], rr: [59, 54] },
    { g: [50, 14], sh: [50, 26], ta: [50, 51], kl: [41, 68], kr: [59, 68], sl: [33, 84], sr: [67, 84], ll: [40, 17], rl: [34, 6], lr: [60, 17], rr: [66, 6] }],
  berpi: [dve({ g: [63, 52], sh: [56, 60], ta: [40, 70], k: [56, 72], s: [46, 90], l: [60, 76], r: [62, 90] }), PLANKA],
  alpinist: [{ ...PLANKA, kl: [50, 78], sl: [42, 88] }, { ...PLANKA, kr: [50, 78], sr: [42, 88] }],
  vyprygivaniya: [dve({ g: [57, 33], sh: [52, 45], ta: [37, 66], k: [57, 70], s: [51, 90], l: [44, 54], r: [40, 64] }), dve({ g: [50, 12], sh: [50, 24], ta: [50, 49], k: [50, 66], s: [50, 83], l: [44, 37], r: [38, 47] })],
  noski: [STOIT, { ...STOIT, g: [50, 14], sh: [50, 26], ta: [50, 51], kl: [50, 68], kr: [50, 68], sl: [52, 88], sr: [52, 88], ll: [50, 38], lr: [50, 38], rl: [50, 50], rr: [50, 50] }],
  stul: [dve({ g: [40, 35], sh: [38, 47], ta: [42, 71], k: [62, 72], s: [64, 90], l: [36, 57], r: [34, 66] }), dve({ g: [43, 46], sh: [40, 58], ta: [42, 80], k: [62, 75], s: [64, 90], l: [28, 59], r: [34, 66] })],
};

// сначала дальние нога и рука (светлее, за туловищем), потом туловище и ближние
const LINII = [['ta', 'kl'], ['kl', 'sl'], ['sh', 'll'], ['ll', 'rl'], ['sh', 'ta'], ['ta', 'kr'], ['kr', 'sr'], ['sh', 'lr'], ['lr', 'rr']];

function figurkaSvg(id, { razmer = 120, klass = '' } = {}) {
  const p = POZY[id][0];
  const linii = LINII.map(([a, b], i) => `<line class="${i < 4 ? 'dalnyaya' : ''}" x1="${p[a][0]}" y1="${p[a][1]}" x2="${p[b][0]}" y2="${p[b][1]}"/>`).join('');
  const dop = id === 'stulchik' ? '<line class="predmet" x1="26" y1="10" x2="26" y2="91"/>'
    : id === 'stul' ? '<path class="predmet" d="M18 66 H36 M20 66 V91 M34 66 V91 M18 66 V44"/>' : '';
  return `<svg class="figurka ${klass}" data-uprazhnenie="${id}" viewBox="0 0 100 100" width="${razmer}" height="${razmer}" aria-hidden="true">
    <line class="pol" x1="2" y1="92" x2="98" y2="92"/>${dop}
    <g class="telo">${linii}<circle cx="${p.g[0]}" cy="${p.g[1]}" r="7"/></g></svg>`;
}

// плавное движение между двумя позами; период в миллисекундах
const zhivye = new Map();
function ozhivit(svg, period = 2000) {
  if (zhivye.has(svg) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const [a, b] = POZY[svg.dataset.uprazhnenie];
  const linii = svg.querySelectorAll('.telo line');
  const golova = svg.querySelector('.telo circle');
  const start = performance.now();
  function kadr(t) {
    const f = (1 - Math.cos(((t - start) / period) * Math.PI * 2)) / 2;
    const tochka = (k) => [a[k][0] + (b[k][0] - a[k][0]) * f, a[k][1] + (b[k][1] - a[k][1]) * f];
    LINII.forEach(([x, y], i) => {
      const p1 = tochka(x), p2 = tochka(y);
      linii[i].setAttribute('x1', p1[0]); linii[i].setAttribute('y1', p1[1]);
      linii[i].setAttribute('x2', p2[0]); linii[i].setAttribute('y2', p2[1]);
    });
    const g = tochka('g');
    golova.setAttribute('cx', g[0]); golova.setAttribute('cy', g[1]);
    zhivye.set(svg, requestAnimationFrame(kadr));
  }
  zhivye.set(svg, requestAnimationFrame(kadr));
}
function ostanovit(svg) {
  cancelAnimationFrame(zhivye.get(svg));
  zhivye.delete(svg);
}
