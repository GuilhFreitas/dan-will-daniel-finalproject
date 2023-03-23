import React, { useState } from "react";
import Save from "./Save";
import SaveMenu from "./SaveMenu";

export default function Answer({
  possibleAnswers,
  correctAnswer,
  hideAnswers,
  answerChosen,
  hideAnswerCard,
  style,
}) {
  // const [hideAnswerCard, setHideAnswerCardState] = useState(false);

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

  console.log(answerChosen);
  return (
    <div className="outer-div">
      <div style={styles.container}>
        <div className="answerCard" style={styles.answerCard}>
          <p>{answerChosen}</p>
          <p>{correctAnswer}</p>
          <SaveMenu/>
        </div>
      </div>
    </div>
  );
}
