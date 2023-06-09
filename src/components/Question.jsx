import React, { useState } from "react";
import "./style/style.css";
import Save from "./Save";

export default function Question({
  question,
  category,
  possibleAnswers,
  style,
  correctAnswer,
}) {
  const [backgroundCol, setBackgroundCol] = useState("#28C1C9");
  const [correctCol, setCorrectCol] = useState("#28C1C9");
  const [incorrectCol, setIncorrectCol] = useState("#28C1C9");

  const styles = {
    questionCard: {
      backgroundColor: "#E1F6FA",
      height: "9rem",
      width: "20rem",
      display: "flex",
      flexDirection: "column",
      color: "purple",
      justifyContent: "space-around",
      borderRadius: "7px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
      padding: "1rem",
      margin: "2rem",
      ...style,
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
      backgroundColor: backgroundCol,
      padding: "0.4rem",
      borderRadius: "5px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
      fontSize: "0.7rem",
      color: "white",
    },
    wrongAnswer: {
      backgroundColor: incorrectCol,
      padding: "0.4rem",
      borderRadius: "5px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
      fontSize: "0.7rem",
      color: "white",
    },
    correctAnswer: {
      backgroundColor: correctCol,
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
              console.log(answer !== correctAnswer);
              return (
                <span
                  key={index}
                  className="possibleAnswer"
                  style={
                    answer !== correctAnswer
                      ? styles.wrongAnswer
                      : styles.correctAnswer
                  }
                  onClick={(event) => {
                    setBackgroundCol("#28C1C9");
                    setCorrectCol("#225C03");
                    setIncorrectCol("#DB2E2B");
                  }}
                >
                  {answer}
                </span>
              );
            })}
          </div>
          <Save
          question={question}
          correctAnswer={correctAnswer}
          />
        </div>
      </div>
    </div>
  );
}