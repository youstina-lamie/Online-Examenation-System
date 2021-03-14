var timer2 = "05:10";

var questions = [{
    question: "1) Diane said she wouldn't like to travel in ______ helicopter. She doesn't think it's very safe.",
    choices: ["a", "an", "the", "_"],
    correctAnswer: "a"
}, {
    question: "2) We _____ in the morning",
    choices: ["don't come", "didn't come", "came not", "not came"],
    correctAnswer: "didn't come"
}, {
    question: "3) I hope that you _____ (have) a good time tomorrow.",
    choices: ["will have", "are having", "a&b"],
    correctAnswer: "will have"
}, {
    question: "4) Is Susan _____ home?",
    choices: ["in", "on", "at", "under"],
    correctAnswer: "at"
}, {
    question: "5) Do the childern go to school every day?'_____'",
    choices: ["Yes,they go.", "Yes,they do.", "They go.", "No,they don't go."],
    correctAnswer: "Yes,they do."
}, {
    question: "6) What _____ now?",
    choices: ["is the time", "does the time", "is time", "is it"],
    correctAnswer: "is the time"
}, {
    question: "7) They always go to school _____ bicycle",
    choices: ["with", "in", "on", "by"],
    correctAnswer: "by"
}, {
    question: "8) What color _____ his new car?",
    choices: ["have", "is", "does", "are"],
    correctAnswer: "is"
}, {
    question: "9) Are there many students in Room 12? '____'",
    choices: ["Yes there are.", "Yes,they are.", "Some are.", "No they aren't."],
    correctAnswer: "Yes there are."
}, {
    question: "10) Whose bicycle is it? it's '_____' ",
    choices: ["he", "her", "hers", "she"],
    correctAnswer: "hers"
}];
var current_page = 0;
var numPages = questions.length;
var score = 0;
var correctAnswers = [];
var choosenAnswrsArr = [];
var choosenValue;
var arrOfMarkedQuests = [];




window.onload = function() {
    for (let index = 0; index < questions.length; index++) {
        correctAnswers[index] = questions[index].correctAnswer;
    }
    changePage(current_page);

};


$(document).ready(function() {

    $('.quteform').on('click', function(e) {
        if (e.target.type === 'radio') {
            choosenAnswrsArr[current_page] = e.target.value;
            questions[current_page].checkedAns = e.target.value;
            console.log(choosenAnswrsArr, 'array el a5tyarat')
        }
    });

    $('#btn_next').on('click', function() {

        if (current_page < numPages) {

            current_page++;

            changePage(current_page);


        }

        $('.page-item').removeClass('disabled');

        $('.num').html(current_page + 1);
    })

    $('#btn_prev').on('click', function() {
        if (current_page > 0) {
            current_page--;

            changePage(current_page);
        }
        $('.num').html(current_page + 1);

    })

    $('.markbtn').on('click', function() {

        current_page = parseInt(current_page);

        if (arrOfMarkedQuests.length === 0) {
            arrOfMarkedQuests.push(current_page);
            var html = `<div class="markedQ p-2 m-2" data-value=${current_page}>Qustion No (${current_page + 1}) Marked</div>`;
            $('.markDiv').append(html);
        } else {

            if (jQuery.inArray(current_page, arrOfMarkedQuests) === -1) {
                arrOfMarkedQuests.push(current_page);
                var html = `<div class="markedQ p-2 m-2" data-value=${current_page}>Qustion No (${current_page + 1}) Marked</div>`;
                $('.markDiv').append(html);
            }
        }
    });

    $('.markDiv').on('click', function(e) {
        current_page = e.target.dataset.value;
        changePage(e.target.dataset.value);
        $(e.target).remove();
        $('.num').html(parseInt(e.target.dataset.value) + 1);
        arrOfMarkedQuests = jQuery.grep(arrOfMarkedQuests, function(value) {
            return value != current_page;
        });
    })

    $('.sub').on('click', function() {
        $('#questions').addClass('hide');
        $('.bestLuck').removeClass('hide');
        correctAnswers.map((a, index) => {
            if (choosenAnswrsArr[index] === a) {
                score += 1;
            }
        });
        html = `<h5 class="display-6 text-center align-middle text-light"> you Got :${score}/10</h5> `;
        $('.fscor').html(html);
        clearTimeout(timer);
    })
})


function startApp() {
    $('.background').addClass('hide');
    $('#questions').removeClass('hide');
    timeUp();
}

function showQues(question) {
    var htmlQ, htmlA;

    if ($('.quest').length != 0) {
        $('.questionBody').children($('.quest')).remove();
        $('.Ques').children('.quteform').children().remove();
    }
    htmlQ = `<p class="h3 mb-5 mt-5 quest">${question.question}</p>`;
    $('.questionBody').html(htmlQ);

    for (let index = 0; index < question.choices.length; index++) {
        if (question.choices[index] == choosenAnswrsArr[current_page]) {
            htmlA = `<div class="radiobtn" > <input type = "radio" checked id = "ans+${index}" name = "drone" value = "${question.choices[index]}" /> <label for = "ans+${index}" >${question.choices[index]}</label> </div>`;

        } else htmlA = `<div class="radiobtn" > <input type = "radio" id = "ans+${index}" name = "drone" value = "${question.choices[index]}" /> <label for = "ans+${index}" >${question.choices[index]}</label> </div>`;
        $('.quteform').append(htmlA)
    }
}


function changePage(page) {
    var btn_next = $("#btn_next");
    var btn_prev = $("#btn_prev");

    // Validate page
    if (page < 1) page = 0;
    if (page >= numPages) page = 9;

    var question = questions[page];
    showQues(question)
    if (page == 0) {
        btn_prev.css("visibility", "hidden");
    } else {
        btn_prev.css("visibility", "visible");
    }

    if (page == numPages - 1) {
        btn_next.css("visibility", "hidden");
    } else {
        btn_next.css("visibility", "visible");
    }
}


function timeUp() {

    var interval = setInterval(function() {
        var timer = timer2.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = (seconds < 0) ? --minutes : minutes;
        if (minutes < 0) clearInterval(interval);
        seconds = (seconds < 0) ? 59 : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        $('.countdown').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;


        if (minutes == 0 && seconds == 00) {

            $('.timeUp').removeClass('hide');
            $('#questions').addClass('hide');
            correctAnswers.map((a, index) => {
                if (choosenAnswrsArr[index] === a) {
                    score += 1;
                }
            });
            html = `<h5 class="display-6 text-center align-middle text-light"> you Got :${score}/10</h5> `;
            $('.fscor').html(html);
            clearInterval(interval);
        }
    }, 1000);
};