let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let originalTime = 25 * 60;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const addTimeButton = document.getElementById('add-time');
const durationInput = document.getElementById('duration');
const setDurationButton = document.getElementById('set-duration');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleTimer() {
    if (timerId === null) {
        // Start the timer
        startButton.textContent = 'Pause';
        startButton.classList.add('active');
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                startButton.textContent = 'Start';
                startButton.classList.remove('active');
                alert('Time is up!');
            }
        }, 1000);
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        startButton.classList.remove('active');
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = originalTime;
    startButton.textContent = 'Start';
    startButton.classList.remove('active');
    updateDisplay();
}

function addFiveMinutes() {
    timeLeft += 5 * 60;
    updateDisplay();
}

function setCustomDuration() {
    const minutes = parseInt(durationInput.value);
    if (!isNaN(minutes) && minutes > 0) {
        clearInterval(timerId);
        timerId = null;
        timeLeft = minutes * 60;
        originalTime = timeLeft;
        startButton.textContent = 'Start';
        startButton.classList.remove('active');
        updateDisplay();
    } else {
        alert('Please enter a valid number of minutes');
    }
}

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
addTimeButton.addEventListener('click', addFiveMinutes);
setDurationButton.addEventListener('click', setCustomDuration);

// Initialize display
updateDisplay(); 