console.log("Loaded");
console.clear();

// A constructor function allows us to easily make question objects
function Question (prompt, answers, correctAnswerIndex) {
  this.prompt = prompt
  this.choices = answers
  this.correctChoice = correctAnswerIndex
}

// using the new keyword and the constructor we can create questions for the quiz
var question1 = new Question('Who is making the Web standards?', ['Google', 'Microsoft', 'The World Wide Web Consortium', 'Mozilla'], 2);
var question2 = new Question('Choose the correct HTML element to define important text.', ['<important>', '<i>', '<strong>', '<b>'], 3);
var question3 = new Question('How can you open a link in a new tab/browser window?', ['<a href="url" new>', '<a href="url" traget="new">', '<a href="url" target="_blank">'], 1);
var question4 = new Question('Inline elements are normally displayed without starting a new line.', ['True', 'False', 'NA', 'NA'], 1);
var question5 = new Question('Which HTML attribute is used to define inline styles?', ['class', 'font', 'style', 'styles'], 2);
var question6 = new Question('How do you add a background color for all <h1> elements?', ['all.h1 {background-color:#FFFFFF;}', 'h1.all {background-color:#FFFFFF;}', 'h1 {background-color:#FFFFFF;', 'NA'], 2);
var question7 = new Question('What is the correct CSS syntax for making all the <p> elements bold?', ['p {font-weight:bold;}', '<p style="font-size:bold;">', 'p {text-size:bold;}', '<p style="text-size:bold;">'], 0);
var question8 = new Question('How do you make each word in a text start with a capital letter?', ['text-transform:uppercase', "You can't do that with CSS", 'text-transform:capitalize', 'NA'], 0);
var question9 = new Question('When using the padding property; are you allowed to use negative values?', ['No', 'Yes', 'NA', 'NA'], 0);
var question10 = new Question('The external JavaScript file must contain the <script> tag.', ['True', 'False', 'NA', 'NA'], 1);
var question11 = new Question('How do you create a function in JavaScript?', ['function = myFunction()', 'function myFunction()', 'function:myFunction()', 'NA'], 1);
var question12 = new Question('How to write an IF statement in JavaScript?', ['if (i == 5)', 'if i == 5 then', 'if i = 5', 'if i = 5 then'], 0);
var question13 = new Question('How to write an IF statement for executing some code if "i" is NOT equal to 5?', ['if i <> 5', 'if i =! 5 then', ' if (i != 5)', 'if (i <> 5)'], 2);
var question14 = new Question('How does a WHILE loop start?', ['while i = 1 to 10', 'while (i <= 10; i++)', 'while (i <= 10)', 'NA'], 2);
var question15 = new Question('What is the correct way to write a JavaScript array?', ['var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = "red", "green", "blue"'], 1);
var question16 = new Question('What will the following code return: Boolean(10 > 9)', ['true', 'NaN', 'false', 'NA'], 0);
var question17 = new Question('Which is not a data type?', ['true', '"Hello World!"', 'var', '94.67'], 2);
var question18 = new Question('jQuery uses CSS selectors to select elements?', ['False', 'True', 'NA', 'NA'], 1);
var question19 = new Question('What is the correct jQuery code to set the background color of all p elements to red?', ['$("p").manipulate("background-color","red");', '$("p").style("background-color","red");', '$("p").css("background-color","red");', '$("p").layout("background-color","red");'], 2);
var question20 = new Question('Which jQuery method is used to switch between adding/removing one or more classes (for CSS) from selected elements?', [' switch()', 'altClass()', 'toggleClass()', 'switchClass()'], 2);


// we can create an object to represent all of the settings and scores for the quiz
var quiz = {
  currentQuestion: 0,
  questions: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question17, question18, question19, question20],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
}


function numberOfQuestions() {
    return quiz.questions.length;
}


function currentQuestion() {
    return quiz.currentQuestion;
}

console.log('Current question now is ' + currentQuestion());


function correctAnswer() {
    return quiz.questions[quiz.currentQuestion].correctChoice
}


function numberOfAnswers() {
    return quiz.questions[quiz.currentQuestion].choices.length;
}


function playTurn (choice) {
  if (quiz.isGameOver) {
    return false
  }
  var correct = false
  if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
    correct = true
    if (quiz.currentQuestion % 2) {
      quiz.player2Points++
    } else {
      quiz.player1Points++
    }
  }
  ++quiz.currentQuestion
  if (quiz.currentQuestion === numberOfQuestions()) { 
    quiz.isGameOver = true
  }
  return correct
}


// a function to update the display whenever the data changes
function updateDisplay () {
  if (isGameOver()) {
    $('h2').text(' Gameover. Winner is ' + whoWon())
  } else {
    $('h2').text(quiz.currentQuestion + ') ' + quiz.questions[quiz.currentQuestion].prompt)
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].choices[0])
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].choices[1])
    $('button').eq(2).text(quiz.questions[quiz.currentQuestion].choices[2])
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].choices[3])
  }
  // update player scores regardless
  $('h3').eq(0).text('Player1: ' + quiz.player1Points)
  $('h3').eq(1).text('Player2: ' + quiz.player2Points)
}


function isGameOver() {
    return quiz.isGameOver
}


function whoWon() {
    if (!quiz.isGameOver) return 0
    if (quiz.player1Points > quiz.player2Points) return 1
    if (quiz.player1Points < quiz.player2Points) return 2
    return 3
}


function restart() {
    quiz.currentQuestion = 0
    quiz.isGameOver = false
    quiz.player1Points = 0
    quiz.player2Points = 0
}

//---- jQuery ----//
$(function () {
  $('button').click(function () {
    // if gameover then restart else log a player turn
    if (isGameOver()) {
      restart()
    } else {
      // can use jquery index() to find the position of this element in relation to its siblings. works as only answers are in this container
      playTurn($(this).index())
    }
    updateDisplay()
  })
  // update the display for the first time
  updateDisplay()
})


