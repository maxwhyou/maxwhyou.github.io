// Ритм: каталог упражнений, конструктор тренировки и таймер работы и отдыха.
// Таймер считает от времени окончания шага, а не уменьшает счётчик каждую секунду:
// так он не отстаёт, если вкладка была в фоне и браузер притормаживал скрипты.

const UPR = [
  { id: 'prised', nazv: 'Приседания', zony: ['nogi', 'yagodicy'], uroven: 1, kak: 'Стопы на ширине плеч, носки чуть врозь. Опускайся, как будто садишься на стул: колени смотрят туда же, куда носки, спина ровная.' },
  { id: 'vypady', nazv: 'Выпады назад', zony: ['nogi', 'yagodicy'], uroven: 2, kak: 'Шагни назад и опустись, пока оба колена не согнутся примерно под прямым углом. Переднее колено не заваливается внутрь. Меняй ноги.' },
  { id: 'mostik', nazv: 'Ягодичный мостик', zony: ['yagodicy'], uroven: 1, kak: 'Лёжа на спине, стопы на полу. Поднимай таз, сжимая ягодицы, и задержись наверху на секунду. Поясница не прогибается.' },
  { id: 'stulchik', nazv: 'Стульчик у стены', zony: ['nogi'], uroven: 2, kak: 'Спиной к стене опустись, пока бёдра не станут параллельны полу. Держи положение и дыши ровно.' },
  { id: 'noski', nazv: 'Подъёмы на носки', zony: ['nogi'], uroven: 1, kak: 'Медленно поднимайся на носки и так же медленно опускайся. Для равновесия можно держаться за стену.' },
  { id: 'otzhimaniya_koleni', nazv: 'Отжимания с колен', zony: ['ruki'], uroven: 1, kak: 'Ладони чуть шире плеч, тело прямое от головы до колен. Опускайся грудью к полу и выжимай себя обратно.' },
  { id: 'otzhimaniya', nazv: 'Отжимания', zony: ['ruki', 'press'], uroven: 3, kak: 'Тело одной прямой линией, живот подтянут. Локти отводи назад примерно под 45 градусов к корпусу, а не в стороны.' },
  { id: 'stul', nazv: 'Обратные отжимания от стула', zony: ['ruki'], uroven: 2, kak: 'Ладони на краю устойчивого стула за спиной. Сгибай локти, отводя их назад, опускай таз и выпрямляй руки обратно.' },
  { id: 'planka', nazv: 'Планка на локтях', zony: ['press', 'spina'], uroven: 2, kak: 'Локти под плечами, тело прямое, живот подтянут. Таз не проваливается и не задирается вверх.' },
  { id: 'bokovaya', nazv: 'Боковая планка', zony: ['press'], uroven: 3, kak: 'Локоть под плечом, тело одной линией от головы до стоп. На середине подхода поменяй сторону.' },
  { id: 'skruchivaniya', nazv: 'Скручивания', zony: ['press'], uroven: 1, kak: 'Лёжа, колени согнуты. Отрывай лопатки от пола за счёт пресса, а не тяни голову руками.' },
  { id: 'velosiped', nazv: 'Велосипед', zony: ['press'], uroven: 2, kak: 'Лёжа, лопатки над полом. Тянись локтем к противоположному колену, вторую ногу выпрямляй.' },
  { id: 'supermen', nazv: 'Супермен', zony: ['spina'], uroven: 1, kak: 'Лёжа на животе, одновременно приподними прямые руки и ноги, взгляд в пол. Задержись на секунду.' },
  { id: 'ptica', nazv: 'Птица-собака', zony: ['spina', 'press'], uroven: 1, kak: 'На четвереньках вытяни вперёд руку и назад противоположную ногу. Спина не прогибается. Меняй стороны.' },
  { id: 'alpinist', nazv: 'Альпинист', zony: ['vse', 'press'], uroven: 2, kak: 'В упоре лёжа на прямых руках по очереди подтягивай колени к груди. Плечи над ладонями.' },
  { id: 'zvezdochka', nazv: 'Прыжки звёздочкой', zony: ['vse'], uroven: 1, pryzhki: true, kak: 'Прыжком ноги врозь и руки вверх, следующим прыжком обратно.' },
  { id: 'vyprygivaniya', nazv: 'Приседания с выпрыгиванием', zony: ['nogi', 'vse'], uroven: 3, pryzhki: true, kak: 'Из приседа выпрыгни вверх и мягко приземлись сразу в следующий присед.' },
  { id: 'berpi', nazv: 'Бёрпи', zony: ['vse'], uroven: 3, pryzhki: true, kak: 'Присед с ладонями на полу, прыжком назад в упор лёжа, обратно в присед и выпрыгни вверх.' },
];
const ZONY = { nogi: 'ноги', yagodicy: 'ягодицы', press: 'пресс', spina: 'спина', ruki: 'руки и грудь', vse: 'всё тело' };
const UROVNI = { 1: 'лёгкое', 2: 'среднее', 3: 'сложное' };
const GOTOVYE = [
  { nazv: 'Утро без прыжков', pro: 'Мягко разбудить всё тело, соседи не услышат', spisok: ['prised', 'mostik', 'otzhimaniya_koleni', 'ptica', 'noski', 'planka'], rabota: 30, otdyh: 15, krugi: 1 },
  { nazv: 'Пресс и спина', pro: 'Для тех, кто много сидит за компьютером', spisok: ['skruchivaniya', 'supermen', 'velosiped', 'ptica', 'planka', 'bokovaya'], rabota: 30, otdyh: 15, krugi: 2 },
  { nazv: 'Всё тело с прыжками', pro: 'Быстро разогнать пульс, если есть силы', spisok: ['zvezdochka', 'prised', 'otzhimaniya', 'vypady', 'alpinist', 'berpi'], rabota: 40, otdyh: 20, krugi: 2 },
];
const KLYUCH = 'ritm.trenirovka';
const $ = (s) => document.querySelector(s);
const naiti = (id) => UPR.find((u) => u.id === id);
const slovo = (n, a, b, c) => (n % 10 === 1 && n % 100 !== 11 ? a : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? b : c);
const uprazhnenij = (n) => `${n} ${slovo(n, 'упражнение', 'упражнения', 'упражнений')}`;
const sekund = (n) => `${n} ${slovo(n, 'секунда', 'секунды', 'секунд')}`;
const PODGOTOVKA = 5;

