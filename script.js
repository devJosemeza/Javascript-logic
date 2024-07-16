const questions = [
  {
    questionId: 1,
    questionName: 'What is your favorite color?',
    answers: [
      {
        answerName: 'Red',
        answerId: 11
      },
      {
        answerName: 'Blue',
        answerId: 12
      },
      {
        answerName: 'Pink',
        answerId: 13
      }
    ]
  },
  {
    questionId: 2,
    questionName: 'Are you a flat-earther?',
    answers: [
      {
        answerName: 'Yes',
        answerId: 21
      },
      {
        answerName: 'No',
        answerId: 22
      }
    ]
  }
];


// 1 ) Calcular la cantidad de combinaciones (solo una respuesta por pregunta) Estructura del cuestionario:  

const N = 5; // questions
const M = 4; // answers

// Init value to combinations
let numCombinations = 1;

// Calculate the number of combinations by multiplying M, N times
for (let i = 0; i < N; i++) {
  numCombinations *= M;
}


console.log(`La cantidad de combinaciones posibles es: ${numCombinations}`);


// 2) Crear un archive CSV con todas las combinaciones sin usar ninguna librería de terceros (zero third-party dependencies approach)

// Function to generate all response combinations
function getAllCombinations(arr) {
  if (arr.length === 0) return [[]];
  const first = arr[0];
  const rest = arr.slice(1);
  const combinationsWithoutFirst = getAllCombinations(rest);
  const combinationsWithFirst = [];

  first.forEach(answer => {
    combinationsWithoutFirst.forEach(combination => {
      combinationsWithFirst.push([answer, ...combination]);
    });
  });

  return combinationsWithFirst;
}

// Get the names of the questions
const questionNames = questions.map(question => question.questionName);

// Generate all possible combinations of answers.
const answerLists = questions.map(question => question.answers);
const combinations = getAllCombinations(answerLists);

let csvContent = "";

// Heading
csvContent += questionNames.join(',') + '\n';

// add answers
combinations.forEach(combination => {
  const row = combination.map(answer => answer.answerName).join(',');
  csvContent += row + '\n';
});

// function to download
function downloadCSV(content, fileName) {
  const blob = new Blob([content], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

function handlerDownload(){
  downloadCSV(csvContent, 'combinations.csv');
}
