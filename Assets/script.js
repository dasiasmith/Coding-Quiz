//Declare variables for question html
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-btn"));
var timerElement = document.querySelector(".timer-count");

//Declare variable for highscore html
var initials = document.getElementById("initials");
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');

//Starting parameters that will update question index, score, and time
var currentQuestion = {};
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var timer;
var timerCount;

//Questions put into a large array made of subsequently smaller arrays that will be indexed
var questions = [
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "1. onchange",
        choice2: "2. onmouseclic",
        choice3: "3. onmouseover",
        choice4: "4. onclick",
        answer: 4
    },
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "1. strings",
        choice2: "2. booleans",
        choice3: "3. alerts",
        choice4: "4. numbers",
        answer: 3
    },
    {
        question: "The condition in an if/else statement is enclosed within _____",
        choice1: "1. quotes",
        choice2: "2. curly brackets",
        choice3: "3. parenthesis",
        choice4: "4. square brackets",
        answer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store _____",
        choice1: "1. numbers and strings",
        choice2: "2. other arrays",
        choice3: "3. booleans",
        choice4: "4. all of the above",
        answer: 4
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "1. JavaScript",
        choice2: "2. terminal/bash",
        choice3: "3. for loops",
        choice4: "4. console.log",
        answer: 4
    }
];

//Every right question worth 10 points, 5 questions total
var points = 10;
var questionNum = 5;

//When start function is called the score is set to 0 and timer set to 75 seconds
function start() {
    questionCounter = 0;
    score = 0;
    timerCount = 75
    availableQuestions = [...questions]; //Using the spread operator gets a full copy of the questions array and allows changes to be made without affecting the og array
    console.log(availableQuestions);
    startTimer();
};

//Call startTime function, when timer reaches 0 the interval is cleared and a new window will open to log initials
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }

  //Function to index and grab new question
  //When 5 questions have been grabbed or the counter is greater or equal to the amount of questions in the quiz (5), stop timer and load page to input intials
function nextQuestion() {
    if(availableQuestions.length == 0 || questionCounter >= questionNum) {
        clearInterval(timer);
        return window.location.href='./review.html';
    }

    //Choose random question from array
    questionCounter++;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    console.log(currentQuestion.question);
    question.innerText = currentQuestion.question;

    //Changes the question and answer text as it appears on the html
    choices.forEach(choice => {
       var number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number]; 
    });

    availableQuestions.splice(questionIndex,1); //Removes question once aleady asked
};

document.addEventListener("click", function(event) {
    if (timerCount === 0) {
        return;
    }
});

//Compares user's click answer option to the correct answer noted in the questions array
choices.forEach(choice => {
    choice.addEventListener("click", event => {
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];
        console.log(currentQuestion.answer);

        if (selectedAnswer == currentQuestion.answer) {
            error.innerHTML = "<span style='color: black;'>"+
                        "<hr>Correct!</hr></span>"
            score = score + 10;
            localStorage.setItem('mostRecentScore', score);
        }else {
            error.innerHTML = "<span style='color: black;'>"+
                        "<hr>Wrong!</hr></span>"
            timerCount = timerCount - 10;
            score = score - 10;
            localStorage.setItem('mostRecentScore', score); //For wrong answers wrong is printed on html and time count goes down by 10 seconds           
        };

        nextQuestion();
        console.log("test",score);
    });
});
//Start function
start();


//Retrieves item from local storage
var mostRecentScore = localStorage.getItem('mostRecentScore');
//JSON parses through to convert the score but if there is no score returns an empty array
var storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
console.log(storedScores);

//Only want top 5 scores. Replaces final score on html with score given after quiz
var topFive = 5;
finalScore.textContent = mostRecentScore;

//Listens for if a key is pressed down before activating the submit button so that there is a variable stored in the initial form
initials.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !initials.value;
});
//After event listener is run the default is prevents so that score is stored
saveHighScore = (event) => {
   console.log("clicked the button"); 
   event.preventDefault();

//Formates and object to indicate the score and the inital typed in the form   
   var scoreObj = {
       score: mostRecentScore,
       name: initials.value
   };
   storedScores.push(scoreObj);

   storedScores.sort( (a, b) => b.score - a.score) //Sort highest score on top

   storedScores.splice(5); //Splices high scores array at 5th index
   localStorage.setItem("storedScores", JSON.stringify(storedScores)); //Stores new scores along with previous scores
   window.location.href='./highscore.html'

   console.log(storedScores);
};