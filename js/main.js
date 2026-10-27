// Сайт-портфолио: интерактив. Без JavaScript всё содержимое тоже видно и работает,
// просто без воды, следа курсора и анимаций.

document.documentElement.classList.add('js');
const tihoDvizhenie = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mysh = matchMedia('(pointer: fine)').matches;      // у телефона пальцы, а не мышка


// ---------- 1. Меню на телефоне: кнопка раскрывает и закрывает список разделов ----------
const shapka = document.querySelector('.shapka');
const burger = document.querySelector('.shapka__burger');
if (shapka && burger) {
  const zakryt = () => {
    shapka.classList.remove('shapka--otkryto');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  };
  burger.addEventListener('click', () => {
    const otkryto = shapka.classList.toggle('shapka--otkryto');
    burger.setAttribute('aria-expanded', String(otkryto));
    burger.setAttribute('aria-label', otkryto ? 'Закрыть меню' : 'Открыть меню');
  });
  shapka.querySelectorAll('.shapka__menu a').forEach((a) => a.addEventListener('click', zakryt));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shapka.classList.contains('shapka--otkryto')) {
      zakryt();
      burger.focus();
    }
  });
}

// шапка прозрачная наверху и темнеет, когда страницу прокрутили
if (shapka) {
  const temno = () => shapka.classList.toggle('shapka--temno', scrollY > 40);
  addEventListener('scroll', temno, { passive: true });
  temno();
}


