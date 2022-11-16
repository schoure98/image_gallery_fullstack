import "./App.css";
import FloatingButton from "./Components/FloatingButton";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <FloatingButton />
      <Footer />
    </div>
  );
}

export default App;
