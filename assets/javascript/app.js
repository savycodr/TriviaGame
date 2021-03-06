$(document).ready(function() 
{
  // hide the challenges until the start button is selected
  $("#secondScreen").hide();
  // hide the answer screen until user clicks an answer
  $("#thirdScreen").hide();
  // hide the game completed screen until user answers all questions
  $("#fourthScreen").hide();


  // tells us if clock is running
  var clockRunning = false;

  // amount of time the player gets to answer the quesion
  var time;
 
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
        $("#answerDiv").text("");

        // increase the number correct
        numCorrect++;

      } else {

        // write to screen the correct answer
        $("#MessageDiv").text("Sorry, you got it wrong. The answer is ");
        $("#answerDiv").text(challenge.options[challenge.correctAnswer]);
        // increment the number wrong
        numWrong++;
      }
      // display the image
      $("#imageDiv").attr("src", challenge.image);
       
      // hide the question screen 
      $("#secondScreen").hide();
      // show the results screen
      $("#thirdScreen").show();

      // increment the challenge iterator
      iChallenge++;

       console.log("iChallenge is " + iChallenge + " and number of challenges is " + challenges.length);
       // In 3 seconds, move on to the next challenge
       // Note I don't love this circular programming
       if (iChallenge<challenges.length) {
         setTimeout(displayAnotherChallenge, 3000); 
       }
       else {
         // In 3 seconds, move on to end screen
         console.log("we are finished");
         setTimeout(displayFinalScreen, 3000); 
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

  // this function shows the next question in the trivia game and resets the clock.
 function displayAnotherChallenge(){
   // start the clock
   startClock();
   // remove the answer screen and show the challenge screen
   $("#thirdScreen").hide();
   $("#secondScreen").show();
   displayChallenge();
 }
 
  // This function brings up the last screen to show the player their final scores
  function displayFinalScreen(){
    
    //display results
    $("#correctAnswersDiv").text("Correct Answers: " + numCorrect);
    $("#wrongAnswersDiv").text("Incorrect Answers: " + numWrong);
    $("#noAnswersDiv").text("Unanswered: " + numTimeOuts);
    $("#thirdScreen").hide();
    $("#fourthScreen").show();

    // give the user an option for another game
    $("#restartBtn").on("click", function(){
      // will need to reset 
      console.log("restarting");
      // number of correct answers
      numCorrect = 0;
      // number of incorrect answers
      numWrong = 0;
      // number of times ran out of time
      numTimeOuts = 0;
      // what challenge are we on?
      iChallenge = 0;
      startClock();
      // remove the fourth screen (directions and start) and show the second
      $("#fourthScreen").hide();
      $("#secondScreen").show();
      displayChallenge();
    });
    
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
      selDiv.attr("class", "selDiv ")
      selDiv.attr("data-option", i);
      $("#selectionDiv").append(selDiv);
    }
  }

  // start the clock countdown
  function startClock() {
 
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      // clock counts down from 30
      time=15;
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
  // If clock get to zero, let the user know and move to the next question
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

       // write to screen the time left on teh third screen
       $("#3timeRemainingDiv").text(time);
      // write to screen the correct answer
      $("#MessageDiv").text("Sorry, you've run out of time. The answer is ");
      $("#answerDiv").text(challenge.options[challenge.correctAnswer]);
      // display the image
      $("#imageDiv").attr("src", challenge.image);
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
    }  
  }

  function populateChallenges() {
    
    // create an object with questions, mutliple choice options, and the correct answer
    var challengeArray = [{
      question:"Which creature has the largest heart? (It weighs more than 1,500 pounds.)",
      options:["Blue Whale", "Orca", "Colossal Squid", "Giraffe"],
      correctAnswer: 0,
      image: "assets/images/blue-whale-1198719_640.jpg"
    },
    {
      question:"Which of the following bones is not in the leg?",
      options:["Fibula ", "Tibia", "Patella", "Radius"],
      correctAnswer: 3,
      image: "assets/images/jogging-2343558_640.jpg"
    },
    {
      question:"How many chromosomes are in your body cells?",
      options:["21 ", "22", "23", "24"],
      correctAnswer: 2,
      image: "assets/images/microbiology-163470_640_small.jpg"
    },
    {
      question:"Diamonds are mostly composed of which element?",
      options:["Platinum ", "Tungsten", "Carbon", "Osmium"],
      correctAnswer: 2,
      image: "assets/images/charcoal-1618255_640.jpg"

    },
    {
      question:"Human cells typically have how many copies of each gene?",
      options:["1", "2", "3", "23"],
      correctAnswer: 1,
      image: "assets/images/microbiology-163470_640_small.jpg"
    },
    {
      question:"What is the most abundant gas in the Earth's atmosphere? It makes up about 78%.",
      options:["Argon ", "Oxygen", "Carbon Dioxide", "Nitrogen"],
      correctAnswer: 3,
      image: "assets/images/earth-11015_640.jpg"
    },
    {
      question:"In what year did Apple introduce a touchscreen cellphone called the iPhone?",
      options:["1996", "2000 ", "2007", "2013"],
      correctAnswer: 2,
      image: "assets/images/iphone-410311_640.jpg"
    },
    {
      question:"Which Apollo mission was the first one to land on the Moon?",
      options:["Apollo 11", "Apollo 10 ", "Apollo 9", "Apollo 13"],
      correctAnswer: 0,
      image: "assets/images/moon-1859616_640.jpg"
    },
    {
      question:"How many toes does a cat have?",
      options:["16", "18", "20", "25"],
      correctAnswer: 1,
      image: "assets/images/kitten-1154693_640.jpg"
    },
    {
      question:"The first LEGOland amusement park opened in 1968 at the site of the original workshop where LEGO was first conceived. Where was it?",
      options:["Billund, Denmark", "London, England", "Los Angeles, California", "Orlando, Florida"],
      correctAnswer: 0,
      image: "assets/images/police-1058422_640.jpg"
    }];

  return challengeArray;

}
}); // end of documnet.ready function