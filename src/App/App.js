import React from 'react'
import './App.css';
import Header from '../Components/Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../API/RedditSlice';
import Posts from '../Components/Posts/Posts';

export const App = () => {
  const post = useSelector(state => state.post)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  return (
    <>
      <Header /> 
        <div>
          <Posts />
        </div> 
    </>               
  );
}

export default App;