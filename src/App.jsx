import React, { useState, useRef } from "react";
import "./components/style/style.css";
import Main from "./components/Main";
import HeaderNavbar from "./components/HeaderNavbar";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [quizzes, setQuizzes] = useState([
    {
      category: "Music",
      question: "Which musician released the album 'Off the Wall'?",
      correctAnswer: "Micheal Jackson",
      incorrectAnswers: ["Neil Young", "Eric the Clap", "jesus"],
      possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
    },
  ]);

  const category = useRef();
  const limit = useRef();

  const [handleAboutClick, setAboutClicked] = useState(false);
  const [getQuizClick, setQuizzClicked] = useState(true);

  const getQuizzes = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=${limit.current}&categories=${category.current}`
    )
      .then((resp) => resp.json())
      .then((newQuizzes) => {
        console.log(newQuizzes);
        setQuizzes(newQuizzes);
      });
  };

  const redirectToMain = () => {
    setAboutClicked(false);
    setQuizzClicked(true);
  };

  const redirectToAbout = () => {
    setAboutClicked(true);
    setQuizzClicked(false);
  };

  return (
    <div className="App">
      <div className="container">
        <HeaderNavbar
          getQuizzes={getQuizzes}
          limit={limit}
          category={category}
          setAboutClicked={setAboutClicked}
          redirectToMain={redirectToMain}
          redirectToAbout={redirectToAbout}
        />
        {handleAboutClick ? (
          <About />
        ) : getQuizClick ? (
           <Main
            getQuizzes={getQuizzes }
            quizzes={quizzes}
            setQuizzes={setQuizzes}
          />
        ) : null}
        <Footer />
      </div>

    </div>
  );
}

export default App;



