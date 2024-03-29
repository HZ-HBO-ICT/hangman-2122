// Global variables
const words: string[] = ['jamstack', 'paper', 'macbookpro', 'wuppo'];
let word: string;
let charactersInWord: string[];
const guessedcharactersInWord: string[] = [];
const lettersInDOM: HTMLDivElement = document.querySelector('#letters');
const attemptInDOM: HTMLDivElement = document.querySelector('#attempt');
let attempts = 5;

/**
 * Function to split a word in Characters and replace it with dashes.
 */
function splitWordInCharacters() {
  charactersInWord = word.split('');
  // push - to another array where the guessed letters are stored, begin with dashes
  for (let i = 0; i < word.length; i += 1) {
    guessedcharactersInWord.push('-');
  }
}

/**
 * Function to add a clicked letter to the GuessedWord array
 * @param indexArray
 * @param letter
 */
function addLetterToGuessedWord(indexArray: number[], letter: string) {
  indexArray.forEach((charIndex) => {
    guessedcharactersInWord[charIndex] = letter;
  });
}

/**
 * Function to write the attempts to the DOM
 */
function writeAttemptToTheDOM() {
  attemptInDOM.innerHTML = String(attempts);
}

/**
 *
 * @param {string} clickedLetter - the letter that the user clicked
 * @returns {number[]} - the index in the array of the clicked letter
 */
function findLetters(clickedLetter: string): number[] {
  // on what index is the letter
  const indexOfLetters: number[] = [];
  charactersInWord.forEach((letterInArray: string, index: number) => {
    if (clickedLetter === letterInArray) {
      indexOfLetters.push(index);
    }
  });
  return indexOfLetters;
}
/**
 * Function to set a new word
 * @param {string} newWord - a newly chosen word
 */
function setWord(newWord: string) {
  word = newWord;
}

/**
 * Function to check if the users guessed the word right
 */
function checkWinner() {
  console.log(`${word} is ${guessedcharactersInWord.join('')}`);
  if (word === guessedcharactersInWord.join('')) {
    lettersInDOM.classList.add('winner');
  } else if (attempts === 0) {
    lettersInDOM.classList.add('lost');
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      key.classList.add('idle');
    });
  }
}

/**
 * Function to write the ghuessed letters to the DOM
 */
function writeGuessedWordToTheDOM() {
  lettersInDOM.innerHTML = '';
  guessedcharactersInWord.forEach((letter) => {
    console.log(letter);
    const li = document.createElement('li');
    li.innerText = letter;
    lettersInDOM.append(li);
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
  // let letter: string = target.id;
  // console.log(target.className);
  // check to see if the letter (and not some other element) is clicked on
  if (target.className === 'key') {
    console.log(target.id);
    // find the indexes of all the occurences of the letter(s) in the string array (word)
    const indexes: number[] = findLetters(target.id);
    console.log(indexes);
    // if the letter is found in the word
    if (indexes.length !== 0) {
      console.log('found');
      // add the letter to the guessed word
      addLetterToGuessedWord(indexes, target.id);
      // make the chosen letter idle, you can not click on it any more
      document.getElementById(target.id).classList.add('idle');
    } else {
      console.log('not found');
      attempts -= 1;
      writeAttemptToTheDOM();
    }
    // check if there is a winner
    checkWinner();
    // write the guessed letters to the DOM
    writeGuessedWordToTheDOM();
  }
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
  // transform the word into an array of strings (letters)
  splitWordInCharacters();
  // some debugging
  console.log(word);
  console.log(guessedcharactersInWord);
  // write the amount of attempts to the DOM
  writeAttemptToTheDOM();
  // write the letters in the guessed word array to the DOM
  writeGuessedWordToTheDOM();
}

window.addEventListener('load', init);
