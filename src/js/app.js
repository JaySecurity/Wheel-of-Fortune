//--------------------------Declare Constants-------------------------- //
const letters = 'BCDFGHJKLMNPQRSTVWXYZ';
const letterArr = letters.split('');
const spinAmounts = [
  '100',
  '250',
  '350',
  '450',
  '500',
  'BANKRUPT',
  '250',
  '350',
  '450',
  'LOSE A TURN',
  '500',
  '100',
  '250',
  '350',
  '1000',
  '750',
];
const puzzles = [
  { catagory: 'Horror Movies', puzzle: 'Night of the Living Dead' },
  { catagory: 'Horror Movies', puzzle: 'Day of the Dead' },
  { catagory: 'Horror Movies', puzzle: 'Dawn of the Dead' },
  { catagory: 'Horror Movies', puzzle: 'Land of the Dead' },
  { catagory: 'Prison Movies', puzzle: 'The Green Mile' },
  { catagory: 'Prison Movies', puzzle: 'The Shawshank Redemption' },
  { catagory: 'Prison Movies', puzzle: 'Ernest goes to jail' },
  { catagory: 'Prison Movies', puzzle: 'Con Air' },
];
const player1 = {};
const player2 = {};

//-------------------------- Global Variables --------------------------//
let currentPlayer = 1;

//-------------------------- Grab Dom Elements -------------------------//
const wheel = document.querySelector('.wheel');
const spinBtn = document.getElementById('spin-btn');
const spinResultModal = document.querySelector('.spin-result');
const buyVowelBtn = document.getElementById('buy-vowel-btn');
const vowelContainer = document.querySelector('.vowel-container');
const solveBtn = document.getElementById('solve-btn');
const board = document.querySelector('.board');
const infoModal = document.querySelector('.info-modal');
const modalInput = document.getElementById('player-name');
const modalBtn = document.getElementById('submit-name');
const letterContainer = document.querySelector('.letters');
const player1Name = document.getElementById('player1-name');
const player1Score = document.getElementById('player1-score');
const player2Name = document.getElementById('player2-name');
const player2Score = document.getElementById('player2-score');

//-----------------------Attach Event Listeners-------------------------//

spinBtn.addEventListener('click', handleSpin);
modalBtn.onclick = createPlayer1;

//-------------------------- Game Functions ----------------------------//

// Create buttons for each consonant and add to letter container
function createLetters() {
  letterArr.forEach((letter) => {
    const newLetter = document.createElement('button');
    newLetter.setAttribute('id', letter);
    newLetter.setAttribute('class', 'letter-btn');
    newLetter.textContent = letter;
    letterContainer.appendChild(newLetter);
  });
}

// Player Setup
function createPlayer1() {
  infoModal.querySelector('h2').textContent = 'Player 1 Enter Your Name:';
  if (!modalInput.value) {
    return;
  }
  player1.name = modalInput.value;
  infoModal.classList.toggle('hide');
  setTimeout(() => {
    infoModal.querySelector('h2').textContent = 'Player 2 Enter Your Name:';
    modalInput.value = '';
    modalBtn.onclick = createPlayer2;
    infoModal.classList.toggle('hide');
  }, 1000);
}
function createPlayer2() {
  if (!modalInput.value) {
    return;
  }
  player2.name = modalInput.value;
  infoModal.classList.toggle('hide');
}

function createPuzzle() {
  let regex = /[\s',]/;
  let puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  console.log(puzzle);
  let puzzleArr = puzzle.puzzle.split('');
  console.log(puzzleArr);

  puzzleArr.forEach((letter) => {
    const letterDiv = document.createElement('div');
    if (regex.test(letter)) {
      letterDiv.innerHTML = `<div class='special-char'>${letter.toUpperCase()}</div>`;
      if (letter === ' ') {
        letterDiv.classList.add('board-space');
      }
    } else {
      letterDiv.innerHTML = `<div class='hide board-letter'>${letter.toUpperCase()}</div>`;
    }
    letterDiv.classList.add('letter-container');
    board.appendChild(letterDiv);
  });
}

// Handle spin Function
function handleSpin() {
  spinBtn.setAttribute('disabled', 'true');
  wheel.classList.toggle('spin');
  setTimeout(() => {
    wheel.classList.toggle('spin');
    let spinResult =
      spinAmounts[Math.floor(Math.random() * spinAmounts.length)];
    spinResultModal.textContent = spinResult;
    spinResultModal.classList.toggle('hide');
  }, 4500);
  setTimeout(() => {
    spinResultModal.classList.toggle('hide');
    spinBtn.removeAttribute('disabled');
  }, 7500);
}

// Start Game
function startGame() {
  //infoModal.classList.toggle('hide');
  createPuzzle();
  createLetters();
}

startGame();
console.log(player1, player2);
