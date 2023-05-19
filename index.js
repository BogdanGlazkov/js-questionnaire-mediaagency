const questions = [
  {
    question: "Question 1",
    options: ["Option 1A", "Option 1B"],
  },
  {
    question: "Question 2",
    options: ["Option 2A", "Option 2B"],
  },
];

let currentQuestion = 0;
const questionElement = document.querySelector(".question");
const answerOptionsElement = document.querySelector(".answer-options");

answerOptionsElement.addEventListener("change", handleAnswerOptionChange);

function displayQuestion() {
  // Clear previous question and answer options
  questionElement.textContent = "";
  answerOptionsElement.innerHTML = "";

  // Get the current question object
  const currentQuestionObj = questions[currentQuestion];

  // Display the question
  questionElement.textContent = currentQuestionObj.question;

  // Display the answer options
  currentQuestionObj.options.forEach((option, index) => {
    const optionId = `option${index + 1}`;
    const optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", optionId);
    optionLabel.textContent = option;

    const optionInput = document.createElement("input");
    optionInput.setAttribute("type", "radio");
    optionInput.setAttribute("name", "answer");
    optionInput.setAttribute("id", optionId);
    optionInput.setAttribute("value", option);

    answerOptionsElement.appendChild(optionInput);
    answerOptionsElement.appendChild(optionLabel);
  });
}

// Call the function to display the initial question
displayQuestion();

function handleAnswerOptionChange(event) {
  const selectedOption = event.target.value;

  // Update the current question based on the selected answer
  if (selectedOption) {
    // Perform any necessary processing or validation here

    // Increment the current question
    currentQuestion++;

    // Display the next question
    displayQuestion();
  }
}
