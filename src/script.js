import * as num from './num.js';
import { aiSolve } from './algorithm.js';

// Utility functions
function getBullsAndCows(secret, guess) {
    let bulls = 0, cows = 0;
    for (let i = 0; i < secret.length; i++) {
        if (guess[i] === secret[i]) bulls++;
        else if (secret.includes(guess[i])) cows++;
    }
    return { bulls, cows };
}

function addGuess(guess, bulls, cows) {
    const li = document.createElement('li');
    li.innerHTML = 
    `${guess} <img src="${bullsIconSRC}" alt="Bulls" class="icon"> ${bulls} <img src="${cowsIconSRC}" alt="Cows" class="icon"> ${cows}`;
    // string for image inside li
    guessesList.appendChild(li);
}
// Universal elements
let digits = 4;
let secret = num.getRandomNumber(digits, 'string');
let guesses = [];
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const guessesList = document.getElementById('guesses-list');
const bullsElem = document.getElementById('bulls');
const cowsElem = document.getElementById('cows');
const bullsIconSRC = "../assets/sprites/bull.png";
const cowsIconSRC = "../assets/sprites/cow.png";
//AI solve elements
const aiSolveBtn = document.getElementById('ai-solve-btn');
const youBtn = document.getElementById('you-btn');
const aiSolveModal = document.getElementById('ai-solve-modal');
const userSecretInput = document.getElementById('user-secret-input');
const startAiSolveBtn = document.getElementById('start-ai-solve');
const closeAiSolveBtn = document.getElementById('close-ai-solve');

const easyBtn = document.querySelector('.difficulty button:nth-child(2)');
const mediumBtn = document.querySelector('.difficulty button:nth-child(3)');
const hardBtn = document.querySelector('.difficulty button:nth-child(4)');

function setDifficulty(n) {
    digits = n;
    secret = num.getRandomNumber(digits, 'string');
    guesses = [];
    guessesList.innerHTML = '';
    bullsElem.textContent = '0';
    cowsElem.textContent = '0';
    guessInput.maxLength = digits;
    guessInput.placeholder = '0'.repeat(digits);
}

if (easyBtn) easyBtn.addEventListener('click', () => setDifficulty(3));
if (mediumBtn) mediumBtn.addEventListener('click', () => setDifficulty(4));
if (hardBtn) hardBtn.addEventListener('click', () => setDifficulty(5));

function setModeButtonActive(btn) {
    aiSolveBtn.classList.remove('pressed');
    youBtn.classList.remove('pressed');
    if (btn) btn.classList.add('pressed');
}

// Set 'You' as default pressed on load
setModeButtonActive(youBtn);

if (guessForm) {
    guessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const guess = guessInput.value;
        if (guess.length !== digits || !new RegExp(`^\\d{${digits}}$`).test(guess)) return;
        const { bulls, cows } = getBullsAndCows(secret, guess);
        bullsElem.textContent = bulls;
        cowsElem.textContent = cows;
        addGuess(guess, bulls, cows);
        guesses.push({ guess, bulls, cows });
        guessInput.value = '';
    });
}

const resetBtn = document.getElementById('reset-game');
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        guesses = [];
        guessesList.innerHTML = '';
        bullsElem.textContent = '0';
        cowsElem.textContent = '0';
        secret = num.getRandomNumber(digits, 'string');
    });
}

if (aiSolveBtn && aiSolveModal) {
    aiSolveBtn.addEventListener('click', () => {
        setModeButtonActive(aiSolveBtn);
        aiSolveModal.style.display = 'flex';
    });
}
if (closeAiSolveBtn && aiSolveModal) {
    closeAiSolveBtn.addEventListener('click', () => {
        aiSolveModal.style.display = 'none';
        userSecretInput.value = '';
        setModeButtonActive(youBtn);
    });
}
if (youBtn) {
    youBtn.addEventListener('click', () => {
        setModeButtonActive(youBtn);
        // Optionally reset UI for user mode
    });
}
if (startAiSolveBtn && userSecretInput) {
    startAiSolveBtn.addEventListener('click', () => {
        const userSecret = userSecretInput.value;
        if (!new RegExp(`^\\d{${digits}}$`).test(userSecret)) {
            userSecretInput.style.border = '2px solid red';
            return;
        }
        aiSolveModal.style.display = 'none';
        userSecretInput.value = '';
        guessesList.innerHTML = '';
        bullsElem.textContent = '0';
        cowsElem.textContent = '0';
        setModeButtonActive(aiSolveBtn);
        aiSolve(userSecret, (guess, bulls, cows, tries) => {
            addGuess(guess, bulls, cows);
            bullsElem.textContent = bulls;
            cowsElem.textContent = cows;
            if (bulls === digits) setModeButtonActive(youBtn);
        }, digits);
    });
}