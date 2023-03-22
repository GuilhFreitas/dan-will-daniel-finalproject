import React from "react";

export default function Question({
  question,
  category,
  possibleAnswers,
  correctAnswer,
  hideQuestions,
  storeChosenAnswer,
  style,
  hideQuestionCard,
}) {
  // const [hideQuestionCard, setHideQuestionCardState] = useState(false);

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
    // container: {
    //   justifyContent: "center",
    // },
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

  // const handleHideQuestions = (event) => { 
  //   setHideQuestionCardState(true); // set state variable to true
  //   hideQuestions(event); // call parent function
  // };

  return (
    <div className="outer-div">
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
                    hideQuestions(event);
                    storeChosenAnswer(event);
                  }}
                >
                  {answer}
                </span>
              );
            })}
          </div>
        </div>
      </div>
  );
}
