window.addEventListener("load", init);

//Global variables
const words: string[] = ["jamstack", "paper", "macbookpro", "wuppo"];
let word: string;
let lettersOfWord: string[];
let guessedLettersOfWord: string[] = [];
const lettersInDOM: HTMLDivElement = document.querySelector("#letters");
const attemptInDOM: HTMLDivElement = document.querySelector("#attempt");

/**
 * Function to initialize the programme
 */
function init() {
  //write the alphabet keyboard to the DOM
  writeAlphabetToTheDom();
  //choose a word
  setWord(words[randomNumber(0, words.length)]);
  console.log(word);
  //transform the word into an array of strings (letters)
  splitWordInCharacters();
  //some debugging
  writeGuessedWordToTheDOM();
}

/**
 * Function to split a word in Characters and replace it with dashes.
 */
function splitWordInCharacters() {
  lettersOfWord = word.split("");
  //push - to another array where the guessed letters are stored, begin with dashes
  for (let i = 0; i < word.length; i++) {
    guessedLettersOfWord.push("-");
  }
}

/**
 * Function to handle the click event
 * @param e {event} - click event
 */
function guessLetter(e: Event) {
  //the target element where the user clicked
  const target: HTMLElement = e.target as HTMLElement;
  //the letter where the user clicked on
  let letter: string = target.id;
  console.log(letter);
  // check to see if the letter (and not some other element) is clicked on
  writeGuessedWordToTheDOM();
}

/**
 * Function to add a clicked letter to the GuessedWord array
 * @param indexArray
 * @param letter
 */
function addLetterToGuessedWord(indexArray: number[], letter: string) {
  indexArray.forEach(function (element) {
    guessedLettersOfWord[element] = letter;
  });
}

/**
 * Function to set a new word
 * @param {string} newWord - a newly chosen word
 */
function setWord(newWord: string) {
  word = newWord;
}

/**
 * Function to write the ghuessed letters to the DOM
 */
function writeGuessedWordToTheDOM() {
  lettersInDOM.innerHTML = "";
  guessedLettersOfWord.forEach((letter) => {
    console.log(letter);
    let li = document.createElement("li");
    li.innerText = letter;
    lettersInDOM.append(li);
  });
}
/**
 * Function to write the alphabet keyboard to the DOM
 */
function writeAlphabetToTheDom() {
  const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  const keyboard: HTMLDivElement = document.querySelector("#keyboard");
  keyboard.addEventListener("click", guessLetter);
  alphabet.forEach(function (element, index) {
    let divKey: HTMLDivElement = document.createElement("div");
    divKey.id = element;
    divKey.classList.add("key");
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
