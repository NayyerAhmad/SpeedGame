const gameButtons = document.querySelectorAll('.farm_button');
const scoreDigit = document.querySelector('#score');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const overlay = document.querySelector('#overlay');
const resultOverlay = document.querySelector('#farm-result'); 
const closeButton = document.querySelector('#end');

let active = 0;
let score = 0;
let pace = 500;
let timer;
let rounds = 0;

const clickFarm = i => {
    if (i !== active) {
        endGame();
    } else {
        round--;
        score++;
        scoreDigit.textContent = score;
    }
};

gameButtons.forEach((button, i) => {
    button.addEventListener('click', ()=> {
        clickFarm(i);
    });
});

const startGame = () => {
    for (let i = 0; i < gameButtons.length; i++) {
        gameButtons[i].getElementsByClassName.pointerEvents = 'auto';
    }

    let nextFarm = pickNew(active);
    gameButtons[nextFarm].classList.toggle('active');
    gameButtons[active].classList.remove('active');
    stopButton.style.display = 'inline';
    startButton.style.display = 'none';

    active = nextFarm;
    timer = setTimeout(startGame, pace);
    pace -= 10;

    if (rounds >= 4) {
        stopGame();
    }
    rounds++;

    function pickNew(active) {
        let nextFarm = getRndFarm(0,3);
        if (nextFarm !== active) {
            return nextFarm;
        } else {
            return pickNew(active);
        }
    }
};

const getRndFarm = (min,max => Math.floor(Math.random() * (max - min + 1)) + min);

const stopGame = () => {
    clearTimeout(timer);
    overlay.style.visibility = 'visible';
    if (score === 0) {
        resultOverlay.textContent = 'More Help is needed! You did not get any farm';
    } else if (score <= 5) {
        resultOverlay.textContent = 'You helped the farmer in ${score} farms';
    } else if (score <= 8) {
        resultOverlay.textContent = 'You are getting better, Your score is ${score}';
    } else if (score >= 14) {
        resultOverlay.textContent = 'Your score is ${score}! Ther farmer is thankful for your help';
};
