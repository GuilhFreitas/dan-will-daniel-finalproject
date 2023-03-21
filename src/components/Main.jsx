import React, { useState, useRef } from "react";
import Question from "./Question";
import Answer from "./Answer";
import { shuffle } from "lodash";

export default function Main({ quizzes }) {
  const [hideAnswerCard, setHideAnswerCardState] = useState(true);
  const answerChosen = useRef("");
  const questionId = useRef(undefined);
  const answerId = useRef(undefined);

  // const reset = () => {
  //   setHideAnswerCardState(true);
  //   answerChosen.current = "";
  //   questionId.current = undefined;
  //   answerId.current = undefined;
  // };

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
    <div
      className="main"
      style={styles.main}
      onClick={(event) => {
        if (event.target.class === "possibleAnswer") {
          setHideAnswerCardState(true);
        }
      }}
    >
      {quizzes.map((quiz, index) => {
        return (
          <div key={index}>
            <Question
              question={quiz.question}
              category={quiz.category}
              possibleAnswers={getPossibleAnswers(quiz)}
              correctAnswer={quiz.correctAnswer}
              storeChosenAnswer={storeChosenAnswer}
              setHideAnswerCardState={setHideAnswerCardState}
              questionId={questionId}
              quizId={quiz.id}
            />

            <Answer
              correctAnswer={quiz.correctAnswer}
              storeChosenAnswer={storeChosenAnswer}
              setHideAnswerCardState={setHideAnswerCardState}
              answerChosen={answerChosen.current}
              hideAnswerCard={hideAnswerCard}
              questionId={questionId}
              answerId={quiz.id}
            />
          </div>
        );
      })}
    </div>
  );
}
