document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.querySelector(".quiz");

  // Replace list elements with radial selectors or text inputs
  const quizItems = quizContainer.querySelectorAll(":scope > li");
  
  quizItems.forEach((item) => {
    const question = item.querySelector("p");

    if (question && question.classList.contains("quiz-multichoice")) {
      // Replace with radial selectors
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

      item.innerHTML = ""; // Clear existing list
      item.appendChild(question);
      item.appendChild(form);

    } else if (question && question.classList.contains("quiz-open")) {

      const answer = item.querySelector(":scope > ul li");
      // Replace with text input
      const textInput = document.createElement("input");
      textInput.type = "text";
      textInput.placeholder = "Your answer...";

      const answerElement = document.createElement("p");
      answerElement.textContent = answer.textContent;
      answerElement.classList.add("quiz-open-answer");

      item.innerHTML = ""; // Clear existing list
      item.appendChild(question);
      item.appendChild(textInput);
      item.appendChild(answerElement);
      answerElement.style.display = "none";
    }
  });

  // Add functionality to show/hide correct answers
  // Create the button element
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Show/Hide Correct Answers";

  // Append the button to the body or a specific container
  quizContainer.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    console.log(`Pressed`);
    const openQuestionAnswers = document.querySelectorAll(".quiz-open-answer");
      openQuestionAnswers.forEach((answer) => {
      answer.style.display =
        answer.style.display === "none" ? "block" : "none";
    });


  const multiChocieAnswers = document.querySelectorAll(".quiz-correct");

  multiChocieAnswers.forEach((answer) => {
      if (answer.classList.contains("quiz-correct-highlighted")) {
        answer.classList.remove("quiz-correct-highlighted");
      } else {
        answer.classList.add("quiz-correct-highlighted");
      }
    });
  });
});


const synth = window.speechSynthesis;
const voices = synth.getVoices();


function addTextToSpeech() {
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
document.addEventListener('DOMContentLoaded', addTextToSpeech);
