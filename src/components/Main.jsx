// import React, { useRef } from "react";
// import Question from "./Question";
// import { shuffle } from "lodash";
// import "./style/style.css"
// // import { positions } from "@mui/system";

// export default function Main({ quizzes }) {
//   const [hideQuestionCard, setHideQuestionCardState] = useState(false);
//   const [hideAnswerCard, setHideAnswerCardState] = useState(true);

//   let answerChosen = useRef("");

//   const hideQuestionsAndShowAnswers = () => {
//     setHideQuestionCardState(true);
//     setHideAnswerCardState(false);
//   };

//   const hideAnswersAndShowQuestions = () => {};

//   const storeChosenAnswer = (event) => {
//     answerChosen.current = event.target.textContent;
//     console.log(answerChosen);
//   };

//   const getPossibleAnswers = (quiz) => {
//     quiz.incorrectAnswers.push(quiz.correctAnswer);
//     quiz.incorrectAnswers.shift();
//     console.log(quiz.incorrectAnswers);
//     const shuffledArray = shuffle(quiz.incorrectAnswers);
//     return shuffledArray;
//   };

//   console.log(quizzes);
//   return (
//     <div className="main" >
//       {quizzes.map((quiz, index) => {
//         return (
//           <div className="QuestionAnswer">
//             <Question
//               key={index}
//               question={quiz.question}
//               category={quiz.category}
//               possibleAnswers={getPossibleAnswers(quiz)}
//               // possibleAnswers={quiz.incorrectAnswers}
//               correctAnswer={quiz.correctAnswer}
//               hideQuestions={hideQuestionsAndShowAnswers}
//               style={hideQuestionCard ? { display: "none" } : {}}
//               storeChosenAnswer={storeChosenAnswer}
//               hideQuestionCard={hideQuestionCard}
//             />
//             {hideAnswerCard ? null : (
//               <Answer
//                 key={index + 1000}
//                 correctAnswer={quiz.correctAnswer}
//                 // possibleAnswers={quiz.incorrectAnswers}
//                 storeChosenAnswer={storeChosenAnswer}
//                 hideAnswers={hideAnswersAndShowQuestions}
//                 answerChosen={answerChosen.current}
//                 hideAnswerCard={hideAnswerCard}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import React, { useRef } from "react";
import Question from "./Question";
import "./style/style.css";
// import _ from "lodash";
import { shuffle } from "lodash";

export default function Main({ quizzes }) {
  const answerChosen = useRef("");
  const questionId = useRef(undefined);

  const storeChosenAnswer = (event) => {
    answerChosen.current = event.target.textContent;
  };

  // const styles = {
  //   main: { backgroundColor: "#C0C4DF", height: "200rem" },
  // };

  const getPossibleAnswers = (quiz) => {
    if (!quiz.incorrectAnswers.includes(quiz.correctAnswer)) {
      quiz.incorrectAnswers.shift();
      quiz.incorrectAnswers.push(quiz.correctAnswer);
    }
    const shuffledArray = shuffle(quiz.incorrectAnswers);
    return shuffledArray;
  };

  return (
    <div className="main" >
      {quizzes.map((quiz, index) => {
        return (
          <div key={index}>
            <Question
              question={quiz.question}
              category={quiz.category}
              possibleAnswers={getPossibleAnswers(quiz)}
              correctAnswer={quiz.correctAnswer}
              storeChosenAnswer={storeChosenAnswer}
              questionId={questionId}
              quizId={quiz.id}
            />
          </div>
        );
      })}
    </div>
  );
}