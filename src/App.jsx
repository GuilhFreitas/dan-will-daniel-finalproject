import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import HeaderNavbar from "./components/HeaderNavbar";

let category = "history";
let limit = 5;

function App() {
  const [quizzes, setQuizzes] = useState([
    {
      category: "♪ Music",
      question: "Which musician released the album 'Off the Wall'?",
      correctAnswer: "Micheal Jackson",
      incorrectAnswers: ["Neil Young", "Eric the Clap"],
      possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
      id: 0,
    },
  ]);

  const getQuizzes = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}`
    )
      .then((resp) => resp.json())
      .then((newQuizzes) => {
        console.log(newQuizzes);
        setQuizzes(newQuizzes);
      });
  };

  return (
    <div className="App">
      <HeaderNavbar getQuizzes={getQuizzes} />
      <Main
        category={category}
        limit={limit}
        getQuizzes={getQuizzes}
        quizzes={quizzes}
        setQuizzes={setQuizzes}
      />
    </div>
  );
}

export default App;
