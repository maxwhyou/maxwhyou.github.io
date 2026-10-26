// Мультотека: каталог с подбором по времени, технике, годам и поиску, плюс подборка на вечер.
// Подборка хранится в браузере (localStorage), чтобы не пропала после перезагрузки.

const MULTY = [
  { id: 'snezhnaya-koroleva', nazv: 'Снежная королева', god: 1957, rezh: 'Лев Атаманов', studiya: 'Союзмультфильм', dlina: 60, tehnika: 'risovannyj', pro: 'Герда отправляется искать Кая, которого унесла Снежная королева.' },
  { id: 'zolotaya-antilopa', nazv: 'Золотая антилопа', god: 1954, rezh: 'Лев Атаманов', studiya: 'Союзмультфильм', dlina: 30, tehnika: 'risovannyj', pro: 'Мальчик спасает от жадного раджи антилопу, из-под копыт которой сыплется золото.' },
  { id: 'vovka', nazv: 'Вовка в Тридевятом царстве', god: 1965, rezh: 'Борис Степанцев', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'risovannyj', pro: 'Вовка попадает в сказку и надеется, что там всё сделают за него.' },
  { id: 'varezhka', nazv: 'Варежка', god: 1967, rezh: 'Роман Качанов', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'kukolnyj', pro: 'Девочке не разрешают завести собаку, и её варежка превращается в щенка.' },
  { id: 'malysh-i-karlson', nazv: 'Малыш и Карлсон', god: 1968, rezh: 'Борис Степанцев', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'risovannyj', pro: 'К одинокому Малышу прилетает Карлсон, который живёт на крыше.' },
  { id: 'vinni-puh', nazv: 'Винни-Пух', god: 1969, rezh: 'Фёдор Хитрук', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'risovannyj', pro: 'Винни-Пух пробует добраться до мёда на воздушном шарике.' },
  { id: 'bremenskie', nazv: 'Бременские музыканты', god: 1969, rezh: 'Инесса Ковалевская', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'risovannyj', pro: 'Трубадур и его друзья-звери путешествуют с песнями, а Трубадур влюбляется в принцессу.' },
  { id: 'krokodil-gena', nazv: 'Крокодил Гена', god: 1969, rezh: 'Роман Качанов', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'kukolnyj', pro: 'Гена и Чебурашка строят Дом дружбы, а старуха Шапокляк им мешает.' },
  { id: 'nu-pogodi', nazv: 'Ну, погоди! Выпуск 1', god: 1969, rezh: 'Вячеслав Котёночкин', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'risovannyj', pro: 'Волк гоняется за Зайцем, и каждая погоня заканчивается для Волка неудачно.' },
  { id: 'umka', nazv: 'Умка', god: 1969, rezh: 'Владимир Попов, Владимир Пекарь', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'risovannyj', pro: 'Белый медвежонок Умка знакомится с мальчиком с полярной станции.' },
  { id: 'ezhik', nazv: 'Ёжик в тумане', god: 1975, rezh: 'Юрий Норштейн', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'perekladka', pro: 'Ёжик идёт к Медвежонку считать звёзды и теряется в тумане.' },
  { id: 'gav', nazv: 'Котёнок по имени Гав. Выпуск 1', god: 1976, rezh: 'Лев Атаманов', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'risovannyj', pro: 'Котёнок Гав и щенок Шарик вместе пережидают грозу на чердаке.' },
  { id: 'troe', nazv: 'Трое из Простоквашино', god: 1978, rezh: 'Владимир Попов', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'risovannyj', pro: 'Дядя Фёдор уезжает из города в деревню с котом Матроскиным и псом Шариком.' },
  { id: 'skazka-skazok', nazv: 'Сказка сказок', god: 1979, rezh: 'Юрий Норштейн', studiya: 'Союзмультфильм', dlina: 30, tehnika: 'perekladka', pro: 'Фильм-воспоминание о послевоенном детстве без привычного сюжета. Скорее для взрослых.' },
  { id: 'letuchij-korabl', nazv: 'Летучий корабль', god: 1979, rezh: 'Гарри Бардин', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'risovannyj', pro: 'Трубочист Ваня строит летучий корабль, чтобы жениться на царевне Забаве.' },
  { id: 'kanikuly', nazv: 'Каникулы в Простоквашино', god: 1980, rezh: 'Владимир Попов', studiya: 'Союзмультфильм', dlina: 20, tehnika: 'risovannyj', pro: 'Дядя Фёдор проводит каникулы в деревне вместе с Матроскиным и Шариком.' },
  { id: 'tajna', nazv: 'Тайна третьей планеты', god: 1981, rezh: 'Роман Качанов', studiya: 'Союзмультфильм', dlina: 50, tehnika: 'risovannyj', pro: 'Алиса с отцом и капитаном Зелёным летят за редкими животными для зоопарка.' },
  { id: 'vorona', nazv: 'Пластилиновая ворона', god: 1981, rezh: 'Александр Татарский', studiya: 'Экран', dlina: 10, tehnika: 'plastilin', pro: 'Пластилиновые картинки меняются прямо на глазах под песню про ворону и сыр.' },
  { id: 'pyos', nazv: 'Жил-был пёс', god: 1982, rezh: 'Эдуард Назаров', studiya: 'Союзмультфильм', dlina: 10, tehnika: 'risovannyj', pro: 'Старого пса выгоняют из дома, и помочь ему решает волк.' },
  { id: 'sneg', nazv: 'Падал прошлогодний снег', god: 1983, rezh: 'Александр Татарский', studiya: 'Экран', dlina: 20, tehnika: 'plastilin', pro: 'Мужик идёт в лес за ёлкой, и с ним случаются странные приключения.' },
];

