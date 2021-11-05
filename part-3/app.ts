class Game {
  
  //class properties declared
  private words: string[];
  private word: string;
  private lettersOfWord: string[];
  private guessedLettersOfWord: string[];
  private lettersInDOM: HTMLDivElement;
  private attemptInDOM: HTMLDivElement; 
  private attempts: number;

  //Constructor to construct the Game class
  constructor() {
    //class properties initialized
    this.words = ["jamstack", "paper", "macbookpro", "wuppo"];
    this.guessedLettersOfWord = [];
    this.lettersInDOM = document.querySelector("#letters");
    this.attemptInDOM = document.querySelector("#attempt");
    this.attempts = 5;
    //write the alphabet keyboard to the DOM
    this.writeAlphabetToTheDom();
    //choose a word
    this.setWord(this.words[this.randomNumber(0, this.words.length-1)]);
    console.log(this.word);
    //transform the word into an array of strings (letters)
    this.splitWordInCharacters();
    //some debugging
    console.log(this.word);
    console.log(this.guessedLettersOfWord);
    //write the amount of attempts to the DOM
    this.writeAttemptToTheDOM();
    //write the letters in the guessed word array to the DOM
    this.writeGuessedWordToTheDOM();
  }

  /**
   * Function to split a word in Characters and replace it with dashes.
   */
  private splitWordInCharacters() {
    this.lettersOfWord = this.word.split("");
    //push - to another array where the guessed letters are stored, begin with dashes
    for (let i = 0; i < this.word.length; i++) {
      this.guessedLettersOfWord.push("-");
    }
  }

  /**
   *
   * @param {string} clickedLetter - the letter that the user clicked
   * @returns {number[]} - the index in the array of the clicked letter
   */
  private findLetters(clickedLetter: string): number[] {
    //on what index is the letter
    let indexOfLetters: number[] = [];
    this.lettersOfWord.forEach(function (letterInArray: string, index: number) {
      if (clickedLetter === letterInArray) {
        indexOfLetters.push(index);
      }
    });
    return indexOfLetters;
  }

  /**
   * Function to handle the click event.
   * Must be an arrow function, so that THIS stays into scope and points to the class
   * @param e {event} - click event
   */
  private guessLetter = (e: Event) => {
    //the target element where the user clicked
    const target: HTMLElement = e.target as HTMLElement;
    //the letter where the user clicked on
    let letter: string = target.id;
    //console.log(target.className);
    // check to see if the letter (and not some other element) is clicked on
    if (target.className == "key") {
      console.log(target.id);
      //find the indexes of all the occurences of the letter(s) in the string array (word)
      let indexes: number[] = this.findLetters(target.id);
      console.log("indexes", indexes);
      //if the letter is found in the word
      if (indexes.length != 0) {
        console.log("found");
        //add the letter to the guessed word
        this.addLetterToGuessedWord(indexes, target.id);
        //make the chosen letter idle, you can not click on it any more
        document.getElementById(target.id).classList.add("idle");
      } else {
        console.log("not found");
        this.attempts -= 1;
        this.writeAttemptToTheDOM();
      }
      //check if there is a winner
      this.checkWinner();
      //write the guessed letters to the DOM
      this.writeGuessedWordToTheDOM();
    }
  }

  /**
   * Function to add a clicked letter to the GuessedWord array
   * @param indexArray
   * @param letter
   */
  private addLetterToGuessedWord(indexArray: number[], letter: string) {
    indexArray.forEach((element) => {
      this.guessedLettersOfWord[element] = letter;
    });
  }

  /**
   * Function to write the attempts to the DOM
   */
  private writeAttemptToTheDOM() {
    this.attemptInDOM.innerHTML = String(this.attempts);
  }

  /**
   * Function to set a new word
   * @param {string} newWord - a newly chosen word
   */
  private setWord(newWord: string) {
    this.word = newWord;
  }

  /**
   * Function to check if the users guessed the word right
   */
  private checkWinner() {
    console.log(`${this.word} is ${this.guessedLettersOfWord.join("")}`);
    if (this.word == this.guessedLettersOfWord.join("")) {
      this.lettersInDOM.classList.add("winner");
    } else {
      if (this.attempts === 0) {
        this.lettersInDOM.classList.add("lost");
        let keys = document.querySelectorAll(".key");
        keys.forEach(function (key) {
          key.classList.add("idle");
        });
      }
    }
  }

  /**
   * Function to write the ghuessed letters to the DOM
   */
  private writeGuessedWordToTheDOM() {
    this.lettersInDOM.innerHTML = "";
    this.guessedLettersOfWord.forEach((letter) => {
      console.log(letter);
      let li = document.createElement("li");
      li.innerText = letter;
      this.lettersInDOM.append(li);
    });
  }

  /**
   * Function to write the alphabet keyboard to the DOM
   */
  private writeAlphabetToTheDom() {
    const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
    const keyboard: HTMLDivElement = document.querySelector("#keyboard");
    keyboard.addEventListener("click", this.guessLetter);
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
  private randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () => new Game();

window.addEventListener("load", init);
