/* =========================
   QUESTION BANK
========================= */
const questionBank = {
    pillars: [
        {
            question: "How many pillars are there in Islam?",
            options: ["Four", "Five", "Six", "Seven"],
            correct: 1
        },
        {
            question: "Which pillar represents faith?",
            options: ["Salah", "Zakat", "Shahada", "Hajj"],
            correct: 2
        },
        {
            question: "Which pillar involves fasting?",
            options: ["Sawm", "Zakat", "Salah", "Hajj"],
            correct: 0
        },
        {
            question: "Which pillar is performed once in a lifetime if able?",
            options: ["Salah", "Hajj", "Zakat", "Sawm"],
            correct: 1
        },
        {
            question: "Zakat is related to which obligation?",
            options: ["Prayer", "Charity", "Fasting", "Pilgrimage"],
            correct: 1
        }
    ],

    prophets: [
        {
            question: "Who was the first prophet in Islam?",
            options: ["Muhammad (PBUH)", "Adam (AS)", "Noah (AS)", "Ibrahim (AS)"],
            correct: 1
        },
        {
            question: "Which prophet built the Ark?",
            options: ["Musa (AS)", "Isa (AS)", "Nuh (AS)", "Yusuf (AS)"],
            correct: 2
        },
        {
            question: "Which prophet was thrown into fire?",
            options: ["Ibrahim (AS)", "Musa (AS)", "Isa (AS)", "Adam (AS)"],
            correct: 0
        },
        {
            question: "Who is the last prophet of Islam?",
            options: ["Isa (AS)", "Musa (AS)", "Muhammad (PBUH)", "Ibrahim (AS)"],
            correct: 2
        },
        {
            question: "Which prophet received the Zabur?",
            options: ["Musa (AS)", "Dawood (AS)", "Isa (AS)", "Nuh (AS)"],
            correct: 1
        }
    ],

    quran: [
        {
            question: "In which language was the Quran revealed?",
            options: ["Arabic", "Urdu", "Hebrew", "Persian"],
            correct: 0
        },
        {
            question: "How many Surahs are there in the Quran?",
            options: ["112", "113", "114", "115"],
            correct: 2
        },
        {
            question: "Which Surah is the first in the Quran?",
            options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
            correct: 1
        },
        {
            question: "Which Surah is known as the heart of the Quran?",
            options: ["Yaseen", "Rehman", "Kahf", "Mulk"],
            correct: 0
        },
        {
            question: "The Quran was revealed over how many years?",
            options: ["10", "15", "20", "23"],
            correct: 3
        }
    ]
};

/* =========================
   GLOBAL VARIABLES
========================= */
let selectedCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let attempted = 0;
let timer;
let timeLeft = 180; // 3 minutes

/* =========================
   START QUIZ
========================= */
function startQuiz(category) {
    selectedCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    attempted = 0;
    timeLeft = 180;

    document.getElementById("welcome-screen").classList.add("d-none");
    document.getElementById("quiz-section").classList.remove("d-none");
    document.getElementById("result-screen").classList.add("d-none");

    startTimer();
    displayQuestion();
}

/* =========================
   DISPLAY QUESTION
========================= */
function displayQuestion() {
    const questionObj = questionBank[selectedCategory][currentQuestionIndex];

    document.getElementById("question-text").innerText =
        `${currentQuestionIndex + 1}. ${questionObj.question}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    document.getElementById("next-btn").disabled = true;

    questionObj.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary";
        btn.innerText = option;

        btn.onclick = () => selectAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });

    updateProgress();
}

/* =========================
   SELECT ANSWER
========================= */
function selectAnswer(selectedIndex, button) {
    const correctIndex =
        questionBank[selectedCategory][currentQuestionIndex].correct;

    attempted++;

    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        button.classList.replace("btn-outline-primary", "btn-success");
        score++;
    } else {
        button.classList.replace("btn-outline-primary", "btn-danger");
        buttons[correctIndex].classList.replace("btn-outline-primary", "btn-success");
    }

    document.getElementById("next-btn").disabled = false;
}

/* =========================
   NEXT QUESTION
========================= */
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionBank[selectedCategory].length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

/* =========================
   TIMER (3 MINUTES)
========================= */
function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").innerText =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/* =========================
   UPDATE PROGRESS BAR
========================= */
function updateProgress() {
    const total = questionBank[selectedCategory].length;
    const progress = ((currentQuestionIndex) / total) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

/* =========================
   QUIT QUIZ
========================= */
function quitQuiz() {
    clearInterval(timer);
    endQuiz(true);
}

/* =========================
   END QUIZ
========================= */
function endQuiz(quit = false) {
    clearInterval(timer);

    document.getElementById("quiz-section").classList.add("d-none");
    document.getElementById("result-screen").classList.remove("d-none");

    const totalQuestions = questionBank[selectedCategory].length;
    const percentage = Math.round((score / totalQuestions) * 100);

    document.getElementById("result-summary").innerText =
        quit
            ? `You attempted ${attempted} out of ${totalQuestions} questions.`
            : `You completed the quiz and answered ${attempted} questions.`;

    document.getElementById("score-percentage").innerText =
        `Score: ${score} / ${totalQuestions} (${percentage}%)`;
}

/* =========================
   NAVIGATION
========================= */
function goHome() {
    clearInterval(timer);

    document.getElementById("quiz-section").classList.add("d-none");
    document.getElementById("result-screen").classList.add("d-none");
    document.getElementById("welcome-screen").classList.remove("d-none");
}

function restartQuiz() {
    startQuiz(selectedCategory);
}
