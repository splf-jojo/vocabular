// src/components/ProgressBar.js
import React from "react";

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
            <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
