// for the score of the user and the opponent 
var userChoice;
var userScore = 0;
var opponentChoice;
var opponentScore = 0;

//for the game rounds variable declaration 
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
		document.getElementById("choices").append(choice);
		// document.getElementById("choices").classList.add("selected");
	}
};

// for the selection of the choice 
function selectChoice() {
	roundCount++;

	userChoice = this.id;
	document.getElementById("user-choice").src = userChoice + ".svg";
	document.getElementById("user-choice").classList.add("selected");

	// random generation for the opponent among the three choices
	opponentChoice = choices[Math.floor(Math.random() * choiceOptions)];
	document.getElementById("opponent-choice").src = opponentChoice + ".svg";
	document.getElementById("opponent-choice").classList.add("selected");

	
	
	// the game logic for choosing the rock paper scissor 
	if (userChoice === opponentChoice) {
		userScore += 1;
		opponentScore += 1;
		document.getElementById("gamestatus").textContent = " Round Status is It's a tie";
	} else { 
		if (opponentChoice === "rock") {
			if (userChoice === "paper") {
				userScore += 1;
				document.getElementById("gamestatus").textContent = " Round Status is: User Won";
			} else if (userChoice === "scissor") {
				opponentScore += 1;
				document.getElementById("gamestatus").textContent = " Round Status is: Opponent Won";
			}
		}
	}
	if (opponentChoice === "paper") {
		if (userChoice === "rock") {
			opponentScore += 1;
			document.getElementById("gamestatus").textContent = " Round Status is: Opponent Won";
		} else if (userChoice === "scissor") {
			userScore += 1;
			document.getElementById("gamestatus").textContent = " Round Status is: User Won";
		}
	} else if (opponentChoice === "scissor") {
		if (userChoice === "rock") {
			userScore += 1;
			document.getElementById("gamestatus").textContent = " Round Status is: User Won";
		} else if (userChoice === "paper") {
			opponentScore += 1;
			document.getElementById("gamestatus").textContent = " Round Status is: Opponent Won";
		}
	}

	// calculating the total score
	userTotalScore += userScore;
	opponentTotalScore += opponentScore;



	// to end the game
	if (roundCount === totalRounds) {
		setTimeout(endGame, 1000); // displaying result after 1 second
		return;
	}
	
}

// end game
function endGame() {
	let gameResult = "";

	if (userTotalScore > opponentTotalScore) {
		gameResult = `User's total score is ${userTotalScore}  - which makes User Win hence,  Game Over `;
		document.getElementById("gamestatus").textContent = gameResult;
		document.getElementById("success-audio").play();
	} else if (userTotalScore < opponentTotalScore) {
		gameResult = ` Opponent's total score is  ${opponentTotalScore} - which makes Opponent Win hence, Game Over `;
		document.getElementById("gamestatus").textContent = gameResult;
		document.getElementById("gameover-audio").play();
	} else {
		gameResult = ` The scores are ${opponentTotalScore} & ${userTotalScore} - which makes it a draw hence,  Game Over `;
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