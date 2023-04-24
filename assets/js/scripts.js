var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");



function startQuiz() {
    
    titleScreen.setAttribute("class", "hide");
  
    quizScreen.setAttribute("class", "show");
  
    // start timer
    timerId = setInterval(tick, 1000);
  
   
    timeEl.textContent = time;
  
    getQuestion();
  }

  
  function tick() {
    // update time
    time--;
    timeEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

  function getQuestion() {
    
    var currentQuestion = questions[currentQuestionIndex];
  
    
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }
  function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }

      timeEl.textContent = time;
  
  
      feedbackEl.textContent = "Wrong!";
    } else {

      feedbackEl.textContent = "Correct!";
    }
  
    
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  function quizEnd() {
    clearInterval(timerId);
  
  
    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");
  
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    quizScreen.setAttribute("class", "hide");
  }

// function for saving highscore
function saveHighscore() {
    
    var initials = initialsEl.value.trim();
  
    
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      
      var newScore = {
        score: time,
        initials: initials
      };
  
      
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      window.location.href = "highScore.html";
    }
  }

  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  submitBtn.onclick = saveHighscore;
  
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;





