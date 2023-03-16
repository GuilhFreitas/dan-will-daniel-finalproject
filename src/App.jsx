import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quizzes, setQuizzes] = useState([{ question: "fava" }]);
  let category = "history";
  let limit = 5;

  const getQuizzes = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}`
    )
      .then((resp) => resp.json())
      .then((quizzes) => {
        setQuizzes(quizzes);
        console.log(quizzes);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Time</h1>
      </header>
      <button onClick={getQuizzes}>click</button>
      <div>
        {quizzes.map((quiz) => {
          return <p>{quiz.question}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
