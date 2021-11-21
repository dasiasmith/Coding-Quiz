var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-btn"));
var timerElement = document.querySelector(".timer-count");

var initials = document.getElementById('initials');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');

var currentQuestion = {};
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var timer;
var timerCount;

var questions = [
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choice1: "1. commas",
        choice2: "2. curly brackets",
        choice3: "3. quotes",
        choice4: "4. parenthesis",
        answer: 3
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

var points = 10;
var questionNum = 5;

function start() {
    questionCounter = 0;
    score = 0;
    timerCount = 75
    availableQuestions = [...questions]; //Using the spread operator gets a full copy of the questions array and allows changes to be made without affecting the og array
    console.log(availableQuestions);
    startTimer();
    //nextQuestion();
};

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

function nextQuestion() {
    if(availableQuestions.length == 0 || questionCounter >= questionNum) {
        //localStorage.setItem('mostRecentScore', score);
        clearInterval(timer);
        return window.location.assign("file:///C:/Users/Dsmith/Desktop/gt-atl-virt-fsf-pt-10-2021-u-c-b/Class-Content/04-Web-APIs/02-Homework/Assets/review.html");
        //clearInterval(timer);
    }

    questionCounter++;
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    console.log(currentQuestion.question);
    question.innerText = currentQuestion.question;

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
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset["number"];
        console.log(currentQuestion.answer);

        if (selectedAnswer == currentQuestion.answer) {
            error.innerHTML = "<span style='color: black;'>"+
                        "<hr>Correct!</hr></span>"
            score = score + 10;
        }else {
            error.innerHTML = "<span style='color: black;'>"+
                        "<hr>Wrong!</hr></span>"
            timerCount = timerCount - 10; //For wrong answers wrong is printed on html and time count goes down by 10 seconds           
        };

        nextQuestion();
        console.log("test",score);
    });
});

start();
localStorage.setItem('mostRecentScore', score);



var mostRecentScore = localStorage.getItem('mostRecentScore');
//finalScore.textContent = mostRecentScore;

initials.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !initials.value;
});
saveHighScore = (e) => {
   console.log("clicked the button"); 
   e.preventDefault();
};