import React from 'react'
import './App.css';
import Header from '../Components/Header/Header';
import Posts from '../Components/Posts/Posts';
import Subreddit from '../Components/Subreddit/Subreddit';



function App() {
  return (
    <>
      <Header />
      <main>
      <Posts />
      <Subreddit />
      </main> 
      
    </>               
  );
}

export default App;