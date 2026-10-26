// Мурчалка: котята, подбор по фильтрам, окно котёнка и заявка на знакомство.
// У каждого котёнка имя в трёх падежах: "взять Персика", "знакомство с Персиком".
// Заявка проверяется в браузере и никуда не отправляется: это учебный проект.

const KOTYATA = [
  { id: 1, imya: 'Персик', vin: 'Персика', tvor: 'Персиком', mes: 3, pol: 'm', harakter: 'igrivyj', deti: true, sobaki: false, sherst: '#f2a65a', polosy: '#d9822b', glaza: '#8bbf5a', okras: 'рыжий полосатый',
    istoriya: 'Нашли в коробке у подъезда вместе с братом. Обожает охотиться за бантиком и спать на коленях после игры.' },
  { id: 2, imya: 'Уголёк', vin: 'Уголька', tvor: 'Угольком', mes: 4, pol: 'm', harakter: 'spokojnyj', deti: true, sobaki: true, sherst: '#2f2a2e', glaza: '#e8b23a', okras: 'чёрный', fon: '#fde6cf',
    istoriya: 'Жил на даче у волонтёра вместе с собакой и ладит с ней. Любит сидеть рядом, пока ты работаешь.' },
  { id: 3, imya: 'Мята', vin: 'Мяту', tvor: 'Мятой', mes: 2, pol: 'zh', harakter: 'igrivyj', deti: true, sobaki: false, sherst: '#a3abb5', glaza: '#7cc3d8', okras: 'серая', fon: '#e5f4ef',
    istoriya: 'Самая маленькая в приюте и самая смелая: первой выходит знакомиться к гостям.' },
  { id: 4, imya: 'Ириска', vin: 'Ириску', tvor: 'Ириской', mes: 5, pol: 'zh', harakter: 'spokojnyj', deti: false, sobaki: false, sherst: '#fff8f0', glaza: '#8bbf5a', okras: 'трёхцветная',
    pyatna: [[60, 80, 30, '#f2a65a'], [150, 120, 34, '#2f2a2e'], [128, 70, 18, '#f2a65a']],
    istoriya: 'Пугается громких звуков, поэтому ей нужен тихий дом без маленьких детей. С теми, кому доверяет, очень ласковая.' },
  { id: 5, imya: 'Снежок', vin: 'Снежка', tvor: 'Снежком', mes: 7, pol: 'm', harakter: 'spokojnyj', deti: true, sobaki: true, sherst: '#fbf7f2', glaza: '#7cb8e8', okras: 'белый', fon: '#e7eefa',
    istoriya: 'Уже стерилизован и привык к переноске, легко ездит к ветеринару. Терпеливо относится к детям.' },
  { id: 6, imya: 'Тигра', vin: 'Тигру', tvor: 'Тигрой', mes: 6, pol: 'zh', harakter: 'igrivyj', deti: true, sobaki: true, sherst: '#a8896c', polosy: '#6e5340', glaza: '#c9a227', okras: 'полосатая',
    istoriya: 'Энергии на троих: носится по комнате, а потом спит, раскинув лапы. Подойдёт активной семье.' },
  { id: 7, imya: 'Бублик', vin: 'Бублика', tvor: 'Бубликом', mes: 3, pol: 'm', harakter: 'igrivyj', deti: true, sobaki: false, sherst: '#f7f1ea', glaza: '#e8b23a', okras: 'рыжий с белым',
    pyatna: [[52, 86, 34, '#f2a65a'], [140, 70, 26, '#f2a65a']],
    istoriya: 'Мурчит, как только берёшь на руки. Ест всё, что дают, поэтому его прозвали Бубликом.' },
  { id: 8, imya: 'Булочка', vin: 'Булочку', tvor: 'Булочкой', mes: 9, pol: 'zh', harakter: 'spokojnyj', deti: true, sobaki: true, sherst: '#f3d9b1', polosy: '#e0b47e', glaza: '#8bbf5a', okras: 'кремовая', fon: '#fff1dd',
    istoriya: 'Самая взрослая и самая спокойная. Стерилизована, умеет пользоваться когтеточкой и не трогает шторы.' },
  { id: 9, imya: 'Дымок', vin: 'Дымка', tvor: 'Дымком', mes: 4, pol: 'm', harakter: 'spokojnyj', deti: false, sobaki: true, sherst: '#6f6a73', glaza: '#e8b23a', okras: 'дымчатый', fon: '#ece7f3',
    istoriya: 'Не любит, когда его тискают, но сам приходит погреться рядом. Подойдёт взрослым.' },
];