function dlitelnost(t) {
  const n = t.spisok.length * t.krugi;
  return n ? PODGOTOVKA + n * t.rabota + (n - 1) * t.otdyh : 0;
}
function vremyaTekst(sek) {
  const m = Math.floor(sek / 60), s = sek % 60;
  return m ? `${m} мин${s ? ` ${s} с` : ''}` : `${s} с`;
}

// ---------- моя тренировка ----------
let moya = { spisok: [], rabota: 30, otdyh: 15, krugi: 1 };
try { moya = { ...moya, ...JSON.parse(localStorage.getItem(KLYUCH)) }; } catch (e) { /* без хранилища всё работает до перезагрузки */ }
moya.spisok = moya.spisok.filter(naiti);
function sohranit() { try { localStorage.setItem(KLYUCH, JSON.stringify(moya)); } catch (e) { /* ничего страшного */ } }

const STRELKA = (vverh) => `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="${vverh ? 'M3 10 L8 5 L13 10' : 'M3 6 L8 11 L13 6'}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function narisovatMoyu(fokus) {
  $('#moya-spisok').innerHTML = moya.spisok.map((id, i) => {
    const u = naiti(id);
    return `<li>${figurkaSvg(id, { razmer: 52 })}<span class="moya__nazv">${u.nazv}</span>
      <span class="moya__knopki">
        <button type="button" data-vverh="${i}" aria-label="Выше: ${u.nazv}" ${i === 0 ? 'disabled' : ''}>${STRELKA(true)}</button>
        <button type="button" data-vniz="${i}" aria-label="Ниже: ${u.nazv}" ${i === moya.spisok.length - 1 ? 'disabled' : ''}>${STRELKA(false)}</button>
        <button type="button" data-ubrat="${i}" aria-label="Убрать: ${u.nazv}">✕</button>
      </span></li>`;
  }).join('');
  $('#moya-pusto').hidden = moya.spisok.length > 0;
  $('#rabota').value = moya.rabota; $('#otdyh').value = moya.otdyh; $('#krugi').value = moya.krugi;
  const sek = dlitelnost(moya);
  $('#moya-itog').innerHTML = moya.spisok.length ? `${uprazhnenij(moya.spisok.length)}, ${moya.krugi > 1 ? `${moya.krugi} круга, ` : ''}<b>${vremyaTekst(sek)}</b>` : '';
  $('#nachat').disabled = !moya.spisok.length;
  const plashka = $('#plashka');
  plashka.hidden = !moya.spisok.length;
  plashka.textContent = `Моя тренировка: ${uprazhnenij(moya.spisok.length)}, ${vremyaTekst(sek)}`;
  if (fokus) {
    const b = document.querySelector(fokus);
    (b && !b.disabled ? b : $('#z-moya')).focus();
  }
  sohranit();
}

$('#moya-spisok').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const s = moya.spisok;
  if (b.dataset.vverh) { const i = +b.dataset.vverh; [s[i - 1], s[i]] = [s[i], s[i - 1]]; narisovatMoyu(`[data-vverh="${i - 1}"]`); }
  if (b.dataset.vniz) { const i = +b.dataset.vniz; [s[i + 1], s[i]] = [s[i], s[i + 1]]; narisovatMoyu(`[data-vniz="${i + 1}"]`); }
  if (b.dataset.ubrat) {
    const i = +b.dataset.ubrat;
    s.splice(i, 1);
    narisovatMoyu(`[data-ubrat="${Math.min(i, s.length - 1)}"]`);
  }
  obnovitKnopki();
});
for (const id of ['rabota', 'otdyh', 'krugi']) $(`#${id}`).addEventListener('change', (e) => { moya[id] = +e.target.value; narisovatMoyu(); });

