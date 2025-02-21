// Theme management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggle(theme);
}

function updateThemeToggle(theme) {
    const toggle = document.getElementById('theme-toggle');
    toggle.textContent = theme === 'dark' ? '🌞' : '🌙';
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Prevent right click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Generate a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
let remainingChances = 10;
const history = [];

function checkGuess() {
    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);
    const messageElement = document.getElementById('message');
    const chancesElement = document.getElementById('chances');
    const historyElement = document.getElementById('history');

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100';
        messageElement.style.color = '#ef4444';
        return;
    }

    remainingChances--;
    chancesElement.textContent = remainingChances;

    // Add to history
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    if (guess === targetNumber) {
        // Simulate crash sequence
        localStorage.clear(); // Clear all game progress
        setTimeout(() => {
            window.location.href = 'crash.html';
        }, 500);
        return;
    } else if (guess < targetNumber) {
        historyItem.textContent = `${guess} is too low`;
        messageElement.textContent = 'Too low! Try a higher number.';
        messageElement.style.color = '#f59e0b';
    } else {
        historyItem.textContent = `${guess} is too high`;
        messageElement.textContent = 'Too high! Try a lower number.';
        messageElement.style.color = '#f59e0b';
    }

    historyElement.insertBefore(historyItem, historyElement.firstChild);
    guessInput.value = '';

    if (remainingChances === 0) {
        window.location.href = 'no.html';
    }
}

// Add enter key support
document.getElementById('guess').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});