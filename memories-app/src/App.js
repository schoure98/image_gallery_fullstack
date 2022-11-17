import React from 'react'
import "./App.css"
import Header from './Components/Header'
import SearchBar from './Components/SearchBar/SearchBar'
import FloatingButton from './Components/FloatingButton/FloatingButton'
import Footer from './Components/Footer/Footer'


function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <FloatingButton />
      <Footer />

    </div>
  )
}

export default App