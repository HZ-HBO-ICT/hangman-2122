class Game {
    words;
    word;
    lettersOfWord;
    guessedLettersOfWord;
    lettersInDOM;
    attemptInDOM;
    attempts;
    constructor() {
        this.words = ["jamstack", "paper", "macbookpro", "wuppo"];
        this.guessedLettersOfWord = [];
        this.lettersInDOM = document.querySelector("#letters");
        this.attemptInDOM = document.querySelector("#attempt");
        this.attempts = 5;
        this.writeAlphabetToTheDom();
        this.setWord(this.words[this.randomNumber(0, this.words.length - 1)]);
        console.log(this.word);
        this.splitWordInCharacters();
        console.log(this.word);
        console.log(this.guessedLettersOfWord);
        this.writeAttemptToTheDOM();
        this.writeGuessedWordToTheDOM();
    }
    splitWordInCharacters() {
        this.lettersOfWord = this.word.split("");
        for (let i = 0; i < this.word.length; i++) {
            this.guessedLettersOfWord.push("-");
        }
    }
    findLetters(clickedLetter) {
        let indexOfLetters = [];
        this.lettersOfWord.forEach(function (letterInArray, index) {
            if (clickedLetter === letterInArray) {
                indexOfLetters.push(index);
            }
        });
        return indexOfLetters;
    }
    guessLetter = (e) => {
        const target = e.target;
        let letter = target.id;
        if (target.className == "key") {
            console.log(target.id);
            let indexes = this.findLetters(target.id);
            console.log("indexes", indexes);
            if (indexes.length != 0) {
                console.log("found");
                this.addLetterToGuessedWord(indexes, target.id);
                document.getElementById(target.id).classList.add("idle");
            }
            else {
                console.log("not found");
                this.attempts -= 1;
                this.writeAttemptToTheDOM();
            }
            this.checkWinner();
            this.writeGuessedWordToTheDOM();
        }
    };
    addLetterToGuessedWord(indexArray, letter) {
        indexArray.forEach((element) => {
            this.guessedLettersOfWord[element] = letter;
        });
    }
    writeAttemptToTheDOM() {
        this.attemptInDOM.innerHTML = String(this.attempts);
    }
    setWord(newWord) {
        this.word = newWord;
    }
    checkWinner() {
        console.log(`${this.word} is ${this.guessedLettersOfWord.join("")}`);
        if (this.word == this.guessedLettersOfWord.join("")) {
            this.lettersInDOM.classList.add("winner");
        }
        else {
            if (this.attempts === 0) {
                this.lettersInDOM.classList.add("lost");
                let keys = document.querySelectorAll(".key");
                keys.forEach(function (key) {
                    key.classList.add("idle");
                });
            }
        }
    }
    writeGuessedWordToTheDOM() {
        this.lettersInDOM.innerHTML = "";
        this.guessedLettersOfWord.forEach((letter) => {
            console.log(letter);
            let li = document.createElement("li");
            li.innerText = letter;
            this.lettersInDOM.append(li);
        });
    }
    writeAlphabetToTheDom() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const keyboard = document.querySelector("#keyboard");
        keyboard.addEventListener("click", this.guessLetter);
        alphabet.forEach(function (element, index) {
            let divKey = document.createElement("div");
            divKey.id = element;
            divKey.classList.add("key");
            divKey.innerHTML = element;
            keyboard.append(divKey);
        });
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game();
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map