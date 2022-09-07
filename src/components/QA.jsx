import React from "react";
import "./QA.css";

const QA = (props) => {
  //helper function to convert question to regular string
  function getText(html) {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }

  return (
    <div className="qa-container">
      <p className="question">{getText(props.question)}</p>
      <div className="answer-container">
        {props.answers.map((answer) => {
          let classes = "";
          if (props.correctAnswer && answer.isSelected) {
            classes = "option correct-ans";
          } else if (props.wrongAnsCheck && answer.isSelected) {
            classes = "option wrong-ans";
          } else if (answer.isSelected) {
            classes = "option selected";
          } else {
            classes = "option";
          }

          return (
            <p
              key={answer.option}
              className={classes}
              onClick={() =>
                props.handleClick(props.question, answer.option, props.index)
              }
            >
              {getText(answer.option)}
            </p>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default QA;