const TEHNIKA = { risovannyj: 'рисованный', kukolnyj: 'кукольный', plastilin: 'пластилин', perekladka: 'перекладка' };
// значки техники: карандаш, марионетка, комок пластилина, ножницы
const ZNACHKI = {
  risovannyj: '<path d="M14 50 L18 38 L44 12 L52 20 L26 46 Z M18 38 L26 46 M40 16 L48 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>',
  kukolnyj: '<path d="M14 8 H50 M20 8 V30 M44 8 V30 M32 8 V17" stroke="currentColor" stroke-width="2.5" fill="none"/><path d="M14 8 H50" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="23" r="6.5" fill="none" stroke="currentColor" stroke-width="4"/><path d="M32 30 V45 M20 31 L32 37 L44 31 M32 45 L24 58 M32 45 L40 58" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>',
  plastilin: '<path d="M10 40 C6 26 22 13 34 15 C48 17 59 28 53 42 C47 55 15 56 10 40 Z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M23 37 C25 28 39 28 41 37 M28 39 C30 34 35 34 36 39" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>',
  perekladka: '<circle cx="16" cy="44" r="7" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="16" cy="20" r="7" fill="none" stroke="currentColor" stroke-width="4"/><path d="M22 24 L56 44 M22 40 L56 20" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
};
const CVETA = ['#34428a', '#b23a26', '#1f6f6a', '#8a5a14', '#6b3468'];
const KLYUCH = 'multoteka.podborka';

const $ = (s) => document.querySelector(s);
const slovo = (n, a, b, c) => (n % 10 === 1 && n % 100 !== 11 ? a : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? b : c);
const multov = (n) => `${n} ${slovo(n, 'мультфильм', 'мультфильма', 'мультфильмов')}`;
const minut = (m) => `${m} ${slovo(m, 'минута', 'минуты', 'минут')}`;
const dlinaTekst = (m) => (m >= 60 ? 'около часа' : `около ${minut(m)}`);
const vremyaTekst = (m) => (m < 60 ? minut(m) : `${Math.floor(m / 60)} ч${m % 60 ? ` ${m % 60} мин` : ''}`);
const prostoj = (t) => t.toLowerCase().replaceAll('ё', 'е');

// ---------- подборка ----------
let podborka = [];
try { podborka = JSON.parse(localStorage.getItem(KLYUCH)) || []; } catch (e) { podborka = []; }
podborka = podborka.filter((id) => MULTY.some((m) => m.id === id));
let ubrannye = null;   // что было в подборке до очистки, чтобы можно было вернуть
function sohranit() { try { localStorage.setItem(KLYUCH, JSON.stringify(podborka)); } catch (e) { /* без хранилища подборка живёт до перезагрузки */ } }

