import './Subreddit.css';
import { clearSubredditPosts, selectSubredditData } from '../../API/SubredditSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, clearPosts } from '../../API/RedditSlice';
import { clearSearchPosts } from '../../API/RedditSlice';
import { useState, useEffect } from 'react';


const Subreddit = () => {
  const subreddits = useSelector((state) => state.redditsSub.reddits);
  const loading = useSelector((state) => state.redditsSub.loading);
  const error = useSelector((state) => state.redditsSub.error);
  const dispatch = useDispatch();

//  console.log(subreddits);
//  console.log(selectedSubreddit);


 // State to manage dropdown visibility
const [isDropdownVisible, setDropdownVisible] = useState(false);
const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 425);


// Toggle dropdown visibility
const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
};

// Close dropdown when clicking outside
// const closeDropdown = () => {
//     setDropdownVisible(false);
// };

 const handleSubredditSelect = (selectedSubreddit) => {
    dispatch(clearSearchPosts());
    dispatch(clearPosts());
    dispatch(selectSubredditData(selectedSubreddit));
 };

 const handlePopularPage = () => {
    dispatch(clearSearchPosts());
    dispatch(clearSubredditPosts());
    dispatch(fetchPosts());
 }

 useEffect(() => {
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 425);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  if (isMobileView) {
    return (
    <div className='subreddit-container'>
      <div className='subreddit-list'>
        <div className='popular-container'>
          <button className='popular-page-button' onClick={handlePopularPage}>
            <h1>Popular Posts!</h1>
          </button>
        </div>

        <br></br>
        <div className='subreddit-items'>
          <button className='dropdown-list-button' onClick={toggleDropdown}>
            <p>Subreddits</p>
            {isDropdownVisible && (
              <div className='dropdown-menu' id='dropdown-list'>
                <ul>
                  {subreddits.map((subreddit) => (
                    <li key={subreddit.id} className='subreddit-li'>
                      <div
                        className='subreddit-button'
                        onClick={() => handleSubredditSelect(subreddit.display_name)}>

                        <img src={subreddit.icon_img} alt='' className='users-icon' />
                        <p className='subreddit-title'>{subreddit.display_name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
    );
  }

  else {
    return (
    <div className='subreddit-container'>
      <div className='subreddit-list'>
        <div className='popular-container'>
        <button className='popular-page-button' onClick={handlePopularPage}>
          <h1>Popular Posts!</h1>
        </button>
        </div>
      
        <br></br>

        <div className='dropdown-menu' id='dropdown-list'>
        <ul>
          {subreddits.map((subreddit) => (
          <li key={subreddit.id} className='subreddit-li'>
            <div
              className='subreddit-button'
              onClick={() => handleSubredditSelect(subreddit.display_name)}>

              <img src={subreddit.icon_img} alt='' className='users-icon' />
              <p className='subreddit-title'>{subreddit.display_name}</p>
            </div>
          </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  )}
  
};

export default Subreddit;

