// Sample data
const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "In which language is memory management provided by JVM?",
        options: ["Java", "C", "C++", "Python"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "Which of the following is not a valid variable name in Python?",
        options: ["_myVar", "myVar2", "2myVar", "my_var"],
        correct: 2
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "In which data structure, elements are added at one end and removed from the other?",
        options: ["Array", "Stack", "Queue", "LinkedList"],
        correct: 2
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerListElement = document.getElementById('answer-list');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

// Function to load the current question and answers
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;
    answerListElement.innerHTML = '';
    
    // Populate the answer list with radio buttons
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="radio" name="answer" value="${index}" id="option${index}"> <label for="option${index}">${option}</label>`;
        answerListElement.appendChild(li);
    });
}

// Function to handle answer submission
function handleAnswerSubmission() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    const selectedAnswer = parseInt(selectedOption.value);
    const correctAnswerIndex = questions[currentQuestionIndex].correct;

    // Highlight the correct answer
    const correctOption = document.getElementById(`option${correctAnswerIndex}`).parentElement;
    correctOption.style.backgroundColor = 'rgb(144, 238, 144)'; // Light green for correct answer

    // Increment score if the selected answer is correct
    if (selectedAnswer === correctAnswerIndex) {
        score++;
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
}

// Function to handle loading the next question
function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        submitButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
    } else {
        // Alert the final score
        alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
        restartQuiz();
    }
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    submitButton.style.display = 'inline-block';
    nextButton.style.display = 'none';
}

// Attach event listeners
submitButton.addEventListener('click', handleAnswerSubmission);
nextButton.addEventListener('click', handleNextQuestion);

// Load the first question when the window loads
window.onload = function() {
    loadQuestion();
    submitButton.style.display = 'inline-block';
    nextButton.style.display = 'none';
};