const $ = (s) => document.querySelector(s);
const vozrastTekst = (m) => `${m} ${m === 1 ? 'месяц' : m < 5 ? 'месяца' : 'месяцев'}`;
const vozrastGruppa = (m) => (m < 3 ? 'malysh' : m <= 6 ? 'podrostok' : 'vzroslyj');
const kotyat = (n) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'котёнок' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'котёнка' : 'котят'}`;

function metki(k) {
  return [k.pol === 'm' ? 'мальчик' : 'девочка', k.harakter === 'igrivyj' ? 'игривый' : 'спокойный',
    k.deti ? 'ладит с детьми' : null, k.sobaki ? 'ладит с собаками' : null].filter(Boolean);
}

// ---------- карточки и фильтры ----------
function filtr() {
  const f = new FormData($('#filtry'));
  return KOTYATA.filter((k) => (!f.get('vozrast') || vozrastGruppa(k.mes) === f.get('vozrast'))
    && (!f.get('pol') || k.pol === f.get('pol'))
    && (!f.get('harakter') || k.harakter === f.get('harakter'))
    && (!f.get('deti') || k.deti) && (!f.get('sobaki') || k.sobaki));
}

function narisovat() {
  const spisok = filtr();
  const izmenen = spisok.length !== KOTYATA.length;
  $('#itog').innerHTML = `${spisok.length % 10 === 1 && spisok.length % 100 !== 11 ? 'Подходит' : 'Подходят'} ${kotyat(spisok.length)} из ${KOTYATA.length}${izmenen ? ' <button type="button" id="sbros">Сбросить фильтры</button>' : ''}`;
  $('#kartochki').innerHTML = spisok.length ? spisok.map((k) => `
    <li class="kot">
      ${kotSvg(k)}
      <h3>${k.imya}</h3>
      <p class="kot__info">${vozrastTekst(k.mes)} · ${k.okras}</p>
      <ul class="metki">${metki(k).map((m) => `<li>${m}</li>`).join('')}</ul>
      <button class="knopka" type="button" data-kot="${k.id}">Познакомиться</button>
    </li>`).join('')
    : '<li class="pusto">Сейчас нет котят с такими условиями. Попробуй убрать один из фильтров: возраст или характер часто не так важны, как кажется.</li>';
}

$('#filtry').addEventListener('change', narisovat);
$('#itog').addEventListener('click', (e) => {
  if (e.target.id !== 'sbros') return;
  $('#filtry').reset();
  narisovat();
  $('#filtry input').focus();
});

// ---------- окно котёнка ----------
const okno = $('#okno');
let vybran = null;

function pokazatKota(k) {
  vybran = k;
  const zdorove = [`Привит по возрасту`, `Обработан от паразитов`, k.mes > 6 ? 'Стерилизован' : 'Стерилизация в 6-8 месяцев, поможем с клиникой', 'Приучен к лотку'];
  $('#okno-telo').innerHTML = `<div class="okno__telo">
    ${kotSvg({ ...k, id: `o${k.id}` })}
    <div>
      <h2 id="okno-imya">${k.imya}</h2>
      <p class="kot__info">${vozrastTekst(k.mes)} · ${k.okras}</p>
      <ul class="metki">${metki(k).map((m) => `<li>${m}</li>`).join('')}</ul>
      <p>${k.istoriya}</p>
      <ul class="spisok">${zdorove.map((z) => `<li>${z}</li>`).join('')}</ul>
      <button class="knopka" type="button" id="hochu">Хочу взять ${k.vin}</button>
    </div></div>`;
  if (!okno.open) okno.showModal();
}

function pokazatFormu() {
  $('#okno-telo').innerHTML = `<form class="forma" id="zayavka" novalidate>
    <h2 id="okno-imya">Заявка на знакомство с ${vybran.tvor}</h2>
    <p class="podskazka">Куратор позвонит в течение дня и договорится о встрече.</p>
    <label class="pole"><span>Как тебя зовут</span><input name="imya" autocomplete="given-name" aria-describedby="o-imya"><span class="oshibka" id="o-imya"></span></label>
    <label class="pole"><span>Телефон</span><input name="telefon" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 900 000-00-00" aria-describedby="o-telefon"><span class="oshibka" id="o-telefon"></span></label>
    <label class="pole"><span>Где будет жить котёнок</span>
      <select name="gorod" aria-describedby="o-gorod"><option value="">Выбери</option><option>Москва</option><option>Московская область</option><option value="drugoj">Другой город</option></select>
      <span class="oshibka" id="o-gorod"></span></label>
    <label class="pole"><span>Почему хочешь взять котёнка <span class="podskazka">(необязательно)</span></span>
      <textarea name="pochemu" rows="3" maxlength="500" aria-describedby="o-pochemu"></textarea><span class="podskazka" id="o-pochemu">0 из 500 знаков</span></label>
    <label class="soglasie"><input type="checkbox" name="soglasie" aria-describedby="o-soglasie"><span>Даю согласие на обработку данных, чтобы куратор связался по заявке. <span class="oshibka" id="o-soglasie"></span></span></label>
    <button class="knopka" type="submit">Отправить заявку</button>
  </form>`;
  $('#zayavka input').focus();
}

// Телефон: только российский мобильный, 11 цифр, начинается с 7 или 8 и затем 9
function proveritTelefon(t) {
  const cifry = t.replace(/\D/g, '');
  if (!cifry) return 'Укажи телефон, чтобы куратор мог позвонить';
  if (cifry.length !== 11 || !/^[78]9/.test(cifry)) return 'Нужен мобильный номер из 11 цифр, например +7 900 123-45-67';
  return '';
}

function proverit(forma) {
  const d = Object.fromEntries(new FormData(forma));
  const oshibki = {
    imya: d.imya.trim().length < 2 ? 'Напиши имя, хотя бы 2 буквы' : /[0-9]/.test(d.imya) ? 'В имени не должно быть цифр' : '',
    telefon: proveritTelefon(d.telefon),
    gorod: !d.gorod ? 'Выбери, где будет жить котёнок' : d.gorod === 'drugoj' ? 'Пока отдаём котят только в Москву и область' : '',
    soglasie: d.soglasie ? '' : 'Без согласия мы не сможем позвонить',
  };
  for (const [pole, tekst] of Object.entries(oshibki)) {
    const vvod = forma.elements[pole];
    $(`#o-${pole}`).textContent = tekst;
    vvod.setAttribute('aria-invalid', tekst ? 'true' : 'false');
  }
  const pervaya = Object.keys(oshibki).find((p) => oshibki[p]);
  if (pervaya) forma.elements[pervaya].focus();
  return !pervaya;
}

