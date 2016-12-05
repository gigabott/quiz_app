var Question = { Text: "", AnswerChoices: [], CorrectAnswerIndex: 0, CurrentlyDisplayed: false }
var state = { questions: [], score: 0, currentQuestion: 0 }
var question1 = Object.create(Question);
var question2 = Object.create(Question);
var question3 = Object.create(Question);
var question4 = Object.create(Question);
var question5 = Object.create(Question);
var question6 = Object.create(Question);
var question7 = Object.create(Question);
var question8 = Object.create(Question);
var question9 = Object.create(Question);
var question10 = Object.create(Question);
question1.Text = "Suppose Sarah's stock price is currently $50. In the next six months it will either fall to $30 or rise to $80. What is the option delta of a call option with an exercise price of $50?"; 
question1.AnswerChoices = ["0.375", "0.5.", "0.6", "0.75"]; 
question1.CorrectAnswerIndex = 2; 
question1.CurrentlyDisplayed = true;
state.questions.push(question1);

question2.Text = "Suppose David's stock price is currently $20. In the next six months it will either fall to $10 or rise to $30. What is the present value of a put option with an exercise price of $12? The six-month risk-free interest rate is 5% (periodic rate)."; 
question2.AnswerChoices = ["$9.78", "$2.00.", "$0.86", "$9.43"]; 
question2.CorrectAnswerIndex = 2; 
state.questions.push(question2);

question3.Text = "The Black–Scholes option pricing model is dependent on what five parameters?"; 
question3.AnswerChoices = ["Stock price, exercise price, risk free rate, beta, and time to maturity", "Stock price, risk free rate, beta, time to maturity, and variance", "Stock price, risk free rate, probability, variance, and exercise price", "Stock price, exercise price, risk free rate, variance, and time to maturity"]; 
question3.CorrectAnswerIndex = 3; 
state.questions.push(question3);

question4.Text = "A call option is in the money when?"; 
question4.AnswerChoices = ["Exercise price is greater than the stock price", "Exercise price is lower than the stock price", "Exercise price is equal to the stock price", "None of these options"]; 
question4.CorrectAnswerIndex = 1; 
state.questions.push(question4);

question5.Text = "Which of the following is not a method used to terminate an option position?"; 
question5.AnswerChoices = ["Exersize", "Sell the option.", "Let the option expire", "Purchase a stock"]; 
question5.CorrectAnswerIndex = 3; 
state.questions.push(question5);

question6.Text = "To approximate the Black Scholes price with the binomial method you must"; 
question6.AnswerChoices = ["Create longer intervals", "Use shorter intervals.", "Adjust for volatility", "increase the discount rate"]; 
question6.CorrectAnswerIndex = 1; 
state.questions.push(question6);

question7.Text = "What feature of the option price prevents early exercise of American options in most circumstances?"; 
question7.AnswerChoices = ["Innterest rates", "Volatility", "Lack of liquid market", "Time premium"]; 
question7.CorrectAnswerIndex = 3; 
state.questions.push(question7);

question8.Text = "SWhen is the option worth the most given the following days until expiration, all else being equal?"; 
question8.AnswerChoices = ["10", "30", "60", "90"]; 
question8.CorrectAnswerIndex = 3; 
state.questions.push(question8);

question9.Text = "What is the value of a call option given the following variables? Stock price = $42, exercise price = $40, standard deviation = .32, risk free rate = .06, and 45 days until expiration."; 
question9.AnswerChoices = ["$3.20", "$3.01", "$2.56", "$2.33"]; 
question9.CorrectAnswerIndex = 0; 
state.questions.push(question9);

question10.Text = "What is the value of a call option given the following variables? Stock price = $60, exercise price = $65, standard deviation = .22, risk free rate = .03, and 90 days until expiration."; 
question10.AnswerChoices = ["$0.87", "$1.03", "$1.52", "$2.02"]; 
question10.CorrectAnswerIndex = 1; 
state.questions.push(question10);










