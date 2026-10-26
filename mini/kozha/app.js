// Слой: тест на тип кожи (по одному вопросу за раз) и проверка сочетаний компонентов.
// Результат теста сохраняется в браузере, чтобы при возвращении не проходить заново.

const VOPROSY = [
  { v: 'Как ощущается кожа через час после умывания, если ничем не мазать?', o: [
    ['Стянута, хочется нанести крем', { suhaya: 2 }], ['Блестят лоб и нос, щёки в порядке', { kombinirovannaya: 2 }],
    ['Блестит всё лицо', { zhirnaya: 2 }], ['Комфортно, ничего не чувствую', { normalnaya: 2 }]] },
  { v: 'Как выглядит лицо к середине дня?', o: [
    ['Местами шелушится', { suhaya: 1 }], ['Блестит Т-зона: лоб, нос, подбородок', { kombinirovannaya: 1 }],
    ['Блестит, хочется промокнуть салфеткой', { zhirnaya: 1 }], ['Почти как утром', { normalnaya: 1 }]] },
  { v: 'Насколько заметны поры?', o: [
    ['Почти не видны', { suhaya: 1, normalnaya: 1 }], ['Заметны на носу и лбу', { kombinirovannaya: 1 }], ['Заметны по всему лицу', { zhirnaya: 1 }]] },
  { v: 'Как часто бывают воспаления?', o: [
    ['Почти никогда', { normalnaya: 1, suhaya: 1 }], ['Иногда, в основном в Т-зоне', { kombinirovannaya: 1 }], ['Часто, по всему лицу', { zhirnaya: 1 }]] },
  { v: 'Бывает ли покраснение, жжение или зуд от новых средств?', o: [
    ['Часто', { chuvstvitelnaya: 2 }], ['Иногда', { chuvstvitelnaya: 1 }], ['Нет', {}]] },
];

const TIPY = {
  suhaya: { nazv: 'сухая', opis: 'Коже не хватает липидов, поэтому она быстро теряет воду: тянет после умывания, местами шелушится. Главное для неё мягкое очищение и плотный крем.',
    utro: ['Умывание тёплой водой или очень мягким средством', 'Сыворотка с гиалуроновой кислотой или глицерином на влажную кожу', 'Плотный крем с церамидами', 'SPF 30-50'],
    vecher: ['Мягкое очищение: молочко или крем для умывания', 'Сыворотка с гиалуроновой кислотой', 'Крем с церамидами или скваланом'],
    aktiv: 'Молочная кислота раз в неделю: она мягче гликолевой и вдобавок увлажняет.', izbegat: 'Спиртовые тоники, скрабы с крупными частицами, горячая вода.' },
  zhirnaya: { nazv: 'жирная', opis: 'Сальные железы работают активно: к середине дня лицо блестит, поры заметны. Ей тоже нужно увлажнение, только лёгкое.',
    utro: ['Гель для умывания', 'Сыворотка с ниацинамидом', 'Лёгкий крем-гель', 'SPF-флюид с матовым финишем'],
    vecher: ['Гель для умывания', 'Салициловая кислота по графику, в остальные дни ниацинамид', 'Лёгкий крем'],
    aktiv: 'Салициловая кислота (BHA) 2-3 раза в неделю: она растворяется в кожном сале и чистит поры.', izbegat: 'Пересушивать кожу: от агрессивного умывания жирности становится больше, а не меньше.' },
  kombinirovannaya: { nazv: 'комбинированная', opis: 'Т-зона жирнее, а щёки нормальные или суховатые. Средства можно наносить по зонам.',
    utro: ['Мягкий гель для умывания', 'Сыворотка с ниацинамидом', 'Лёгкий крем, на щёки чуть плотнее', 'SPF 30-50'],
    vecher: ['Мягкий гель для умывания', 'Салициловая кислота на Т-зону по графику', 'Крем, на сухие участки плотнее'],
    aktiv: 'Салициловая кислота (BHA) на Т-зону 2 раза в неделю.', izbegat: 'Один густой крем на всё лицо, если от него блестит Т-зона.' },
  normalnaya: { nazv: 'нормальная', opis: 'Кожа не тянет и не блестит, воспаления редкие. Задача ухода: сохранить это и защитить от солнца.',
    utro: ['Мягкое умывание', 'Увлажняющий крем', 'SPF 30-50'],
    vecher: ['Очищение', 'Увлажняющий крем'],
    aktiv: 'По желанию: ретинол 2 раза в неделю или кислоты, вводить постепенно.', izbegat: 'Покупать много активов сразу: если кожу всё устраивает, базового ухода достаточно.' },
};
const CHUVSTV = 'Кожа реагирует на новые средства. Вводи их по одному, раз в 1-2 недели, и сначала проверяй на небольшом участке. Выбирай составы без отдушек и спирта, а активы начинай с самой низкой концентрации.';
const KLYUCH = 'sloj.test';
const $ = (s) => document.querySelector(s);

