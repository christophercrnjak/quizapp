let questions = [
  {
    question: "What does HTML stand for?",
    answer_1: "Hyper Transfer Markup Language",
    answer_2: "Hyper Text Makeup Language",
    answer_3: "Hyperlink and Text Markup Language ",
    answer_4: "Hyper Text Markup Language",
    right_answer: 4,
  },
  {
    question: "Who is making the Web standards?",
    answer_1: "Microsoft",
    answer_2: "Internet Engineering Task Force (IETF)",
    answer_3: "Google",
    answer_4: "Adobe",
    right_answer: 2,
  },
  {
    question: "What does the HTML a-tag primarily represent?",
    answer_1: "Image container",
    answer_2: "Bold text",
    answer_3: "Navigation link",
    answer_4: "Bulleted list item",
    right_answer: 3,
  },
  {
    question: "What is the purpose of the head-element in HTML?",
    answer_1: "To contain metadata about the document",
    answer_2: "To define a header section for a webpage",
    answer_3: "To define the body of the document",
    answer_4: "To create a hyperlink to another webpage",
    right_answer: 1,
  },
  {
    question: "In HTML, what is the purpose of the p-tag?",
    answer_1: "Paragraph",
    answer_2: "Page break",
    answer_3: "Picture",
    answer_4: "Positioning element",
    right_answer: 1,
  },
  {
    question:
      "Which attribute is used to provide alternative text for an image in HTML?",
    answer_1: "title",
    answer_2: "caption",
    answer_3: "description",
    answer_4: "alt",
    right_answer: 4,
  },
  {
    question: "What is the purpose of the div-element in HTML?",
    answer_1: "To create a hyperlink",
    answer_2: "To define a division or a section in a HTML document",
    answer_3: "To format text as bold",
    answer_4: "To insert an image",
    right_answer: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let progressInPercent = 0;
let AUDIO_SUCCESS = new Audio("./audio/success.mp3");
let AUDIO_FAIL = new Audio("./audio/fail.mp3");


function init() {
  showStart();
}

function showStart() {
  let content = document.getElementById("currentQuestion");
  content.innerHTML = "";

  content.classList.add("bg_img");
  content.innerHTML = showStartHTML();
}

function showStartHTML() {
  return /*html*/`
    <h5 style="padding-bottom: 184px" class="card-title">Welcome to <br> The Awesome HTML Quiz</h5>
    <button onclick="show()" class="btn btn-primary button">START NOW</button>
  `;
}

function show() {
  if (currentQuestion < 7) {
    showQuestion();
  } else {
    showEnd();
  }
}

function showQuestion() {
  let question = questions[currentQuestion];
  let content = document.getElementById("currentQuestion");

  content.innerHTML = "";

  content.classList.remove("bg_img");
  content.innerHTML = showQuestionHTML(question);
}

function showQuestionHTML(question) {
  return /*html*/ `

<h5 class="card-title">${question["question"]}</h5>

    <div class="card quiz_answer_card mb-2" id="answer_1" onclick="checkAnswer('answer_1')">
        <div class="card-body">${question["answer_1"]}</div>
    </div>
    <div class="card quiz_answer_card mb-2" id="answer_2" onclick="checkAnswer('answer_2')">
      <div class="card-body">${question["answer_2"]}</div>
    </div>
    <div class="card quiz_answer_card mb-2" id="answer_3" onclick="checkAnswer('answer_3')">
        <div class="card-body">${question["answer_3"]}</div>
    </div>
    <div class="card quiz_answer_card mb-2" id="answer_4" onclick="checkAnswer('answer_4')">
        <div class="card-body">${question["answer_4"]}</div>
      </div>

      <div class="question_button">
        <span> Frage <b>${currentQuestion+1}</b> von <b id="all_questions_amount">${questions.length}</b> </span>
        <button onclick="nextQuestion()" href="#" class="btn btn-primary" disabled id="question_button">Nächste Frage</button>
    </div>

    <br>

        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width: ${fillPercentage()}%">${fillPercentage()} %</div>
        </div>
  `;
}

function showEnd() {
  let content = document.getElementById("currentQuestion");
  content.innerHTML = "";

  content.innerHTML = showEndHTML();
}

function showEndHTML() {
  return /*html*/`
    <div class="end_screen">
      <img class="end_img" src="./img/brain_result.png ">
      <h5 class="card-title">COMPLETE HTML QUIZ</h5>
      <div>
        <span class="your_score">YOUR SCORE</span>
        <span class="score"> ${score}/7</span>
      </div>
      <div class="end_btns">
        <button type="button" class="btn btn-primary button">SHARE</button>
        <button onclick="restart()" class="btn button button_replay">REPLAY</button>
      </div>
    </div>
  `;
}

function checkAnswer(selectedAnswer) {
  let question = questions[currentQuestion];
  let selectedAnswerInteger = selectedAnswer.slice(-1);
  let idOfRightAnswer = question["right_answer"];
  let rightAnswer = `answer_${idOfRightAnswer}`;

  if (selectedAnswerInteger == question["right_answer"]) {
    document.getElementById(selectedAnswer).classList.add("bg-success");
    AUDIO_SUCCESS.play();
    afterClickingAnswer();
    score++;
  } else {
    document.getElementById(selectedAnswer).classList.add("bg-danger");
    document.getElementById(rightAnswer).classList.add("bg-success");
    AUDIO_FAIL.play();
    afterClickingAnswer();
  }
}

function afterClickingAnswer() {
  answerNotClickable();
  changeEnableStatusOfButton();
}

function answerNotClickable() {
  document.getElementById('answer_1').classList.add("notClickable");
  document.getElementById('answer_2').classList.add("notClickable");
  document.getElementById('answer_3').classList.add("notClickable");
  document.getElementById('answer_4').classList.add("notClickable");
}

function changeEnableStatusOfButton() {
  document.getElementById('question_button').disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  show();
}

function restart() {
  currentQuestion = 0;
  progressInPercent = 0;
  score = 0;
  showStart();
}

function fillPercentage() {
  switch (currentQuestion) {
    case 1:
      progressInPercent = 14;
      break;
    case 2:
      progressInPercent = 29;
      break;
    case 3: 
      progressInPercent = 43;
      break;
    case 4:
      progressInPercent = 57;
      break;
    case 5:
      progressInPercent = 71;
      break;
    case 6:
      progressInPercent = 86;
      break;
    default:
      break;
  }

  return progressInPercent;
}