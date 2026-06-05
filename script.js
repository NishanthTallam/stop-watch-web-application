let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateTime() {
    elapsedTime = Date.now() - startTime;

    let milliseconds = elapsedTime % 1000;
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(3, "0");
}

document.getElementById("start").addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = "00:00:00:000";
    laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
    if (running) {
        const lapItem = document.createElement("li");
        lapItem.textContent =
            "Lap " + (laps.children.length + 1) +
            " - " + display.textContent;
        laps.prepend(lapItem);
    }
});