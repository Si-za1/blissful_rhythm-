// variable declarations
	let button = document.getElementById("calculate");
	let refresh=document.getElementById("refresh");

// for the event listener 
	button.addEventListener("click", calculateLove);


//now to calculate the love percentage
function calculateLove() {
	let yourName = document.getElementById("your-name").value;
	let crushName = document.getElementById("crush-name").value;

	if (yourName != "" && crushName != "") {
		let lovePercentage = Math.floor(Math.random() * 101); // between 0 and 100
		document.getElementById("result").innerText =
			yourName +
			"  " +
			"and" +
			"  " +
			crushName +
			" " +
			"have the love chances of :";

		document.getElementById("result-percentage").textContent = lovePercentage.toString() + "%";
	}
}

// for the refresh button

refresh.addEventListener("click", ()=>{
	location.reload();
})