// ---------- готовые тренировки ----------
$('#spisok-gotovyh').innerHTML = GOTOVYE.map((t, i) => `<li class="gotovaya">
  <div class="gotovaya__figurki" aria-hidden="true">${t.spisok.slice(0, 3).map((id) => figurkaSvg(id, { razmer: 64 })).join('')}</div>
  <h3>${t.nazv}</h3>
  <p>${t.pro}</p>
  <p class="gotovaya__meta">${uprazhnenij(t.spisok.length)} · ${t.krugi > 1 ? `${t.krugi} круга · ` : ''}${t.rabota}/${t.otdyh} с · <b>${vremyaTekst(dlitelnost(t))}</b></p>
  <div class="gotovaya__knopki">
    <button class="knopka knopka--glav" type="button" data-start="${i}">Начать</button>
    <button class="knopka" type="button" data-vzyat="${i}">Изменить под себя</button>
  </div></li>`).join('');
$('#spisok-gotovyh').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const t = GOTOVYE[b.dataset.start ?? b.dataset.vzyat];
  if (b.dataset.start) return zapustit({ ...t, spisok: [...t.spisok] }, b);
  moya = { spisok: [...t.spisok], rabota: t.rabota, otdyh: t.otdyh, krugi: t.krugi };
  narisovatMoyu();
  obnovitKnopki();
  $('#moya').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  $('#z-moya').focus({ preventScroll: true });
});

