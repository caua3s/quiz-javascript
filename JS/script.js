//declarar variaveis
const question = document.querySelector('#question');
const  answerbox=document.querySelector('#answer-box');
const quizzcontainer=document.querySelector('#quizz-container');
const scorecontainer= document.querySelector('#score-container');
const letters=["a","b","c","d"];
let points=0;
let actualquestion=0;

//perguntas

const questions =[
    {
        "question":"PHP foi desenvolvido para qual fim?",
        "answer":[
            {
                "answer":"back-end",
                "correct":true
            },
            {
                "answer":"front-end",
                "correct":false
            },
            {
                "answer":"sistema operacional",
                "correct":false
            },
            {
                 "answer":"banco de dados",
                "correct":false
            }
        ]
    },
    {
       "question":"Qual deles declarar uma variável em JavaScript?",
        "answer": [
            {
                "answer":"$var",
                "correct":false
            },
            {
                "answer":"var",
                "correct":true
            },
            {
                "answer":"@var",
                "correct":false
            },
            {
                "answer":"#let",
                "correct":false
            }
        ]
    },
    {
       "question":"qual o seletor de  id no css?",
        "answer":[
            {
                "answer":"#",
                "correct":true
            },
            {
                "answer":".",
                "correct":false
            },
            {
                "answer":"@",
                "correct":false
            },
            {
                "answer":"/",
                "correct":false
            }
        ] 
    }
]

//substituição do quizz para a primeira pergunta

function init(){
    //criar a primeira pergunta
    createquestion(0);
};

//cria uma pergunta
function createquestion(i){

    //limpar aquestão anterior
    const oldbuttons = answerbox.querySelectorAll("button")

    oldbuttons.forEach(function(btn){
        btn.remove();
    })

//alterar o texto da pergunta
const questionText= question.querySelector("#question-text");
const questionNumber= question.querySelector("#question-number");

questionText.textContent = questions[i].question;
questionNumber.textContent = i + 1;

//insere as alternativas
questions[i].answer.forEach(function(answer,i){

    //cria o template  do botão do quizz
    const answerTemplate= document.querySelector(".answer-template").cloneNode(true);

    const letterBtn= answerTemplate.querySelector(".btn-letter");
    const answerText= answerTemplate.querySelector(".question-answer");

    letterBtn.textContent= letters[i];
    answerText.textContent=answer['answer'];

    answerTemplate.setAttribute("correct-answer",answer["correct"]);

//remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    //inserir as  alternativas na tela
    answerbox.appendChild(answerTemplate);

    //inserir um evento de click no botão
    answerTemplate.addEventListener("click",function(){
       checkAnswer(this)
    });
   
});

    //incrementar o numero da questão
    actualquestion++;
}

//verificando resposta do usuario
function checkAnswer(btn){

    //seleciona todos os botões
    const buttons=answerbox.querySelectorAll("button");

    //verifica se aresposta esta correta e adiciona classes nos bootões
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer")==="true"){
            button.classList.add("correct-answer");

            //checa se o ususario acertou a pergunta
            if(btn===button){
                //incremento dos pontos
                points++;
            }
        }else{
            button.classList.add("wrong-answer");
        }
    })

       //exibir proxima pergunta
       nextQuestion();

}

//exibe proxima pergunta do quizz
function nextQuestion(){
    
    //timer pro usuario ver as respostas
    setTimeout(function(){
        //verifica se ainda há perguntas
        if(actualquestion>= questions.length){
            //apresentar mensagem de sucesso
            showSucessMesage();
            return;
        }

        createquestion(actualquestion);

    },1500);
}


//exibe a tela final
function showSucessMesage(){
        
    hideorShowQuizz();

    //trocar dados da tela de sucesso

    //calcular score
    const score=((points/questions.length)*100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    //alterar o numero de perguntas corretas
    const correctAnswers= document.querySelector("#correct-answers");
    correctAnswers.textContent = points.toString();

    //alterar o numero de perguntas
    const questionsQty = document.querySelector("#questions-qty");
    questionsQty.textContent = questions.length.toString();

}

//mostra ou esconde o score
function hideorShowQuizz(){
    quizzcontainer.classList.toggle("hide");
    scorecontainer.classList.toggle("hide");
}

//reiniciar quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click",function(){

    //zerar o jogo
    actualquestion=0;
    points=0;
    hideorShowQuizz();
    init();

});

//inicialização do quizz
init();