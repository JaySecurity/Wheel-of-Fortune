//--------------------------Declare Classes------------------------------//

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  addToScore(amount) {
    this.score += amount;
  }
}

//--------------------------Declare Constants-------------------------- //
const letters = 'BCDFGHJKLMNPQRSTVWXYZ';
const letterArr = letters.split('');
const puzzles = [
  { catagory: 'Horror Movies', puzzle: 'Night of the Living Dead' },
  { catagory: 'Horror Movies', puzzle: 'Day of the Living Dead' },
  { catagory: 'Horror Movies', puzzle: 'Dawn of the Living Dead' },
  { catagory: 'Horror Movies', puzzle: 'Land of the Living Dead' },
  { catagory: 'Prison Movies', puzzle: 'The Green Mile' },
  { catagory: 'Prison Movies', puzzle: 'The Shawshank Redemption' },
  { catagory: 'Prison Movies', puzzle: 'Ernest goes to jail' },
  { catagory: 'Prison Movies', puzzle: 'Con Air' },
];

//-------------------------- Grab Dom Elements -------------------------//
const wheel = document.querySelector('.wheel');
const spinBtn = document.getElementById('spin-btn');
const spinResult = document.querySelector('.spin-result');
const buyVowelBtn = document.getElementById('buy-vowel-btn');
const vowelContainer = document.querySelector('.vowel-container');
const solveBtn = document.getElementById('solve-btn');
const board = document.querySelector('.board');
const letterContainer = document.querySelector('.letters');
const player1Name = document.getElementById('player1-name');
const player1Score = document.getElementById('player1-score');
const player2Name = document.getElementById('player2-name');
const player2Score = document.getElementById('player2-score');

//-----------------------Attach Event Listeners-------------------------//

spinBtn.addEventListener('click', handleSpin);

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

// Handle spin Function
function handleSpin() {
  wheel.classList.toggle('spin');
  setTimeout(() => {
    wheel.classList.toggle('spin');
  }, 4500);
  spinResult.classList.toggle('hide');
}

createLetters();
