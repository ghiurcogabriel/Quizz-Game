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
//         question: "Ce făceau romanii pentru a ține bolile la distanță?",
//         answers : [
//             { text: "Purtau amulete în formă de penisuri zburătoare", correct: true },
//             { text: "Frecau tocurile ușilor cu lapte matern", correct: false },
//             { text: "Făceau sex dimineața, înainte de răsăritul soarelui", correct: false }
//         ],
//     },
//     {
//         question: "În timpul nopții, bărbații visează cu precădere...",
//         answers : [
//             { text: "alți bărbați", correct: true },
//             { text: "alți bărbați", correct: false },
//             { text: "că mănâncă", correct: false }
//         ],
//     },
//     {
//         question: "Cum poți preveni căderea picăturilor de ceară de pe o lumânare aprinsă?",
//         answers : [
//             { text:"Lăsând lumânarea la soare", correct: false },
//             { text: "Frecând lumânarea cu unt", correct: false },
//             { text: "Scufundând lumânarea în apă sărată", correct: true }
//         ],
//     },
//     {
//         question: "Triskaidekafobia este:",
//         answers : [
//             { text: "frica de a face baie", correct: false },
//             { text: "frica de numărul 13", correct: true },
//             { text: "frica de culoarea galben", correct: false }
//         ],
//     },
//     {
//         question: "În 2022 va avea loc lansarea:",
//         answers : [
//             { text: "primului robot care va avea capaciatea să poarte un dialog și să facă menaj ușor", correct: false },
//             { text: "primului detector de minciuni pentru uz casnic", correct: false },
//             { text: "primului film cu o durată de 720 de ore", correct: true }
//         ],
//     },
// ];