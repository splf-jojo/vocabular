// src/components/WordSelection.jsx
import React from "react";

const WordSelection = ({
    words,
    onSelectWord,
    onStartQuiz,
    selectedWords,
    setSelectedWords,
}) => {
    const handleRandomSelect = () => {
        const selectedIndices = new Set();

        // Pick 10 unique random indices
        while (
            selectedIndices.size < 10 &&
            selectedIndices.size < words.length
        ) {
            const randomIndex = Math.floor(Math.random() * words.length);
            selectedIndices.add(words[randomIndex].id);
        }

        setSelectedWords([...selectedIndices]); // Update selectedWords with the selected IDs
    };

    return (
        <div className="max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Select Words to Learn
            </h2>
            <button
                onClick={onStartQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            >
                Start Quiz
            </button>
            <button
                onClick={handleRandomSelect}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 ml-2"
            >
                Random Select
            </button>
            <ol className="list-decimal pl-5">
                {words.map((word) => (
                    <li key={word.id} className="mb-2">
                        <button
                            className={`px-3 py-1 rounded-lg ${
                                selectedWords.includes(word.id)
                                    ? "bg-red-300"
                                    : "bg-blue-100 hover:bg-blue-200"
                            }`}
                            onClick={() => onSelectWord(word.id)}
                        >
                            {word.russian}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default WordSelection;
