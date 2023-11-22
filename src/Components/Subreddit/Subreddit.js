import './Subreddit.css';
import { selectSubredditData } from '../../API/SubredditSlice';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

const Subreddit = () => {
  const subreddits = useSelector((state) => state.redditsSub.reddits);
  const loading = useSelector((state) => state.redditsSub.loading);
  const error = useSelector((state) => state.redditsSub.error);
  const dispatch = useDispatch();

//  console.log(subreddits);
//  console.log(selectedSubreddit);

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

