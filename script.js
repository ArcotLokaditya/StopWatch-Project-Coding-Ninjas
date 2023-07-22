//declaring constants to get the reference to the HTML elements by their id
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

//declaring the variables which are needed to perform the required functions
let startTime, pauseTime, intervalId, running = false;

//function used to format the milliseconds to 'hh:mm:ss' format
function formatTime(ms) {
  const p = (n) => n.toString().padStart(2, '0');
  return `${p(ms / 3600000 | 0)}:${p(ms / 60000 % 60 | 0)}:${p(ms / 1000 % 60 | 0)}`;
}

//function used to calculate the current time and display it
function updateDisplay() {
  const currentTime = running ? Date.now() - startTime : pauseTime;
  display.textContent = formatTime(currentTime);
}

// function used to disable/enable the buttons when an event is clicked
function toggleButtons(start, stop, reset) {
  startBtn.disabled = start;
  stopBtn.disabled = stop;
  resetBtn.disabled = reset;
}

//method used to start the timer on click event
startBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - (pauseTime || 0);
    intervalId = setInterval(updateDisplay, 1000);
    running = true;
    toggleButtons(true, false, false);
  }
});

//method used to stop the timer on click event
stopBtn.addEventListener('click', () => {
  if (running) {
    clearInterval(intervalId);
    pauseTime = Date.now() - startTime;
    intervalId = null;
    running = false;
    toggleButtons(false, true, false);
  }
});

//method used to reset the timer on click event
resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  display.textContent = '00:00:00';
  startTime = 0;
  pauseTime = 0;
  running = false;
  toggleButtons(false, true, true);
});

//initializing the toggle buttons
toggleButtons(false, true, true);
