  const containerEl = document.querySelector(".wrap");
  const form = document.querySelector("#quiz_form");
  const qusEl = document.querySelector(".qus");
  const allOptions = document.querySelector(".all_options");
  const submitBtn = document.querySelector(".submit-btn");
  const buttonEl = document.querySelector(".button")
  const scoreEl = document.querySelector(".scoreBoard .score-num");
  const answeredEl = document.querySelector(".scoreBoard .answered-num");
  const outputCont = document.querySelector(".wrap")
let question, answer;
let options = [];
let score = 0
let answeredQus = 0

const url1 = "https://opentdb.com/api.php?amount=1";

window.addEventListener("DOMContentLoaded", ()=>{
  quizApp()
})

const fetchQuiz = async () => {
  const res = await fetch(url1);
  const data = await res.json();
  return data.results;
};

const quizApp = async ()=>{
  updateScoreBoard()
  addPlaceholder()
  const data = await fetchQuiz()
  question = data[0].question
  options = []
  answer = data[0].correct_answer
  data[0].incorrect_answers.map((item)=>{
    options.push(item)
  })
  options.splice(Math.floor(Math.random()*options.length + 1), 0, answer)
  generateTemplate(question, options)
}

const generateTemplate = (question, options)=>{
  removePlaceholder()
  allOptions.innerHTML = ""
  qusEl.innerText = question
  options.map((option, index)=>{
    const item = document.createElement("div");
    item.classList.add("option");
    item.innerHTML = `
      <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
      <label for="option${index + 1}">${option}</label>
    `;
    allOptions.appendChild(item)
  })
}

form.addEventListener("submit",(e)=>{
  e.preventDefault()

  if(e.target.quiz.value){
    checkQuiz(e.target.quiz.value)
    e.target.querySelector("button").style.display = "none"
    generateButtons()
  }else{
    return
  }
})

const checkQuiz = (selected)=>{
  answeredQus++
  if(selected === answer){
    score++
    updateScoreBoard()
    form.quiz.forEach((input)=>{
      if (input.value === answer) {
        input.parentElement.classList.add("correct")
      }
    })
  }else{
    updateScoreBoard()
    form.quiz.forEach((input)=>{
      if (input.value === answer) {
        input.parentElement.classList.add("correct")
      }
    })
  }
}

const generateButtons = ()=>{
  const finishBtn = document.createElement("button")
  finishBtn.innerText = "Finish"
  finishBtn.setAttribute("type", "button")
  finishBtn.classList.add("finish-btn")
  buttonEl.appendChild(finishBtn)

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next Qus";
  nextBtn.setAttribute("type", "button");
  nextBtn.classList.add("next-btn");
  buttonEl.appendChild(nextBtn);

  finishBtn.addEventListener("click", ()=>{
    const nextBtn = document.querySelector(".next-btn");
    const finishBtn = document.querySelector(".finish-btn");

    buttonEl.removeChild(nextBtn);
    buttonEl.removeChild(finishBtn);

    buttonEl.querySelector(".submit-btn").style.display = "block";

    const overlay = document.createElement("div")
    overlay.classList.add("result-overlay")
    overlay.innerHTML = `
    <h3>Final Score:</h3>
    <div class="final-result">${score}/${answeredQus}</div>
    <button class>Play Again</button>`

    containerEl.appendChild(overlay)
    document.querySelector(".result-overlay button").addEventListener("click",()=>{
      containerEl.removeChild(overlay)
      playAgain()
    })

  })

  nextBtn.addEventListener("click", ()=>{
  const finishBtn = document.querySelector(".finish-btn")
  const nextBtn = document.querySelector(".next-btn");

  buttonEl.removeChild(nextBtn)
  buttonEl.removeChild(finishBtn)

  buttonEl.querySelector(".submit-btn").style.display = "block"
  quizApp()
  })
}

const updateScoreBoard = ()=>{
  scoreEl.innerText = score
  answeredEl.innerText = answeredQus
}

const playAgain = ()=>{
  score = 0
  answeredQus = 0
  quizApp()
}

const addPlaceholder = ()=>{
  const placeholder = document.createElement("div")
  placeholder.classList.add("placeholder")
  containerEl.appendChild(placeholder)
}

const removePlaceholder = ()=>{
  const placeHolder = document.querySelector(".placeholder")
  containerEl.removeChild(placeHolder)
}