import React, { useState, useRef } from "react";
import Question from "./Question";
import Answer from "./Answer";

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
  const [hideAnswerCard, setHideAnswerCardState] = useState(true);

  let category = "history";
  let limit = 5;
  let answerChosen = useRef("");

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

  const hideQuestionsAndShowAnswers = () => {
    setHideQuestionCardState(true);
    setHideAnswerCardState(false);
  };

  const hideAnswersAndShowQuestions = () => {
    // if (event.target.getAttribute("style") === "display: block;") {
    //   event.target.setAttribute("style", "display: none;");
    //   event.target.previousSibling.setAttribute("style", "display: block;");
    // }
    // console.log(event);
  };

  const storeChosenAnswer = (event) => {
    answerChosen.current = event.target.textContent;
    console.log(answerChosen);
  };

  const styles = {
    main: { backgroundColor: "#C0C4DF", height: "200rem" },
  };

  return (
    <div className="main" style={styles.main}>
      <button onClick={getQuizzes}>click</button>

      {quizzes.map((quiz, index) => {
        return (
          <>
            <Question
              key={index}
              question={quiz.question}
              category={quiz.category}
              possibleAnswers={quiz.incorrectAnswers}
              correctAnswer={quiz.correctAnswer}
              hideQuestions={hideQuestionsAndShowAnswers}
              style={hideQuestionCard ? { display: "none" } : {}}
              storeChosenAnswer={storeChosenAnswer}
              hideQuestionCard={hideQuestionCard}
            />
            {hideAnswerCard ? null : (
              <Answer
                question={quiz.question}
                key={index + 1000}
                correctAnswer={quiz.correctAnswer}
                // possibleAnswers={quiz.incorrectAnswers}
                storeChosenAnswer={storeChosenAnswer}
                hideAnswers={hideAnswersAndShowQuestions}
                answerChosen={answerChosen.current}
                hideAnswerCard={hideAnswerCard}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
