// Main Quiz App JS 
// Approach: single MyAPP variable with all the info

// Instantiate new empty object
var quizApp = {};

// Pseudo Code:
// 1- Random Variables for cycling between the questions  ( check )
// 2- Contain all of our question data 	( check )
// 3- Fill in the html template to show the data  	( this.render() )
// 4- A way to handle user input  	( this.bindUI )
// 5- A way to go to next questions  ( this.processInput )
// 6- Display current place in quiz ( this.processInput calls render ).

// Start Code
// 1- Random Variables for cycling between the questions
quizApp.currentQuestion = 0;
quizApp.totalCorrect = 0;

//ADDED GLOBAL VARIABLE UI BIND ******************
var qcontainer = $("#question-container");
var scoreCard = $('#scorecard');
var acontainerHTML= $('.images') [0];
var acontainer = $(acontainerHTML);
var next= $('#next'); 

// 2- Contain all of our question data
quizApp.questionData = [
		{
            "question" : "Talent is luck. The important thing in life is courage.",
            "image" : "images/woody-allen2.jpg",
            "choices" : [
                            "David Carradine",
                            "Woody Allen",
                            "Jean Luc Godard",
                            "Alfred Hitchcock",
                            "Kurt Vonnegut",
                            "Oscar Wilde"
                        ],
            "correct" : 1,
            
        },
        {
            "question" : "If you cannot be the poet be the poem.",
            "image" : "images/david-carradine2.jpg",
            "choices" : [
                            "David Carradine",
                            "Woody Allen",
                            "Jean Luc Godard",
                            "Alfred Hitchcock",
                            "Kurt Vonnegut",
                            "Oscar Wilde"
            				
                        ],
            "correct" : 0,
            
        },
        {
            "question" : "Self –plagarism is style.",
            "image" : "images/alfred-hitchcock2.jpg",
            "choices" : [
                            "David Carradine",
                            "Woody Allen",
                            "Jean Luc Godard",
                            "Alfred Hitchcock",
                            "Kurt Vonnegut",
                            "Oscar Wilde"
                        ],
            "correct" : 3,
            
        },
          {
            "question" : "Its not where you take things from its where you take them too.",
            "image" : "images/Jean-Luc-Godard2.jpg",
            "choices" : [
                            "David Carradine",
                            "Woody Allen",
                            "Jean Luc Godard",
                            "Alfred Hitchcock",
                            "Kurt Vonnegut",
                            "Oscar Wilde"
                        ],
            "correct" : 2,
           
        },
          {
            "question" : "Be yourself, everyone else is already taken.",
            "image" : "images/oscar-wilde2.jpg",
            "choices" : [
                            "David Carradine",
                            "Woody Allen",
                            "Jean Luc Godard",
                            "Alfred Hitchcock",
                            "Kurt Vonnegut",
                            "Oscar Wilde"
                        ],
            "correct" : 5,
            
        },
         {
            "question" : "To practice any art no matter how well or how badly is a way to make your soul grow. So do it",
            "image" : "images/KURT-VONNEGUT2.jpg",
            "choices" : [
                            "David Carradine",
                            "Woody Allen",
                            "Jean Luc Godard",
                            "Alfred Hitchcock",
                            "Kurt Vonnegut",
                            "Oscar Wilde"
                        ],
            "correct" : 4,
            
        }
];

quizApp.init = function(){


	// Prints content to the page
//	this.render();

	// Prepares bindings on elements for event handlers
	this.bindUI();

	this.render();
	
}