// ---------- фильтры ----------
function vybor() {
  const f = new FormData($('#filtry'));
  return {
    vremya: Number(document.querySelector('input[name=vremya]:checked').value),
    tehnika: f.getAll('tehnika'),
    gody: f.get('gody'),
    poisk: prostoj(f.get('poisk').trim()),
    sort: f.get('sort'),
  };
}
function filtrovat(v) {
  const spisok = MULTY.filter((m) => (!v.vremya || m.dlina <= v.vremya)
    && (!v.tehnika.length || v.tehnika.includes(m.tehnika))
    && (!v.gody || Math.floor(m.god / 10) * 10 === Number(v.gody))
    && (!v.poisk || prostoj(m.nazv + ' ' + m.rezh).includes(v.poisk)));
  const po = { staryj: (a, b) => a.god - b.god, novyj: (a, b) => b.god - a.god, korotkij: (a, b) => a.dlina - b.dlina || a.god - b.god };
  return spisok.sort(po[v.sort]);
}

function kartochka(m) {
  const v = podborka.includes(m.id);
  const cvet = CVETA[MULTY.indexOf(m) % CVETA.length];
  return `<li class="mult">
    <div class="kadr" style="background:${cvet}" aria-hidden="true">
      <span class="kadr__god">${m.god}</span>
      <svg viewBox="0 0 64 64">${ZNACHKI[m.tehnika]}</svg>
    </div>
    <div class="mult__telo">
      <h3>${m.nazv}</h3>
      <p class="mult__kto">${m.god} · ${m.rezh} · ${m.studiya}</p>
      <p class="mult__pro">${m.pro}</p>
      <ul class="mult__metki"><li>${dlinaTekst(m.dlina)}</li><li>${TEHNIKA[m.tehnika]}</li></ul>
      <button class="knopka" type="button" data-id="${m.id}" aria-pressed="${v}"><span aria-hidden="true">${v ? '✓' : '+'}</span> ${v ? 'В подборке' : 'В подборку'}<span class="skryt">: ${m.nazv}</span></button>
    </div>
  </li>`;
}

// пустой результат не тупик: считаем, сколько найдётся, если убрать один из фильтров, и предлагаем это кнопкой
const BEZ = { vremya: ['время', { vremya: 0 }], tehnika: ['технику', { tehnika: [] }], gody: ['годы', { gody: '' }], poisk: ['поиск', { poisk: '' }] };
function podskazki(v) {
  const varianty = Object.entries(BEZ).filter(([k]) => (Array.isArray(v[k]) ? v[k].length : v[k]))
    .map(([k, [nazv, pusto]]) => [k, nazv, filtrovat({ ...v, ...pusto }).length]).filter(([, , n]) => n);
  if (!varianty.length) return 'Попробуй сбросить фильтры.';
  return 'Можно убрать один фильтр: ' + varianty.map(([k, nazv, n]) => `<button type="button" class="knopka knopka--tihaya" data-bez="${k}">Убрать ${nazv}: будет ${n}</button>`).join(' ');
}

function narisovat() {
  const v = vybor();
  const spisok = filtrovat(v);
  const est = v.vremya || v.tehnika.length || v.gody || v.poisk;
  $('#itog').innerHTML = `${slovo(spisok.length, 'Подходит', 'Подходят', 'Подходят')} ${multov(spisok.length)} из ${MULTY.length}${est ? ' <button type="button" id="sbros">Сбросить фильтры</button>' : ''}`;
  $('#kartochki').innerHTML = spisok.length ? spisok.map(kartochka).join('')
    : `<li class="pusto">Ничего не нашлось. ${podskazki(v)}</li>`;
}

