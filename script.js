const questions =[
{
    question: "What is the capital of India?",
    options:["Odisa","Delhi","New Delhi","Mumbai"],
    answer:"New Delhi"
},
{
    question: "How many continents in the world?",
    options:["3","4","10","7"],
    answer:"7"
},
{
    question: "How many oceans in the world?",
    options:["5","3","8","7"],
    answer:"5"
},
{
    question: "Which is the longest river in the world?",
    options:["Ganga","Nile","Missipie","Amazon"],
    answer:"Nile"
},
{
    question: "Which is the tallest building in the world?",
    options:["Eifel Tower","Twin Tower","Burj Khalifa","Antelea"],
    answer:"Burj Khalifa"
}
];
let current = 0;
let timer;
let time = 30;
let score = 0;




function saveName() {
    const nameInput = document.getElementById("username").value.trim();
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }
    username = nameInput;
    document.getElementById("name-screen").classList.add("hidden");
    document.getElementById("start").classList.remove("hidden");
}
 

function startQuiz(){
    document.getElementById("start").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
    startTimer();
}

function showQuestion(){
    const q = questions[current];
    document.getElementById("question").textContent = q.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach(opt =>{
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => {
            stopTimer();
            const correct = q.answer;

            if(opt === correct){
                btn.style.backgroundColor = "green";
                score++;
            }else{
                btn.style.backgroundColor = "red";

                const allButtons = document.querySelectorAll("#options button");
                allButtons.forEach(b => {
                    if (b.textContent === correct){
                        b.style.backgroundColor = "green";
                        b.classList.add("correctFlash");
                        
                    }
                    else{
                        b.classList.add("wrongShake");
                    }

                    b.addEventListener("animationend", () => {
                        b.classList.remove("correctFlash", "wrongShake");
                    });
                });
            }
            document.getElementById("next").disabled = false;
            disableOptions();
        };
        li.appendChild(btn);
        optionsContainer.appendChild(li);
    });

    time = 30;
    updateTimer();

    document.getElementById("next").disabled = true;
    
}
function startTimer(){
    stopTimer();
    timer = setInterval(() => {
        time--;
        updateTimer();
        if (time === 0){
            stopTimer();
            document.getElementById("next").disabled = false;
            disableOptions();
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timer);
}
function updateTimer(){
    document.getElementById("timer").textContent = `Time: ${time}`;
}
function disableOptions(){
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(btn => btn.disabled = true);
}

function nextQuestion(){
    const container = document.getElementById("question-container");
    container.classList.add("flipOut");
    container.addEventListener("animationend",function handleOut(){
        container.removeEventListener("animationend",handleOut);
        container.classList.remove("flipOut");
        current++;
    if (current < questions.length){
        showQuestion();
        container.classList.add("flipIn");
        container.addEventListener("animationend",function handlerIn(){
            container.removeEventListener("animationend",handlerIn);
        container.classList.remove("flipIn");


        startTimer();

    });
    
    } else {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("final-score").textContent = `Your score is ${score} out of ${questions.length}`;


    fetch("save_score.php",{
        method: "POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body: `name=${encodeURIComponent(username)} &score=${score}`

    })
    .then(() =>{
        fetch("get_leaderboard.php")
        .then(res => res.text())
        .then(html =>{
            document.getElementById("leaderboard-list").innerHTML = html;
            document.getElementById("leaderboard").classList.remove("hidden");
        });
    });
}
});

}
function restartQuiz() {
    current = 0;
    score = 0;
    time = 30;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("leaderboard").classList.add("hidden");
    document.getElementById("start").classList.remove("hidden");
}