import React, { useState, useRef } from "react";
import Question from "./Question";
import Answer from "./Answer";
import { shuffle } from "lodash";
import "./style/Main.css"
// import { positions } from "@mui/system";

export default function Main({ quizzes }) {
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

  const getPossibleAnswers = (quiz) => {
    quiz.incorrectAnswers.push(quiz.correctAnswer);
    quiz.incorrectAnswers.shift();
    console.log(quiz.incorrectAnswers);
    const shuffledArray = shuffle(quiz.incorrectAnswers);
    return shuffledArray;
  };

  console.log(quizzes);
  return (
    <div className="main" >
      {quizzes.map((quiz, index) => {
        return (
          <>
            <Question
              key={index}
              question={quiz.question}
              category={quiz.category}
              possibleAnswers={getPossibleAnswers(quiz)}
              // possibleAnswers={quiz.incorrectAnswers}
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