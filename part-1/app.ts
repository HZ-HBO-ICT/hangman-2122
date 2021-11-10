// Global variables
const words: string[] = ['jamstack', 'paper', 'macbookpro', 'wuppo'];
let word: string;
const guessedCharactersInWord: string[] = [];
const charactersInDOM: HTMLDivElement = document.querySelector('#letters');
const attemptInDOM: HTMLDivElement = document.querySelector('#attempt');
const attempts = 5;

/**
 * Add dashed to the guessedCharacters in word.
 */
function splitWordInCharacters() {
  for (let i = 0; i < word.length; i += 1) {
    guessedCharactersInWord.push('-');
  }
}

/**
 * Function to set a new word
 * @param {string} newWord - a newly chosen word
 */
function setWord(newWord: string) {
  word = newWord;
}

/**
 * Function to write the attempts to the DOM
 */
function writeAttemptToTheDOM() {
  attemptInDOM.innerHTML = String(attempts);
}

/**
 * Function to write the ghuessed letters to the DOM
 */
function writeGuessedWordToTheDOM() {
  charactersInDOM.innerHTML = '';
  guessedCharactersInWord.forEach((letter) => {
    console.log(letter);
    const li = document.createElement('li');
    li.innerText = letter;
    charactersInDOM.append(li);
  });
}

/**
 * Function to handle the click event
 * @param e {event} - click event
 */
function guessLetter(e: Event) {
  // the target element where the user clicked
  const target: HTMLElement = e.target as HTMLElement;
  // the letter where the user clicked on
  const letter: string = target.id;
  console.log(letter);
}

/**
 * Function to write the alphabet keyboard to the DOM
 */
function writeAlphabetToTheDom() {
  const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const keyboard: HTMLDivElement = document.querySelector('#keyboard');
  keyboard.addEventListener('click', guessLetter);
  alphabet.forEach((element) => {
    const divKey: HTMLDivElement = document.createElement('div');
    divKey.id = element;
    divKey.classList.add('key');
    divKey.innerHTML = element;
    keyboard.append(divKey);
  });
}

/**
 * Returns a random number between min and max
 * @param {number} min - lower boundary
 * @param {number} max - upper boundary
 */
function randomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Function to initialize the programme
 */
function init() {
  // write the alphabet keyboard to the DOM
  writeAlphabetToTheDom();
  // choose a word
  setWord(words[randomNumber(0, words.length)]);
  console.log(word);
  splitWordInCharacters();
  writeAttemptToTheDOM();
  writeGuessedWordToTheDOM();
}

window.addEventListener('load', init);
