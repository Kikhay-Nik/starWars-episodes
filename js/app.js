/* eslint-disable import/prefer-default-export */
/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
import { makePreloader, deletePreloader } from './preloader.js';

const appContainer = document.getElementById('app');
const cssPromises = {};
// Загрузка ресурсов
function loadResouce(src) {
  // загрузка модуля js
  if (src.endsWith('.js')) {
    return import(src);
  }
  // загрузка файла стилей
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // загрузка данных API
  return fetch(src).then((res) => res.json());
}
// отрисовка страницы
function renderPage(moduleName, apiUrl, cssUrl) {
  Promise.all([moduleName, apiUrl, cssUrl].map((src) => loadResouce(src))).then(
    ([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    }
  );
}
// функция запуска приложения
export function init() {
  makePreloader();
  // eslint-disable-next-line no-restricted-globals
  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get('filmId');
  if (filmId) {
    renderPage(
      '../js/film-details.js',
      `https://www.swapi.tech/api/films/${filmId}`,
      './styles/film-details.css'
    );
  } else {
    renderPage(
      '../js/film-list.js',
      'https://www.swapi.tech/api/films',
      './styles/film-list.css'
    );
  }
  setTimeout(() => {
    deletePreloader();
  }, 3000);
}

init();
// отслеживание изменения в истории
window.addEventListener('popstate', () => {
  init();
});
