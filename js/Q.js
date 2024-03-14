let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let timer;
let Itimer;
let timeLeft = 60;
const timerElement = document.getElementById("timer");

const questionElement = document.querySelector(".question");
const answerElements = document.querySelectorAll(".answer");
const nextButton = document.querySelector(".next-button");
const scoreElement = document.querySelector(".correctAnswer");
scoreElement.textContent = `Правильные ответы: ${correctAnswersCount}`;
//   document.body.appendChild(scoreElement);
const imageElement = document.querySelector("img");

const link = document.createElement("a");

const containerLink=document.querySelector(".container");

loadQuestion();

function startTimers() {
  Itimer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(Itimer);
      //действия по истечению времени
    }
    if (timeLeft <= 9) {
      timerElement.textContent = ("0" + timeLeft).slice(-2); //добавляет 0 если число меньше 9
    }
  }, 1000);
}

function startTimer() {
  timer = setTimeout(() => {
    const correctAnswerIndex =
      questions[currentQuestionIndex].correctAnswerIndex;
    const correctAnswerElement = answerElements[correctAnswerIndex];
    correctAnswerElement.classList.add("correct");
    nextButton.style.display = "block";
  }, 60000);
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  clearTimeout(timer); //
  clearInterval(Itimer);
  timeLeft = 60;
  timerElement.textContent = timeLeft;

  startTimer();
  startTimers();

  answerElements.forEach((answer, index) => {
    answer.textContent = currentQuestion.answers[index];
    answer.classList.remove("correct", "incorrect");
    answer.removeEventListener("click", answerClickHandler);
    answer.addEventListener("click", answerClickHandler);
  });
  imageElement.src = currentQuestion.imge;
  nextButton.style.display = "none";
}

function answerClickHandler(event) {
  const selectedAnswer = event.target;
  const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;
  const correctAnswerElement = answerElements[correctAnswerIndex];
  clearTimeout(Itimer); //
  if (selectedAnswer === correctAnswerElement) {
    selectedAnswer.classList.add("correct");
    correctAnswersCount++;
    checkCorrectAnswers();
    scoreElement.textContent = `Правильные ответы: ${correctAnswersCount}`;
  } else {
    selectedAnswer.classList.add("incorrect");
    correctAnswerElement.classList.add("correct");
  }

  answerElements.forEach(answer => {
    answer.removeEventListener("click", answerClickHandler);
  });
  if (correctAnswersCount == 40) {
    nextButton.style.display = "none";
    scoreElement.textContent = `Подарки в студию`;
  } else {
    nextButton.style.display = "block";
  }
}
function checkCorrectAnswers() {
  if (correctAnswersCount == 40) {
    questionElement.textContent = "Вопросы ! закончились";
    answerElements.forEach(answer => (answer.style.display = "none"));
  }
}
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
	questionElement.textContent = "Милые дамы вы прекрастны! ";

    answerElements.forEach(answer => (answer.style.display = "none"));
    nextButton.style.display = "none";
    scoreElement.style.display ="none";
	imageElement.style.display = "none";
	timerElement.style.display = "none";
	link.href="credits.html";
link.classList="linkQuestion question"
	containerLink.style.margin= "50vh auto ";
	while (questionElement.firstChild){
		link.appendChild(questionElement.firstChild);
	}
	questionElement.parentNode.replaceChild(link, questionElement)
  }
});

answerElements.forEach(answer => {
  answer.addEventListener("click", () => {
    clearInterval(timer);
  });
});

function sound(){
	let audio= new Audio();
	audio.src="audio/2.mp3";
	audio.autoplay=true;
}