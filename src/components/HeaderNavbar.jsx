
import React from "react";
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
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import "./style/style.css";

const drawerWidth = 240;
const navItems = [ 'About'];


//function to create HeaderNavbar
export default function HeaderNavbar({ getQuizzes, setAboutClicked, category, limit }) {

const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
};

// Function to render the About page
const handleAboutClick = () => {
      setAboutClicked(true);
      getQuizzes(false);
    };

// Function to render the Main page
const getQuizClick = () => {
       getQuizzes(true);
       setAboutClicked(false)    
    };
  
  const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
         Quiz Time
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding > 
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleAboutClick}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

  //Creating themes using 'createTheme' function\
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
            
     {/* This is a container for the app bar and drawer */}
     <Box sx={{ flexGrow: 1,  display: 'flex' }}>
       {/* Theme provider for the navigation theme */}
       <ThemeProvider theme={nav}>
         {/* App bar */}
         <AppBar component={"nav"}  sx={{ display: 'flex' }}>
           {/* Toolbar */}
           <Toolbar>
             {/* Hamburger icon button */}
             <IconButton
               color="inherit"
               aria-label="open drawer"
               edge="start"
               onClick={handleDrawerToggle}
               sx={{ mr: 2, display: { sm: 'none' } }}
             >
               <MenuIcon />
             </IconButton>
     
             {/* Get Cards button */}
             <ThemeProvider theme={btn}>
               <Button
                 // onClick={() => props.onQuizRequest(category, limit)}
                 onClick={getQuizClick}
                 variant="contained"
               >
                 Get Cards
               </Button>
             </ThemeProvider>
     
             {/* Category drop-down */}
             <ThemeProvider theme={dropDown}>
               <Box sx={{ minWidth: 120, margin: 2 }}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label" label="Category">
                     Category
                   </InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     label="Category"
                     value={category.current}
                     onChange={(event) =>
                       (category.current = event.target.value)
                     }
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
     
             {/* Cards drop-down*/}
             <ThemeProvider theme={dropDown}>
               <Box sx={{ minWidth: 125 }}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">
                     Cards:
                   </InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     label="Cards"
                     value={limit.current}
                      onChange={(event) =>
                        (limit.current = event.target.value)
                      }
                   >
                     <MenuItem value="1">1</MenuItem>                      
                     <MenuItem value="5">5</MenuItem>
                     <MenuItem value="10">10</MenuItem>
                     <MenuItem value="15">15</MenuItem>
                   </Select>
                 </FormControl>
               </Box>
             </ThemeProvider>
     
             {/* Navigation buttons */}
             <Box m={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
               {navItems.map((item) => (
                 <Button key={item} sx={{ color: '#212121' }} onClick ={handleAboutClick}>
                   {item}
                 </Button>
               ))}
             </Box>
    
           </Toolbar>
         </AppBar>
     
         {/* Drawer */}
         <Box className="nav">
           <Drawer
             variant="temporary"
             open={mobileOpen}
             onClose={handleDrawerToggle}
             ModalProps={{
               keepMounted: true, // Better open performance on mobile.
             }}
             sx={{
               display: { xs: 'block', sm: 'none' },
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
             }}
           >
             {drawer}
           </Drawer>
         </Box>
       </ThemeProvider>
     </Box>

  </div>
)
}

