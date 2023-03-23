import React, { useState } from "react";

export default function Answer({
  correctAnswer,
  answerChosen,
  hideAnswerCard,
  questionId,
  answerId,
  setHideAnswerCardState,
}) {
  // const [hideAnswerCard, setHideAnswerCardState] = useState(true);

  const styles = {
    answerCard: {
      backgroundColor: "#28C1C9",
      height: "9rem",
      width: "20rem",
      display: hideAnswerCard ? "none" : "flex",
      flexDirection: "column",
      color: "purple",
      justifyContent: "space-around",
      borderRadius: "7px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
      padding: "1rem",
      // ...style,
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

  // console.log(questionId.current);
  // console.log(answerId);

  // Render the component conditionally based on whether questionId is equal to answerId

  return questionId.current === answerId ? (
    <div className="outer-div">
      <div style={styles.container}>
        <div className="answerCard" style={styles.answerCard}>
          {answerChosen !== correctAnswer ? <p>{answerChosen}</p> : ""}
          <p>{correctAnswer}</p>
        </div>
      </div>
    </div>
  ) : null;
}
