let validMBTI = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
]
let userMBTI = ""
let answers = []
let choices = []
function checkMBTI() {

    let input = document.getElementById("userMBTI").value.toUpperCase()

    if (!validMBTI.includes(input)) {

        document.getElementById("error").innerHTML =
            "Error: กรุณากรอก MBTI ที่ถูกต้อง เช่น INTJ, ENFP"

        return
    }

    userMBTI = input

    document.getElementById("error").innerHTML = ""

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

    answers.push(type)

    choices.push(type)

    showPage("q" + nextPage)

}


function getEnding(mbti) {

    // นักวิเคราะห์ (Analysts)
    if (mbti == "INTJ") return "Architect (นักวิเคราะห์)"
    if (mbti == "INTP") return "Logician (นักวิเคราะห์)"
    if (mbti == "ENTJ") return "Commander (นักวิเคราะห์)"
    if (mbti == "ENTP") return "Debater (นักวิเคราะห์)"

    // นักการทูต (Diplomats)
    if (mbti == "INFJ") return "Advocate (นักการทูต)"
    if (mbti == "INFP") return "Mediator (นักการทูต)"
    if (mbti == "ENFJ") return "Protagonist (นักการทูต)"
    if (mbti == "ENFP") return "Campaigner (นักการทูต)"

    // ผู้พิทักษ์ (Sentinels)
    if (mbti == "ISTJ") return "Logistician (ผู้พิทักษ์)"
    if (mbti == "ISFJ") return "Defender (ผู้พิทักษ์)"
    if (mbti == "ESTJ") return "Executive (ผู้พิทักษ์)"
    if (mbti == "ESFJ") return "Consul (ผู้พิทักษ์)"

    // นักสำรวจ (Explorers)
    if (mbti == "ISTP") return "Virtuoso (นักสำรวจ)"
    if (mbti == "ISFP") return "Adventurer (นักสำรวจ)"
    if (mbti == "ESTP") return "Entrepreneur (นักสำรวจ)"
    if (mbti == "ESFP") return "Entertainer (นักสำรวจ)"

    return "Unknown Type"

}


function showResult(type) {

    answers.push(type)

    // answers = [E, T, J, S]

    let mbti =
        answers[0] +   // E/I
        answers[3] +   // S/N
        answers[1] +   // T/F
        answers[2]     // J/P

    let ending = getEnding(mbti)

    document.getElementById("result").innerHTML =
        "MBTI ที่ได้จากเกมคือ <b>" + mbti + "</b>"

    showPage("resultPage")

    sendData(mbti, ending, answers)

}


function restart() {

    answers = []

    choices = []

    showPage("home")

}


function sendData(mbti, ending, choices) {

    fetch("https://script.google.com/macros/s/AKfycbx5jiFN-4QqZuGpEidm3N881vO_J0Mv7goyXccddrtVTkLYzgf0YcILP3-a61Ao_wBXkQ/exec", {

        method: "POST",

        body: JSON.stringify({

            inputMBTI: userMBTI,
            mbti: mbti,
            ending: ending,
            q1: choices[0],
            q2: choices[1],
            q3: choices[2],
            q4: choices[3],
            time: new Date().toLocaleString()

        })

    })

}


showPage("home")