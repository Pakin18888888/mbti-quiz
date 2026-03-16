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

function toggleSound() {

    if (music.muted) {
        music.muted = false
        document.getElementById("soundBtn").innerHTML = "🔊"
    } else {
        music.muted = true
        document.getElementById("soundBtn").innerHTML = "🔇"
    }

}

function startMusic() {
    music.muted = false
}

document.body.addEventListener("click", startMusic, { once: true })

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

    showPage("q1")

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

    fetch("https://script.google.com/macros/s/AKfycbx2AR54FFnL-BkqaELZLuVSHIjau7P5iAm1ruDSPDP9xrl5P4nwhGtUllTRXr8s07Rkkw/exec", {

        method: "POST",
        mode: "no-cors",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            inputMBTI: userMBTI,
            result: resultType,

            q1: answers.q1 || "-",
            q2: answers.q2 || "-",
            q3: answers.q3 || "-",
            q4: answers.q4 || "-",
            q5: answers.q5 || "-",
            q6: answers.q6 || "-",
            q7: answers.q7 || "-",
            q8: answers.q8 || "-",
            q9: answers.q9 || "-",
            q10: answers.q10 || "-",
            q11: answers.q11 || "-",

            exploration: scores.Exploration,
            action: scores.Action,
            puzzle: scores.Puzzle,
            story: scores.Story,

            time: new Date().toLocaleString()

        })

    })
        .then(res => res.text())
        .then(data => console.log("Server response:", data))
        .catch(err => console.error("Error:", err))

}

showPage("home")