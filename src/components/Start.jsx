import React from "react";
import "./Start.css";

const Start = ({ handleStartQuiz }) => {
  return (
    <div className="start-container">
      <h1 className="title">Quizzical App</h1>
      <p className="description">Some Description If needed</p>
      <button className="start-btn" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default Start;