// ---------- каталог ----------
function vybor() {
  const f = new FormData($('#filtry'));
  return { zony: f.getAll('zona'), uroven: f.get('uroven'), tiho: f.get('tiho') };
}
function narisovatKatalog() {
  const v = vybor();
  const spisok = UPR.filter((u) => (!v.zony.length || u.zony.some((z) => v.zony.includes(z)))
    && (!v.uroven || u.uroven === +v.uroven) && (!v.tiho || !u.pryzhki));
  const est = v.zony.length || v.uroven || v.tiho;
  document.querySelectorAll('#kartochki .figurka').forEach(ostanovit);
  $('#itog').innerHTML = `${slovo(spisok.length, 'Подходит', 'Подходят', 'Подходят')} ${uprazhnenij(spisok.length)} из ${UPR.length}${est ? ' <button type="button" id="sbros">Сбросить фильтры</button>' : ''}`;
  $('#kartochki').innerHTML = spisok.length ? spisok.map((u) => {
    const v2 = moya.spisok.includes(u.id);
    return `<li class="upr">
      <div class="upr__kartinka">${figurkaSvg(u.id, { razmer: 150 })}${u.pryzhki ? '<span class="upr__pryzhki">с прыжками</span>' : ''}</div>
      <h3>${u.nazv}</h3>
      <ul class="upr__metki">${u.zony.map((z) => `<li>${ZONY[z]}</li>`).join('')}<li class="upr__uroven upr__uroven--${u.uroven}">${UROVNI[u.uroven]}</li></ul>
      <p>${u.kak}</p>
      <button class="knopka" type="button" data-id="${u.id}" aria-pressed="${v2}"><span aria-hidden="true">${v2 ? '✓' : '+'}</span> ${v2 ? 'В тренировке' : 'В тренировку'}<span class="skryt">: ${u.nazv}</span></button>
    </li>`;
  }).join('') : '<li class="pusto">Таких упражнений нет. Сложные упражнения в основном с прыжками: попробуй выключить "Тихо" или выбрать другую сложность.</li>';
}
function obnovitKnopki() {
  document.querySelectorAll('#kartochki [data-id]').forEach((b) => {
    const v = moya.spisok.includes(b.dataset.id);
    b.setAttribute('aria-pressed', v);
    b.firstElementChild.textContent = v ? '✓' : '+';
    b.childNodes[1].textContent = v ? ' В тренировке' : ' В тренировку';
  });
}
$('#filtry').addEventListener('change', narisovatKatalog);
$('#itog').addEventListener('click', (e) => {
  if (e.target.id !== 'sbros') return;
  $('#filtry').reset();
  narisovatKatalog();
  $('#filtry input').focus();
});
$('#kartochki').addEventListener('click', (e) => {
  const b = e.target.closest('[data-id]');
  if (!b) return;
  const id = b.dataset.id;
  moya.spisok = moya.spisok.includes(id) ? moya.spisok.filter((x) => x !== id) : [...moya.spisok, id];
  obnovitKnopki();
  narisovatMoyu();
});
// человечек оживает, когда на карточку навели мышь или перешли клавиатурой
for (const [vkl, vykl] of [['mouseover', 'mouseout'], ['focusin', 'focusout']]) {
  $('#kartochki').addEventListener(vkl, (e) => { const k = e.target.closest('.upr'); if (k) ozhivit(k.querySelector('.figurka')); });
  $('#kartochki').addEventListener(vykl, (e) => { const k = e.target.closest('.upr'); if (k && !k.contains(e.relatedTarget)) ostanovit(k.querySelector('.figurka')); });
}

// ---------- таймер ----------
const tajmer = $('#tajmer');
let shagi = [], nomer = 0, konec = 0, ostalos = 0, pauza = false, interval = null, pisk = {}, zvuk = true, audio = null, budilnik = null, trenirovka = null, otkuda = null;

function piknut(chastota, dlit) {
  if (!zvuk) return;
  try {
    audio = audio || new AudioContext();
    const o = audio.createOscillator(), g = audio.createGain();
    o.frequency.value = chastota; o.connect(g); g.connect(audio.destination);
    g.gain.setValueAtTime(0.2, audio.currentTime); g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + dlit);
    o.start(); o.stop(audio.currentTime + dlit);
  } catch (e) { /* без звука */ }
}

function sobratShagi(t) {
  const s = [{ tip: 'prep', id: t.spisok[0], dlit: PODGOTOVKA }];
  const vsego = t.spisok.length * t.krugi;
  let n = 0;
  for (let k = 0; k < t.krugi; k++) {
    t.spisok.forEach((id, i) => {
      n++;
      s.push({ tip: 'work', id, dlit: t.rabota, i: i + 1, k: k + 1 });
      if (n < vsego) s.push({ tip: 'rest', id: t.spisok[(i + 1) % t.spisok.length], dlit: t.otdyh, i: i + 1, k: k + 1 });
    });
  }
  return s;
}

