const questions = [
    {
        question: "When did the British and French start expeditions explore along the Atlantic Coast?",
        answers: [
            { text: "15th century", correct: true },
            { text: "14th century", correct: false },
            { text: "17th century", correct: false },
            { text: "16th century", correct: true }
        ]
    },
    {
        question: "What are the three largest metropolitan areas?",
        answers: [
            { text: "Toronto, Ottawa, Vancouver", correct: false },
            { text: "Toronto, Montreal, Ottawa", correct: false },
            { text: "Montreal, Toronto, Vancouver", correct: true },
            { text: "Vancouver, Montreal, Ottawa", correct: false }
        ]
    },
    {
        question: "When was the Canada Act passed",
        answers: [
            { text: "1984", correct: false },
            { text: "1981", correct: false },
            { text: "1983", correct: false },
            { text: "1982", correct: true },
            { text: "1985", correct: false },
            { text: "1882", correct: false },
            { text: "1883", correct: false },
            { text: "1884", correct: false },
            { text: "1881", correct: false }
        ]
    }
];

// 🔀 Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // 🔀 Shuffle answers before displaying
    shuffle(currentQuestion.answers);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
    nextButton.onclick = () => {
        nextButton.onclick = null;
        startQuiz();
    };
}

startQuiz();
