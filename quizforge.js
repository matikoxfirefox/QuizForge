// ------- Quiz windows variables ------- //
const menuWindow = document.getElementById("menu_window");
const historyWindow = document.getElementById("history_window");
const selectWindow = document.getElementById("select_window");
const quizWindow = document.getElementById("quiz_window");
const scoreWindow = document.getElementById("score_window");
// ------- Quiz windows navigate buttons ------- //
const selectBtn = document.getElementById("select_btn");
const historyBtn = document.getElementById("history_btn");
const menuBtn = document.getElementById("menu_btn");
const startBtn = document.getElementById("start_btn");
const scoreBtn = document.getElementById("score_btn");
// ------- Questions variables selectors ------- //
const catSelect = document.getElementById("cat_select");
const difSelect = document.getElementById("dif_select");
const questionCat = document.getElementById("question_cat");
const questionDif = document.getElementById("question_dif");
const questionTitle = document.getElementById("question_title");
const answSection = document.getElementById("answ_section");
// ------- Other variables ------- //
const comment = document.getElementById("comment")
const finalScore = document.getElementById("final_score");
const counter = document.getElementById("counter");

let currentQuestion = 0;
let questions = [];
let correctAnswers = [];

window.onload = () => {
    categoryGenerator();
}

// ------- Screen showing function (Scalable) ------- //
const windowList = [historyWindow, menuWindow, quizWindow, scoreWindow, selectWindow];
function showScreen(screenToShow) {
    windowList.forEach(win => {
        win.style.display = "none";
    })
    screenToShow.style.display = "block";
}
// ------- Category Generator Function (Select Window) ------- //
async function categoryGenerator() {
    try {
        const categories = await fetch('https://opentdb.com/api_category.php');
        const jsonCategories = await categories.json();
        const catArr = jsonCategories.trivia_categories;
        catArr.forEach((cat) => {
            const opt = document.createElement("option");
            opt.innerHTML = cat.name;
            opt.value = cat.id;
            catSelect.appendChild(opt);
        })
    } catch (err) {
        console.log(err);
    }
}
// ------- Options Selector Function (Select Window) ------- //
async function optionsSelector() {
    try {
        const selectedCat = catSelect.value;
        const selectedDif = difSelect.value;

        if (selectedCat === "1" && selectedDif === "random") {
            const randomQ = await fetch(`https://opentdb.com/api.php?amount=15`)
            const randomQJson = await randomQ.json();
            questions = await randomQJson.results;
        } else if (selectedDif === "random") {
            const randomDif = await fetch(`https://opentdb.com/api.php?amount=15&category=${selectedCat}`);
            const randomDifJson = await randomDif.json();
            questions = await randomDifJson.results;
        } else if (selectedCat === "1") {
            const randomCat = await fetch(`https://opentdb.com/api.php?amount=15&difficulty=${selectedDif}`);
            const randomCatJson = await randomCat.json();
            questions = await randomCatJson.results;
        } else {
            const question = await fetch(`https://opentdb.com/api.php?amount=15&category=${selectedCat}&difficulty=${selectedDif}`)
            const questJson = await question.json();
            questions = await questJson.results;
        }
    }
    catch (err) {
        console.error(err);
    }
    renderQuestion()
}
// ------- Shuffle funtion to randomize answers in quiz ------- //
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// ------- Entities decode function ------- //
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
// ------- Rendering question function ------- //
let answBtns = []; // Answer buttons array
function renderQuestion() {
    counter.style.display = "block";
    counter.innerHTML = 'Question ' + (currentQuestion + 1) + "/" + questions.length;
    questionCat.innerHTML = questions[currentQuestion].category;
    questionDif.innerHTML = questions[currentQuestion].difficulty;
    questionTitle.innerHTML = questions[currentQuestion].question;
    const anwsers = questions[currentQuestion].incorrect_answers.concat(questions[currentQuestion].correct_answer)
    shuffle(anwsers);

    anwsers.forEach((answ) => {
        const decodedVal = decodeHtml(answ);
        const btn = document.createElement('button');
        btn.textContent = decodedVal;
        if ((questions[currentQuestion].incorrect_answers).includes(answ)) {
            btn.classList.add("inCorrectBtns");
        }
        if ((questions[currentQuestion].correct_answer).includes(answ)) {
            btn.classList.add("correctBtns");
        }

        answSection.appendChild(btn);
        answBtns.push(btn);

        btn.addEventListener('click', () => {
            if ((questions[currentQuestion].incorrect_answers).includes(answ)) {
                btn.classList.add("inCorrectAnsw");
                document.querySelector(".correctBtns").classList.add("correctAnsw");
            } else {
                btn.classList.add("correctAnsw");
                correctAnswers.push(event.target);
            }
            answBtns.forEach(choice => {
                choice.disabled = true;
            })
            setTimeout(nextQuestion, 1500);
        })
    })
}

function nextQuestion() {
    if(currentQuestion < questions.length - 1){
        currentQuestion++;
        questionCat.innerHTML = "";
        questionDif.innerHTML = "";
        questionTitle.innerHTML = "";
        answSection.innerHTML = "";
        renderQuestion();
    } else {
        quizWindow.style.display = 'none';
        scoreWindow.style.display = 'block';
        const goodScore = correctAnswers.length;
        const summary = Math.floor((goodScore / 15) * 100);
        finalScore.innerHTML = `Your score: ${summary}%`;
        if (summary > 80){
            comment.innerHTML = "Excellent work!";
        } else if (summary > 50){
            comment.innerHTML = "Good job!"
        } else {
            comment.innerHTML = "Next time will be better!"
        }
    }
}

// ------- Window changing buttons ------- // 
selectBtn.addEventListener('click', () => {
    showScreen(selectWindow)
})
historyBtn.addEventListener('click', () => {
    showScreen(historyWindow)
})
menuBtn.addEventListener('click', () => {
    showScreen(menuWindow)
})
startBtn.addEventListener('click', () => {
    if (catSelect.value === "cat_selector" || difSelect.value === "dif_selector") {
        alert("Pick right category and difficulty level!");
        return;
    } else {
        counter.style.display = "none";
        currentQuestion = 0;
        correctAnswers = [];
        answBtns = [];
        questionCat.innerHTML = "";
        questionDif.innerHTML = "";
        questionTitle.innerHTML = "";
        answSection.innerHTML = "";
        showScreen(quizWindow);
        optionsSelector();
        
    }
})
scoreBtn.addEventListener('click', () => {
    showScreen(menuWindow);
})