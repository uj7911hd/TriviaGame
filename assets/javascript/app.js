$(document).ready(function() {
    var options = [{
            question: "Which country has the rand as its currency?",
            choice: ["Ethiopia", "South Africa", "Nigeria", "Egypt"],
            answer: 1,

        },
        {
            question: "Which volcano in Tanzania is the highest mountain in Africa?",
            choice: ["Nyiragongo", "Bisoke", "Kilimanjaro", "Meru"],
            answer: 2,

        },
        {
            question: "Name the East African country which lies on the equator?",
            choice: ["Eritrea", "Somalia", "Tanzania", "Kenya"],
            answer: 3,

        },
        {
            question: "What is the capital of Sierra Leone?",
            choice: ["Freetown", "Makeni", "Bo", "Kabala"],
            answer: 0,

        },
        {
            question: "Which country is the island of Zanzibar part of?",
            choice: ["Tanzania", "Algeria", "Tunisia", "Mozambique"],
            answer: 0,

        },
        {
            question: "What is Africa's largest country?",
            choice: ["Egypt", "Sudan", "South Africa", "Nigeria"],
            answer: 1,

        },
        {
            question: "What is the capital of Kenya?",
            choice: ["Naivasha", "Malindi", "Mombasa", "Nairobi"],
            answer: 3,

        },
        {
            question: "Who won the last African Cup of Nations?",
            choice: ["Cameroon", "Nigeria", "Ghana", "Egypt"],
            answer: 0,

        }
    ];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function() {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for (var i = 0; i < options.length; i++) {
                holder.push(options[i]);
            }
        })
        //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");

        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        //	if (pick.shown) {
        //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
        //		displayQuestion();
        //	} else {
        //		console.log(pick.question);
        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		}
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function() {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");


            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");

            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})