async function zapustit(t, knopka) {
  trenirovka = t; otkuda = knopka;
  shagi = sobratShagi(t);
  nomer = 0; pauza = false;
  tajmer.classList.remove('tajmer--gotovo');
  $('#t-knopki').innerHTML = `<button class="knopka knopka--glav" type="button" id="t-pauza">Пауза</button>
    <button class="knopka" type="button" id="t-propusk">Пропустить</button>
    <button class="knopka" type="button" id="t-stop">Закончить</button>`;
  tajmer.showModal();
  nachatShag();
  clearInterval(interval);
  interval = setInterval(tik, 200);
  $('#t-pauza').focus();
  try { budilnik = await navigator.wakeLock?.request('screen'); } catch (e) { budilnik = null; }   // экран не гаснет посреди планки
}

function nachatShag() {
  const sh = shagi[nomer], u = naiti(sh.id);
  ostalos = sh.dlit * 1000; konec = Date.now() + ostalos; pisk = {};
  const sled = shagi.slice(nomer + 1).find((x) => x.tip === 'work');
  const t = trenirovka;
  tajmer.dataset.faza = sh.tip;
  $('#t-faza').textContent = { prep: 'Приготовься', work: 'Работа', rest: 'Отдых' }[sh.tip];
  $('#t-gde').textContent = sh.tip === 'prep' ? `${uprazhnenij(t.spisok.length)}${t.krugi > 1 ? `, ${t.krugi} круга` : ''}`
    : `Упражнение ${sh.i} из ${t.spisok.length}${t.krugi > 1 ? ` · круг ${sh.k} из ${t.krugi}` : ''}`;
  $('#t-nazv').textContent = sh.tip === 'work' ? u.nazv : `Дальше: ${u.nazv}`;
  $('#t-kak').textContent = u.kak;
  $('#t-dalshe').textContent = sh.tip === 'work' && sled ? `Потом: ${naiti(sled.id).nazv}` : '';
  $('#t-figurka').innerHTML = figurkaSvg(sh.id, { razmer: 220 });
  if (sh.tip === 'work') ozhivit($('#t-figurka svg'), 2000);
  $('#t-diktor').textContent = sh.tip === 'work' ? `Работа: ${u.nazv}, ${sekund(sh.dlit)}` : sh.tip === 'rest' ? `Отдых ${sekund(sh.dlit)}. Дальше: ${u.nazv}` : `Приготовься. Первое упражнение: ${u.nazv}`;
  piknut(sh.tip === 'work' ? 880 : 520, 0.25);
  obnovitCifry();
}

function obnovitCifry() {
  const sek = Math.ceil(ostalos / 1000);
  $('#t-cifry').textContent = sek;
  const proshlo = shagi.slice(0, nomer).reduce((s, x) => s + x.dlit, 0) + (shagi[nomer].dlit - ostalos / 1000);
  $('#t-progress').style.width = `${Math.min(100, (proshlo / shagi.reduce((s, x) => s + x.dlit, 0)) * 100)}%`;
}

function tik() {
  if (pauza) return;
  ostalos = Math.max(0, konec - Date.now());
  const sek = Math.ceil(ostalos / 1000);
  if (sek <= 3 && sek > 0 && !pisk[sek]) { pisk[sek] = true; piknut(660, 0.12); }
  obnovitCifry();
  if (ostalos <= 0) dalshe();
}

function dalshe() {
  const fig = $('#t-figurka svg');
  if (fig) ostanovit(fig);
  nomer++;
  if (nomer < shagi.length) return nachatShag();
  zakonchit(true);
}

