/* =========================================
   BIRTHDAY SURPRISE WEBSITE
   Bisu → Tanu
========================================= */


/* =========================================
   CREATE STARS
========================================= */

const starsContainer = document.getElementById("stars");

function createStars() {

    if (!starsContainer) return;

    for (let i = 0; i < 180; i++) {

        const star = document.createElement("span");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        const size = Math.random() * 3 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        starsContainer.appendChild(star);
    }
}

createStars();


/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer =
    document.getElementById("hearts");

function createHeart() {

    if (!heartsContainer) return;

    const heart =
        document.createElement("span");

    heart.className = "floating-heart";

    heart.innerHTML =
        Math.random() > 0.5 ? "♡" : "✦";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        Math.random() * 15 + 10 + "px";

    heart.style.animationDuration =
        Math.random() * 5 + 6 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);
}

setInterval(createHeart, 1300);


/* =========================================
   INTRO
========================================= */

const intro =
    document.getElementById("intro");

const mainWebsite =
    document.getElementById("mainWebsite");

const openSurprise =
    document.getElementById("openSurprise");


// Reveal intro text slowly

const introElements =
    document.querySelectorAll(".hidden-line");

introElements.forEach((element, index) => {

    setTimeout(() => {

        element.style.transition =
            "opacity 1.2s ease, transform 1.2s ease";

        element.style.opacity = "1";

        element.style.transform =
            "translateY(0)";

    }, 1800 + index * 1000);

});


/* =========================================
   OPEN SURPRISE BUTTON
========================================= */

openSurprise.addEventListener("click", () => {

    intro.style.transition =
        "opacity 1.5s ease, transform 1.5s ease";

    intro.style.opacity = "0";

    intro.style.transform =
        "scale(1.05)";

    setTimeout(() => {

        intro.style.display = "none";

        mainWebsite.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        document.body.style.overflowX = "hidden";

    }, 1500);

});


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;

musicButton.addEventListener("click", async () => {

    try {

        if (!musicPlaying) {

            await music.play();

            musicPlaying = true;

            musicButton.innerHTML = "❚❚";

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.innerHTML = "♪";

        }

    } catch (error) {

        alert(
            "Add your music file at: music/birthday.mp3"
        );

    }

});


/* =========================================
   COUNTDOWN
========================================= */

// IMPORTANT:
// This is August 20, 2026 at 12:00 AM.
// Browser uses the visitor's local timezone.

const birthdayDate =
    new Date("August 20, 2026 00:00:00");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const birthdayReached =
    document.getElementById("birthdayReached");


function updateCountdown() {

    const now = new Date();

    const difference =
        birthdayDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        daysElement.innerText = "00";
        hoursElement.innerText = "00";
        minutesElement.innerText = "00";
        secondsElement.innerText = "00";

        birthdayReached.style.display =
            "block";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    daysElement.innerText =
        String(days).padStart(2, "0");

    hoursElement.innerText =
        String(hours).padStart(2, "0");

    minutesElement.innerText =
        String(minutes).padStart(2, "0");

    secondsElement.innerText =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {
    observer.observe(element);
});


/* =========================================
   MEMORY BOOK
========================================= */

const memoryBook =
    document.getElementById("memoryBook");

const openBook =
    document.getElementById("openBook");

const previousPage =
    document.getElementById("previousPage");

const nextPage =
    document.getElementById("nextPage");

const pageNumber =
    document.getElementById("pageNumber");

const pages =
    document.querySelectorAll(".book-page");

let currentPage = 0;

let bookOpened = false;


openBook.addEventListener("click", (event) => {

    event.stopPropagation();

    memoryBook.classList.add("open");

    bookOpened = true;

    updateBook();

});


function updateBook() {

    pages.forEach((page, index) => {

        page.classList.toggle(
            "active",
            index === currentPage
        );

    });


    if (currentPage === 0) {

        pageNumber.innerText =
            "Chapter 01";

    } else {

        pageNumber.innerText =
            `Chapter ${String(currentPage + 1).padStart(2, "0")}`;

    }


    previousPage.disabled =
        currentPage === 0;

    nextPage.disabled =
        currentPage === pages.length - 1;

}


nextPage.addEventListener("click", () => {

    if (!bookOpened) return;

    if (currentPage < pages.length - 1) {

        currentPage++;

        updateBook();

    }

});


previousPage.addEventListener("click", () => {

    if (!bookOpened) return;

    if (currentPage > 0) {

        currentPage--;

        updateBook();

    }

});


updateBook();


/* =========================================
   QUIZ
========================================= */

