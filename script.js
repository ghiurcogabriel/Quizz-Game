const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn');

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () =>{
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
};

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
};

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    };
};

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide'); 
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide'); 
    };
};

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
};

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

// const questions = [
//     {
//         question: "Ce f??ceau romanii pentru a ??ine bolile la distan?????",
//         answers : [
//             { text: "Purtau amulete ??n form?? de penisuri zbur??toare", correct: true },
//             { text: "Frecau tocurile u??ilor cu lapte matern", correct: false },
//             { text: "F??ceau sex diminea??a, ??nainte de r??s??ritul soarelui", correct: false }
//         ],
//     },
//     {
//         question: "??n timpul nop??ii, b??rba??ii viseaz?? cu prec??dere...",
//         answers : [
//             { text: "al??i b??rba??i", correct: true },
//             { text: "al??i b??rba??i", correct: false },
//             { text: "c?? m??n??nc??", correct: false }
//         ],
//     },
//     {
//         question: "Cum po??i preveni c??derea pic??turilor de cear?? de pe o lum??nare aprins???",
//         answers : [
//             { text:"L??s??nd lum??narea la soare", correct: false },
//             { text: "Frec??nd lum??narea cu unt", correct: false },
//             { text: "Scufund??nd lum??narea ??n ap?? s??rat??", correct: true }
//         ],
//     },
//     {
//         question: "Triskaidekafobia este:",
//         answers : [
//             { text: "frica de a face baie", correct: false },
//             { text: "frica de num??rul 13", correct: true },
//             { text: "frica de culoarea galben", correct: false }
//         ],
//     },
//     {
//         question: "??n 2022 va avea loc lansarea:",
//         answers : [
//             { text: "primului robot care va avea capaciatea s?? poarte un dialog ??i s?? fac?? menaj u??or", correct: false },
//             { text: "primului detector de minciuni pentru uz casnic", correct: false },
//             { text: "primului film cu o durat?? de 720 de ore", correct: true }
//         ],
//     },
// ];