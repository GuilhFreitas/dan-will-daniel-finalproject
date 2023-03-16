import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { handleCategoryChange } from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import "./App.css";


const styles = {
  hide: { display: "none" },
  show: { display: "block" }
};

function App() {
  const [quizzes, setQuizzes] = useState([]);

  const [category, setCategory] = useState("");
  const [limit, setNumCards] = useState();

  // function to get the quizzes from the API
  const getQuizzes = async () => {
    try {
      const response = await fetch(
        `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}`
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
  }, []);

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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNumCardsChange = (event) => {
    setNumCards(Number.parseInt(event.target.value));
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Time</h1>
      </header>
      <Box onClick={handleDrawerToggle} sx={{ flexGrow: 1 }}>
      <AppBar position="static" component="nav" color="inherit">
      <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
             <MenuIcon />
          </IconButton>
          <Button onClick={getQuizzes} color="primary" >Generate Quiz</Button>
          <Box sx={{ minWidth: 120, margin: 2}}>
         <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category:</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
          <MenuItem value="Arts & Literature">Arts & Literature</MenuItem>
            <MenuItem value="Film & TV">Film & TV</MenuItem>
            <MenuItem value="science">Science</MenuItem>
            <MenuItem value="history">History</MenuItem>
            <MenuItem value="Society & Culture">Society & Culture</MenuItem>
            <MenuItem value="Geography">Geography</MenuItem>
          </Select>
         </FormControl>
         </Box>
        
     
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Num Cards:</InputLabel>
          <Select value={limit} onChange={handleNumCardsChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
          </Select>
          </FormControl>
          </Box>
          </Toolbar>
           </AppBar>
      </Box>
     
 
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
    </div>
  );
}

export default App;