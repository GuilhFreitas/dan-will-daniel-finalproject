import React, { useState, useRef } from "react";
import Question from "./Question";
import Answer from "./Answer";
import { shuffle } from "lodash";

export default function Main({ quizzes }) {
  // const [hideQuestionCard, setHideQuestionCardState] = useState(false);
  const [hideAnswerCard, setHideAnswerCardState] = useState(true);
  const answerChosen = useRef("");
  // const questionId = useRef(undefined);
  // const answerId = useRef(undefined);

  const hideQuestionsAndShowAnswers = () => {
    // setHideQuestionCardState(true);
    // setHideAnswerCardState(false);
  };

  const hideAnswersAndShowQuestions = () => {};

  const storeChosenAnswer = (event) => {
    answerChosen.current = event.target.textContent;
  };

  const styles = {
    main: { backgroundColor: "#C0C4DF", height: "200rem" },
  };

  const getPossibleAnswers = (quiz) => {
    quiz.incorrectAnswers.push(quiz.correctAnswer);
    quiz.incorrectAnswers.shift();
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
              hideQuestions={hideQuestionsAndShowAnswers}
              storeChosenAnswer={storeChosenAnswer}
              setHideAnswerCardState={setHideAnswerCardState}
              // questionId={quiz.id}
            />

            <Answer
              correctAnswer={quiz.correctAnswer}
              storeChosenAnswer={storeChosenAnswer}
              hideAnswers={hideAnswersAndShowQuestions}
              answerChosen={answerChosen.current}
              hideAnswerCard={hideAnswerCard}
              // questionId={quiz.id}
              // answerId={quiz.id}
            />
          </div>
        );
      })}
    </div>
  );
}
