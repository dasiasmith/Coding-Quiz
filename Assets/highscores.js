//Similar to what was done on the script.js, sets variable for high scores based on id and parse through the list and returns empty array is list is null
var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem("storedScores")) || [];

//Replaces high score text on html, takes list item stored in array, returns string, and concats list to appear on html
highScoresList.innerHTML = highScores
    .map(storedScores => { //Map takes in an incoming array and converts it to a new array with a string version of an li
        return `<li class="high-score">${storedScores.name} - ${storedScores.score}</li>`;
    })
    .join("");

//If user decides to clear all the high score list is cleared and the local storage is also cleared    
clearAll = (e) => {
    document.getElementById("highScoresList").innerHTML = "";
    localStorage.clear();
}    
    