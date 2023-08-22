import "./App.css";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Board from "./views/Board";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Board />
      <Card />
      <Footer />
    </div>
  );
}

export default App;
