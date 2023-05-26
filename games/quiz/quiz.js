const questionElement = document.getElementById("questions");
const options = document.getElementsByClassName(".options");
const answerElement = document.querySelectorAll(".answer");
const questionNumberElement = document.getElementById("question-number");

const submitButton = document.getElementById("submit");

const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");

const data = [
	{
		question: "What is the capital of France?",
		a: "Paris",
		b: "London",
		c: "Berlin",
		d: "Rome",
		correct: "a",
	},

	{
		question: "Who is the author of the Harry Potter book series?",
		a: "J.R.R. Tolkien",
		b: "J.K. Rowling",
		c: "George R.R. Martin",
		d: "Stephen King",
		correct: "b",
	},

	{
		question: "Which country is known as the 'Land of the Rising Sun'?",
		a: "China",
		b: "Japan",
		c: "India",
		d: "Australia",
		correct: "b",
	},

	{
		question: "What is the largest ocean on Earth?",
		a: "Atlantic Ocean",
		b: "Indian Ocean",
		c: "Arctic Ocean",
		d: "Pacific Ocean",
		correct: "d",
	},

	{
		question: "Who painted the Mona Lisa?",
		a: "Leonardo da Vinci",
		b: "Pablo Picasso",
		c: "Vincent van Gogh",
		d: "Michelangelo",
		correct: "a",
	},

	{
		question:
			"Who is the famous physicist who developed the theory of relativity?",
		a: "Isaac Newton",
		b: "Albert Einstein",
		c: "Stephen Hawking",
		d: "Galileo Galilei",
		correct: "b",
	},

	{
		question: "What is the chemical symbol for gold?",
		a: "Ag",
		b: "Au",
		c: "Fe",
		d: "Hg",
		correct: "b",
	},

	{
		question: "Which planet is known as the Red Planet?",
		a: "Mars",
		b: "Jupiter",
		c: "Venus",
		d: "Mercury",
		correct: "a",
	},
	{
		question: "What is the largest organ in the human body?",
		a: "Skin",
		b: "Heart",
		c: "Liver",
		d: "Lungs",
		correct: "a",
	},
];

// quiz logic
shuffleArray(data);

let currentScore = 0;
let currentQuiz = 0;
let quizGameData;
playQuiz();

function playQuiz() {
	selectAnswers();

	quizGameData = data[currentQuiz];

	questionNumberElement.innerText = `${currentQuiz + 1}`;
	questionElement.innerText = quizGameData.question;

	questionElement.innerText = quizGameData.question;
	optionA.innerText = quizGameData.a;
	optionB.innerText = quizGameData.b;
	optionC.innerText = quizGameData.c;
	optionD.innerText = quizGameData.d;
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// now to make all the radio box unchecked
function selectAnswers() {
	answerElement.forEach((answerElement) => (answerElement.checked = false));
}

function chooseAnswer() {
	let answer;
	answerElement.forEach((answerElement) => {
		if (answerElement.checked) {
			answer = answerElement.id;
		}
	});

	return answer;
}


// submit button logic 

submitButton.addEventListener("click", () => {
	const answer = chooseAnswer();

	if (answer) {
		if (answer === quizGameData.correct) {
		  currentScore++;
		}
	
		currentQuiz++;
	
		if (currentQuiz < data.length) {
		  playQuiz();
		} else {
		  endQuiz();
		}
	  }
	
	  const buttonSound = new Audio("sound.mp3"); 
	  buttonSound.play();
	});
	
	function endQuiz() {
	  quiz.innerHTML = `
		<h2> You scored ${currentScore} out of ${data.length} questions correctly </h2>
		<button onclick="location.reload()"> Play more ! </button>
	  `;
	}
