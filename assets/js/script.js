var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startPageContainer = document.getElementById("start");
var startQuizButton = document.getElementById("start-button");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscore-container");
var highscoreDiv = document.getElementById("highscore-page");
var highscoreInputName = document.getElementById("name-or-initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var endGameBtns = document.getElementById("end-buttons");
var submitScoreBtn = document.getElementById("submit");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


var quizQuestions = [{
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Data Output Message",
    choiceC: "Data Only Module",
    choiceD: "Domino Object Model",
    correctAnswer: "a"},

{
    question: "Which of the following is NOT a commonly used data type?",
    choiceA: "Strings",
    choiceB: "Alerts",
    choiceC: "Booleans",
    choiceD: "Numbers",
    correctAnswer: "b"},

{
    question: "Arrays in JavaScript can be used to store which of the following?",
    choiceA: "Numbers",
    choiceB: "Strings",
    choiceC: "Booleans",
    choiceD: "All of the above",
    correctAnswer: "d"},

{
    question: "What does CSS stand for?",
    choiceA: "Cascading Styling Sheets",
    choiceB: "Cross Site Scripting",
    choiceC: "Customer Self Service",
    choiceD: "Class Software Solutions",
    correctAnswer: "a"},

{
    question: "The condition in an if / else statement is enclosed in which of the following?",
    choiceA: "Sqaure Brackets",
    choiceB: "Quotes",
    choiceC: "Curly Brackets",
    choiceD: "Parenthesis",
    correctAnswer: "c"},

];


var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){    
    gameoverDiv.style.display = "none";
    startPageContainer.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
    return showScore();
    }
    
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;

};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if(timeLeft === 0) {
        clearInterval(timerInterval);
        showScore();
    }

    }, 1000);

    quizBody.style.display = "block";

};

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";

};


submitScoreBtn.addEventListener("click", function highscore(){

    if(highscoreInputName.value === "") {
        alert("Must enter a name.");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();

    }
});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
};

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    startPageContainer.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();

};

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";

};

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    startPageContainer.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;

};

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        // alert("That Is Correct!");
        resultsEl.style.display = "flex";
        resultsEl.textContent = "Correct!";
        currentQuestionIndex++;
        generateQuizQuestion();

    //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        // alert("That Is Incorrect.")
        resultsEl.textContent = "Incorrect!"
        currentQuestionIndex++;
        generateQuizQuestion();

    //display in the results div that the answer is wrong.
    }else{
    showScore();
    }

};

startQuizButton.addEventListener("click",startQuiz);

