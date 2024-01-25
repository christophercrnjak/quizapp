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
    question: "What does the HTML <a> tag primarily represent?",
    answer_1: "Image container",
    answer_2: "Bold text",
    answer_3: "Navigation link",
    answer_4: "Bulleted list item",
    right_answer: 3,
  },
  {
    question: "What is the purpose of the <head> element in HTML?",
    answer_1: "To contain metadata about the document",
    answer_2: "To define a header section for a webpage",
    answer_3: "To define the body of the document",
    answer_4: "To create a hyperlink to another webpage",
    right_answer: 1,
  },
  {
    question: "In HTML, what is the purpose of the <p> tag?",
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
    question: "What is the purpose of the <div> element in HTML?",
    answer_1: "To create a hyperlink",
    answer_2: "To define a division or a section in a HTML document",
    answer_3: "To format text as bold",
    answer_4: "To insert an image",
    right_answer: 2,
  },
];

let currentQuestion = 0;
let score = 0;

function init() {
  showStart();
}

function showStart() {
  let content = document.getElementById("currentQuestion");
  content.innerHTML = "";

  content.innerHTML = showStartHTML();
}

function showStartHTML() {
  return /*html*/`
    <h5 class="card-title">Welcome to the Quiz!!!</h5>
    <button onclick="show()" class="btn btn-primary">START NOW   ></button>
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

  `;
}

function showEnd() {
  let content = document.getElementById("currentQuestion");
  content.innerHTML = "";

  content.innerHTML = showEndHTML();
}

function showEndHTML() {
  return /*html*/`
    <h5 class="card-title">Ende!</h5>
    <button onclick="restart()" class="btn btn-primary">YOUR SCORE ${score}/7</button>
  `;
}

function checkAnswer(selectedAnswer) {
  let question = questions[currentQuestion];
  let selectedAnswerInteger = selectedAnswer.slice(-1);
  let idOfRightAnswer = question["right_answer"];
  let rightAnswer = `answer_${idOfRightAnswer}`;

  if (selectedAnswerInteger == question["right_answer"]) {
    document.getElementById(selectedAnswer).classList.add("bg-success");
    afterClickingAnswer();
    score++;
  } else {
    document.getElementById(selectedAnswer).classList.add("bg-danger");
    document.getElementById(rightAnswer).classList.add("bg-success");
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
  score = 0;
  showStart();
}