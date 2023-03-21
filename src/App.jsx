import React, { useState, useRef } from "react";
import "./App.css";
import Main from "./components/Main";
import HeaderNavbar from "./components/HeaderNavbar";
import _ from "lodash";

function App() {
  const [quizzes, setQuizzes] = useState([
    {
      category: "♪ Music",
      question: "Which musician released the album 'Off the Wall'?",
      correctAnswer: "Micheal Jackson",
      incorrectAnswers: ["Neil Young", "Eric the Clap", "jesus"],
      possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
    },
  ]);

  const category = useRef("");
  const limit = useRef(5);

  const getQuizzes = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=${limit.current}&categories=${category.current}`
    )
      .then((resp) => resp.json())
      .then((newQuizzes) => {
        console.log(newQuizzes);
        setQuizzes(newQuizzes);
      });
  };

  return (
    <div className="App">
      <HeaderNavbar getQuizzes={getQuizzes} limit={limit} category={category} />
      <Main getQuizzes={getQuizzes} quizzes={quizzes} setQuizzes={setQuizzes} />
    </div>
  );
}

export default App;
