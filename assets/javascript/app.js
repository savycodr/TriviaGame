$(document).ready(function() 
{
  // hide the challenges until the start button is selected
  $("#secondScreen").hide();
  // hide the answer screen until user clicks an answer
  $("#thirdScreen").hide();


  // tells us if clock is running
  var clockRunning = false;
  // clock counts down from 30
  var time=15;
  //  Variable that will hold our setInterval that runs the clock
  var intervalId;

  // number of correct answers
  var numCorrect = 0;
  // number of incorrect answers
  var numWrong = 0;
  // number of times ran out of time
  var numTimeOuts = 0;

  // what challenge are we on?
  var iChallenge = 0;

  // populate an array of challenges
  var challenges = populateChallenges();

  console.log("Your challenges are " + challenges[0].question);
  console.log("Your challenges are " + challenges[1].question);

// add listener to the start button
// this only happens once in a game
$("#startBtn").on("click", function(){
  // start the clock
  startClock();
  // remove the first screen (directions and start) and show the second
  $("#firstScreen").hide();
  // note we have lost all of the javascript here no question, no options!
  $("#secondScreen").show();
  displayChallenge();
});

 // Note the following code should run at every new challenge
  // it will populate the display with a new challenge
  function displayChallenge()
  {
    // get the next challenge in the array
    var challenge = challenges[iChallenge];

    // Send the question and multiple choice options to the display
    $("#questionDiv").text(challenge.question);
    populateSelection(challenge.options);

  
    // add listeners to the options (they have a class of selDiv)
    $(".selDiv").on("click", function(){

      // stop the clock
      stopClock();
      $("#3timeRemainingDiv").text(time);

      // get the user's guess - Note: must use "this" to get expected behavior - can't use $(".selDiv")
      // get the div that the user clicked on
      var userGuess =  $(this).attr("data-option");
      userGuess = parseInt(userGuess);

      // if the data-option of the selected option is the correct answer
      if (userGuess === challenge.correctAnswer ){
        
        // write to screen that you are right
        $("#MessageDiv").text("You are Correct!");
        // increase the nuber correct
        numCorrect++;

      } else {

        // write to screen the correct answer
        $("#MessageDiv").text("Sorry, you got it wrong. The answer is ");
        $("#answerDiv").text(challenge.options[challenge.correctAnswer]);
        // increment the number wrong
        numWrong++;
      }
       
      // hide the question screen 
      $("#secondScreen").hide();
      // show the results screen
      $("#thirdScreen").show();

      // increment the challenge iterator
      iChallenge++;

       console.log("iChallenge is " + iChallenge + " and number of challenges is " + challenges.length);
       // In 5 seconds, move on to the next challenge
       // Note I don't love this circular programming
       if (iChallenge<challenges.length) {
         setTimeout(displayAnotherChallenge, 5000); 
       }
       else {
         // In 5 seconds, move on to end screen
         console.log("we are finished");
         setTimeout(displayFinalScreen, 5000); 
       }

    }); // end of clickevent

    //add listeners for the mouseover events
    $(".selDiv").mouseover(function() {
      $(this).css("color", "red");
    });
    $(".selDiv").mouseout(function() {
      $(this).css("color", "black");
    });

  }// end of displayChallenge function


 function displayAnotherChallenge(){
   // start the clock
   startClock();
   alert("wed like to show next challenge");
   // remove the answer screen and show the challenge screen
  $("#thirdScreen").hide();
  $("#secondScreen").show();
   displayChallenge();
 }
 
  

  function displayFinalScreen(){
    alert("youre done");

    //display results

    // give the user an option for another game

    // will need a reset funcion
  }
 

  // populate the multiple choice options for the current challenge
  function populateSelection(sels)
  {
    // remove any previously create .selDiv
    $(".selDiv").remove();

    for (var i=0; i<sels.length; i++)
    { 
      // populate div to hold the selection
      var selDiv = $("<div>");
      selDiv.text(sels[i]);
      selDiv.attr("class", "selDiv")
      selDiv.attr("data-option", i);
      $("#selectionDiv").append(selDiv);
    }
  }


  function populateChallenges() {
    
    // populate an array of challenges
    var challengeArray = [];

    // create an object with questions, mutliple choice options, and the correct answer
    var challenge = {
      question:"Who is your favorite bear?",
      options:["carebear", "pooh bear", "smokey the bear", "paddington"],
      correctAnswer: 0
    };
    challengeArray.push(challenge);

    challenge = {
      question:"Who is your favorite mouse?",
      options:["squeky", "cheesy", "mickey", "mousey"],
      correctAnswer: 3
    };
    challengeArray.push(challenge);  
    return challengeArray;
  }

  // start the clock countdown
  function startClock() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
    
      // Display the time initial 30 seconds
      $("#timeRemainingDiv").text(time);
      // this will run every 1 second
      intervalId = setInterval(countDown, 1000);
      clockRunning = true;
    }
  }

  // stop the clock countdown 
  function stopClock() {
  
    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  }

  // this function counts down the time and displays the time left
  function countDown() {

    //decrease time by 1, remember we cant use "this" here.
    time--;
    // Display the time as it counts down
    $("#timeRemainingDiv").text(time);
    
    if (time===0)
    {

      // get the next challenge in the array
      var challenge = challenges[iChallenge];

      // you've just run out of time
      stopClock();

       // increment the number wrong
       numTimeOuts++;

      // write to screen the correct answer
      $("#MessageDiv").text("Sorry, you've run out of time. The answer is ");
      $("#answerDiv").text(challenge.options[challenge.correctAnswer]);

      // hide the question screen 
      $("#secondScreen").hide();
      // show the results screen
      $("#thirdScreen").show();

      // increment the challenge iterator
      iChallenge++;

      // reset the clock to 30
      time=15;

       console.log("iChallenge is " + iChallenge + " and number of challenges is " + challenges.length);
       // In 5 seconds, move on to the next challenge
       // Note I don't love this circular programming
       if (iChallenge<challenges.length) {
         setTimeout(displayAnotherChallenge, 5000); 
       }
       else {
         // In 5 seconds, move on to end screen
         console.log("we are finished");
         setTimeout(displayFinalScreen, 5000); 
       }

    }
  
  
  }

});