// ---------- тест ----------
let otvety = [];
let rezultat = null;
try { rezultat = JSON.parse(localStorage.getItem(KLYUCH)); } catch (e) { rezultat = null; }

function posschitat() {
  const ball = { suhaya: 0, zhirnaya: 0, kombinirovannaya: 0, normalnaya: 0, chuvstvitelnaya: 0 };
  otvety.forEach((n, i) => Object.entries(VOPROSY[i].o[n][1]).forEach(([k, b]) => { ball[k] += b; }));
  // при равенстве баллов выигрывает тип, который раньше в списке: так спорный случай уходит в более бережный уход
  const tip = ['suhaya', 'kombinirovannaya', 'zhirnaya', 'normalnaya'].reduce((a, b) => (ball[b] > ball[a] ? b : a));
  return { tip, chuvstv: ball.chuvstvitelnaya > 0 };
}

function pokazatVopros(i, fokus = true) {
  const q = VOPROSY[i];
  $('#test-karta').innerHTML = `<form class="vopros" id="vopros" novalidate>
    <div class="vopros__shag"><span>Вопрос ${i + 1} из ${VOPROSY.length}</span><span class="vopros__polosa" aria-hidden="true"><span style="width:${(i / VOPROSY.length) * 100}%"></span></span></div>
    <fieldset aria-describedby="vopros-oshibka">
      <legend id="vopros-tekst" tabindex="-1">${q.v}</legend>
      ${q.o.map(([t], n) => `<label class="variant"><input type="radio" name="otvet" value="${n}" ${otvety[i] === n ? 'checked' : ''}><span>${t}</span></label>`).join('')}
    </fieldset>
    <p class="vopros__oshibka" id="vopros-oshibka" aria-live="polite"></p>
    <div class="vopros__knopki">
      <button class="knopka knopka--svetlaya" type="button" id="nazad" ${i === 0 ? 'disabled' : ''}>Назад</button>
      <button class="knopka" type="submit">${i === VOPROSY.length - 1 ? 'Узнать результат' : 'Дальше'}</button>
    </div></form>`;
  $('#vopros').dataset.nomer = i;
  if (fokus) $('#vopros-tekst').focus();
}

function pokazatRezultat(r, fokus = true) {
  const t = TIPY[r.tip];
  $('#test-karta').innerHTML = `<div class="itog">
    <p class="itog__nad">Твой результат</p>
    <h3 id="itog-zag" tabindex="-1">Скорее всего, у тебя ${t.nazv} кожа${r.chuvstv ? ', склонная к раздражению' : ''}</h3>
    <p>${t.opis}</p>
    ${r.chuvstv ? `<p class="itog__chuvstv"><b>Чувствительная кожа.</b> ${CHUVSTV}</p>` : ''}
    <div class="shema">
      <div class="shema__kolonka"><h4><span aria-hidden="true">☀</span> Утро</h4><ol>${t.utro.map((s) => `<li>${s}</li>`).join('')}</ol></div>
      <div class="shema__kolonka"><h4><span aria-hidden="true">☾</span> Вечер</h4><ol>${t.vecher.map((s) => `<li>${s}</li>`).join('')}</ol></div>
    </div>
    <p><b>Актив:</b> ${r.chuvstv ? 'пока лучше без кислот и ретинола. Начни с ниацинамида в низкой концентрации, а остальное подбери с дерматологом.' : t.aktiv}</p>
    <p><b>Чего избегать:</b> ${t.izbegat}</p>
    <p class="itog__pod">Тест ориентировочный: тип кожи меняется с сезоном, возрастом и гормонами. Точно скажет дерматолог.</p>
    <div class="vopros__knopki">
      <button class="knopka knopka--svetlaya" type="button" id="zanovo">Пройти заново</button>
      <a class="knopka" href="#sochetaniya">Проверить свои средства</a>
    </div></div>`;
  if (fokus) $('#itog-zag').focus();
}

