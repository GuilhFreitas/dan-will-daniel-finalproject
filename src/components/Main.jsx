import React, { useState, useRef } from "react";
import Question from "./Question";
import { shuffle } from "lodash";

export default function Main({ quizzes }) {
  const answerChosen = useRef("");
  const questionId = useRef(undefined);

  const storeChosenAnswer = (event) => {
    answerChosen.current = event.target.textContent;
  };

  const styles = {
    main: { backgroundColor: "#C0C4DF", height: "200rem" },
  };

  const getPossibleAnswers = (quiz) => {
    if (!quiz.incorrectAnswers.includes(quiz.correctAnswer)) {
      quiz.incorrectAnswers.shift();
      quiz.incorrectAnswers.push(quiz.correctAnswer);
    }
    const shuffledArray = shuffle(quiz.incorrectAnswers);
    return shuffledArray;
  };

  return (
    <div className="main" style={styles.main}>
      {quizzes.map((quiz, index) => {
        return (
          <div key={index}>
            <Question
              question={quiz.question}
              category={quiz.category}
              possibleAnswers={getPossibleAnswers(quiz)}
              correctAnswer={quiz.correctAnswer}
              storeChosenAnswer={storeChosenAnswer}
              questionId={questionId}
              quizId={quiz.id}
            />
          </div>
        );
      })}
    </div>
  );
}
