/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/extensions
import { init } from './app.js';

function renderListItem(urlArray, wrapper) {
  const listEl = document.createElement('ul');
  listEl.classList.add('decription-list');
  urlArray.forEach((url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const listItem = document.createElement('li');
        listItem.classList.add('descriprion-item');
        listItem.textContent = data.result.properties.name;
        listEl.append(listItem);
      });
  });
  wrapper.append(listEl);
}

function transformNumToRomNum(number) {
  let obj = {
    1:'I',
    2:'II',
    3:'III',
    4:'IV',
    5:'V',
    6:'VI'
  }
  return obj[number];
}

export function render(data) {
  const currentData = data.result;
  const planetsList = currentData.properties.planets;
  const speciesList = currentData.properties.species;
  const starshipsList = currentData.properties.starships;
  const vehiclesList = currentData.properties.vehicles;

  const backBtn = document.createElement('button');
  const backBtnIcon = document.createElement('span');
  const backBtnText = document.createElement('span');
  backBtn.classList.add('back-btn');
  backBtnIcon.classList.add('back-btn__icon');
  backBtnText.classList.add('back-btn__text');
  backBtnIcon.insertAdjacentHTML(
    'afterbegin',
    `<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 9C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7V9ZM0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM21 7L1 7V9L21 9V7Z" fill="black"/>
  </svg>
  `
  );
  backBtnText.textContent = 'Back to episodes';
  backBtn.type = 'button';
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, '', 'index.html');
    init();
  });

  const container = document.createElement('div');
  const filmTitle = document.createElement('h1');
  const episodeTitle = document.createElement('h2');
  const filmDescriptionBlock = document.createElement('div');
  const filmDescription = document.createElement('p');
  const planetsBlock = document.createElement('div');
  const planetsTitle = document.createElement('h3');
  const speciesBlock = document.createElement('div');
  const speciesTitle = document.createElement('h3');
  const starshipsBlock = document.createElement('div');
  const starshipsTitle = document.createElement('h3');
  const vehiclesBlock = document.createElement('div');
  const vehiclesTitle = document.createElement('h3');

  container.classList.add('container');
  filmTitle.classList.add('main-title', 'film-title');
  episodeTitle.classList.add('episode-title');
  filmDescriptionBlock.classList.add('description-wrapper');
  filmDescription.classList.add('film-description');
  planetsBlock.classList.add('description-wrapper');
  speciesBlock.classList.add('description-wrapper');
  starshipsBlock.classList.add('description-wrapper');
  vehiclesBlock.classList.add('description-wrapper');
  planetsTitle.classList.add('second-title');
  speciesTitle.classList.add('second-title');
  starshipsTitle.classList.add('second-title');
  vehiclesTitle.classList.add('second-title');

  filmTitle.textContent = ` ${currentData.properties.title}`;
  episodeTitle.textContent = `Episode ${transformNumToRomNum(
    currentData.properties.episode_id
  )}`;
  filmDescription.innerHTML = `${currentData.properties.opening_crawl}`;
  planetsTitle.textContent = 'Planets';
  speciesTitle.textContent = 'Species';
  starshipsTitle.textContent = 'Starships';
  vehiclesTitle.textContent = 'Vehicles';

  backBtn.append(backBtnIcon, backBtnText);

  planetsBlock.append(planetsTitle);
  speciesBlock.append(speciesTitle);
  starshipsBlock.append(starshipsTitle);
  vehiclesBlock.append(vehiclesTitle);

  renderListItem(planetsList, planetsBlock);
  renderListItem(speciesList, speciesBlock);
  renderListItem(starshipsList, starshipsBlock);
  renderListItem(vehiclesList, vehiclesBlock);

  container.append(backBtn, filmTitle, episodeTitle, filmDescriptionBlock);
  filmDescriptionBlock.append(filmDescription, planetsBlock, speciesBlock, starshipsBlock, vehiclesBlock);

  return container;
}
