const workTitle = document.getElementById("work");
const shortTitle = document.getElementById("sbreak");
const longTitle = document.getElementById("lbreak");

// for the work time
const min = document.getElementById("minutes");
const sec = document.getElementById("seconds");

// for the short break time

const shortMinute = document.getElementById("sm");
const shortSecond = document.getElementById("ss");

//for the long break time

const longBreak = document.getElementById("lm");
const longSecond = document.getElementById("ls");

// for the buttons
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

// variables declarations
var startTimer;
let currentBreak = "";
let breakType = "";

// for the start button when pressed

start.addEventListener("click", function () {
	if (startTimer === undefined) {
		if (currentBreak === "short") {
			startTimer = setInterval(shortBreakTimer, 1000);
		} else if (currentBreak === "long") {
			startTimer = setInterval(longBreakTimer, 1000);
		} else {
			startTimer = setInterval(timer, 1000);
		}

		var sound = document.getElementById("sound");
		sound.play();

		// Disable pause and reset buttons
		pause.disabled = false;
		reset.disabled = false;
		start.disabled = true;
		console.log(startTimer);
	} else {
		alert("Your time is running out");
	}
});

// for the reset button
reset.addEventListener("click", function () {
	min.textContent = 25;
	sec.textContent = "00";
	stopInterval();
	startTimer = undefined;


// for the sound to be stopped when reset is pressed 
	start.disabled = false;
	pause.disabled = true;
	reset.disabled = true;

	shortMinute.textContent = 5;
	shortSecond.textContent = "00";

	longBreak.textContent = 15;
	longSecond.textContent = "00";

	shortTitle.classList.remove("active");
	longTitle.classList.remove("active");

	currentBreak = "";

	var sound = document.getElementById("sound");
	sound.pause();
	sound.currentTime = 0;
});

//for the pause button
pause.addEventListener("click", function () {
	stopInterval();
	startTimer = undefined;

	start.disabled = false;
	pause.disabled = true;
	reset.disabled = false;

	var sound = document.getElementById("sound");
	sound.pause();
});

// now for the timer function

function timer() {
	// for the pomodoro time
	if (sec.textContent != 0) {
		sec.textContent--;
	} else if (min.textContent != 0 && sec.textContent == 0) {
		sec.textContent = 59;
		min.textContent--;
	}

	if (min.textContent == 0 && sec.textContent == 0) {
		// Pause the timer
		stopInterval();
        setTimeout(function () {
            // Play the sound
        var sound = document.getElementById("endsound");
        sound.play();

		// Show the break options
		while (breakType !== "s" && breakType !== "l") {
			breakType = prompt(
				"Time's up! Take a break:\nEnter 'S' for a short break\nEnter 'L' for a long break"
			);

			if (breakType !== null) {
				breakType = breakType.toLowerCase();
			}
		}

		if (breakType !== null) {
			breakType = breakType.toLowerCase();
			if (breakType === "s") {
				// Start a short break
				startShortBreak();
			} else if (breakType === "l") {
				// Start a long break
				startLongBreak();
			}
		}
    }, 100);
	}
}

function startShortBreak() {
	currentBreak = "short";
	shortMinute.textContent = 5; // Reset short break minutes
	shortSecond.textContent = "00"; // Reset short break seconds
	startTimer = setInterval(shortBreakTimer, 1000);
}

function startLongBreak() {
	currentBreak = "long";
	longBreak.textContent = 15; // Reset long break minutes
	longSecond.textContent = "00"; // Reset long break seconds
	startTimer = setInterval(longBreakTimer, 1000);
}

function shortBreakTimer() {
	if (shortSecond.textContent != 0) {
		shortSecond.textContent--;
	} else if (shortMinute.textContent != 0 && shortSecond.textContent == 0) {
		shortSecond.textContent = 59;
		shortMinute.textContent--;
	}
}

function longBreakTimer() {
	if (longSecond.textContent != 0) {
		longSecond.textContent--;
	} else if (longBreak.textContent != 0 && longSecond.textContent == 0) {
		longSecond.textContent = 59;
		longBreak.textContent--;
	}
}

function stopInterval() {
	clearInterval(startTimer);
}