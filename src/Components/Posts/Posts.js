import React, { useEffect } from "react";
import './Posts.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../API/RedditSlice";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useState } from "react";
import { TfiCommentAlt } from 'react-icons/tfi';
import Comments from "../Comments/Comments";


const Posts = ({ subredditURL }) => {    
    const posts = useSelector((state) => state.redditPosts.posts);
    const loading = useSelector((state) => state.redditPosts.loading);
    const error = useSelector((state) => state.redditPosts.error);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts(subredditURL))
    }, [dispatch, subredditURL]);

    // Voting section
    const [votedPosts, setVotedPosts] = useState({});

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

    const [showComments, setShowComments] = useState({});

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

    return (
        <div className="posts-container">
            {posts.map((post) => (                      
                <div className='card-container' key={post.id}>
                    <section className="card-header">
                        <div>
                            <p className="subreddit-name-p"><span className='subreddit-name'>Subreddit: </span>{post.subreddit}</p>
                        </div>
                            <br></br>
                        <div className="title-name">
                            <p>{post.title}</p>
                        </div>                                 
                        <br />
                        <div className="post-info">
                            <p>{post.selftext}</p>
                        </div>
                     </section>

                    <article>                               
                        <img className='post-image'
                            src={post.url} alt='content'
                            onError={(i) => i.target.style.display = 'none'} />
                                <br />
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

                            <div className="num-comments">
                                    {post.num_comments}
                            </div>

                                    {/* Add your comments button here */}
                            <div className="comment-container">
                                <button className="comment-button" 
                                        onClick={()=> toggleComments(post.id)}>
                                         <TfiCommentAlt />  
                                         {showComments[post.id] ? "" : ""}
                                </button> 
                            </div>
                        </aside>

                                {/* Display comments if the showComments state is true */}
                            {showComments[post.id] && (
                                    <div className="comments-container">
                                        <Comments permalink={post.permalink} />
                                    </div>
                            )}
                    </article>
                </div>                                  
            ))}
        </div>  
    )
}
                 

export default Posts;