function zakonchit(polnostyu) {
  clearInterval(interval);
  const fig = $('#t-figurka svg');
  if (fig) ostanovit(fig);
  budilnik?.release?.(); budilnik = null;
  const sdelano = shagi.slice(0, nomer).filter((x) => x.tip === 'work').length;
  const vremya = shagi.slice(0, nomer).reduce((s, x) => s + x.dlit, 0);
  tajmer.classList.add('tajmer--gotovo');
  tajmer.dataset.faza = 'gotovo';
  $('#t-faza').textContent = polnostyu ? 'Готово' : 'Тренировка остановлена';
  $('#t-cifry').textContent = '';
  $('#t-gde').textContent = '';
  $('#t-nazv').textContent = polnostyu ? 'Отличная работа!' : `Сделано ${uprazhnenij(sdelano)}`;
  $('#t-kak').textContent = polnostyu ? `${uprazhnenij(sdelano)} за ${vremyaTekst(vremya)}. Попей воды и пройдись пару минут, чтобы пульс успокоился.` : 'Ничего страшного: даже несколько упражнений лучше, чем ни одного.';
  $('#t-dalshe').textContent = '';
  $('#t-figurka').innerHTML = '';
  $('#t-progress').style.width = polnostyu ? '100%' : $('#t-progress').style.width;
  $('#t-diktor').textContent = $('#t-faza').textContent + '. ' + $('#t-kak').textContent;
  if (polnostyu) { piknut(660, 0.15); setTimeout(() => piknut(990, 0.3), 160); }
  $('#t-knopki').innerHTML = '<button class="knopka knopka--glav" type="button" id="t-eshe">Ещё раз</button><button class="knopka" type="button" id="t-zakryt">Закрыть</button>';
  $('#t-eshe').focus();
}

function pereklyuchitPauzu() {
  if (tajmer.classList.contains('tajmer--gotovo')) return;
  pauza = !pauza;
  const fig = $('#t-figurka svg');
  if (pauza) { ostalos = Math.max(0, konec - Date.now()); if (fig) ostanovit(fig); }
  else { konec = Date.now() + ostalos; if (fig && shagi[nomer].tip === 'work') ozhivit(fig, 2000); }
  $('#t-pauza').textContent = pauza ? 'Продолжить' : 'Пауза';
  $('#t-faza').textContent = pauza ? 'Пауза' : { prep: 'Приготовься', work: 'Работа', rest: 'Отдых' }[shagi[nomer].tip];
  tajmer.classList.toggle('tajmer--pauza', pauza);
}

$('#t-knopki').addEventListener('click', (e) => {
  const id = e.target.closest('button')?.id;
  if (id === 't-pauza') pereklyuchitPauzu();
  if (id === 't-propusk') { if (pauza) pereklyuchitPauzu(); dalshe(); }
  if (id === 't-stop') zakonchit(false);
  if (id === 't-eshe') zapustit(trenirovka, otkuda);
  if (id === 't-zakryt') tajmer.close();
});
$('#t-zvuk').addEventListener('click', (e) => { zvuk = !zvuk; e.currentTarget.setAttribute('aria-pressed', zvuk); });
tajmer.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !['BUTTON', 'SELECT'].includes(e.target.tagName)) { e.preventDefault(); pereklyuchitPauzu(); }
});
// Esc: сначала останавливаем таймер, иначе он продолжит пищать за закрытым окном
tajmer.addEventListener('cancel', (e) => {
  if (tajmer.classList.contains('tajmer--gotovo')) return;
  e.preventDefault();      // первый Esc только останавливает тренировку и показывает итог, второй закрывает окно
  zakonchit(false);
});
tajmer.addEventListener('close', () => { clearInterval(interval); budilnik?.release?.(); otkuda?.focus(); });
$('#nachat').addEventListener('click', (e) => zapustit({ ...moya, spisok: [...moya.spisok] }, e.currentTarget));

// ---------- первый экран ----------
$('#geroj-figurki').innerHTML = ['prised', 'zvezdochka', 'planka'].map((id) => figurkaSvg(id, { razmer: 170 })).join('');
document.querySelectorAll('#geroj-figurki svg').forEach((s, i) => setTimeout(() => ozhivit(s, 2200), i * 400));

narisovatKatalog();
narisovatMoyu();
