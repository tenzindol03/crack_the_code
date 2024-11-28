// Words for different subjects
const wordsBySubject = {
  "finance-banking": ["budget", "investment", "dividend", "mortgage", "portfolio"],
  "software-development": ["algorithm", "debugging", "framework", "variable", "recursion"],
  "technology": ["hardware", "software", "robotics", "innovation", "automation"]
};

let scrambledWord = "";
let originalWord = "";
let score = 0;
let timer = 60;

// DOM Elements
const subjectSelect = document.getElementById("subject");
const startBtn = document.getElementById("start-btn");
const scrambledWordElement = document.getElementById("scrambled-word");
const letterOptions = document.getElementById("letter-options");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");
const gameArea = document.getElementById("game-area");

// Helper Functions
function scrambleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function startGame() {
  // Reset variables
  score = 0;
  timer = 60;
  scoreElement.textContent = score;
  timerElement.textContent = timer;

  // Get subject and words
  const subject = subjectSelect.value;
  const words = wordsBySubject[subject];


  // Choose a word and scramble it
  originalWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord = scrambleWord(originalWord);
  scrambledWordElement.textContent = scrambledWord;

  // Display letter options
  displayLetterOptions(scrambledWord);

  // Show game area and start timer
  gameArea.style.display = "block";
  feedback.textContent = "";
  restartBtn.style.display = "none";
  startTimer();
}

function displayLetterOptions(word) {
  // Clear previous letters
  letterOptions.innerHTML = "";

  // Create a button for each letter
  word.split('').forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("letter-btn");
    button.addEventListener("click", () => {
      guessInput.value += letter; // Append letter to guess input
    });
    letterOptions.appendChild(button);
  });
}

function checkGuess() {
  const userGuess = guessInput.value.toLowerCase();
  if (userGuess === originalWord) {
    score++;
    feedback.textContent = "Correct! 🎉";
    feedback.style.color = "green";
    scoreElement.textContent = score;

    // Load new word
    const subject = subjectSelect.value;
    const words = wordsBySubject[subject];
    originalWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = scrambleWord(originalWord);
    scrambledWordElement.textContent = scrambledWord;

    // Display new letter options
    displayLetterOptions(scrambledWord);

    guessInput.value = "";
  } else {
    feedback.textContent = "Try again! ❌";
    feedback.style.color = "red";
  }
}

function startTimer() {
  const interval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;

    if (timer <= 0) {
      clearInterval(interval);
      feedback.textContent = "Time's up! Game over!";
      feedback.style.color = "black";
      restartBtn.style.display = "block";
    }
  }, 1000);
}

// Event Listeners
startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", startGame);

// Initial setup
gameArea.style.display = "none";