function narisovatPodborku() {
  const vybrano = podborka.map((id) => MULTY.find((m) => m.id === id));
  const summa = vybrano.reduce((s, m) => s + m.dlina, 0);
  const vremya = vybor().vremya;
  let itog;
  if (!vybrano.length && ubrannye) itog = 'Подборка очищена. <button type="button" class="knopka knopka--tihaya" id="vernut">Вернуть</button>';
  else if (!vybrano.length) itog = 'Пока пусто. Нажимай "В подборку" у мультфильмов, а здесь посчитаем, сколько времени займёт просмотр.';
  else {
    itog = `<b>${multov(vybrano.length)}</b>, около ${vremyaTekst(summa)}`;
    if (vremya) itog += summa <= vremya
      ? `<br>Влезает в ${vremyaTekst(vremya)}${summa < vremya ? `, останется около ${vremyaTekst(vremya - summa)}` : ' ровно'}.`
      : `<br>Это на ${vremyaTekst(summa - vremya)} больше, чем есть времени.`;
  }
  $('#podborka-itog').innerHTML = itog;
  $('#podborka-spisok').innerHTML = vybrano.map((m) => `<li><span>${m.nazv}<small>${dlinaTekst(m.dlina)} · ${m.god}</small></span>
    <button class="podborka__ubrat" type="button" data-ubrat="${m.id}" aria-label="Убрать из подборки: ${m.nazv}">✕</button></li>`).join('');
  $('#ochistit').hidden = !vybrano.length;
  $('#shapka-schet').textContent = vybrano.length ? `${vybrano.length} · ${vremyaTekst(summa)}` : 'пустая';
  const plashka = $('#plashka');
  plashka.hidden = !vybrano.length;
  plashka.textContent = `Подборка: ${multov(vybrano.length)}, около ${vremyaTekst(summa)}`;
}

function pereklyuchit(id) {
  podborka = podborka.includes(id) ? podborka.filter((x) => x !== id) : [...podborka, id];
  ubrannye = null;
  sohranit();
  // кнопку меняем на месте, чтобы фокус клавиатуры не терялся
  const b = document.querySelector(`[data-id="${id}"]`);
  if (b) {
    const v = podborka.includes(id);
    b.setAttribute('aria-pressed', v);
    b.firstElementChild.textContent = v ? '✓' : '+';
    b.childNodes[1].textContent = v ? ' В подборке' : ' В подборку';
  }
  narisovatPodborku();
}

$('#filtry').addEventListener('input', () => { narisovat(); narisovatPodborku(); });
$('#vremya').addEventListener('change', () => { narisovat(); narisovatPodborku(); });
$('#itog').addEventListener('click', (e) => {
  if (e.target.id !== 'sbros') return;
  $('#filtry').reset();
  document.querySelector('input[name=vremya][value="0"]').checked = true;
  narisovat(); narisovatPodborku();
  $('#poisk').focus();
});
$('#kartochki').addEventListener('click', (e) => {
  const b = e.target.closest('[data-id]');
  if (b) pereklyuchit(b.dataset.id);
  const bez = e.target.closest('[data-bez]');
  if (!bez) return;
  const k = bez.dataset.bez;
  if (k === 'vremya') document.querySelector('input[name=vremya][value="0"]').checked = true;
  if (k === 'tehnika') document.querySelectorAll('input[name=tehnika]').forEach((i) => { i.checked = false; });
  if (k === 'gody') document.querySelector('input[name=gody][value=""]').checked = true;
  if (k === 'poisk') $('#poisk').value = '';
  narisovat(); narisovatPodborku();
  $('#itog').focus();
});
$('#itog').tabIndex = -1;
$('#podborka').addEventListener('click', (e) => {
  const u = e.target.closest('[data-ubrat]');
  if (u) {
    const knopki = [...document.querySelectorAll('[data-ubrat]')];
    const i = knopki.indexOf(u);
    pereklyuchit(u.dataset.ubrat);
    // фокус на соседний пункт, а если подборка опустела, на её заголовок
    const ostalis = document.querySelectorAll('[data-ubrat]');
    (ostalis[Math.min(i, ostalis.length - 1)] || $('#z-podborka')).focus();
  }
  if (e.target.id === 'ochistit') {
    ubrannye = podborka;
    podborka = [];
    sohranit(); narisovat(); narisovatPodborku();
    $('#vernut').focus();
  }
  if (e.target.id === 'vernut') {
    podborka = ubrannye; ubrannye = null;
    sohranit(); narisovat(); narisovatPodborku();
    $('#ochistit').focus();
  }
});
$('#z-podborka').tabIndex = -1;

narisovat();
narisovatPodborku();