okno.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!proverit(e.target)) return;
  $('#okno-telo').innerHTML = `<div class="gotovo">${kotSvg({ ...vybran, id: `d${vybran.id}` })}<h2 id="okno-imya">Заявка принята</h2>
    <p>${vybran.imya} ждёт знакомства. Куратор позвонит в течение дня.</p>
    <p class="podskazka">Это учебный проект: заявка никуда не отправлена.</p>
    <button class="knopka" type="button" id="zakryt2">Посмотреть других котят</button></div>`;
});
okno.addEventListener('input', (e) => {
  if (e.target.name === 'pochemu') $('#o-pochemu').textContent = `${e.target.value.length} из 500 знаков`;
});
okno.addEventListener('click', (e) => {
  if (e.target.id === 'hochu') pokazatFormu();
  if (e.target.id === 'zakryt2' || e.target === okno) okno.close();
});
$('#zakryt').addEventListener('click', () => okno.close());
let otkudaFokus = null;
$('#kartochki').addEventListener('click', (e) => {
  const b = e.target.closest('[data-kot]');
  if (!b) return;
  otkudaFokus = b;
  pokazatKota(KOTYATA.find((k) => k.id === Number(b.dataset.kot)));
});
okno.addEventListener('close', () => otkudaFokus && otkudaFokus.focus());

// ---------- первый экран: три котёнка ----------
$('#geroj-koty').innerHTML = [KOTYATA[0], KOTYATA[2], KOTYATA[5], KOTYATA[1]].map((k) => kotSvg({ ...k, id: `g${k.id}` })).join('');
$('#vsego-kotyat').textContent = KOTYATA.length;
narisovat();
