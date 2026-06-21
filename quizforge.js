const menuWindow = document.getElementById("menu_window");
const historyWindow = document.getElementById("history_window");
const selectWindow = document.getElementById("select_window");
const quizWindow = document.getElementById("quiz_window");
const scoreWindow = document.getElementById("score_window");

const selectBtn = document.getElementById("select_btn");
const historyBtn = document.getElementById("history_btn");
const menuBtn = document.getElementById("menu_btn");
const startBtn = document.getElementById("start_btn");
const scoreBtn = document.getElementById("score_btn");

const windowList = [historyWindow, menuWindow, quizWindow, scoreWindow, selectWindow];
function showScreen(screenToShow){
    windowList.forEach(win =>{
        win.style.display = "none";
    })
    screenToShow.style.display = "block";
}

async function quizQuestions() {
    try {
        const respone = await fetch('https://opentdb.com/api_category.php');
        const jsonRes = await respone.json();
        console.log(jsonRes);
    }
    catch(err) {
        console.log(err);
    }
}
quizQuestions()

selectBtn.addEventListener('click', ()=>{
    showScreen(selectWindow)
})
historyBtn.addEventListener('click', ()=>{
    showScreen(historyWindow)
})
menuBtn.addEventListener('click', ()=>{
    showScreen(menuWindow)
})
startBtn.addEventListener('click', ()=>{
    showScreen(quizWindow);
})
scoreBtn.addEventListener('click', ()=>{
    showScreen(menuWindow);
})