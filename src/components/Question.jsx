import React, { useState } from "react";

export default function Question({
  question,
  category,
  possibleAnswers,
  correctAnswer,
  // hideQuestions,
  storeChosenAnswer,
  style,
  // hideQuestionCard,
  setHideAnswerCardState,
  questionId,
  quizId,
}) {
  const [hideQuestionCard, setHideQuestionCardState] = useState(false);
  // const [hideAnswerCard, setHideAnswerCardState] = useState(true);
  const styles = {
    questionCard: {
      backgroundColor: "#E1F6FA",
      height: "9rem",
      width: "20rem",
      display: hideQuestionCard ? "none" : "flex",
      flexDirection: "column",
      color: "purple",
      justifyContent: "space-around",
      borderRadius: "7px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
      padding: "1rem",
      margin: "2rem",
      ...style,
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
    category: { textAlign: "left" },
    question: {
      backgroundColor: "white",
      fontSize: "0.85rem",
      padding: "0.2rem",
      borderRadius: "5px",
    },
    answers: { display: "flex", justifyContent: "space-around" },
    possibleAnswer: {
      backgroundColor: "#28C1C9",
      padding: "0.4rem",
      borderRadius: "5px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
      fontSize: "0.7rem",
      color: "white",
    },
  };

  return (
    <div className="outer-div">
      <div style={styles.container}>
        <div className="questionCard" style={styles.questionCard}>
          <div className="category" style={styles.category}>
            {category}
          </div>
          <div className="question" style={styles.question}>
            {question}
          </div>
          <div className={"answers"} style={styles.answers}>
            {possibleAnswers.map((answer, index) => {
              return (
                <span
                  key={index}
                  className="possibleAnswer"
                  style={styles.possibleAnswer}
                  onClick={(event) => {
                    // hideQuestions(event);
                    setHideQuestionCardState(true);
                    setHideAnswerCardState(false);
                    storeChosenAnswer(event);
                    questionId.current = quizId;
                  }}
                >
                  {answer}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
