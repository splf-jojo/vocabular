// src/App.js
import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import WordSelection from "./components/WordSelection";
import Quiz from "./components/Quiz";

const words = [
    { id: 1, english: "ABRUPT", russian: "резкий" },
    { id: 2, english: "ADAMANT", russian: "непреклонный" },
    { id: 3, english: "ABUNDANT", russian: "обильный" },
    { id: 4, english: "ACCENTUATE", russian: "подчеркивать" },
    { id: 5, english: "ACCLAIM", russian: "одобрение" },
    { id: 6, english: "ADAPTATION", russian: "адаптация" },
    { id: 7, english: "ADVANTAGEOUS", russian: "выгодный" },
    { id: 8, english: "AESTHETIC", russian: "эстетический" },
    { id: 9, english: "AFFECTING", russian: "трогательный" },
    { id: 10, english: "AFFINITY", russian: "влечение" },
    { id: 11, english: "AMBIGUOUS", russian: "двусмысленный" },
    { id: 12, english: "AMBIVALENCE", russian: "двойственность" },
    { id: 13, english: "AMELIORATE", russian: "улучшать" },
    { id: 14, english: "AMORPHOUS", russian: "аморфный" },
    { id: 15, english: "ANALOGY", russian: "аналогия" },
    { id: 16, english: "ANIMOSITY", russian: "враждебность" },
    { id: 17, english: "ANNOTATE", russian: "аннотировать" },
    { id: 18, english: "ANOMALY", russian: "аномалия" },
    { id: 19, english: "ANTITHETICAL", russian: "противоположный" },
    { id: 20, english: "APPEASE", russian: "умиротворять" },
    { id: 21, english: "APPRAISE", russian: "оценивать" },
    { id: 22, english: "APPROXIMATE", russian: "приблизительный" },
    { id: 23, english: "AUGMENT", russian: "увеличивать" },
];

function App() {
    const [selectedWords, setSelectedWords] = useState([]);
    const [progress, setProgress] = useState(0);
    const [start, setStart] = useState(0);

    const handleSelectWord = (id) => {
        setSelectedWords((prev) =>
            prev.includes(id)
                ? prev.filter((wordId) => wordId !== id)
                : [...prev, id]
        );
    };
    console.log("progress", progress);
    const handleStartQuiz = () => {
        setProgress(0);
        setStart(1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 ">
            <h1 className="text-3xl font-bold mb-6">Vocabulary Trainer</h1>
            {start === 0 ? (
                <WordSelection
                    words={words}
                    onSelectWord={handleSelectWord}
                    onStartQuiz={handleStartQuiz}
                    selectedWords={selectedWords} // Передаем выбранные слова
                    setSelectedWords={setSelectedWords} // Передаем выбранные слова
                />
            ) : (
                <div className="w-screen flex justify-center items-center">
                    <div className="w-1/2">
                        <ProgressBar progress={progress} />
                        <Quiz
                            selectedWords={selectedWords}
                            words={words}
                            setProgress={setProgress}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
