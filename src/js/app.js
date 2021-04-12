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
const players = {
  1: {
    name: '',
    score: 0,
  },
  2: {
    name: '',
    score: 0,
  },
};

//-------------------------- Global Variables --------------------------//
let currentPlayer = 1;
let puzzleArr = [];
let puzzle = {};
let boardLetters;
let spinResult;

//-------------------------- Grab Dom Elements -------------------------//
const wheel = document.querySelector('.wheel');
const spinBtn = document.getElementById('spin-btn');
const playerMsg = document.getElementById('player-msg');
const spinResultModal = document.querySelector('.spin-result');
const buyVowelBtn = document.getElementById('buy-vowel-btn');
const vowelContainer = document.querySelector('.vowel-container');
const solveBtn = document.getElementById('solve-btn');
const board = document.querySelector('.board');
const infoModal = document.querySelector('.info-modal');
const modalInput = document.getElementById('player-name');
const modalBtn = document.getElementById('submit-name');
const catagory = document.getElementById('catagory');
const letterContainer = document.querySelector('.letters');
const player1Name = document.querySelector('.player1-name');
const player1Score = document.querySelector('.player1-score');
const player2Name = document.querySelector('.player2-name');
const player2Score = document.querySelector('.player2-score');

//-----------------------Attach Event Listeners-------------------------//

spinBtn.addEventListener('click', handleSpin);
modalBtn.onclick = createPlayer1;
buyVowelBtn.addEventListener('click', buyVowel);
solveBtn.addEventListener('click', solvePuzzle);

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
  players[1].name = modalInput.value;
  infoModal.classList.toggle('hide');
  setTimeout(() => {
    infoModal.querySelector('h2').textContent = 'Player 2 Enter Your Name:';
    modalInput.value = '';
    modalInput.focus();
    modalBtn.onclick = createPlayer2;
    infoModal.classList.toggle('hide');
  }, 1000);
}
function createPlayer2() {
  if (!modalInput.value) {
    return;
  }
  players[2].name = modalInput.value;
  infoModal.classList.toggle('hide');
  updateGame();
  createPuzzle();
  createLetters();
}

