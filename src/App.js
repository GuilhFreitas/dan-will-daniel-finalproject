
import React, { useState, useEffect } from "react";
import HeaderNavbar from "./component/HeaderNavbar";
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <HeaderNavbar onQuizRequest={handleQuizRequest} onDrawerToggle={handleDrawerToggle} onNumCardsChange={setNumCards} />
      <Main />
    </div>
  );
}

export default App;
