//import statements for required components
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./HeaderNavbar.css";

//function to create HeaderNavbar
function HeaderNavbar(props) {
  //Defining constants for storing state variables- category and limit
  const [category, setCategory] = useState("");
  const [limit, setNumCards] = useState();

  //Function to handle changes in category dropdown
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  //Function to handle changes for number of cards dropdown
  const handleNumCardsChange = (event) => {
    setNumCards(Number.parseInt(event.target.value));
    props.onNumCardsChange(Number.parseInt(event.target.value));
  };

  //Function to handle DrawerToggle event
  const handleDrawerToggle = () => {
    props.onDrawerToggle();
  };

  //Creating themes using 'createTheme' function
  const nav = createTheme({
    palette: {
      primary: {
        main: "#fff59d",
      },
    },
  });

  const btn = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#2196f3",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  const dropDown = createTheme({
    palette: {
      primary: {
        main: "#03a9f4",
      },
    },
  });

  //Render boxes with header and toolbar along with dropdowns
  return (
    <div className="HeaderNav">
      <header className="App-header">
        <div className="App-title">
          <h2 className="neonText">Quiz</h2>
          <h1 className="neonText">Time</h1>
        </div>
      </header>

      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={nav}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              {/* Creating button with variant using High Order Components */}
              <ThemeProvider theme={btn}>
                <Button
                  onClick={() => props.onQuizRequest(category, limit)}
                  variant="contained"
                >
                  Quiz
                </Button>
              </ThemeProvider>

              {/* Creating dropdowns with options using High Order Components */}
              <ThemeProvider theme={dropDown}>
                <Box sx={{ minWidth: 120, margin: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" label="Category">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="Arts & Literature">
                        Arts &amp; Literature
                      </MenuItem>
                      <MenuItem value="Film & TV">Film &amp; TV</MenuItem>
                      <MenuItem value="science">Science</MenuItem>
                      <MenuItem value="history">History</MenuItem>
                      <MenuItem value="Society & Culture">
                        Society &amp; Culture
                      </MenuItem>
                      <MenuItem value="Geography">Geography</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ThemeProvider>

              <ThemeProvider theme={dropDown}>
                <Box sx={{ minWidth: 125 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Cards:
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={limit}
                      label="Cards"
                      onChange={handleNumCardsChange}
                    >
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
    </div>
  );
}

export default HeaderNavbar;
