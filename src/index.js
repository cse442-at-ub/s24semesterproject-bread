import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx"; 

const baseUrl = "/CSE442-542/2024-Spring/cse-442ac/";

ReactDOM.render(
  <React.StrictMode>
    <App baseUrl={baseUrl} />
  </React.StrictMode>,
  document.getElementById("root")
);
