const questions = [
  {
    question: "Question 1",
  },
  {
    question: "Question 2",
  },
  {
    question: "Question 3",
  },
];

const options = ["Agree", "Disagree"];

let currentQuestion = 0;

const questionElement = document.querySelector(".question");
const answerOptionsElement = document.querySelector(".answer-options");
const submitButton = document.querySelector(".submit-button");

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
    optionLabel.textContent = option;

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "radio");
    optionInput.setAttribute("name", "answer");
    optionInput.setAttribute("id", optionId);
    optionInput.setAttribute("value", index + 1);

    if (index === 0) {
      optionLabel.classList.add("outlined");
    }

    answerOptionsElement.appendChild(optionLabel);
    answerOptionsElement.appendChild(optionInput);
  });
}

displayQuestion();

function handleAnswerOptionChange(event) {
  const selectedOption = event.target.value;
  console.log(selectedOption);

  if (selectedOption) {
    saveResponse(currentQuestion, selectedOption);
    currentQuestion++;
    displayQuestion();
  }
}

function saveResponse(questionIndex, answer) {
  const storedResponses =
    JSON.parse(localStorage.getItem("surveyResponses")) || {};
  storedResponses[questionIndex] = answer;
  localStorage.setItem("surveyResponses", JSON.stringify(storedResponses));
}

function handleSubmit() {
  if (currentQuestion < questions.length - 1) {
    handleAnswerOptionChange();
    return;
  }

  localStorage.removeItem("surveyResponses");
  window.location.href = "https://bing.com";
}
