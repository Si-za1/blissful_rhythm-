// getting all the elements 
const circleIn = document.querySelector(".circle-in");
const breathNumCount = document.querySelector(".breath-input");

const instructions = document.querySelector(".instructions");
const breathText = document.querySelector(".breaths-text");

let breathCount = 3; //default value for the breath

// the buttons 
const begin = document.querySelector(".start");
const stop =document.querySelector(".stop")

// for the breathing sound 
const breathInSound = new Audio("breathe-in.mp3");
const breathHoldSound = new Audio("breath-hold.mp3");
const breathExhaleSound = new Audio("brethe-out.mp3");


// now for the user to select the breath count

breathNumCount.addEventListener("change", () => {
	breathCount = breathNumCount.value;
	breathText.innerText = breathCount;
});

//for the circle transisition

const growCircle = () => {
	circleIn.classList.add("circle-grow");
	setTimeout(() => {
		circleIn.classList.remove("circle-grow");
	}, 8000); // following the 4-4-4 method for breathing
};

// breathing instructions
const breathTextChange = () => {
	breathCount--;
	breathText.innerText = breathCount;
	instructions.innerText = "Breath In";
    breathInSound.play();
	setTimeout(() => {
		instructions.innerText = "Hold Breath";
        breathHoldSound.play();

		setTimeout(() => {
			instructions.innerText = "Exhale Breath Slowly";
            breathExhaleSound.play();
		}, 4000);
	}, 4000);
};

// to count only till 3 or 5 or 7

const breathApp = () => {
	const breathAnimate = setInterval(() => {
		if (breathCount === 0) {
			clearInterval(breathAnimate);
			instructions.innerText = "Click 'Begin' to start another session!";
			begin.classList.remove("button-inactive");
			breathCount = breathNumCount.value;
			breathText.innerText = breathCount;
			return;
		}

		growCircle();
		breathTextChange();
	}, 12000);
};

// breathing start
begin.addEventListener("click", () => {
	begin.classList.add("button-inactive");
	instructions.innerText = "Get relaxed, and ready to begin breathing";
	setTimeout(() => {
		instructions.innerText = "Breathing is about to begin...";
		setTimeout(() => {
			breathApp();
			growCircle();
			breathTextUpdate();
		}, 2000);
	}, 2000);
});

//to stop the overall breathing session 
stop.addEventListener("click", ()=>{
	location.reload()
})