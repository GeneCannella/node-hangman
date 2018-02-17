//console.log("Word constructor loaded");

var words = require("./wordList.js"); //line line not right, stopped typing mid way
//console.log(words);
//console.log(wordsObject.words[3]);

var Letter = require("./letter.js");
//var letter = new Letter("x");
//console.log(letter.letter);

/*The Word  constructor will have:

1. a property for the random secret word
2. a property to hold an array of letter objects, one letter object per character in the random secret word
3. a method to walk the array of letter objects, obtaining the hidden or visible character from each and logging to the console as a string
4. a method to walk the array of letter objects, checking to see if the guessed letter matches any hidden letters
4.a. that same method checks to see if all letters are guessed (visible) and returns a boolean indicating word is guessed 

*/

function Word(wordArray) {
    //choose a random word from a lexicon of possible words
    this.word = wordArray[Math.floor(Math.random() * wordArray.length)];

    //keep a property that indicates if the entire word has been guessed (all letters visible) 
    //this.isGuessed = false;

    //walk the length of the random word one character at a time
    //create a letter object for each character and push each object onto an array (this.lettersArray)    
    this.lettersArray = [];
    for (var i = 0; i < this.word.length; i++) {
        var tempLetter = this.word.charAt(i);
        var letterObj = new Letter(tempLetter);
        this.lettersArray.push(letterObj);
    }

    //walk the length of the lettersArray obtaining the hidden or visible character from each, log to console
    this.logWord = function() {
        var tempString = "";
        for (var i = 0; i < this.lettersArray.length; i++) {
            tempString += (this.lettersArray[i].getDisplayedChar() + " ");
        }
        console.log(tempString);
    }

    //walk the array of letter objects, checking to see if the guessed letter matches any hidden letters
    this.testPlayerGuess = function(guessedLetter) {
        for (var i = 0; i < this.lettersArray.length; i++) {
            //if guessedLetter matches the hidden character, make the hidden character visible
            if (guessedLetter === this.lettersArray[i].getHiddenChar()) {
                this.lettersArray[i].setVisible();
            }
        }
    }

    //walk the array of letter objects, checking to see if all letters have been guessed
    this.isGuessed = function(){
        for (var i = 0; i < this.lettersArray.length; i++) {
            //if any letter is still hidden, then terminate loop and return false
            if (this.lettersArray[i].hidden) {
                return false;
            }
        }
        return true;
    }
}

    module.exports = Word;

