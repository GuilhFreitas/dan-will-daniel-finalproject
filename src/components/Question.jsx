import React from "react";

export default function Question() {
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
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
    category: { textAlign: "left" },
    question: {},
    answers: { display: "flex", justifyContent: "space-around" },
    answer: {},
  };

  return (
    <div className="outer-div">
      <div style={styles.container}>
        <div className="questionCard" style={styles.questionCard}>
          <div className="category" style={styles.category}>
            Music
          </div>
          <div className="question">
            Which musician released the album "Off the Wall"?
          </div>
          <div className="answers" style={styles.answers}>
            <div>Nicky Minaj</div>
            <div>Neil Young</div>
            <div>Eric Clapton</div>
          </div>
        </div>
      </div>
    </div>
  );
}