const questions = [

    {
        question:
            "What is one memory that always makes you smile?",

        answer:
            "Your answer can be whatever memory is special to you. ❤️"
    },

    {
        question:
            "What was one of our funniest moments?",

        answer:
            "Some memories don't need a perfect explanation. They simply make us smile."
    },

    {
        question:
            "Which moment do you remember the most?",

        answer:
            "Everyone remembers moments differently, and that's what makes memories interesting."
    },

    {
        question:
            "What is one small thing that meant a lot to you?",

        answer:
            "Sometimes the smallest things become the biggest memories."
    },

    {
        question:
            "What would you like to remember from this chapter of life?",

        answer:
            "Hopefully something beautiful, peaceful and worth smiling about."
    }

];


let currentQuestion = 0;


const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const quizAnswer =
    document.getElementById("quizAnswer");

const showQuizAnswer =
    document.getElementById("showQuizAnswer");

const quizResult =
    document.getElementById("quizResult");

const quizResultText =
    document.getElementById("quizResultText");

const nextQuestion =
    document.getElementById("nextQuestion");


function loadQuestion() {

    const question =
        questions[currentQuestion];

    questionNumber.innerText =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    questionText.innerText =
        question.question;

    quizAnswer.value = "";

    quizResult.style.display = "none";

    nextQuestion.classList.add("hidden");

}


showQuizAnswer.addEventListener("click", () => {

    const question =
        questions[currentQuestion];

    quizResultText.innerText =
        question.answer;

    quizResult.style.display =
        "block";

    nextQuestion.classList.remove(
        "hidden"
    );

});


nextQuestion.addEventListener("click", () => {

    if (currentQuestion <
        questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        currentQuestion = 0;

        loadQuestion();

    }

});


loadQuestion();


/* =========================================
   LESSON CARD FLIP
========================================= */

const lessonCards =
    document.querySelectorAll(".lesson-card");

lessonCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});


/* =========================================
   QUALITY BUTTONS
========================================= */

const qualityButtons =
    document.querySelectorAll(".quality");

qualityButtons.forEach(button => {

    button.addEventListener("click", () => {

        const text =
            button.querySelector("span");

        if (
            text.style.opacity === "1"
        ) {

            text.style.opacity = "0";

        } else {

            text.style.opacity = "1";

        }

    });

});


/* =========================================
   SECRET LETTERS
========================================= */

const secretEnvelopes =
    document.querySelectorAll(
        ".secret-envelope"
    );

const messageModal =
    document.getElementById(
        "messageModal"
    );

const modalMessage =
    document.getElementById(
        "modalMessage"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


secretEnvelopes.forEach(envelope => {

    envelope.addEventListener(
        "click",
        () => {

            modalMessage.innerText =
                envelope.dataset.message;

            messageModal.classList.add(
                "show"
            );

        }
    );

});


closeModal.addEventListener(
    "click",
    () => {

        messageModal.classList.remove(
            "show"
        );

    }
);


messageModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === messageModal
        ) {

            messageModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   FIREWORKS
========================================= */

const finalScene =
    document.getElementById(
        "finalScene"
    );

const fireworks =
    document.getElementById(
        "fireworks"
    );

let fireworksStarted = false;


function createFirework() {

    if (!fireworks) return;

    const firework =
        document.createElement("div");

    firework.className =
        "firework";

    firework.style.left =
        Math.random() * 90 + 5 + "%";

    firework.style.top =
        Math.random() * 60 + 10 + "%";

    fireworks.appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 1600);

}


const finalObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !fireworksStarted
                ) {

                    fireworksStarted = true;

                    for (
                        let i = 0;
                        i < 18;
                        i++
                    ) {

                        setTimeout(
                            createFirework,
                            i * 300
                        );

                    }

                }

            });

        },
        {
            threshold: 0.4
        }
    );


if (finalScene) {
    finalObserver.observe(finalScene);
}


/* =========================================
   SAVE QUESTIONS LOCALLY
========================================= */

const personalAnswers =
    document.querySelectorAll(
        ".personal-answer"
    );


personalAnswers.forEach(
    (textarea, index) => {

        const storageKey =
            `tanu-answer-${index}`;

        const saved =
            localStorage.getItem(
                storageKey
            );

        if (saved) {
            textarea.value = saved;
        }


        textarea.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    storageKey,
                    textarea.value
                );

            }
        );

    }
);


/* =========================================
   MOBILE TOUCH FRIENDLY BOOK
========================================= */

let touchStartX = 0;

let touchEndX = 0;


memoryBook.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


memoryBook.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        if (!bookOpened) return;

        const difference =
            touchEndX - touchStartX;


        if (Math.abs(difference) < 50) {
            return;
        }


        if (difference < 0) {

            if (
                currentPage <
                pages.length - 1
            ) {

                currentPage++;

                updateBook();

            }

        } else {

            if (currentPage > 0) {

                currentPage--;

                updateBook();

            }

        }

    },
    { passive: true }
);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "✨ Birthday surprise website loaded successfully."
);

console.log(
    "Made with care by Bisu ❤️"
);