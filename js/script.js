// Pegar todos os elementos requisitados
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

// Botão iniciar
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //  mostra a informação
}

// Botão sair
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // oculta a informação
}

// Botão continuar
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // oculta a informação
    quiz_box.classList.add("activeQuiz"); // mostra o quiz
    showQuestions(0);
    questionsCounter(1);
    startTimer(20);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn")
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quiz_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 20;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    questionsCounter(que_numb);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    startTimer(timeValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Tempo";
}

quiz_quiz.onclick = () => {
    window.location.reload();
}

// Se o botão de continuar for clicado
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        questionsCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Tempo";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questões Concluídas!");
        showResultBox();
    }
}

// Pegar questões e opções do array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>'
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onClick", "optionSelected(this)")
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        console.log("Resposta Correta");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Resposta Incorreta");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // quando o usuario errar, ira ofertar a opção correta
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // quando o usuario errar ira desabilitar as opções
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero =  timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 39);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549) {
            clearInterval(counterLine);
        }
    }
}

function showResultBox() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3) {
        let scoreTag = '<span>Você conseguiu!<p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';     
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1) {
         let scoreTag = '<span>Mais ou Menos!<p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';     
         scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>Você conseguiu <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';     
        scoreText.innerHTML = scoreTag;
    }
}

// Contador de questões
function questionsCounter(index) {
    const bottom_ques_counter =  quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>de<p>'+ questions.length + '</p>Questões</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}