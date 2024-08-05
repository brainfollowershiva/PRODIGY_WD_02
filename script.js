let startTime, updatedTime, difference, tInterval, running = false;
let hours = 0, minutes = 0, seconds = 0;
let lapCount = 1;

const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    hours = Math.floor(difference / (1000 * 60 * 60));

    seconds = (seconds < 10) ? '0' + seconds : seconds;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    hours = (hours < 10) ? '0' + hours : hours;

    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function pauseTimer() {
    running = false;
    clearInterval(tInterval);
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    display.innerHTML = '00:00:00';
    lapList.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerText = `Lap ${lapCount}: ${hours}:${minutes}:${seconds}`;
        lapList.appendChild(lapTime);
        lapCount++;
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
