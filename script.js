
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    const restartBtn = document.getElementById('restartBtn');
    const welcomeHeading = document.getElementById('welcomeHeading');
    const timerElement = document.getElementById('timer');
    
    let currentQuestionIndex;
    let score = 0;
    let timerInterval;
    
    const questions = [
    { question: 'Q1) Which animal sleeps the most?', answers: ['Elephant', 'Tiger', 'koala', 'Giraffe'], correct: 2 },
    { question: 'Q2) What is considered the lung of the Earth?', answers: ["Amazon rainforest", "The Mississippi River","The Sahara", "Everest"], correct: 0 },
    { question: 'Q3) Which planet in the solar system is known as the “Red Planet”?', answers: ['Mercury', 'Venus', 'Jupiter', 'Mars'], correct: 3 },
    { question: 'Q4) What is the capital of Japan?', answers: ['Tokyo', 'Seoul', 'Beijing', 'Osaka'], correct: 0 },
    { question: 'Q5) What do Koalas usually eat?', answers: [ 'Vegetables', 'Fruits', 'Eucalyptus', 'Meat'], correct: 2 },
    { question: 'Q7) which is the biggest country in the world?', answers: ['Russia', 'China', 'India', 'United States'], correct: 0 },
    { question: 'Q8) Which river is the longest in the world?', answers: ['Mekong', 'Amazon', 'Yangtze', 'Nile'], correct: 3 },
    { question: 'Q9) Which country has the largest population in the world?', answers: ['China', 'India', 'United States', 'Brazil'], correct: 0 },
    { question: 'Q10) What is the highest mountain in the world?', answers: ['Mount Everest', 'Mount Kilimanjaro', 'Mount Fuji', 'Mount McKinley'], correct: 0 },
    { question: 'Q11) If there are three apples and you take away two, how many apples do you have?', answers: ['One', 'Zero', 'Three', 'Two'], correct: 3 },
    { question: 'Q12) What is the largest planet in our solar system?', answers: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'], correct: 0 },
    { question: 'Q13) Which gas is most abundant in the Earth’s atmosphere?', answers: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Helium'], correct: 1 },
    { question: 'Q14) David’s parents have three sons: Snap, Crackle, and what’s the name of the third son?' , answers: ['David', 'John', 'Paul', 'Mark'], correct: 0 },
    { question: 'Q15) What is the name of the largest ocean in the world?', answers: ['Indian Ocean', 'Atlantic Ocean', 'Pacific Ocean', 'Arctic Ocean'], correct: 2 },
    { question: 'Q16) What is the name of the highest mountain in the world?', answers: ['Mount Kilimanjaro', 'Mount Everest', 'Mount Fuji', 'Mount McKinley'], correct: 1 },
    { question: 'Q17) What is a baby kangaroo called?', answers: ['Pup', 'Calf', 'Joey', 'Puppy'], correct: 2 },
    { question: 'Q18) Which is the smallest country in the world?', answers: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'], correct: 3 },
    { question: 'Q19) What is the chemical symbol for water?', answers: ['H', 'O', 'C', 'H2O'], correct: 3 },
    { question: 'Q20)How many continents are there in the world?', answers: ['7', '5', '6', '8'], correct: 0 },
    { question: 'Q21)What was the first planet discovered using a telescope?', answers: ['Mercury', 'Venus', 'Jupiter', 'Uranus'], correct: 3 },
    { question: 'Q22)Who is known as the father of computers?', answers: ['Bill Gates', 'Steve Jobs', 'Elon Musk', 'Charles Babbage'], correct: 3 },
    { question: 'Q23)How many colors are there in a rainbow?', answers: ['7', '5', '6', '8'], correct: 0 },
    { question: 'Q24)Which country is known as the Land of the Rising Sun?', answers: ['Japan', 'China', 'India', 'South Korea'], correct: 0 },
    { question: 'Q25)What is the hardest natural substance on Earth?', answers: ['Quartz', 'Diamond', 'Ruby', 'Sapphire'], correct: 1 },
    { question: 'Q26)What is the fastest land animal?', answers: ['Cheetah', 'Leopard', 'Jaguar', 'Tiger'], correct: 0 },
    { question: 'Q27)Which sea creature has three hearts?', answers: ['Whale', 'Dolphin', 'Octopus', 'Squid'], correct: 2 },
    { question: 'Q28)How many chambers does a human heart have?', answers: ['2', '4', '6', '8'], correct: 1 },
    { question: 'Q29)Which animal never dies?', answers: ['Octopus', 'Blobfish', 'Jellyfish', 'Seahorse'], correct: 2 },
    { question: 'Q30)Which is the smallest planet in the solar system?', answers: ['Mercury', 'Venus', 'Mars', 'Neptune',], correct: 0 },
    ];
    
    // Total quiz time in seconds (e.g., 5 minutes = 300 seconds)
    let totalQuizTime = 300;
    
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartBtn.addEventListener('click', startQuiz);
    
    function startQuiz() {
        startBtn.classList.add('hidden');
        restartBtn.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        welcomeHeading.classList.add('hidden');
        currentQuestionIndex = 0;
        score = 0;
        setNextQuestion();
        startQuizTimer();
    }
    
    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            displayScore();
        }
    }
    
    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('btn');
            if (index === question.correct) {
                button.dataset.correct = 'true';
            }
            button.addEventListener('click', selectAnswer);
            answersElement.appendChild(button);
        });
    }
    
    function resetState() {
        nextBtn.classList.add('hidden');
        while (answersElement.firstChild) {
            answersElement.removeChild(answersElement.firstChild);
        }
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        if (correct) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('wrong');
        }
        Array.from(answersElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        nextBtn.classList.remove('hidden');
    }
    
    function displayScore() {
        clearInterval(timerInterval); // Stop the timer when the quiz ends
        questionElement.innerText = `Your score = ${score} out of ${questions.length}`;
        scoreElement.innerText = `Your score: ${score}`;
        nextBtn.classList.add('hidden'); // Hide Next button after the quiz ends
        restartBtn.classList.remove('hidden'); // Show Restart button
    }
    
    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.style.backgroundColor = '#D3A1C6'; // Correct color
        } else {
            element.style.backgroundColor = '#D6A1B5'; // Incorrect color
        }
    }
    
    function clearStatusClass(element) {
        element.style.backgroundColor = ''; // Reset background
    }
    
    function startQuizTimer() {
        let timeRemaining = totalQuizTime;
    
        timerInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert("Time's up! The quiz is over.");
                displayScore(); // End the quiz when the time runs out
            } else {
                let minutes = Math.floor(timeRemaining / 60);
                let seconds = timeRemaining % 60;
                timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
                timeRemaining--;
            }
        }, 1000);
    }
    