const ground = document.getElementById("ground");
const score = document.getElementById("score");
const time = document.getElementById("time");
const report = document.getElementById("report");
const molesHitSpan = document.getElementById("molesHit");
const molesMissedSpan = document.getElementById("molesMissed");
const popup = document.getElementById("popup");
const popupScore = document.getElementById("popupScore");
const playAgainButton = document.getElementById("playAgainButton");

let place;
let initialTime = 120; // Set the initial time in seconds
let moleTime = 2000;
let showMoleTimer;
let playingTimeTimer;
let molesHit = 0;
let molesMissed = 0;

function gameOver() {
    clearInterval(showMoleTimer);
    clearInterval(playingTimeTimer);
    showReport();
    showPopup();
}

function playingTime() {
    if (initialTime <= 0) {
        gameOver();
        return;
    }

    const minutes = Math.floor(initialTime / 60);
    const seconds = initialTime % 60;
    time.innerText = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    initialTime--;
}

function updateTime() {
    const minutes = Math.floor(initialTime / 60);
    const seconds = initialTime % 60;
    time.innerText = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function clickListener(event) {
    if (event.target.style.backgroundImage) {
        score.innerText = Number(score.innerText) + 5; // Increase score by 5 when you hit the mole
        moleTime -= 120;
        molesHit++;
    } else {
        score.innerText = Number(score.innerText) - 2; // Decrease score by 2 when you miss the mole
        molesMissed++;
    }
    updateReport(); // Update the report when a mole is hit or missed
}

function showMole() {
    const selectedPlace = place[Math.floor(Math.random() * place.length)];
    selectedPlace.style.backgroundImage = "url('mole.PNG')";
    setTimeout(() => {
        selectedPlace.style.backgroundImage = "";
    }, moleTime);
}

function createBoard() {
    for (let i = 0; i < 16; i++) {
        ground.innerHTML += `<div class="place"></div>`;
    }
    place = document.getElementsByClassName("place");
    [...place].forEach(i => i.addEventListener("click", clickListener));
}

function startGame() {
    createBoard();
    showMoleTimer = setInterval(showMole, moleTime);
    playingTimeTimer = setInterval(playingTime, 1000);
}

function updateReport() {
    molesHitSpan.innerText = molesHit;
    molesMissedSpan.innerText = molesMissed;
}

function showReport() {
    updateReport();
    report.classList.remove("hidden");
}

function showPopup() {
    popupScore.innerText = score.innerText;
    popup.classList.remove("hidden");
}

playAgainButton.addEventListener("click", function () {
    initialTime = 120; // Reset the timer
    score.innerText = "0"; // Reset the score
    molesHit = 0;
    molesMissed = 0;
    updateTime(); // Update the displayed time
    report.classList.add("hidden");
    popup.classList.add("hidden");
    startGame();
});

updateTime(); // Initialize the displayed time
startGame();