function createPuzzle() {
  let regex = /[\s',]/;
  puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  console.log(puzzle);
  puzzleArr = puzzle.puzzle.split('');
  console.log(puzzleArr);

  let i = 0;
  while (i < puzzleArr.length) {
    word = document.createElement('div');
    word.classList.add('word')
    if (puzzleArr[i] === ' ') {
      let letterDiv = document.createElement('div');
      letterDiv.classList.add('letter-container', 'board-space');
      letterDiv.innerHTML = `<div class='puzzle-char'>${puzzleArr[i].toUpperCase()}</div>`;
      board.appendChild(letterDiv);
      i++
    }else{
      while (puzzleArr[i] !== ' ' && i < puzzleArr.length) {
        let letterDiv = document.createElement('div');
        letterDiv.classList.add('letter-container');
        if (regex.test(puzzleArr[i])) {
          letterDiv.innerHTML = `<div class='special-char puzzle-char'>${puzzleArr[i].toUpperCase()}</div>`;
        } else {
          letterDiv.innerHTML = `<div class='hide board-letter puzzle-char'>${puzzleArr[i].toUpperCase()}</div>`;
        }
        word.appendChild(letterDiv);
        i++;
      }
      board.appendChild(word);
    }
    
  }
  // puzzleArr.forEach((letter) => {
  //   const letterDiv = document.createElement('div');
  //   if (regex.test(letter)) {
  //     letterDiv.innerHTML = `<div class='special-char puzzle-char'>${letter.toUpperCase()}</div>`;
  //     if (letter === ' ') {
  //       letterDiv.classList.add('board-space');
  //     }
  //   } else {
  //     letterDiv.innerHTML = `<div class='hide board-letter puzzle-char'>${letter.toUpperCase()}</div>`;
  //   }
  //   letterDiv.classList.add('letter-container');
  //   board.appendChild(letterDiv);
  // });
  catagory.firstChild.textContent = puzzle.catagory.toUpperCase();
  boardLetters = document.querySelectorAll('.puzzle-char');
}

// Handle spin Function
function handleSpin() {
  spinBtn.setAttribute('disabled', 'true');
  wheel.classList.toggle('spin');
  setTimeout(() => {
    wheel.classList.toggle('spin');
    spinResult = spinAmounts[Math.floor(Math.random() * spinAmounts.length)];
    spinResultModal.textContent = spinResult;
    spinResultModal.classList.remove('hide');
    if (spinResult != 'BANKRUPT' && spinResult != 'LOSE A TURN') {
      playerMsg.textContent = 'Choose a Letter';
      letterContainer.addEventListener('click', pickLetter);
    } else {
      setTimeout(() => {
        if (spinResult === 'BANKRUPT') {
          players[currentPlayer].score = 0;
        }
        currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
        spinResultModal.classList.toggle('hide');
        spinBtn.disabled = false;
        updateGame();
      }, 500);
    }
  }, 4500);
}

// Buy A Vowel
function buyVowel() {
  if (players[currentPlayer].score >= 250) {
    vowelContainer.addEventListener('click', pickLetter);
    playerMsg.textContent = `${players[currentPlayer].name} Choose a Vowel`;
    spinResult = 'vowel';
  }
}

// Solve Puzzel
function solvePuzzle() {
  infoModal.querySelector(
    'h2'
  ).textContent = `${players[currentPlayer].name} Can you solve the puzzle?`;
  modalInput.value = '';
  modalInput.focus();
  modalBtn.onclick = submitAnswer;
  infoModal.classList.toggle('hide');

  function submitAnswer() {
    if (!modalInput.value) {
      return;
    }
    console.log('hide Modal');
    infoModal.classList.toggle('hide');
    if (modalInput.value.trim().toUpperCase() === puzzle.puzzle.toUpperCase()) {
      infoModal.querySelector(
        'h2'
      ).textContent = `Congratulations ${players[currentPlayer].name}! You won with a total of $${players[currentPlayer].score}`;
      infoModal.removeChild(modalInput);
      infoModal.removeChild(modalBtn);
      infoModal.getElementsByClassName.justifyContent = 'center';
      console.log('show if Correct');
      infoModal.classList.toggle('hide');
    } else {
      infoModal.querySelector(
        'h2'
      ).textContent = `Sorry ${players[currentPlayer].name}. That is incorrect`;
      infoModal.classList.toggle('hide');
      setTimeout(() => {
        currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
        infoModal.classList.toggle('hide');
        updateGame();
      }, 2000);
    }
  }
}

// Pick a Letter Handler
function pickLetter(e) {
  vowelContainer.removeEventListener('click', pickLetter);
  letterContainer.removeEventListener('click', pickLetter);
  let chosenLetter = e.target.textContent;
  e.target.disabled = true;
  let indexArr = [];
  puzzleArr.forEach((letter, i) => {
    if (chosenLetter === letter.toUpperCase()) {
      indexArr.push(i);
    }
  });
  if (indexArr.length > 0) {
    flipLetters(indexArr);
    calcScore(indexArr);
    updateGame();
  } else {
    currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
    updateGame();
  }
}

// Flip Board Letters
function flipLetters(indexArr) {
  indexArr.forEach((index) => {
    boardLetters[index].classList.remove('hide');
  });
}

//Calculate Score
function calcScore(indexArr) {
  if (spinResult === 'vowel') {
    players[currentPlayer].score -= 250;
  } else {
    players[currentPlayer].score += parseInt(spinResult) * indexArr.length;
  }
}

function updateGame() {
  player1Name.textContent = players[1].name;
  player1Score.textContent = `$${players[1].score}`;
  player2Name.textContent = players[2].name;
  player2Score.textContent = `$${players[2].score}`;
  playerMsg.textContent = `${players[currentPlayer].name} Make a Choice:`;
  spinBtn.disabled = false;
  spinResultModal.classList.add('hide');
  if (currentPlayer === 1) {
    player1Name.classList.add('current-player');
    player2Name.classList.remove('current-player');
  } else {
    player2Name.classList.add('current-player');
    player1Name.classList.remove('current-player');
  }
}
// Start Game
function startGame() {
  infoModal.classList.toggle('hide');
}

startGame();