// 3- Fill in the html template to show the data
// 3a - Need tp create the template
// 3b - Need to add it to the page with the question data
quizApp.render = function(){
	// Setting where we will add content
	//var qcontainer = $("#question-container");

	// Empty question wrapper before adding content ie each question
	
	//acontainer.empty();

	acontainer.css({'background-image': ''})
	acontainer.fadeIn(600);
	qcontainer.empty();
	qcontainer.fadeIn(600);

	acontainer.css({'background-image': ''});

	//acontainer.fadeOut(1500);
//currentQuestionData++;


	// Get the content for the current question
	var currentQuestionData = quizApp.questionData[quizApp.currentQuestion]; // quizApp.currentQuestion = 0;

	// Create the html for the question template
	var questionTemplate = "";
	//	questionTemplate = "<p class='score'>"+ this.totalCorrect +" out of "+ this.questionData.length +"</p>";
		questionTemplate += "<p class='questionText'>"+ currentQuestionData.question +"</p>";
	//	questionTemplate += "<img class='images' src="+currentQuestionData.image+">";

	// Creating html for choices radio buttons
	var choicesHTML = "<form id='choices'>";

	// NOTE: Structure for jQuery each function.
	// $.each( collection, callback( counter, item ) );

	// Adds the array items the choices html string
	$.each( currentQuestionData.choices, function( counter, choice ){
		choicesHTML += "<input type='radio' name='mustbesamename' value='"+counter+"' />" + choice + "<br />"; // "<label for =''>" ++ "</label><br />";
	});

	// Adds submit button and closing form tag to choices template
	choicesHTML += "<input type='button' id='checkAnswer' value='submit' /></form>";
	
	// Adds chioces template to main template
	questionTemplate += choicesHTML;

	// Adds Explanation text to main template (hidden by default)
	//questionTemplate += "<p class='explanation'>"+currentQuestionData.explanation+"</p>";


	// Add template to the page
	qcontainer.append(questionTemplate);


	
};

// 4- A way to handle user input
quizApp.bindUI = function(){
	// Binding the processInput function to submit button
	$(document).on('click', '#checkAnswer', quizApp.processInput );

	// Prevent form from submitting
	$(document).on('submit', '#choices', function(event){ event.preventDefault(); });


	/** 
	 * NOTE: You may want to add a "next" link instead of making this a click on the image.
	 * I say this because in the way you had it originally, this would re-run the render function
	 * without updating the currentQuestion, so it just goes back to the first.
	 * 
	 */

	// Click handler for images
	// $(document).on('click', '.images', quizApp.processInput );
};

// 5- A way to go to next questions
quizApp.processInput = function(event){
	// Cancel form submission
	event.preventDefault();

	// Get the info for the current question
	var currentQuestionData = quizApp.questionData[quizApp.currentQuestion];

	// Get the current selected choice and turn string '0' into a numnber 1
	var selectedItem = parseInt($(":checked").val(), 10);
	
	// check if selected & Compare it to the correct answer 
	if ( isNaN(selectedItem) ){ 
		alert("Please select an answer");
		return;
	}

	if( selectedItem == currentQuestionData.correct ){
		// Increment correct answers if correct
		quizApp.totalCorrect++;	

	} 
	// 	Increment current question counter regardless of correctness
	

	// Prepare container for content
//	acontainer.empty();
//	acontainer.fadeIn(500);


	// Prepare answer template
	/** 
	 * NOTE: Notice how i changed the answer template setup. 
	 * You already have access to the acontainer object, so you can change the css on it via jquery
	 * instead of trying to make a string.
	 */

	// acontainer.empty();
	

	acontainer.css({'background-image': 'url("'+currentQuestionData.image+'")'}).fadeIn(900).append("<button id='next'>Next</button>");

	$(document).on('click', '#next' , function(){
	 	acontainer.css({'background-image': ''});
	 	$('#next').remove();
	 	 quizApp.currentQuestion++;
	 	
      quizApp.render();
       console.log('clicked');
    });

	
		

	




	//qcontainer.empty();
	// acontainer.append(answerTemplate);


//acontainer.fadeOut(1500);

	// 6- Display current place in quiz.
	// Update UI to show current results
	

	var doneTemplate ="";

	doneTemplate = "You've answered " + quizApp.currentQuestion +" out of "+ quizApp.questionData.length + " questions" ;

	scoreCard.text(doneTemplate);
	qcontainer.fadeOut(1600);

	//$('#finalscore').fadeIn( 600, function(){
		setTimeout(function(){
			// Render Next question if there is a next question
			if( quizApp.questionData.length > quizApp.currentQuestion ){
				quizApp.render();
			} else {
				//alert("You've reached the end of the quiz" );
				quizApp.finalScore();
				return;
			}
		}, 1500);
	};




quizApp.finalScore = function(){

	qcontainer.empty();
	scoreCard.empty();
	var finalscore= $('#finalscore');
	//$('.bgImg').fadeIn(1000);
	$('#background').addClass('bgImg');

		scoreTemplate = "You scored "+quizApp.totalCorrect +" out of "+ quizApp.questionData.length ;

	finalscore.text(scoreTemplate);
		

	};



// Get Page ready to go
$(document).ready(function(){

	// Do stuff after DOM content has been loaded
	quizApp.init();
	
})







