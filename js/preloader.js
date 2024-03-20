// eslint-disable-next-line import/prefer-default-export
export function makePreloader() {
  const wrapper = document.createElement('div');
  const container = document.createElement('div');
  const starLetter = document.createElement('img');
  const warsLetter = document.createElement('img');
  const lineText = document.createElement('h2');
  const copyRight = document.createElement('p');
  const copyRightLink = document.createElement('a');
  const copyRightText = document.createElement('span');

  wrapper.classList.add('preloader');
  container.classList.add('preloader__container');
  starLetter.classList.add('preloader__star');
  warsLetter.classList.add('preloader__wars');
  lineText.classList.add('preloader__text');
  lineText.id = 'lineText';
  lineText.textContent = 'The Force Awakens';
  copyRight.classList.add('copyright');
  copyRightLink.classList.add('copyrigth__link');
  copyRightText.classList.add('copyright__text');

  starLetter.src = '../image/star.svg';
  starLetter.alt = 'star';
  warsLetter.src = '../image/wars.svg';
  warsLetter.alt = 'wars';
  copyRightLink.href = 'https://cssanimation.rocks/starwars/';
  copyRightLink.textContent = 'Cssanimation.rocks';
  copyRightText.textContent = 'Animation by --> ';

  copyRight.append(copyRightText, copyRightLink);
  container.append(starLetter, warsLetter, lineText);
  wrapper.append(container, copyRight);

  const bylineText = lineText.innerHTML; // Get the content of the H2
  const bylineArr = bylineText.split(''); // Split content into array
  lineText.innerHTML = ''; // Empty current content

  let span; // Create variables to create elements
  let letter;

  for (let i = 0; i < bylineArr.length; i++) {
    // Loop for every letter
    span = document.createElement('span'); // Create a <span> element
    letter = document.createTextNode(bylineArr[i]); // Create the letter
    if (bylineArr[i] === ' ') {
      // If the letter is a space...
      lineText.appendChild(letter); // ...Add the space without a span
    } else {
      span.appendChild(letter); // Add the letter to the span
      lineText.appendChild(span); // Add the span to the h2
    }
  }
document.body.append(wrapper);
}

export function deletePreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) {
    return;
  }

  preloader.classList.add('hide');
  setTimeout(() => {
    preloader.remove();
  }, 2000);
}