function createQuestion(questionNum){
	var question= "<p class='userQuestion'>" + state.questions[questionNum].Text + "</p>"
	$('section').prepend(question)
}
function createAnswerChoices(questionNum){
	for (var ansCount in state.questions[questionNum].AnswerChoices){
		var answerChoices = "<li class ='answer' id='answer" + ansCount+ "'><input type='radio' name='ansChoice' value="+ansCount+">" +state.questions[questionNum].AnswerChoices[ansCount] + "</li>"
		$('ul').append(answerChoices)
	}
}


//Check user submitted answer 
function CheckAnswer(userAns, iterNum){
	var correctAnsIndex= state.questions[iterNum].CorrectAnswerIndex
	if (userAns== state.questions[iterNum].CorrectAnswerIndex){
		addCorrectAnswer(iterNum);
		UpdateScore	();
		updateQuestionNum();
	}
	else{
		addCorrectAnswer(iterNum);
		addYourAnswer(userAns)
		updateQuestionNum();	
	}
}

//Update Score if answer is correct 
function UpdateScore(){ 
state.score++; 
}

function updateQuestionNum(){
	state.currentQuestion++;
}

function removeQuestionAndAnswers(){
	$('.userQuestion').remove();
	$('li').remove();
}

function updateScoreDisplay	(){ 

		var scoreString= "<p class='runningTotal'>You have "+ state.score+ " points out of a possible " + state.currentQuestion+ "</p>"
		$('.runningTotal').remove();
		$('.scoreDisplay').append(scoreString);
}

function updateqNum	(){ 
		var questionCounter = 1 + state.currentQuestion;
		var qNum= "<p class='qNum'>Question "+ questionCounter+ " out of  " + state.questions.length+ "</p>"
		$('.qNum').remove();
		$('.scoreDisplay').prepend(qNum);
}

function checkEndOfQuiz(){
	if (state.currentQuestion==(state.questions.length-1)){
		removeQuestionAndAnswers();
		$('#submitButton').addClass('hidden');
		$('.endOfQuizMsg').removeClass('hidden')
	}
}


function changeButtonToContinue(){
	$('span').text("Click to continue")
	$('#submitButton').attr("id", 'continueButton')
	
}

function changeButtonToSubmit(){
	$('span').text("Submit your answer")
	$('#continueButton').attr("id", 'submitButton')
	
}

function addCorrectAnswer(iterNum){
	$('#answer'+state.questions[iterNum].CorrectAnswerIndex).append ("    (Correct Answer)")
}

function addYourAnswer(userAns){
	$('#answer'+userAns).append ("    (Your Answer)")
}





$(document).ready(function(){

//all your event handlers
	$('#startButton').click(function(){
		event.preventDefault();

		$('section').removeClass('hidden');
		$('#submitButton').removeClass('hidden');
		$('#startSection').addClass('hidden');
		$('#resetButton').removeClass('hidden');
		createQuestion(state.currentQuestion);
		createAnswerChoices(state.currentQuestion);
		updateqNum();	
	});

	$('.clickButtons').on('click', '#submitButton', function(){
		var userAns = $('input[name=ansChoice]:checked').val();
		CheckAnswer(userAns, state.currentQuestion);
		changeButtonToContinue();
		updateScoreDisplay();
		
	})

	// $('#continueButton').click(function(){
	$('.clickButtons').on('click', '#continueButton', function(){
		changeButtonToSubmit();
		updateqNum();
		removeQuestionAndAnswers();
		createQuestion(state.currentQuestion);
		createAnswerChoices(state.currentQuestion);
		checkEndOfQuiz();
	});




	$('#resetButton').click(function(){
		state.currentQuestion= 0;
		state.score=0;
		removeQuestionAndAnswers();
		$('#submitButton').removeClass('hidden');
		$('.endOfQuizMsg').addClass('hidden')
		createQuestion(state.currentQuestion);
		createAnswerChoices(state.currentQuestion);
		updateScoreDisplay();
		updateqNum();

	})


});
