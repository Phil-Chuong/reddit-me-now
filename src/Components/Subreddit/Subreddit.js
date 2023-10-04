import React, { useEffect } from 'react';
import './Subreddit.css';
import { fetchSubredditData } from '../../API/SubredditSlice';
import { useDispatch, useSelector } from 'react-redux';

const Subreddit = () => {
  const subredditData = useSelector((state) => state.redditsSub.reddits);
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

  return (
    <div className='subreddit-container'>
      <h1>Posts from Reddit</h1>
      <ul className='subreddit-users'>
        {subredditData.map((post) => (
          <li key={post.data.id}>{post.data.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Subreddit;

