import React, { useState, useRef } from "react";
import Question from "./Question";
import Answer from "./Answer";

export default function Main({
  category,
  limit,
  getQuizzes,
  quizzes,
  setQuizzes,
}) {
  const [hideQuestionCard, setHideQuestionCardState] = useState(false);
  const [hideAnswerCard, setHideAnswerCardState] = useState(true);

  let answerChosen = useRef("");

  const hideQuestionsAndShowAnswers = () => {
    setHideQuestionCardState(true);
    setHideAnswerCardState(false);
  };

  const hideAnswersAndShowQuestions = () => {};

  const storeChosenAnswer = (event) => {
    answerChosen.current = event.target.textContent;
    console.log(answerChosen);
  };

  const styles = {
    main: { backgroundColor: "#C0C4DF", height: "200rem" },
  };

  return (
    <div className="main" style={styles.main}>
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