$('#test-karta').addEventListener('submit', (e) => {
  e.preventDefault();
  const i = Number(e.target.dataset.nomer);
  const vybor = e.target.querySelector('input:checked');
  if (!vybor) {
    $('#vopros-oshibka').textContent = 'Выбери вариант, который ближе всего. Если сомневаешься, вспомни обычный будний день.';
    e.target.querySelector('input').focus();
    return;
  }
  otvety[i] = Number(vybor.value);
  if (i < VOPROSY.length - 1) return pokazatVopros(i + 1);
  rezultat = posschitat();
  try { localStorage.setItem(KLYUCH, JSON.stringify(rezultat)); } catch (err) { /* без хранилища результат живёт до перезагрузки */ }
  pokazatRezultat(rezultat);
});
$('#test-karta').addEventListener('change', () => { const o = $('#vopros-oshibka'); if (o) o.textContent = ''; });
$('#test-karta').addEventListener('click', (e) => {
  if (e.target.id === 'nazad') pokazatVopros(Number($('#vopros').dataset.nomer) - 1);
  if (e.target.id === 'zanovo') {
    otvety = []; rezultat = null;
    try { localStorage.removeItem(KLYUCH); } catch (err) { /* ничего */ }
    pokazatVopros(0);
  }
});

// ---------- сочетания ----------
const KOMP = [
  { id: 'retinol', nazv: 'Ретинол и ретиноиды', kor: 'ретинол', aktiv: true, solnce: true },
  { id: 'aha', nazv: 'AHA-кислоты: гликолевая, молочная', kor: 'AHA-кислоты', aktiv: true, solnce: true },
  { id: 'bha', nazv: 'BHA-кислота: салициловая', kor: 'BHA-кислота', aktiv: true, solnce: true },
  { id: 'vitc', nazv: 'Витамин C: аскорбиновая кислота', kor: 'витамин C', aktiv: true },
  { id: 'bp', nazv: 'Бензоилпероксид', kor: 'бензоилпероксид', aktiv: true },
  { id: 'niacin', nazv: 'Ниацинамид', kor: 'ниацинамид' },
  { id: 'gialuron', nazv: 'Гиалуроновая кислота', kor: 'гиалуроновая кислота' },
  { id: 'ceramidy', nazv: 'Церамиды', kor: 'церамиды' },
  { id: 'spf', nazv: 'SPF, солнцезащитный крем', kor: 'SPF' },
];
const PARY = {
  'aha+retinol': ['nelzya', 'Оба отшелушивают и вместе сильно раздражают кожу. Чередуй вечера: кислота в один, ретинол в другой.'],
  'bha+retinol': ['nelzya', 'Двойное раздражение. Чередуй вечера: кислота в один, ретинол в другой.'],
  'bp+retinol': ['nelzya', 'Бензоилпероксид может разрушать ретиноиды, и вместе они сильно сушат. Бензоилпероксид утром, ретинол вечером.'],
  'bp+vitc': ['nelzya', 'Бензоилпероксид окисляет витамин C, и тот перестаёт работать. Наноси их в разное время суток.'],
  'retinol+vitc': ['ostorozhno', 'Лучше развести по времени: витамин C утром, он помогает защищаться от солнца, а ретинол вечером.'],
  'aha+bha': ['ostorozhno', 'Вместе легко пересушить кожу. Чередуй дни или выбери готовое средство, где их уже смешали в безопасной концентрации.'],
  'aha+vitc': ['ostorozhno', 'Кислоты в одном слое раздражают. Витамин C утром, AHA вечером.'],
  'bha+vitc': ['ostorozhno', 'Витамин C утром, салициловая кислота вечером.'],
  'aha+bp': ['ostorozhno', 'Вместе сильно сушат. Лучше в разные дни.'],
  'bha+bp': ['ostorozhno', 'Вместе сильно сушат. Лучше в разные дни.'],
  'niacin+vitc': ['mozhno', 'Старый миф говорит, что они несовместимы, но современные средства спокойно наносятся вместе.'],
  'niacin+retinol': ['horosho', 'Ниацинамид смягчает раздражение от ретинола.'],
  'gialuron+retinol': ['horosho', 'Гиалуроновая кислота увлажняет и смягчает сухость от ретинола.'],
  'ceramidy+retinol': ['horosho', 'Церамиды восстанавливают защитный барьер, который ретинол может ослабить.'],
};
const STATUS = { nelzya: ['✕', 'Не вместе'], vazhno: ['!', 'Важно'], ostorozhno: ['!', 'Осторожно'], mozhno: ['✓', 'Можно'], horosho: ['✓', 'Хорошо вместе'] };
const PORYADOK = ['nelzya', 'vazhno', 'ostorozhno', 'horosho', 'mozhno'];
const imya = (id) => KOMP.find((k) => k.id === id).kor;
const sZaglavnoj = (t) => t[0].toUpperCase() + t.slice(1);
const perechislit = (spisok) => (spisok.length > 1 ? `${spisok.slice(0, -1).join(', ')} и ${spisok.at(-1)}` : spisok[0]);

