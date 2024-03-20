/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/extensions
import { init } from './app.js';

export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container');
  // создание заголовка для страницы
  const mainTitle = document.createElement('h1');
  mainTitle.classList.add('main-title');
  mainTitle.textContent = 'May the force come with you';

  // создания списка для фильмов
  const filmList = document.createElement('ul');
  filmList.classList.add('film-list');

  for (const film of data.result) {
    const currentData = film.properties;
    const relizeYear = currentData.release_date.slice(0, 4);
    const filmItemEl = document.createElement('li');
    const filmItemLink = document.createElement('a');
    filmItemLink.classList.add('film-link');
    filmItemEl.classList.add('film-item');
    filmItemLink.href = `?filmId=${film.uid}`;
    filmItemLink.textContent = `${film.uid}. ${currentData.title} (${relizeYear})`;

    filmItemLink.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', e.target.href);
      init();
    });

    filmItemEl.append(filmItemLink);
    filmList.append(filmItemEl);
  }

  container.append(mainTitle, filmList);
  
  return container;
}
