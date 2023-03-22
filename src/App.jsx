

// import React, { useState, useRef } from "react";
// import "./App.css";
// import Main from "./components/Main";
// import HeaderNavbar from "./components/HeaderNavbar";
// import _ from "lodash";
// import shuffle from "lodash/shuffle";
// import About from "./components/About";
// import Footer from "./components/Footer";

// function App() {
//   const [quizzes, setQuizzes] = useState([
//     {
//       category: "♪ Music",
//       question: "Which musician released the album 'Off the Wall'?",
//       correctAnswer: "Micheal Jackson",
//       incorrectAnswers: ["Neil Young", "Eric the Clap", "jesus"],
//       possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
//       id: 0,
//     },
//   ]);

//   const category = useRef("");
//   const limit = useRef(5);

//   const getQuizzes = () => {
//     fetch(
//       `https://the-trivia-api.com/api/questions?limit=${limit.current}&categories=${category.current}`
//     )
//       .then((resp) => resp.json())
//       .then((newQuizzes) => {
//         console.log(newQuizzes);
//         setQuizzes([
//           ...quizzes,
//           ...newQuizzes.map((quiz) => ({ ...quiz, id: quizzes.length })),
//         ]);
//       })
//       .catch((err) => {
//         console.error(err);
//         setQuizzes([]);
//       });
//   };

//   const handleAboutClick = () => {
//     setQuizzes([]);
//     setAboutClicked(true);
//     setQuizzClicked(false);
//   };

//   const handleQuizClick = () => {
//     setQuizzClicked(true);
//     setAboutClicked(false);
//     getQuizzes();
//   };

//   const [AboutClick, setAboutClicked] = useState(false);
//   const [getQuizClick, setQuizzClicked] = useState(false);

//   return (
//     <div className="App">
//       <HeaderNavbar
//         handleQuizClick={handleQuizClick}
//         handleAboutClick={handleAboutClick}
//         limit={limit}
//         category={category}
//       />
//       {getQuizClick ? (
//         <Main quizzes={quizzes} />
//       ) : AboutClick ? (
//         <About />
//       ) : null}
//       <Footer />
//     </div>
//   );
// }

// export default App;

// import React, { useState, useRef } from "react";
// import "./App.css";
// import Main from "./components/Main";
// import HeaderNavbar from "./components/HeaderNavbar";
// import _ from "lodash";
// import shuffle from "lodash/shuffle";
// import About from "./components/About";
// import Footer from "./components/Footer";

// function App() {
//   const [quizzes, setQuizzes] = useState([
//     {
//       category: "♪ Music",
//       question: "Which musician released the album 'Off the Wall'?",
//       correctAnswer: "Micheal Jackson",
//       incorrectAnswers: ["Neil Young", "Eric the Clap", "jesus"],
//       possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
//       id: 0,
//     },
//   ]);

//   const category = useRef("");
//   const limit = useRef(5);

//   const [handleAboutClick, setAboutClicked] = useState(false);
//   const [getQuizClick, setQuizzClicked] = useState(false);

//   const getQuizzes = () => {
//     fetch(
//       `https://the-trivia-api.com/api/questions?limit=${limit.current}&categories=${category.current}`
//     )
//       .then((resp) => resp.json())
//       .then((newQuizzes) => {
//         console.log(newQuizzes);
//         setQuizzes([
//           {
//             category: newQuizzes.category,
//             question: newQuizzes.question,
//             correctAnswer: newQuizzes.correctAnswer,
//             incorrectAnswers: newQuizzes.incorrectAnswers,
//             possibleAnswers: [
//               newQuizzes.correctAnswer,
//               ...newQuizzes.incorrectAnswers,
//             ],
//             id: quizzes.length,
//           },
//           ...quizzes,
//         ]);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="App">
//       <HeaderNavbar
//         getQuizzes={getQuizzes}
//         limit={limit}
//         category={category}
//         setAboutClicked={setAboutClicked}
//       />
//       {getQuizClick ? (
//         <Main getQuizzes={getQuizzes} quizzes={quizzes} setQuizzes={setQuizzes} />
//       ) : handleAboutClick ? (
//         <About />
//       ) : null}

//       <Footer />
//     </div>
//   );
// }

// export default App;

///the orginal code 

import React, { useState, useRef } from "react";
import "./components/style/style.css"
import Main from "./components/Main";
import HeaderNavbar from "./components/HeaderNavbar";
import Footer from "./components/Footer";
import About from "./components/About";
import _ from "lodash";

function App() {
  const [quizzes, setQuizzes] = useState([
    {
      category: "♪ Music",
      question: "Which musician released the album 'Off the Wall'?",
      correctAnswer: "Micheal Jackson",
      incorrectAnswers: ["Neil Young", "Eric the Clap", "jesus"],
      possibleAnswers: ["Neil Young", "Eric the Clap", "Micheal Jackson"],
    },
  ]);

  const category = useRef("");
  const limit = useRef(5);

  const [handleAboutClick, setAboutClicked] = useState(false);
  const [getQuizClick, setQuizzClicked] = useState(false);

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

  return (
    // <div className="App">
    //   <HeaderNavbar getQuizzes={getQuizzes} limit={limit} category={category} setAboutClicked= {setAboutClicked}/>
    //   {handleAboutClick ? (
    //     setAboutClicked && <About />
    //    ) : (
    //   <Main getQuizzes={getQuizzes} quizzes={quizzes} setQuizzes={setQuizzes} />
    //    )}
    //   <Footer />
    // </div>

    <div className="App">
      <div className="container">
    <HeaderNavbar
      getQuizzes={getQuizzes}
      limit={limit}
      category={category}
      setAboutClicked={setAboutClicked}
    />
   
    { handleAboutClick ? (
      setAboutClicked && <About getQuizzes={getQuizzes} quizzes={quizzes} setQuizzes={setQuizzes}/>
    ) : <Main getQuizzes={getQuizzes} quizzes={quizzes} setQuizzes={setQuizzes} />}

    <Footer />
    </div>
  </div>
    
  );
}

export default App;

//the original code 



