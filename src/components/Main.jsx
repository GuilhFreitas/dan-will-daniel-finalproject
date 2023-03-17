import React, { useState } from "react";
import Question from "./Question";

export default function Main() {
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

  const [hideQuestionCard, setHideQuestionCardState] = useState(false);

  let category = "history";
  let limit = 5;

  const getQuizzes = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}`
    )
      .then((resp) => resp.json())
      .then((newQuizzes) => {
        // debugger;
        console.log(newQuizzes);
        setQuizzes(newQuizzes);
      });
  };

  const hideQuestionsAndShowAnswers = (event) => {
    const questionCard = event.target.parentNode.parentNode;
    setHideQuestionCardState(true);
    console.log(questionCard.getAttribute("style"));

    // console.log(questionCard.getAttribute("style"));
    // if (questionCard.getAttribute("style") === "display: flex;") {
    //   questionCard.setAttribute("style", "display: none;");
    // event.target.nextSibling.setAttribute("style", "display: block;");
    // }
  };

  const hideAnswersAndShowQuestions = (event) => {
    if (event.target.getAttribute("style") === "display: block;") {
      event.target.setAttribute("style", "display: none;");
      event.target.previousSibling.setAttribute("style", "display: block;");
    }
  };

  const styles = {
    main: { backgroundColor: "#C0C4DF" },
    hide: { display: "none" },
    show: { display: "block" },
  };

  return (
    <div className="main" style={styles.main}>
      <button onClick={getQuizzes}>click</button>

      {quizzes.map((quiz, index) => {
        return (
          <Question
            key={index}
            question={quiz.question}
            category={quiz.category}
            possibleAnswers={quiz.incorrectAnswers}
            correctAnswer={quiz.correctAnswer}
            hideQuestions={hideQuestionsAndShowAnswers}
            style={hideQuestionCard ? { display: "none" } : {}}
          />
        );
      })}
    </div>
  );
}
