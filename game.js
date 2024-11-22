let cNum;
let attempt;
let currentLevel;
let gameMode;
let totalHints = 0;
const maxAttempts = [10, 7, 4];
const attemptData = document.getElementById("Attempt");
const userinp = document.getElementById("inp");
const subBtn = document.getElementById("submit");
const resBtn = document.getElementById("resBtn");
const messege = document.getElementById("msg");
const hint = document.getElementById("hint");
const hintBtn = document.getElementById("hintBtn");
const hintCount = document.getElementById("hintCount");
const hintsLeft = document.getElementById("hintsLeft");
const openGameBtn = document.getElementById("openGameBtn");
const levelsGameBtn = document.getElementById("levelsGameBtn");
const levelIndicator = document.getElementById("levelIndicator");

function initGame(mode = "open", level = 0) {
    gameMode = mode;
    currentLevel = level;
    cNum = Math.floor(Math.random() * 100) + 1;
    attempt = 0;
    attemptData.innerHTML = attempt;
    resBtn.style.display = "none";
    hintBtn.style.display = "none";
    hintsLeft.style.display = "none";
    messege.innerHTML = "";
    userinp.value = "";
    hint.style.display = "none";
    
    if (mode === "levels") {
        levelIndicator.style.display = "block";
        levelIndicator.innerHTML = `Level ${currentLevel + 1}`;
    } else {
        levelIndicator.style.display = "none";
    }
}

function check() {
    const userNum = parseInt(userinp.value);
    if (userNum < 1 || userNum > 100 || isNaN(userNum)) {
        messege.innerHTML = "Please enter a number between 1 and 100!";
        messege.style.color = "orange";
        return;
    }

    if (cNum === userNum) {
        messege.innerHTML = "Congratulations, you got the number!";
        messege.style.color = "green";

        if (gameMode === "levels" && currentLevel < 2) {
            messege.innerHTML += " Moving to next level!";
            currentLevel++;
            setTimeout(() => initGame("levels", currentLevel), 2000);
        } else {
            messege.innerHTML += " You have won the game!";
            resBtn.style.display = "block";
            if (gameMode === "levels") {
                totalHints++;
                hintBtn.style.display = "block";
                hintsLeft.style.display = "block";
                hintCount.innerHTML = totalHints;
                setTimeout(() => initGame("levels", 0), 5000); // Redirect to Level 1
            }
        }
    } else if (cNum < userNum) {
        messege.innerHTML = "Too high! Try again.";
        messege.style.color = "red";
  
    } else {
        messege.innerHTML = "Too low! Try again.";
        messege.style.color = "red";

    }

    attempt++;
    attemptData.innerHTML = attempt;

    if (gameMode === "levels" && attempt >= maxAttempts[currentLevel]) {
        messege.innerHTML = `You've exceeded the maximum attempts for Level ${currentLevel + 1}. Game over.`;
        resBtn.style.display = "block";

    }

    setTimeout(() => {
        userinp.value = "";
        messege.innerHTML = "";
    }, 2000);
}

function showHint() {
    if (totalHints > 0) {
        hint.style.display = "block";
        hint.innerHTML = `Hint: The number is between ${cNum - 10} and ${cNum + 10}`;
        totalHints--;
        hintCount.innerHTML = totalHints;
        if (totalHints === 0) {
            hintBtn.style.display = "none";
        }
    }
}

function restart() {
    initGame(gameMode, currentLevel);
}

subBtn.addEventListener("click", check);
resBtn.addEventListener("click", restart);
hintBtn.addEventListener("click", showHint);
openGameBtn.addEventListener("click", () => initGame("open"));
levelsGameBtn.addEventListener("click", () => initGame("levels", 0));

initGame("open"); // Default to Open Game mode
