import React, { useState } from "react";
import Question from "./Question";

const styles = {
  hide: { display: "none" },
  show: { display: "block" },
};

export default function Main() {
  const [quizzes, setQuizzes] = useState([
    {
      category: "♪ Music",
      question: "Which musician released the album 'Off the Wall'?",
      correctAnswer: "Micheal Jackson",
      incorrectAnswers: ["Neil Young", "Eric the Clap"],
      possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
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

  const styles = {
    main: { backgroundColor: "#C0C4DF" },
  };
  return (
    <div className="main" style={styles.main}>
      <button onClick={getQuizzes}>click</button>

      {quizzes.map((quiz, index) => {
        return (
          <Question
            question={quiz.question}
            category={quiz.category}
            possibleAnswers={quiz.possibleAnswers}
            correctAnswer={quiz.correctAnswer}
          />
        );
      })}
    </div>
  );
}
