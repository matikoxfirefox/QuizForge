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
const catSelect = document.getElementById("cat_select");
const difSelect = document.getElementById("dif_select");
window.onload = () =>{
    categoryGenerator();
}

// ------- Screen showing function (Scalable) ------- //
const windowList = [historyWindow, menuWindow, quizWindow, scoreWindow, selectWindow];
function showScreen(screenToShow){
    windowList.forEach(win =>{
        win.style.display = "none";
    })
    screenToShow.style.display = "block";
}
// ------- Category Generator Function (Select Window) ------- //
async function categoryGenerator(){
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
    }catch (err){
        console.log(err);
    }
}
async function optionsSelector() {
    try {
        const selectedCat = catSelect.value;
        const selectedDif = difSelect.value;
        
        if (selectedCat === "1" && selectedDif === "random" ){
            const randomQ = await fetch(`https://opentdb.com/api.php?amount=15`)
            const randomQJson = await randomQ.json();
            console.log(randomQJson);
        }else if (selectedDif === "random"){
            const randomDif = await fetch(`https://opentdb.com/api.php?amount=15&category=${selectedCat}`);
            const randomDifJson = await randomDif.json();
            console.log(randomDifJson);
        }else if (selectedCat === "1") {
            const randomCat = await fetch(`https://opentdb.com/api.php?amount=15&difficulty=${selectedDif}`);
            const randomCatJson = await randomCat.json();
            console.log(randomCatJson);
        }else {
            const questions = await fetch(`https://opentdb.com/api.php?amount=15&category=${selectedCat}&difficulty=${selectedDif}`)
            const questJson = await questions.json();
            console.log(questJson);
        }
    }
    catch(err) {
        console.log(err);
    }
}







// ------- Window changing buttons ------- // 
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
    if(catSelect.value === "cat_selector" || difSelect.value === "dif_selector"){
        alert("Pick right category and difficulty level!");
        return;
    } else {
        showScreen(quizWindow);
        optionsSelector();
    }
})
scoreBtn.addEventListener('click', ()=>{
    showScreen(menuWindow);
})