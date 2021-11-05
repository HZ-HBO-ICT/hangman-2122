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
}

/**
 * Function to write the guessed letters to the DOM
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