$('#komponenty').insertAdjacentHTML('beforeend', KOMP.map((k) => `<label><input type="checkbox" value="${k.id}"><span>${k.nazv}</span></label>`).join(''));

function proveritSochetaniya() {
  const vybrano = [...document.querySelectorAll('#komponenty input:checked')].map((i) => i.value);
  const out = $('#sochetaniya-rezultat');
  if (vybrano.length < 2) {
    out.innerHTML = `<p class="rezultat__pusto">${vybrano.length ? 'Отметь ещё хотя бы один компонент.' : 'Отметь хотя бы два компонента.'}</p>`;
    return;
  }
  const stroki = [];
  for (let a = 0; a < vybrano.length; a++) {
    for (let b = a + 1; b < vybrano.length; b++) {
      const kl = [vybrano[a], vybrano[b]].sort().join('+');
      if (PARY[kl]) stroki.push([PARY[kl][0], sZaglavnoj(`${imya(vybrano[a])} и ${imya(vybrano[b])}`), PARY[kl][1]]);
    }
  }
  const solnce = vybrano.filter((id) => KOMP.find((k) => k.id === id).solnce);
  if (solnce.length) {
    stroki.push(vybrano.includes('spf')
      ? ['horosho', sZaglavnoj(`${solnce.map(imya).join(', ')} и SPF`), `${solnce.length > 1 ? 'Эти компоненты делают' : 'Этот компонент делает'} кожу чувствительнее к солнцу, поэтому SPF нужен каждое утро. Хорошо, что он есть.`]
      : ['vazhno', 'Не хватает SPF', `${sZaglavnoj(perechislit(solnce.map(imya)))} ${solnce.length > 1 ? 'делают' : 'делает'} кожу чувствительнее к солнцу. Без SPF утром можно получить пигментацию и ожог.`]);
  }
  stroki.sort((x, y) => PORYADOK.indexOf(x[0]) - PORYADOK.indexOf(y[0]));
  const aktivov = vybrano.filter((id) => KOMP.find((k) => k.id === id).aktiv).length;
  const plohih = stroki.filter(([s]) => ['nelzya', 'vazhno', 'ostorozhno'].includes(s)).length;
  const svodka = plohih ? `Есть что поправить: ${plohih} ${plohih === 1 ? 'пункт' : plohih < 5 ? 'пункта' : 'пунктов'}.` : 'Конфликтов нет, можно пользоваться.';
  out.innerHTML = `<p class="rezultat__svodka rezultat__svodka--${plohih ? 'est' : 'net'}">${svodka}</p>
    ${aktivov >= 3 ? '<p class="rezultat__sovet">Много активов сразу. Даже совместимые лучше вводить по одному, раз в 1-2 недели, чтобы понять, на что реагирует кожа.</p>' : ''}
    <ul class="rezultat__spisok">${stroki.map(([s, kto, pochemu]) => `<li class="para para--${s}">
      <span class="para__znak" aria-hidden="true">${STATUS[s][0]}</span>
      <div><p class="para__kto"><b>${STATUS[s][1]}:</b> ${kto}</p><p>${pochemu}</p></div></li>`).join('')}</ul>
    ${!stroki.length ? '<p>Эти компоненты спокойно сочетаются друг с другом.</p>' : ''}`;
}
$('#komponenty').addEventListener('change', proveritSochetaniya);

// ---------- старт ----------
if (rezultat && TIPY[rezultat.tip]) pokazatRezultat(rezultat, false);
else pokazatVopros(0, false);
proveritSochetaniya();
