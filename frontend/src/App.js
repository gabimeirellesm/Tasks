import "./App.css";
import Footer from "./components/Footer";
import Board from "./views/Board";
import Header from "./components/Header";
import React from "react";

function App() {
  return (
    <div>
      <Header />
      <Board />
      <Footer />
    </div>
  );
}

export default App;
