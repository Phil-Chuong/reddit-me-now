import React, { useEffect } from "react";
import './Posts.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../API/RedditSlice";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useState } from "react";
import { TfiCommentAlt } from 'react-icons/tfi';

const Posts = () => {    
    const posts = useSelector((state) => state.redditPosts.posts)
    const loading = useSelector((state) => state.redditPosts.loading);
    const error = useSelector((state) => state.redditPosts.error);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts())
    }, [dispatch]);

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

    if (loading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="posts-container"> 
            {posts.map((post) => (
                <div className="card" key={post.id}>
                    <section className="card-header">
                        <div className="title-name"><p>{post.title}</p></div>
                        <br />
                        <hr />
                    </section>
                    <article>
                        <img className='post-image' 
                        src={post.url} alt='content' 
                        onError={(i) => i.target.style.display='none'} />
                        <hr />
                    
                        <div>
                            <p><span className='subreddit-name'>Subreddit: </span>r/{post.subreddit}</p>
                        </div>
                        <br />
                        <div className="score-comment">
                            <button 
                            onClick={() => handleVote(post.id, 1)} 
                            className={votedPosts[post.id] === 1 ? "vote-up disabled" : ''}
                            disabled={votedPosts[post.id] === 1}>
                                <BiUpvote />
                            </button>

                            {post.score + (votedPosts[post.id] || 0)}
                            
                            <button 
                            onClick={() => handleVote(post.id, -1)} 
                            className={votedPosts[post.id] === -1 ? "vote-down disabled" : ''}
                            disabled={votedPosts[post.id] === -1}>
                                <BiDownvote />
                            </button>

                            {/* Add your comments button here */}
                            <div className="comment-container">
                                <button className="comment-button">
                                    <TfiCommentAlt />                              
                                </button>
                            </div>
                        </div>
                    </article>                                     
                </div>
            ))}
        </div>      
    )
}

export default Posts;

