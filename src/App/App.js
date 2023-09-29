import React from 'react'
import './App.css';
import Header from '../Components/Header/Header';
import Posts from '../Components/Posts/Posts';
// import Comments from '../Components/Comments/comments';


function App() {
  return (
    <>
      <Header />
      <main>
      <Posts />
      {/* <Comments /> */}
      </main> 
    </>               
  );
}

export default App;