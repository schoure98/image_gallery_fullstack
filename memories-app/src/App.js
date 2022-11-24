import React from "react";
import "./App.css";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar/SearchBar";
import FloatingButton from "./Components/FloatingButton/FloatingButton";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import InputMemory from "./Pages/InputMemory/InputMemory";
import MemoryCard from "./Components/MemoryCards";
import About from "./Components/About";
import Welcome from "./Components/Welcome";
import SearchCard from "./Components/SearchCard";

function App() {
  return (

  
  
    
    <BrowserRouter>
      <Header />
      <Welcome />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/inputMemory" element={<InputMemory />} />
        <Route path="/memoryCard" element={<MemoryCard />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/searchCard" element={<SearchCard />} />
      </Routes>
      <Footer />
    </BrowserRouter>

    
    
  );
}

export default App;
