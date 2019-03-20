# TriviaGame
A STEM Trivia Game. Click [HERE]( https://savycodr.github.io/trivia-game/) to play the game.

There are ten multiple choice questions in this trivia game.  The player has 15 seconds to answer each question.  The game keeps track of how many questions the player gets right, wrong, or unanswered. 

After each question has been answered or after the 15 seconds has expired without an answer, a new screen will appear for 5 seconds.  This screen will tell the player if their answer was correct.  If it was not correct the game will display the answer.  After 5 seconds the game displays the next question.  When all the questions have been presented the game displays the results.

## Instructions

* Press the start button to start the game.

* You will be presented with a question and four multiple choice answers. Select your answer by clicking on it. There is a countdown clock to show how much time is remaining to answer the question.

* The game will display a screen to show how you did. The screen will appear for 5 seconds and then return to another trivia question.
 
* The game continues until all of the questions have been answered.

* When the game is over you will have a chanc to restart.

## Technology

* This application uses JQuery to dynamically update the DOM. There are four displays that are shown at certain points in the game. The application listens for the player to select the Enter button then it displays the question screen. It listens for the user to click on an answer and it displays the answer screen. At the end of the game it displays the player's scores.

* The game uses setTimeout to display the answer screen for 5 seconds.

* The game is mobile responsive. It is fun to play on a tablet or phone.


## Future Enhancements

* Instead of harcoding the questions and multiple choice answers, I would like to make an API call to a trivia service. This will give the game new questions at every session.

## Credits
There is a credits page for audio and image files. It can be found at [credits](https://savycodr.github.io/trivia-game/credit.html).

