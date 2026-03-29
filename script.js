let validMBTI = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
]
let userMBTI = ""
let scores = {
    Exploration: 0,
    Action: 0,
    Puzzle: 0,
    Story: 0
}
let answers = {}

let music = document.getElementById("bgm")

music.volume = 0.05

document.addEventListener("click", function () {

    music.muted = false
    music.play()

}, { once: true })

function toggleSound() {

    if (music.muted) {

        music.muted = false
        document.getElementById("soundBtn").innerHTML = "🔊"

    } else {

        music.muted = true
        document.getElementById("soundBtn").innerHTML = "🔇"

    }

}

function checkMBTI() {

    let input = document.getElementById("userMBTI").value.toUpperCase()

    if (!validMBTI.includes(input)) {

        document.getElementById("error").innerHTML =
            "Error: กรุณากรอก MBTI ที่ถูกต้อง เช่น INTJ, ENFP"

        return
    }

    userMBTI = input
    document.getElementById("error").innerHTML = ""

    let music = document.getElementById("bgm")
    music.volume = 0.2
    music.play()

    startQuiz()
}

function showPage(id) {

    document.querySelectorAll(".page").forEach(p => {
        p.style.display = "none"
    })

    document.getElementById(id).style.display = "block"

}

function startQuiz() {

    if (userMBTI == "") {
        alert("กรุณากรอก MBTI ก่อน")
        return
    }

    showPage("q0")

}

function next(type, nextPage) {

    scores[type]++

    let currentPage = document.querySelector(".page[style*='block']").id

    answers[currentPage] = type

    showPage("q" + nextPage)

}


function getResult() {

    let max = 0
    let result = ""

    for (let type in scores) {

        if (scores[type] > max) {

            max = scores[type]
            result = type

        }

    }

    if (result == "Action") return "Action Player ⚔️"
    if (result == "Exploration") return "Explorer 🌍"
    if (result == "Puzzle") return "Puzzle Solver 🧠"
    if (result == "Story") return "Story Seeker 📖"

}


function showResult(type) {

    scores[type]++

    let currentPage = document.querySelector(".page[style*='block']").id

    answers[currentPage] = type

    let resultType = getResult()

    document.getElementById("result").innerHTML =
        "สไตล์เกมของคุณคือ <b>" + resultType + "</b>"

    showPage("resultPage")

    sendData(resultType)

}

function restart() {

    scores = {
        Exploration: 0,
        Action: 0,
        Puzzle: 0,
        Story: 0
    }

    showPage("home")

}

function sendData(resultType) {
    const formData = new URLSearchParams();

    formData.append("inputMBTI", userMBTI);
    formData.append("result", resultType);
    formData.append("q1", answers.q1 || "-");
    formData.append("q2", answers.q2 || "-");
    formData.append("q3", answers.q3 || "-");
    formData.append("q4", answers.q4 || "-");
    formData.append("q5", answers.q5 || "-");
    formData.append("q6", answers.q6 || "-");
    formData.append("q7", answers.q7 || "-");
    formData.append("q8", answers.q8 || "-");
    formData.append("q9", answers.q9 || "-");
    formData.append("q10", answers.q10 || "-");
    formData.append("q11", answers.q11 || "-");
    formData.append("exploration", scores.Exploration);
    formData.append("action", scores.Action);
    formData.append("puzzle", scores.Puzzle);
    formData.append("story", scores.Story);
    formData.append("time", new Date().toLocaleString());

    fetch("https://script.google.com/macros/s/AKfycbypL1e-e6uS_5d14MsYkplda5UAflPMtomrCNCgcEIkhu0xhRJKmzvV_6zjrM13Smlh6w/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => console.log("Server response:", data))
    .catch(error => console.error("Error:", error));
}
}

showPage("home")