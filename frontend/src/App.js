import React from "react";
import "./App.css";
import MainRouter from "./mainRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
);

export default App;
