import { questions } from "./db.js";

const options = ["Agree", "Disagree"];

let currentQuestion = 0;

const questionElement = document.querySelector(".question");
const answerOptionsElement = document.querySelector(".answer-options");
const submitButton = document.querySelector(".submit-button");
const submitWarning = document.querySelector(".warning");

answerOptionsElement.addEventListener("change", handleAnswerOptionChange);
submitButton.addEventListener("click", handleSubmit);

function displayQuestion() {
  questionElement.textContent = "";
  answerOptionsElement.innerHTML = "";

  const currentQuestionObj = questions[currentQuestion];

  questionElement.textContent = currentQuestionObj.question;

  options.forEach((option, index) => {
    const optionId = `option${index + 1}`;
    const optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", optionId);
    optionLabel.setAttribute("id", index + 1);
    optionLabel.textContent = option;

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "radio");
    optionInput.setAttribute("name", "answer");
    optionInput.setAttribute("id", optionId);
    optionInput.setAttribute("value", index + 1);
    optionInput.classList.add("hidden");

    answerOptionsElement.appendChild(optionLabel);
    answerOptionsElement.appendChild(optionInput);
  });
}

displayQuestion();

function handleAnswerOptionChange(event) {
  if (currentQuestion >= questions.length) return;

  const selectedOption = event.target.value;

  if (selectedOption) {
    saveResponse(currentQuestion, selectedOption);
    currentQuestion++;
  }

  const selectedLabel = document.getElementById(event.target.value);
  selectedLabel.classList.add("outlined");

  if (currentQuestion < questions.length) {
    setTimeout(() => {
      selectedLabel.classList.remove("outlined");
      displayQuestion();
    }, 800);
  }
}

function saveResponse(questionIndex, answer) {
  const storedResponses =
    JSON.parse(localStorage.getItem("surveyResponses")) || {};
  storedResponses[questionIndex + 1] = answer;
  localStorage.setItem("surveyResponses", JSON.stringify(storedResponses));
}

function handleSubmit() {
  if (currentQuestion < questions.length - 1) {
    submitWarning.classList.remove("hidden");
    setTimeout(() => {
      submitWarning.classList.add("hidden");
    }, 3000);
    return;
  }

  const allData = JSON.parse(localStorage.getItem("surveyResponses"));
  const queryString = Object.entries(allData)
    .map((item) => `${item[0]}=${item[1]}`)
    .join("&");
  const finalUrl = `https://bing.com?${queryString}`;

  localStorage.removeItem("surveyResponses");
  window.location.href = finalUrl;
}
