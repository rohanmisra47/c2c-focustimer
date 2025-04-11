let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isPaused = false;
let originalTime = 25 * 60;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
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

function startTimer() {
    if (timerId === null) {
        isPaused = false;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        isPaused = true;
    }
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    isPaused = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = originalTime;
    updateDisplay();
}

function addFiveMinutes() {
    timeLeft += 5 * 60;
    updateDisplay();
}

function setCustomDuration() {
    const minutes = parseInt(durationInput.value);
    if (!isNaN(minutes) && minutes > 0) {
        stopTimer();
        timeLeft = minutes * 60;
        originalTime = minutes * 60;
        updateDisplay();
    } else {
        alert('Please enter a valid number of minutes');
    }
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
addTimeButton.addEventListener('click', addFiveMinutes);
setDurationButton.addEventListener('click', setCustomDuration);

// Initialize display
updateDisplay(); 