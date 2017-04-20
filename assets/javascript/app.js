$(document).ready(function() {
// function which creates start button & initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>START</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//function, generateHTML(), triggered by start button, generate the HTML

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();
    timerWrapper();
});

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");
        clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p shadow'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center shadow'>Time is up!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p shadow'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center shadow'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p shadow'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center shadow'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p shadow'>Time Remaining: <span class='timer'>30</span></p><p class='text-center shadow'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p shadow'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center shadow'>All done, here is your final score!" + "</p>" + "<p class='summary-correct shadow'>Correct Answers: " + correctTally + "</p>" + "<p class='shadow'>Wrong Answers: " + incorrectTally + "</p>" + "<p class='shadow'>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Game!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What color are SpongeBob's Eyes?", "Who is SpongeBob's Best Friend?", "Where does SpongeBob Work?", "SpongeBob Never Passed What Type of School?", "Who is SpongeBob's Boss?", "What are SpongeBob and Patrick the biggest fans of?", "Who Was the Fry Cook Before SpongeBob?", "What Instrument Does SpongeBob Play?"];
var answerArray = [["Black", "Brown", "Blue", "Green"], ["Patrick", "Squidward", "Sandy", "Plankton"], ["Baywatch", "SandyBottom", "Krusty Krab", "Plankton's"], ["Cooking","Grammar","Beauty","Boating"], ["Eugene Krabs", "Squidward Tentacles", "Pearl", "Plankton"], ["David Hasselhoff","Gary the Snail","Mermaid Man and Barnacle Boy","Plankton's Computer Wife"], ["Jim", "Pete", "Dave", "Cali"], ["Drums","Banjo","Recorder","His Nose"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/spongebobsquarepants.jpeg'>", "<img class='center-block img-right' src='assets/images/patrick.jpeg'>", "<img class='center-block img-right' src='assets/images/Krusty_Krab.jpeg'>", "<img class='center-block img-right' src='assets/images/boatingSchool.jpeg'>", "<img class='center-block img-right' src='assets/images/krabs.jpeg'>", "<img class='center-block img-right' src='assets/images/merman.jpeg'>", "<img class='center-block img-right' src='assets/images/jim.png'>", "<img class='center-block img-right' src='assets/images/noseFlute.jpeg'>"];
var correctAnswers = ["C. Blue", "A. Patrick", "C. Krusty Krab", "D. Boating", "A. Eugene Krabs", "C. Mermaid Man and Barnacle Boy", "A. Jim", "D. His Nose"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/audio/Spongebob-remix.mp3");