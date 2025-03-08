const hour_time = document.querySelector('.hour-time');
const minute_time = document.querySelector('.minute-time');
const second_time = document.querySelector('.second-time');
const milisec = document.querySelector('.milisec-time');

const times = document.querySelectorAll('.times');
const texts = document.querySelectorAll('.texts');

const split_screen = document.querySelector('.split-screen');

let count_mili = 0, count_sec = 0, count_min = 0, count_hour = 0;
let is_start_clicked = false;
let interval, timesCount = 0;

function start_stopwatch() {
    interval = setInterval(() => {
        count_mili += 1;
        if (count_mili === 100) {
            count_mili = 0;
            count_sec += 1;
        }
        if (count_sec === 60) {
            count_sec = 0;
            count_min += 1;
        }
        if (count_min === 60) {
            count_min = 0;
            count_hour += 1;
        }

        milisec.textContent = String(count_mili).padStart(3, '0');
        second_time.textContent = String(count_sec).padStart(2, '0');
        minute_time.textContent = String(count_min).padStart(2, '0');
        hour_time.textContent = String(count_hour).padStart(2, '0');
    }, 10);
}

function stop_stopwatch() {
    clearInterval(interval);
}

function reset_stopwatch() {
    stop_stopwatch();
    count_mili = count_sec = count_min = count_hour = 0;

    milisec.textContent = '000';
    second_time.textContent = '00';
    minute_time.textContent = '00';
    hour_time.textContent = '00';

    const startBtn = document.querySelector('.start-btn');
    startBtn.innerHTML = '';
    let playIcon = document.createElement("i");
    playIcon.classList.add("fa-solid", "fa-play");
    startBtn.appendChild(playIcon);
    startBtn.appendChild(document.createTextNode(" Start"));
    
    startBtn.classList.remove('stop-btn');
    is_start_clicked = false;
    timesCount = 0;

    document.querySelector('.split-btn')?.remove();
    document.querySelector('.reset-btn')?.remove();
    let split = document.querySelectorAll('.split-box');
    for (var i = 0; i < split.length; i++) {
        split[i].remove();
    }

    for (var i=0; i<times.length; i++) {
        times[i].classList.remove('splitscreen-times');
        texts[i].classList.remove('splitscreen-texts');
    }
}

function split_stopwatch() {
    for (var i=0; i<times.length; i++) {
        times[i].classList.add('splitscreen-times');
        texts[i].classList.add('splitscreen-texts');
    }

    const splitTime = document.createElement('div');
    timesCount++;
    splitTime.classList.add('split-box', 'split-times');
    let e1 = document.createElement('span');
    let e2 = document.createElement('span');
    let e3 = document.createElement('span');
    let hour = hour_time.textContent != 0? hour_time.textContent+':':'';
    let minute = minute_time.textContent != 0? minute_time.textContent+':':'';
    let second = second_time.textContent != 0? second_time.textContent:'';

    let hour_h = hour_time.textContent != 0? hour_time.textContent-hour+':':'';
    let minute_m = minute_time.textContent != 0? minute_time.textContent-minute+':':'';
    let second_s = second_time.textContent != 0? second_time.textContent-second:'';

    e1.textContent = `0${timesCount}.`;
    e2.textContent = `${hour}${minute}${second}.${milisec.textContent}`;
    e3.textContent = `${hour_h}${minute_m}${second_s}.${milisec.textContent}`;
    splitTime.appendChild(e1);
    splitTime.appendChild(e2);
    splitTime.appendChild(e3);
    split_screen.appendChild(splitTime);
}

document.querySelector('.start-btn').addEventListener('click', function () {
    if (!is_start_clicked) {
        is_start_clicked = true;
        this.innerHTML = '';
        let stopIcon = document.createElement("i");
        stopIcon.classList.add("fa-solid", "fa-stop");
        this.appendChild(stopIcon);
        this.appendChild(document.createTextNode(" Stop"));
        this.classList.add('stop-btn');
        start_stopwatch();

        const buttonContainer = document.querySelector('.button-container');

        if (!document.querySelector('.split-btn')) {
            const splitBtn = document.createElement('button');
            let splitIcon = document.createElement("i");
            splitIcon.classList.add("fa-solid", "fa-flag");
            splitBtn.appendChild(splitIcon);
            splitBtn.appendChild(document.createTextNode(" Split"));
            splitBtn.classList.add('split-btn', 'buttons');
            splitBtn.addEventListener('click', split_stopwatch);
            buttonContainer.appendChild(splitBtn);
        }

        if (!document.querySelector('.reset-btn')) {
            const resetBtn = document.createElement('button');
            let resetIcon = document.createElement("i");
            resetIcon.classList.add("fa-solid", "fa-rotate-left");
            resetBtn.appendChild(resetIcon);
            resetBtn.appendChild(document.createTextNode(" Reset"));
            resetBtn.classList.add('reset-btn', 'buttons');
            resetBtn.addEventListener('click', reset_stopwatch);
            buttonContainer.appendChild(resetBtn);
        }
    } else {
        is_start_clicked = false;
        this.innerHTML = '';
        let continueIcon = document.createElement("i");
        continueIcon.classList.add("fa-solid", "fa-play");
        this.appendChild(continueIcon);
        this.appendChild(document.createTextNode(" Continue"));
        this.classList.remove('stop-btn');
        stop_stopwatch();
    }
});