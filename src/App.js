import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { yellow } from '@mui/material/colors';
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

  const nav = createTheme({
    palette: {
      primary: {
      main: '#fff59d',   
      },
    },
  });

  const btn = createTheme({
    palette: {
      primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
      },
    },
  });

  
  const dropDown = createTheme({
    palette: {
      primary: {
      main: '#03a9f4',
      },
    },
  });
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Time</h1>
      </header>
      <Box onClick={handleDrawerToggle} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={nav}>
      <AppBar position='static' >
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

      <ThemeProvider theme={btn}>
        <Button onClick={getQuizzes}variant="contained" >Generate Quiz</Button>
      </ThemeProvider>

      <ThemeProvider theme={dropDown}>
        <Box sx={{ minWidth: 120, margin: 2}}>
         <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" label="Category">Category</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category} label="Category" onChange={handleCategoryChange}>
          <MenuItem value="Arts & Literature" >Arts & Literature</MenuItem>
            <MenuItem value="Film & TV">Film & TV</MenuItem>
            <MenuItem value="science">Science</MenuItem>
            <MenuItem value="history">History</MenuItem>
            <MenuItem value="Society & Culture">Society & Culture</MenuItem>
            <MenuItem value="Geography">Geography</MenuItem>
          </Select>
         </FormControl>
        </Box>
        </ThemeProvider>
        
    <ThemeProvider theme={dropDown}>
      <Box sx={{ minWidth: 125 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cards:</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={limit} label="Cards" onChange={handleNumCardsChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
          </Select>
          </FormControl>
          </Box>
          </ThemeProvider> 
          </Toolbar>
          </AppBar>
          </ThemeProvider>      
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