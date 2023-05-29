var userChoice;
var userScore = 0;
var opponentChoice;
var opponentScore = 0;

//for the game rounds
var roundCount = 0;
const totalRounds = 3;
var userTotalScore = 0;
var opponentTotalScore = 0;

const choiceOptions = 3;

var choices = ["rock", "paper", "scissor"]; //whatever the name of the image is

window.onload = function () {
	for (let i = 0; i < choiceOptions; i++) {
		//this creates <img> tag
		let choice = document.createElement("img");
		choice.id = choices[i];
		choice.src = choices[i] + ".svg";
		choice.addEventListener("click", selectChoice);
		document.getElementById("choices").appendChild(choice);
	}
};

function selectChoice() {
	roundCount++;

	userChoice = this.id;
	document.getElementById("user-choice").src = userChoice + ".svg";

	opponentChoice = choices[Math.floor(Math.random() * choiceOptions)];
	document.getElementById("opponent-choice").src = opponentChoice + ".svg";


	// the game logic
	if (userChoice === opponentChoice) {
		userScore += 1;
		opponentScore += 1;
		document.getElementById("gamestatus").textContent = "It's a tie";
	} else {
		if (opponentChoice === "rock") {
			if (userChoice === "paper") {
				userScore += 1;
				document.getElementById("gamestatus").textContent = "User Won";
			} else if (userChoice === "scissor") {
				opponentScore += 1;
				document.getElementById("gamestatus").textContent = "Opponent Won";
			}
		}
	}
	if (opponentChoice === "paper") {
		if (userChoice === "rock") {
			opponentScore += 1;
			document.getElementById("gamestatus").textContent = "Opponent Won";
		} else if (userChoice === "scissor") {
			userScore += 1;
			document.getElementById("gamestatus").textContent = "User Won";
		}
	} else if (opponentChoice === "scissor") {
		if (userChoice === "rock") {
			userScore += 1;
			document.getElementById("gamestatus").textContent = "User Won";
		} else if (userChoice === "paper") {
			opponentScore += 1;
			document.getElementById("gamestatus").textContent = "Opponent Won";
		}
	}

	// calculating the total score
	userTotalScore += userScore;
	opponentTotalScore += opponentScore;

	//displaying score
	document.getElementById("user-score").innerText = userScore;
	document.getElementById("opponent-score").innerText = opponentScore;

	// to end the game
	if (roundCount === totalRounds) {
		endGame();
		return;
	}
}

// end game
function endGame() {
	let gameResult = "";

	if (userTotalScore > opponentTotalScore) {
		gameResult = `User total score is ${userTotalScore}   so, User Won   and  Game Over `;
		document.getElementById("gamestatus").textContent = gameResult;
		document.getElementById("success-audio").play();
	} else if (userTotalScore < opponentTotalScore) {
		gameResult = ` Opponent total score is  ${opponentTotalScore}  so, Opponent Won   and  Game Over `;
		document.getElementById("gamestatus").textContent = gameResult;
		document.getElementById("gameover-audio").play();
	} else {
		gameResult = ` The scores are ${opponentTotalScore} & ${userTotalScore} - which makes it a draw and  Game Over `;
		document.getElementById("gamestatus").textContent = gameResult;
		document.getElementById("gameover-audio").play();
	}

	// Display the total score
	document.getElementById("user-total-score").innerText = userTotalScore;
	document.getElementById("opponent-total-score").innerText = opponentTotalScore;

	// Reset the game
	userScore = 0;
	opponentScore = 0;
	roundCount = 0;
	userTotalScore = 0;
	opponentTotalScore = 0;

	let choices = document.querySelectorAll("#choices img");
	choices.forEach((choice) =>
		choice.removeEventListener("click", selectChoice)
	);

	// Clear the displayed choices
	document.getElementById("user-choice").src = "";
	document.getElementById("opponent-choice").src = "";
}

document.getElementById("restart").addEventListener("click", restartGame);

function restartGame(){
	//reload the page 
	location.reload();
}