import React from 'react';
import './App.css';
import Header from '../Components/Header/Header';
import Posts from '../Components/Posts/Posts'; 
import Subreddit from '../Components/Subreddit/Subreddit';
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton';



function App() {
  return ( 
    <>
      <Header /> 
      <main>      
        <Posts />
        <Subreddit />  
        <ScrollToTopButton />         
      </main>               
    </>           
  );
}

export default App;

