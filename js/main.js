// Сайт-портфолио: немного интерактива. Без JavaScript всё содержимое тоже видно и работает.

// 1. Отмечаем, что скрипт работает: только тогда блоки прячутся до появления на экране
document.documentElement.classList.add('js');

// 2. Меню на телефоне: кнопка раскрывает и закрывает список разделов
const shapka = document.querySelector('.shapka');
const burger = document.querySelector('.shapka__burger');
if (shapka && burger) {
  burger.addEventListener('click', () => {
    const otkryto = shapka.classList.toggle('shapka--otkryto');
    burger.setAttribute('aria-expanded', String(otkryto));
    burger.setAttribute('aria-label', otkryto ? 'Закрыть меню' : 'Открыть меню');
  });
  // после выбора раздела меню закрывается
  shapka.querySelectorAll('.shapka__menu a').forEach((ssylka) => {
    ssylka.addEventListener('click', () => {
      shapka.classList.remove('shapka--otkryto');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    });
  });
  // Escape закрывает меню и возвращает фокус на кнопку
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shapka.classList.contains('shapka--otkryto')) {
      shapka.classList.remove('shapka--otkryto');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    }
  });
}

// 3. Блоки плавно появляются, когда до них доходит прокрутка
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
