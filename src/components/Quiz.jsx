// src/components/Quiz.js
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import correct from "../sounds/correct.wav";
import incorrect from "../sounds/incorrect.mp3";

// Load sound files
const correctSound = new Audio(correct); // Correct answer sound
const incorrectSound = new Audio(incorrect); // Incorrect answer sound
// audio.play();
const Quiz = ({ selectedWords, words, setProgress, onRestart }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [incorrectAnswer, setIncorrectAnswer] = useState(false);
    const [options, setOptions] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const currentWord = words.find(
        (word) => word.id === selectedWords[currentIndex]
    );

    // Generate three random wrong options excluding the current word
    const getRandomOptions = () => {
        const wrongOptions = words
            .filter((word) => word.id !== currentWord.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        return [currentWord, ...wrongOptions].sort(() => 0.5 - Math.random());
    };

    useEffect(() => {
        if (!quizFinished) {
            setOptions(getRandomOptions());
            setSelectedOption(null);
            setIncorrectAnswer(false);
        }
    }, [currentIndex, quizFinished]);

    const handleAnswer = (selectedId) => {
        setSelectedOption(selectedId);
        const isCorrect = selectedId === currentWord.id;

        setIncorrectAnswer(!isCorrect);

        if (isCorrect) {
            setScore(score + 1);
            correctSound.play(); // Play correct answer sound
        } else {
            setIncorrectCount(incorrectCount + 1);
            incorrectSound.play(); // Play incorrect answer sound
        }
    };

    const handleNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < selectedWords.length) {
            setCurrentIndex(nextIndex);
            setProgress((nextIndex / selectedWords.length) * 100);
        } else {
            setProgress(100);
            setQuizFinished(true);

            for (let i = 0; i < score; i++) {
                setTimeout(() => {
                    console.log("salut");
                    confetti({
                        particleCount: 100,
                        startVelocity: 30,
                        spread: 360,
                        origin: {
                            x: Math.random(),
                            y: Math.random() - 0.2,
                        },
                    });
                }, i * (500 / score)); // Задержка в 500 мс между запусками
            }
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setScore(0);
        setIncorrectCount(0);
        setQuizFinished(false);
        setProgress(0);
        setSelectedOption(null);
        setIncorrectAnswer(false);
    };

    if (quizFinished) {
        return (
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Quiz Finished!</h2>
                <p>
                    Your score: {score}/{selectedWords.length}
                </p>
                <p>Incorrect answers: {incorrectCount}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleRestart}
                >
                    Restart Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="text-center bg-white p-4 rounded-lg shadow-md mt-14 h-80">
            <h2 className="text-4xl font-semibold mb-8">
                {currentWord.russian}
            </h2>
            <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                    <button
                        key={option.id}
                        className={`px-3 py-5 rounded-lg ${
                            selectedOption === option.id &&
                            incorrectAnswer &&
                            option.id !== currentWord.id
                                ? "bg-red-500 text-white"
                                : selectedOption === option.id
                                ? "bg-green-300"
                                : "bg-blue-100" +
                                  (selectedOption === null
                                      ? " hover:bg-blue-200"
                                      : "")
                        }`}
                        onClick={() => handleAnswer(option.id)}
                        disabled={selectedOption !== null}
                    >
                        {option.english}
                    </button>
                ))}
            </div>
            {selectedOption !== null && (
                <button
                    className="mt-10 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={handleNext}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Quiz;
