import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";

const styles = {
  hide: { display: "none" },
  show: { display: "block" },
};

function App() {
  const [quizzes, setQuizzes] = useState([
    {
      category: "category here",
      question: "question here",
      correctAnswer: "answer here",
      index: 0,
    },
  ]);
  let category = "history";
  let limit = 5;

  const getQuizzes = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}`
    )
      .then((resp) => resp.json())
      .then((quizzes) => {
        console.log(quizzes);
        setQuizzes(quizzes);
      });
  };

  const hideQuestionsAndShowAnswers = (event) => {
    if (event.target.getAttribute("style") === "display: block;") {
      event.target.setAttribute("style", "display: none;");
      event.target.nextSibling.setAttribute("style", "display: block;");
    }
  };

  const hideAnswersAndShowQuestions = (event) => {
    if (event.target.getAttribute("style") === "display: block;") {
      event.target.setAttribute("style", "display: none;");
      event.target.previousSibling.setAttribute("style", "display: block;");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Time</h1>
      </header>
      <button onClick={getQuizzes}>click</button>

      <div>
        {quizzes.map((quiz) => {
          return (
            <div key={quiz.id}>
              <p
                style={styles.show}
                onClick={(event) => hideQuestionsAndShowAnswers(event)}
              >
                Question: {quiz.question}
              </p>
              <p
                style={styles.hide}
                onClick={(event) => hideAnswersAndShowQuestions(event)}
              >
                Answer: {quiz.correctAnswer}
              </p>
            </div>
          );
        })}
      </div>
      <Main />
    </div>
  );
}

export default App;
