import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const root = document.getElementById("root");
// ReactDOM.createRoot();
const rootNode = document.getElementById("root");
ReactDOM.render(<App />, rootNode);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

reportWebVitals();
