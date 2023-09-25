import React from 'react'
import './App.css';
import Header from '../Components/Header/Header';
import Posts from '../Components/Posts/Posts';


function App() {
  return (
    <>
      <Header />
      <main>
        <Posts />
      </main> 
    </>               
  );
}

export default App;