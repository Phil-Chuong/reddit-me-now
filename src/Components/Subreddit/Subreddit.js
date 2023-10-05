import React, { useEffect } from 'react';
import './Subreddit.css';
import { fetchSubredditData } from '../../API/SubredditSlice';
import { useDispatch, useSelector } from 'react-redux';

const Subreddit = () => {
  const subreddits = useSelector((state) => state.redditsSub.reddits);
  const loading = useSelector((state) => state.redditsSub.loading);
  const error = useSelector((state) => state.redditsSub.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubredditData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  const handleUserHomePage = () => {
    return 
  }
  
  return (
    <div className='subreddit-container'>
      <div className='subreddit-list'>
        <h1>Subreddits</h1>
        <br></br>
        <ul>
          {subreddits.map((subreddit) => (
            <li key={subreddit.id} className='subreddit-li'>
              <button className='subreddit-button'onClick={handleUserHomePage}>
                <img src={subreddit.icon_img} alt='' className='users-icon'/>               
                {subreddit.display_name} 
              </button>                                   
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Subreddit;

