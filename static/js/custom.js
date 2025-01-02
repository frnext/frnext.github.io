function listToQuiz() {
  const quizContainer = document.querySelector(".quiz");
  const quizItems = quizContainer.querySelectorAll(":scope > li");

  quizItems.forEach((item) => {
    const question = item.querySelector("p");

    if (question && question.classList.contains("quiz-multichoice")) {
      processMultiChoiceQuestion(item, question);
    } else if (question && question.classList.contains("quiz-open")) {
      processOpenQuestion(item, question);
    }
  });

  // Add functionality to show/hide correct answers
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Show/Hide Correct Answers";
  quizContainer.appendChild(toggleButton);
  toggleButton.addEventListener("click", showHideAnswers);
}


function processOpenQuestion(item, question) {
  const answer = item.querySelector(":scope > ul li");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Your answer...";

  const answerElement = document.createElement("p");
  answerElement.textContent = answer.textContent;
  answerElement.classList.add("quiz-open-answer");

  item.innerHTML = "";
  item.appendChild(question);
  item.appendChild(textInput);
  item.appendChild(answerElement);
  answerElement.style.display = "none";
}

function processMultiChoiceQuestion(item, question) {
  const answers = item.querySelectorAll(":scope > ul li p");
  const form = document.createElement("form");

  answers.forEach((answer, index) => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "radio";
    input.name = "question-" + question.textContent.trim();
    input.value = answer.textContent.trim();

    label.appendChild(input);
    if (answer.classList.contains("quiz-correct")) {
      label.classList.add("quiz-correct");
    }

    const answerElement = document.createElement("span");

    answerElement.innerHTML = " " + answer.innerHTML;
    label.appendChild(answerElement);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  });

  item.innerHTML = "";
  item.appendChild(question);
  item.appendChild(form);
}


function showHideAnswers() {
  const openQuestionAnswers = document.querySelectorAll(".quiz-open-answer");
  const multiChoiceAnswers = document.querySelectorAll(".quiz-correct");

  openQuestionAnswers.forEach((answer) => {
    answer.style.display =
      answer.style.display === "none" ? "block" : "none";
  });

  multiChoiceAnswers.forEach((answer) => {
    if (answer.classList.contains("quiz-correct-highlighted")) {
      answer.classList.remove("quiz-correct-highlighted");
    } else {
      answer.classList.add("quiz-correct-highlighted");
    }
  });
}


function addTextToSpeech() {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const elements = document.querySelectorAll('mark, .french');

  elements.forEach(element => {
    // Create the glyph button
    const speechText = element.textContent;

    const button = document.createElement('sup');
    button.textContent = ' ▶';
    button.classList.add('tts-button');
    button.dataset.text = speechText;

    button.addEventListener('click', (event) => {
      const utterance = new SpeechSynthesisUtterance();
      let text = event.target.dataset.text;

      for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang === 'fr-FR') {
          utterance.voice = voices[i];
          break;
        }
      }

      utterance.text = text;
      utterance.rate = 0.5;

      console.log(text);
      synth.speak(utterance);
    });

    element.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", listToQuiz);
// addTextToSpeech should be the last, to process newly added elements.
document.addEventListener('DOMContentLoaded', addTextToSpeech);
