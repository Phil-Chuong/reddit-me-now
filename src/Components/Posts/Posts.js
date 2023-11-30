import React, { useEffect, useState } from "react";
import './Posts.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../API/RedditSlice";
import { fetchSubredditData } from "../../API/SubredditSlice";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { TfiCommentAlt } from 'react-icons/tfi';
import Comments from "../Comments/Comments";


const Posts = ({ subreddit, subredditsPosts }) => {   
    // Select relevant state from the Redux store 
    const posts = useSelector((state) => state.redditPosts.posts);
    const searchResults = useSelector((state) => state.redditPosts.searchPosts);
    const selectedSubreddit = useSelector((state) => state.redditsSub.subredditsPosts);
    const loading = useSelector((state) => state.redditPosts.loading);
    const error = useSelector((state) => state.redditPosts.error);
    const popularPost = posts;

    // console.log(selectedSubreddit);
    // console.log(searchResults);
    // console.log(popularPost);
    

    // Initialize local state variables
    const [showComments, setShowComments] = useState({});
    const [votedPosts, setVotedPosts] = useState({});
    const dispatch = useDispatch();


    //Fetch posts on component mount or when subreddit changes
    useEffect(() => {
        const fetchData = async () => {
            try {
               await dispatch(fetchPosts(subreddit));
            //    console.log(posts);
               await dispatch(fetchSubredditData(subredditsPosts));
            //    console.log(selectedSubreddit);                              
            }catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
   
        fetchData();
    }, [dispatch, subreddit, subredditsPosts]);


    // Voting sections
    const handleVote = (postId, value) => {
        setVotedPosts((prevVotes) => {
            const newVotes = { ...prevVotes };
        
            if (newVotes[postId] === value) {
              // If the user clicks the same vote button again, remove their vote
              delete newVotes[postId];
            } else {
              // Otherwise, update their vote
              newVotes[postId] = value;
            }      
            return newVotes;
        });
    };

   
    // Comment section
    const toggleComments = (postId) => {
      setShowComments((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId],
      }));
    };


    if (loading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    
    let renderedPosts;

    if (searchResults.length > 0) {
        renderedPosts = searchResults;
    } else if (popularPost.length > 0) {
        renderedPosts = posts;      
    } else if (selectedSubreddit.length > 0) {
        renderedPosts = selectedSubreddit;
        console.log(selectedSubreddit);
    }
    else {
        renderedPosts = posts;
    }
    
    return (
        <div className="posts-container" id="subreddit-homepage">
            {renderedPosts.map((post) => (                      
                <div className='card-container' key={post.id}>
                    <section className="card-header">
                        <div>
                            <p className="subreddit-name-p"><span className='subreddit-name'>Subreddit: </span>r/{post.subreddit}</p>
                        </div>
                            <br></br>
                        <div className="title-name">
                            <p>{post.title}</p>                          
                        </div>                                 
                        <br />
                    </section>

                    <article> 
                            <div className="media-container">
                               {post.media && post.media.reddit_video && (
                                <video 
                                    className="vid"
                                    width={post.media.reddit_video.width} 
                                    height={post.media.reddit_video.height} 
                                    style={{
                                    maxHeight: '50em', 
                                    width: '100%',
                                    }}
                                    controls>
                                    <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                )}                            
                                <img className='post-image'
                                        src={post.url} alt='content'
                                        onError={(i) => i.target.style.display = 'none'} />
                                <br /> 
                            </div>                         

                            <div className="card-footer">
                                <div>
                                    <p className="subreddit-author-p"><span className='subreddit-author'>Author: </span>r/{post.author}</p>
                                </div>
                                    <br />
                                    
                                <aside className="scoreboard-container">
                                    <div className="score-comment">
                                        <button id="rate-button-up"
                                                onClick={() => handleVote(post.id, 1)}
                                                className={votedPosts[post.id] === 1 ? "vote-up disabled" : ''}
                                                disabled={votedPosts[post.id] === 1}>
                                                <BiUpvote />
                                        </button>
                                            {post.score + (votedPosts[post.id] || 0)}

                                        <button id="rate-button-down"
                                                onClick={() => handleVote(post.id, -1)}
                                                className={votedPosts[post.id] === -1 ? "vote-down disabled" : ''}
                                                disabled={votedPosts[post.id] === -1}>
                                                <BiDownvote />
                                        </button>
                                    </div>
                                        
                                            {/* Add your comments button here */}
                                    <div className="comment-container">
                                        <div className="num-comments">
                                            {post.num_comments}
                                        </div>

                                        <button className="comment-button" 
                                                onClick={()=> toggleComments(post.id)}>
                                                <TfiCommentAlt />  
                                                {showComments[post.id] ? "" : ""}
                                        </button> 
                                    </div>
                                </aside>
                            </div>
                                
                            {/* Display comments if the showComments state is true */}
                            {showComments[post.id] && 
                            (
                                <div className="comments-container">
                                        <Comments permalink={post.permalink} />
                                </div>
                            )}
                    </article>
                </div>                                  
            ))}
        </div>  
    ); 
}         

export default Posts;


