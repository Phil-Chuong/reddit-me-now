import React, { useEffect, useState } from 'react';
import './Subreddit.css';
import { fetchSubredditData, selectSubredditData } from '../../API/SubredditSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Subreddit = () => {
  const selectedSubreddit = useSelector((state) => state.redditsSub.subredditsPosts);
  const subreddits = useSelector((state) => state.redditsSub.reddits);
  const loading = useSelector((state) => state.redditsSub.loading);
  const error = useSelector((state) => state.redditsSub.error);
  const dispatch = useDispatch();

//  console.log(subreddits);
//  console.log(selectedSubreddit);

//  const subreddit_name = 'AskReddit';

//  const selectedSubreddit = async () => {
//    // Assuming `subreddits` is an array of subreddit objects
//    const selectedSub = subreddits.find(subreddit => subreddit.display_name === subreddit_name);
 
//    if (selectedSub) {
//      try {
//        const response = await axios.get(`https://www.reddit.com/r/${subreddit_name}.json`);
//        const subredditData = response.data.data.children.map((post) => post.data);
//       console.log(subredditData);
//       //  dispatch(fetchSubredditData(subredditData)); 
//      } catch (error) {
//        console.error('Error fetching subreddit data', error);
//      }
//    }
//  };

 


//  const subreddit_name = 'AskReddit/';
//  const selectedSubreddit = async () => {
//   try {
//     const response = await axios.get(`https://www.reddit.com/r/${subreddit_name}.json`);
//     const subredditData = response.data.data.children.map((post) => post.data); // This will contain an array of posts on the subreddit
    
//     console.log(selectedSubreddit);
//     dispatch(fetchSubredditData(subredditData)); 
//   } catch (error) {
//     console.error('Error fetching subreddit data', error);
//   }
//  };



 const handleSubredditSelect = (selectedSubreddit) => {
    dispatch(selectSubredditData(selectedSubreddit))
 };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='subreddit-container'>
      <div className='subreddit-list'>
        <h1>Subreddits</h1>
        <br></br>
        <div className='subreddit-items'>
          <ul>
            {subreddits.map((subreddit) => (
              <li key={subreddit.id} className='subreddit-li'>
                <button className='subreddit-button' 
                onClick={() => handleSubredditSelect(subreddit.display_name)}
                >
                  <img src={subreddit.icon_img} 
                  alt='' 
                  className='users-icon'
                  />               
                  <p className='subreddit-title'>{subreddit.display_name}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>        
      </div>
    </div>
  );
};

export default Subreddit;

