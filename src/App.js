
import React, { useState, useEffect } from "react";
import HeaderNavbar from "./component/HeaderNavbar";
import Box from '@mui/material/Box';

const styles = { 
  hide: { display: "none" },
  show: { display: "block" }
};

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [category, setCategory] = useState("");
  const [numCards, setNumCards] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  // function to get the quizzes from the API
  const getQuizzes = async () => {
    try {
      const response = await fetch(
        `https://the-trivia-api.com/api/questions?limit=${numCards}&categories=${category}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const quizzes = await response.json();
      setQuizzes(quizzes);
    } catch (error) {
      console.error(error);
      setQuizzes([]);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, [category, numCards]);

  const hideQuestionsAndShowAnswers = (event) => {
        if (event.target.getAttribute("style") === "display: block;") {
          event.target.setAttribute("style", "display: none;");
          event.target.nextSibling.setAttribute("style", "display: block;");
        }
      };
    
      const hideAnswersAndShowQuestions = (event) => {
        if (event.target.getAttribute("style") === "display: block;") {
          event.target.setAttribute("style", "display: none;");
          event.target.previousSibling.setAttribute("style", "display: block;");
        }
      };
    

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleQuizRequest = (newCategory, newNumCards) => {
    setCategory(newCategory);
    setNumCards(newNumCards);
  };

  return (
    <div className="App">
      <HeaderNavbar onQuizRequest={handleQuizRequest} onDrawerToggle={handleDrawerToggle} onNumCardsChange={setNumCards} />
      <Box onClick={handleDrawerToggle} sx={{ flexGrow: 1 }}>
        {quizzes.map((quiz) => (
          <div key={quiz.id}>
            <p style={styles.show} onClick={(event) => hideQuestionsAndShowAnswers(event)}>
              Question: {quiz.question}
            </p>
            <p style={styles.hide} onClick={(event) => hideAnswersAndShowQuestions(event)}>
              Answer: {quiz.correctAnswer}
            </p>
          </div>
        ))}
      </Box>
    </div>
  );
}

export default App;