// ---------- 2. Блоки плавно появляются, когда до них доходит прокрутка ----------
const bloki = document.querySelectorAll('.poyavlenie');
if ('IntersectionObserver' in window) {
  const nablyudatel = new IntersectionObserver((zapisi) => {
    zapisi.forEach((z) => {
      if (z.isIntersecting) {
        z.target.classList.add('vidno');
        nablyudatel.unobserve(z.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  bloki.forEach((b) => nablyudatel.observe(b));
} else {
  bloki.forEach((b) => b.classList.add('vidno'));
}


// ---------- 3. Вода с бензиновыми разводами (WebGL) ----------
// Толщина бензиновой плёнки: плавный шум; её цвет: переливы по кругу, как интерференция
// в настоящей плёнке. От курсора (и пальца) по воде расходятся круги.
// Если WebGL нет, остаётся мягкий градиент из CSS.
(function voda() {
  const canvas = document.querySelector('canvas.voda');
  const gl = canvas && canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return;
  const frag = `
precision highp float;
uniform vec2 res; uniform float t; uniform float yarkost; uniform vec3 krugi[12];
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += a*noise(p); p *= 2.03; a *= .5; } return s; }
void main(){
  vec2 uv = gl_FragCoord.xy / res.y;
  vec2 q = vec2(fbm(uv*1.6 + t*.02), fbm(uv*1.6 - t*.025 + 3.1));
  float tolsh = fbm(uv*2.2 + q*1.8 + t*.015);
  float pyatno = smoothstep(.42, .72, fbm(uv*1.1 + q - t*.01));
  float volna = 0.;
  for (int i = 0; i < 12; i++){
    vec3 k = krugi[i]; float vozrast = t - k.z;
    if (vozrast < 0. || vozrast > 4.) continue;
    float d = distance(uv, k.xy / res.y);
    volna += sin(d*48. - vozrast*7.) * exp(-d*5.) * exp(-vozrast*1.1) * .55;
    pyatno = max(pyatno, exp(-d*9.) * exp(-vozrast*.9) * .9);
  }
  tolsh += volna;
  vec3 plenka = vec3(.80,.74,.76) + vec3(.20,.20,.22)*cos(6.2831*(tolsh*1.7 + vec3(0., .33, .67)));
  vec3 voda = vec3(.059,.051,.071) + .025*vec3(fbm(uv*8. + t*.05));
  vec3 c = mix(voda, plenka*.82, pyatno*.78*yarkost);
  c += .05 * volna * plenka * yarkost;
  vec2 v = gl_FragCoord.xy / res - .5; c *= 1. - dot(v, v)*.9;
  gl_FragColor = vec4(c, 1.);
}`;
  const sozdat = (tip, kod) => { const s = gl.createShader(tip); gl.shaderSource(s, kod); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sozdat(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'));
  gl.attachShader(prog, sozdat(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (imya) => gl.getUniformLocation(prog, imya);
  gl.uniform1f(u('yarkost'), Number(canvas.dataset.yarkost || 1));

  // шейдер тяжёлый: считаем его в уменьшенном размере, на телефоне ещё меньше
  const masshtab = mysh ? 0.75 : 0.5;
  function razmer() {
    const k = Math.min(devicePixelRatio || 1, 1.5) * masshtab;
    canvas.width = Math.round(innerWidth * k);
    canvas.height = Math.round(innerHeight * k);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u('res'), canvas.width, canvas.height);
  }
  addEventListener('resize', razmer);
  razmer();

  const krugi = new Float32Array(36).fill(-100);
  const start = performance.now();
  let nomer = 0, posledniy = 0;
  if (!tihoDvizhenie) {
    addEventListener('pointermove', (e) => {
      const t = (performance.now() - start) / 1000;
      if (t - posledniy < 0.09) return;               // новый круг не чаще 11 раз в секунду
      posledniy = t;
      const k = canvas.width / innerWidth;
      krugi.set([e.clientX * k, (innerHeight - e.clientY) * k, t], (nomer++ % 12) * 3);
    }, { passive: true });
  }
  function kadr() {
    gl.uniform1f(u('t'), tihoDvizhenie ? 30 : (performance.now() - start) / 1000);
    gl.uniform3fv(u('krugi'), krugi);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!tihoDvizhenie) requestAnimationFrame(kadr);   // при "уменьшить движение" вода неподвижна
  }
  kadr();
})();


// ---------- 4. Курсор-след "бензин на воде" ----------
// За мышкой мягко тянется хвост: каждая точка плавно подтягивается к соседней, без пружины,
// поэтому хвост не проскакивает и не мотается в обратную сторону. Над ссылками и кнопками
// точка курсора раскрывается в кольцо: так видно, что здесь можно нажать.
(function kursor() {
  if (tihoDvizhenie || !mysh) return;
  const PALITRA = ['#f3e3cf', '#f7c9b4', '#f2a9c4', '#cdb6f2', '#a8e2d6', '#f3e3cf'];
  const TOCHEK = 42;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  const m = { x: -100, y: -100, dvigalas: false, nadSsylkoj: false, est: false };
  const tochki = Array.from({ length: TOCHEK }, () => ({ x: -100, y: -100 }));
  let tolshchina = 0, kolco = 4.5;

  function razmer() {
    const k = devicePixelRatio || 1;
    canvas.width = innerWidth * k;
    canvas.height = innerHeight * k;
    ctx.setTransform(k, 0, 0, k, 0, 0);
  }
  addEventListener('resize', razmer);
  razmer();

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (!m.est) {                                   // первое движение: хвост появляется прямо под мышкой
      tochki.forEach((p) => { p.x = e.clientX; p.y = e.clientY; });
      m.est = true;
      document.documentElement.classList.add('kursor-sled-vkl');
    }
    m.x = e.clientX;
    m.y = e.clientY;
    m.dvigalas = true;
    m.nadSsylkoj = Boolean(e.target.closest && e.target.closest('a, button, summary, label, [role="button"]'));
  }, { passive: true });
  document.addEventListener('mouseleave', () => { m.x = m.y = -100; });

  function cvet(t, alpha) {
    const p = (((t % 1) + 1) % 1) * (PALITRA.length - 1);
    const i = Math.floor(p), f = p - i;
    const a = parseInt(PALITRA[i].slice(1), 16), b = parseInt(PALITRA[i + 1].slice(1), 16);
    const mix = (sh) => Math.round(((a >> sh) & 255) * (1 - f) + ((b >> sh) & 255) * f);
    return `rgba(${mix(16)},${mix(8)},${mix(0)},${alpha})`;
  }

  function kadr(time) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    tolshchina += ((m.dvigalas ? 1 : 0.15) - tolshchina) * 0.06;   // хвост тает, когда мышка стоит
    m.dvigalas = false;
    tochki.forEach((p, i) => {
      const cel = i === 0 ? m : tochki[i - 1];
      const shag = i === 0 ? 0.5 : 0.62 - 0.005 * i;      // голова чуть отстаёт от мышки, хвост плавно за ней
      p.x += (cel.x - p.x) * shag;
      p.y += (cel.y - p.y) * shag;
    });
    // широкое свечение и тонкая нить поверх; плоские концы, чтобы кусочки стыковались ровно
    ctx.lineCap = 'butt';
    const sdvig = time / 6000;
    for (const [shirina, alpha, blur, smeshenie] of [[26, 0.10, 18, 'lighter'], [8, 0.9, 6, 'source-over']]) {
      ctx.globalCompositeOperation = smeshenie;
      ctx.shadowBlur = blur;
      for (let i = 1; i < TOCHEK - 1; i++) {
        const a = tochki[i], b = tochki[i + 1], t = i / TOCHEK;
        ctx.strokeStyle = cvet(t * 1.2 + sdvig, alpha * (1 - t));
        ctx.shadowColor = cvet(t * 1.2 + sdvig + 0.2, 0.6);
        ctx.lineWidth = Math.max(0.5, shirina * (1 - t) * tolshchina);
        ctx.beginPath();
        ctx.moveTo((tochki[i - 1].x + a.x) / 2, (tochki[i - 1].y + a.y) / 2);
        ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    kolco += ((m.nadSsylkoj ? 18 : 4.5) - kolco) * 0.2;
    ctx.beginPath();
    ctx.arc(m.x, m.y, kolco, 0, Math.PI * 2);
    // тёмная обводка: на бежевой кнопке и светлых снимках светлый курсор иначе пропадает
    ctx.strokeStyle = 'rgba(15, 13, 18, .7)';
    ctx.lineWidth = kolco > 6 ? 4 : 2.5;
    ctx.stroke();
    if (kolco > 6) {
      ctx.strokeStyle = cvet(sdvig, 0.95);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.fillStyle = cvet(sdvig, 0.95);
      ctx.fill();
    }
    requestAnimationFrame(kadr);
  }
  requestAnimationFrame(kadr);
})();


// ---------- 4б. Выделенные слова в заголовках "ломаются": два куска-копии съезжают вбок ----------
// Копии скрыты от скринридера, иначе он прочитает слово трижды
document.querySelectorAll('h1 em, h2 em').forEach((em) => {
  const tekst = em.textContent;
  for (const n of [1, 2]) {
    const kusok = document.createElement('span');
    kusok.className = `glitch__kusok glitch__kusok--${n}`;
    kusok.setAttribute('aria-hidden', 'true');
    kusok.textContent = tekst;
    em.append(kusok);
  }
});


// ---------- 4в. 3D-модель: грузится, только когда до неё почти долистали ----------
// путь в data-skript считается от этого файла (js/), а не от страницы
(function model() {
  const blok = document.querySelector('[data-model]');
  if (!blok || !('IntersectionObserver' in window)) return;
  const nablyudatel = new IntersectionObserver(([z]) => {
    if (!z.isIntersecting) return;
    nablyudatel.disconnect();
    import(blok.dataset.skript).then((m) => m.pokazat(blok)).catch(() => blok.classList.add('model--oshibka'));
  }, { rootMargin: '300px 0px' });
  nablyudatel.observe(blok);
})();


// ---------- 5. Бензиновый блик на карточках и наклон фото за курсором ----------
if (mysh && !tihoDvizhenie) {
  document.querySelectorAll('.kartochka, .cifra').forEach((k) => {
    k.addEventListener('pointermove', (e) => {
      const r = k.getBoundingClientRect();
      k.style.setProperty('--x', `${e.clientX - r.left}px`);
      k.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });
  const foto = document.querySelector('.pervyj .foto');
  if (foto) {
    addEventListener('pointermove', (e) => {
      const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
      foto.style.transform = `translate(${dx * 12}px, ${dy * 12}px)`;   // только лёгкий сдвиг: наклон искажал лицо
    }, { passive: true });
  }
}


// ---------- 6. Переход на другую страницу: из точки клика расходится бензиновая волна ----------
(function perehod() {
  if (tihoDvizhenie) return;
  const volna = document.createElement('div');
  volna.className = 'volna';
  volna.setAttribute('aria-hidden', 'true');
  document.body.append(volna);
  // пришли сюда по волне: она растворяется
  if (sessionStorage.getItem('volna')) {
    sessionStorage.removeItem('volna');
    volna.classList.add('volna--uhodit');
  }
  addEventListener('pageshow', (e) => { if (e.persisted) volna.className = 'volna'; });   // вернулись кнопкой "Назад"
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    // только переходы на другие страницы этого сайта; якоря, PDF и картинки открываются как обычно
    if (url.origin !== location.origin || /\.(pdf|webp|png|jpe?g)$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    volna.style.setProperty('--x', `${e.clientX}px`);
    volna.style.setProperty('--y', `${e.clientY}px`);
    volna.className = 'volna volna--idet';
    try { sessionStorage.setItem('volna', '1'); } catch { /* без памяти просто не будет растворения */ }
    setTimeout(() => { location.href = url.href; }, 520);
  });
})();
