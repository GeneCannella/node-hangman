/*
The completed game should meet the following criteria:

The completed game should be able to receive user input using the inquirer or prompt npm packages.

Feel free to use as many different types of constructor functions as you are able to, 
but at a minimum, you must create the following constructor functions:

Word: Used to create an object representing the current word the user is attempting to guess. 
This should contain word specific logic and data.

Letter: Used for each letter in the current word. Each letter object should either display an underlying character, 
or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. 
This should contain letter specific logic and data.

You must keep track of the user's remaining guesses and prompt the user if they would like to end the game if none remain.

Each constructor function should be in it's own file and be exported and required wherever needed.

Look into function prototypes and use them for a few of your constructor's methods.
*/


//Approach will be:
//Call a startGame function that sets gameOver False
//and chooses the word to be guessed
//then it calls a takeTurn function that runs once for each letter
//guessed. after each guess it will call the isGameOver function
//and if game id not over, takeTurn will call itself recursively
//isGameOver will exit the process if game is over

var inquirer = require("inquirer");

var lexicon = require("./wordList.js");

var Word = require("./word.js");

var Letter = require("./letter.js");

function playAgainQuery() {

    inquirer.prompt([{
        type: 'list',
        name: 'playAgain',
        message: "Do you want to play again?",
        choices: [
            'PLAY AGAIN',
            'EXIT GAME',
        ]
    }]).then(function(answer) {

        if (answer.playAgain == 'PLAY AGAIN') {
            console.log("");
            console.log("You decided to play again, so...");
            //console.log("");
            turnCount = 0;
            takeTurn();
        } else {
          console.log("");
            console.log("You decided to exit the game");
        }
    });
}

// This function holds the turn logic
function takeTurn(wordObj) {
    if (turnCount === 0) {
        var secretWordObj = new Word(lexicon);
        console.log("");
        console.log("LET'S PLAY HANGMAN!");
        console.log("Here is your word to guess.  It has " + secretWordObj.word.length + " letters.");
        console.log("You will be given 16 turns to try and guess the word.");
        console.log("");
        secretWordObj.logWord();
        console.log("");
    } else {
        var secretWordObj = wordObj;
    }

    //console.log("about to prompt for letter");
    //console.log(secretWordObj);
    inquirer.prompt([{
        type: 'input',
        name: 'guessedLetter',
        message: "Guess a letter!"
    }]).then(function(guess) {
        secretWordObj.testPlayerGuess(guess.guessedLetter);
        secretWordObj.logWord();
        console.log("");
        if (secretWordObj.isGuessed()) {

            console.log("You Win!");
            console.log("");
            //offer chance to play again
            //uses inquire
            playAgainQuery();

        } else { //they have not won yet, see if they have another turn

            turnCount++;
            if (turnCount < 16) {
                takeTurn(secretWordObj);
            } else {
                console.log("I'm sorry, you're out of turns.");
                console.log("");
                //offer chance to play again
                //uses inquire
                playAgainQuery();

            } //closes the "I'm sorry" else
        } //closes the isGuessed else
    }); //close the then function
} //closes the takeTurn function



var turnCount = 0;

takeTurn();









//takeTurn();
//isGameOver();
//startGame();



/*
    [
    {
      type: "list",
      name: "userGuess",
      message: "Try to stay alive! Guess a number between [1-5]",
      choices: ["1", "2", "3", "4", "5"]
    }

  ]).then(function(guess) {

    // If the user is still alive or the zombie is still alive
    if (userHealth > 0 || zombieHealth > 0) {

      // Assign a random damage value for the round.
      var damage = Math.floor(Math.random() * 5) + 1;

      // The zombie should choose a random number.
      var zombieNum = Math.floor((Math.random() * 5)) + 1;
      console.log("");
      console.log("");
      console.log("Zombie rolled " + zombieNum);

      // If the user's guess matches the number then...
      if (zombieNum === parseInt(guess.userGuess)) {

        // Subtract the damage amount from the zombie's health.
        zombieHealth -= damage;
        console.log("YOU HIT THE ZOMBIE WITH " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();
      }

      else {
        // Subtract the damage amount from the user's health.
        userHealth -= damage;
        console.log("OH NO! The zombie slashed you with " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();

      }
    }
  });
}

*/