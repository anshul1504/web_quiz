//document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
//getting required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer .timer_sec");
const timeLine = document.querySelector("header .time_line");
const timeOff = document.querySelector("header .time_text");
const result_box = document.querySelector(".result_box");



//on click of start quiz button
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");  //show info box
}
//on click of exit button
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");   //hide info box
}
//on click of continue button
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");  //hide the info box
    quiz_box.classList.add("activeQuiz");      // show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
     que_count = 0;
     que_numb = 1;
     timeValue = 15;
     widthValue = 0;
     userScore = 0;
    showQuestions(que_count);
    queCounter( que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time left";

}

quit_quiz.onclick = ()=>{
   // learInterval(counter);
    //clearInterval(counterLine);
    window.location.reload();
}
const next_btn = quiz_box.querySelector("footer .next_btn");

//const buttom_ques_counter = document.querySelector("footer .total_que");

//if next button is clicked

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter( que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time left";


    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log('Questions Completed');
        showResultBox();
    }
}

//getting questions and options from array

function showQuestions(index){
    const que_text = document.querySelector(".quiz_text");
    let que_tag = '<span>'+questions[index].numb+'.'+ questions[index].question +'</span>';
    let option_tag = '<div class ="option">'+questions[index].options[0]+'<span></span></div>'
                     +'<div class ="option">'+questions[index].options[1]+'<span></span></div>'
                     +'<div class ="option">'+questions[index].options[2]+'<span></span></div>'
                     +'<div class ="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    //--------option_list--------
    // set onclick attribute to all available options
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onClick" , "optionSelected(this)");  //this-option
    }
}

let tickIcon = ' <div class="icon tick"> <i class="fas fa-check"></i></div> ';
let crossIcon =' <div class="icon cross"> <i class="fas fa-times"></i></div>';

//showing right/wrong answer
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns= answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log('Answer is correct');
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log('Answer is wrong');
        answer.insertAdjacentHTML("beforeend",crossIcon);

      //if answer is incorrect then automatically selected the correct answer.
    for (let i = 0; i < allOptions; i++) {
        if( option_list.children[i].textContent == correctAns){
              option_list.children[i].setAttribute("class","option correct");
              option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }
//disabling other options
for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = "<span>and Congrats!!, Your score is <p>"+ userScore+"</p>out of<p>"+questions.length+"</p></span>"
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = "<span>and  Nice, Your score is <p>"+ userScore+"</p>out of<p>"+questions.length+"</p></span>"
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = "<span>and Sorry, Your score is <p>"+ userScore+"</p>out of<p>"+questions.length+"</p></span>"
        scoreText.innerHTML = scoreTag;
    }

}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";


            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if( option_list.children[i].textContent == correctAns){
                      option_list.children[i].setAttribute("class","option correct");
                      option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                    }
                }
                for (let i = 0; i < allOptions; i++) {
                    option_list.children[i].classList.add("disabled");
                    }
                    next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
       time += 1;
       timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
         }
    }
}


//footer section
function queCounter(index){
    const buttom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag =  '<span><p>'+ index + '</p>of<p>'+ questions.length +'</p>Questions</span>';
    buttom_ques_counter.innerHTML = totalQuesCountTag;
}