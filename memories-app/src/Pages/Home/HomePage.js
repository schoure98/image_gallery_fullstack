import React from 'react'
import FloatingButton from '../../Components/FloatingButton/FloatingButton'
//import SearchBar from '../../Components/SearchBar/SearchBar';
import About from '../../Components/About';
import Welcome from '../../Components/Welcome';

const HomePage = () => {
  return (
    
    <div>
      <Welcome />
      <About />
      <FloatingButton />
    </div>
    
  )
}

export default HomePage;
