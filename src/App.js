import React from "react";
import "./App.css";
import Start from "./components/Start";
import QA from "./components/QA";
import { nanoid } from "nanoid";

function App() {
  const [start, setStart] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [submittedAnswer, setSubmittedAnswer] = React.useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  const [footer, setFooter] = React.useState(false);

  // const [optionsArr, setOptionsArr] = React.useState([]);
  function startQuiz() {
    setStart(true);
  }

  function playAgain() {
    setSubmittedAnswer(["", "", "", "", ""]);
    setFooter(false);
  }

  function selectedAnswer(question, answer, index) {
    //setting isSleceted true if answer mathced the options
    setQuiz((prevQuiz) =>
      prevQuiz.map((quiz) => {
        const optionsArr = quiz.options.map((option) =>
          option.option === answer
            ? { ...option, isSelected: !option.isSelected }
            : option
        );
        return { ...quiz, options: [...optionsArr] };
      })
    );

    // setting ansersubmit staet by creating newaray and spread old array in the new array and changing the value at speciifc index
    setSubmittedAnswer((preArr) => {
      const newArr = [...preArr];
      newArr[index] = answer;
      return newArr;
    });
  }
  React.useEffect(() => {
    const filteredArray = submittedAnswer.every((ans) => ans !== "");
    if (filteredArray) {
      setQuiz((prevQuiz) =>
        prevQuiz.map((quiz, i) => {
          // const options = quiz.options.map((option) => {
          //   return quiz.correctAnswer === option.option
          //     ? { ...option, isSelected: true }
          //     : option;
          // });
          return quiz.correctAnswer === submittedAnswer[i]
            ? { ...quiz, answeredCorrectly: true }
            : quiz;
        })
      );

      setFooter(true);
    }
  }, [submittedAnswer]);

  function totalRightAns(arr) {
    return quiz.filter((ele) => ele.answeredCorrectly).length;
  }

  React.useEffect(() => {
    if (!footer) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((response) => response.json())
        .then((data) => setQuiz(createQuiz(data.results)));
    }
  }, [footer]);

  //helper function to create new array based on api data
  function createQuiz(arr) {
    const newArr = [];
    const optionArr = [];
    let count = 0;
    for (let qa of arr) {
      optionArr.push(
        qa.incorrect_answers.map((ele) => {
          return {
            option: ele,
            optionId: nanoid(),
            isSelected: false,
            correctAns: false,
          };
        })
      );
      newArr.push({
        question: qa.question,
        correctAnswer: qa.correct_answer,
        answeredCorrectly: false,
        options: randomArrayShuffle([
          {
            option: qa.correct_answer,
            optionId: nanoid(),
            isSelected: false,
            correctAns: true,
          },
          ...optionArr[count],
        ]),
      });
      count++;
    }
    console.log(newArr);
    return newArr;
  }

  function randomArrayShuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return (
    <main className={start ? "qa-main" : "start-main"}>
      <div className="yellow-circle"></div>
      <div className="blue-circle"></div>
      {start ? (
        quiz.map((qa, index) => {
          return (
            <QA
              key={qa.question}
              answers={qa.options}
              question={qa.question}
              handleClick={selectedAnswer}
              index={index}
              wrongAnsCheck={submittedAnswer.every((ans) => ans !== "")}
              correctAnswer={qa.answeredCorrectly}
            />
          );
        })
      ) : (
        <Start handleStartQuiz={startQuiz} />
      )}
      {footer && (
        <div className="footer">
          <p>You have socerd {totalRightAns()} out of 5</p>
          <button className="restart" onClick={playAgain}>
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
