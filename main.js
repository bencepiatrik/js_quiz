const quizContainer = document.querySelector('.quiz');
const resultContainer = document.querySelector('.results');
const submitBtn = document.querySelector('.submit');
const nextBtn = document.querySelector('.next');

const questions = [{
  question: "What HTML stands for?",
  answer: {
    a:"Transmission Control Protocol",
    b:"Programming language",
    c:"Hypertext Markup Language",
    d:"Javascript library"
  },
  correct: 'c'
},
{
question: "CSS is used for...",
answer: {
  a:"data mining",
  b:"defining styles for a webpage",
  c:"the markup of the webpage",
  d:"compiling C# code"
},
correct: 'b'
},
{
  question: "React.js is a/an ...",
  answer: {
    a:"javascript framework",
    b:"javascript library",
    c:"VSCode extension",
    d:"online translator"
  },
  correct: 'a'
  }
]

questionsTotal = questions.length - 1;
let goodAnswers = []

for(let i=0; i < questionsTotal+1; i++) {
  goodAnswers.push(0)
}

let current = 0;
let maxPercent = 0;
let correctAnswer = 0;
let percentage = 0;
nextBtn.addEventListener("click", function() {
  current++;
  if(current >= questionsTotal){ 
    current = questionsTotal
    nextBtn.style.display = 'none'
    submitBtn.style.display = 'block'
    build()
    check()
  }
  if(current <= 0){
    current = 0
    build()
    check()
  }
  build();
  check();
})

build = () => {
    quizContainer.innerHTML = `
  <h2 class="quiz-question">${current+1}. ${questions[current].question}</h2>
  <div class="quiz-options">
  <label>
  <input type="radio" class="quiz-option" value="a" name="input">
  ${questions[current].answer.a}</label> <br>
  <label>
  <input type="radio" class="quiz-option" value="b" name="input">
  ${questions[current].answer.b}</label> <br>
  <label>
  <input type="radio" class="quiz-option" value="c" name="input">
  ${questions[current].answer.c}</label> <br>
  <label>
  <input type="radio" class="quiz-option" value="d" name="input">
  ${questions[current].answer.d}</label>
  </div>
  `
  //let options = Object.getOwnPropertyNames(questions[current].answer)
  //console.log(options)
}
let correctOption
check = () => {
  let correct = questions[current].correct
  const inputs = document.querySelectorAll('input');
  inputs.forEach(item => {
    item.addEventListener('input', () => {
      if(item.value === correct) {
        goodAnswers[current] = goodAnswers[current] + 1
      }
      if(item.value !== correct) {
        goodAnswers[current] = 0
      }
      if((goodAnswers[current] = 1) && (item.value !== correct)) {
        goodAnswers[current] = goodAnswers[current] - 1
      }
      correctAnswer = goodAnswers.reduce((a,b) => a + b ,0)
      maxPercent = Math.round(((100 / (questionsTotal+1))*correctAnswer)*100)/100
     
    })
  })
}

resultContainer.innerHTML = `
<h1 class="outof">${correctAnswer} out of ${questionsTotal+1}</h1>
<h2 class="percentage">${maxPercent}%</h2> 
`
build();
check();

submitBtn.addEventListener('click', () => {
  quizContainer.style.display = 'none'
  resultContainer.style.display = "block";
  let counting = setInterval(() => {
    if(percentage < maxPercent){

      percentage = percentage + 1

      resultContainer.innerHTML = `
      <h1 class="outof">${correctAnswer} out of ${questionsTotal+1}</h1>
      <h2 class="percentage">${ Math.round(percentage*100)/100}%</h2> `
    }
    else {
      clearInterval(counting)
    }
  }, 5);
})