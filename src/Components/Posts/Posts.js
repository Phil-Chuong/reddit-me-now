import React, { useEffect } from "react";
import './Posts.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../API/RedditSlice";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useState } from "react";
import { TfiCommentAlt } from 'react-icons/tfi';
import Comments from "../Comments/Comments";

const Posts = () => {    
    const posts = useSelector((state) => state.redditPosts.posts);
    const searchResults = useSelector((state) => state.redditPosts.searchResults);
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
            {searchResults && searchResults.length > 0 ? (
                <div>
                    {searchResults.map((result) => (
                        <div className="search-result" key={result.id}>
                            <p>{result.title}</p>
                            {/* Render other search result information here */}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {posts.map((post) => (                      
                        <div className="card" key={post.id}>
                            <section className="card-header">
                                <div className="title-name"><p>{post.title}</p></div>
                                <hr></hr>
                                <br />
                                <div className="post-info"><p>{post.selftext}{post.permalink}</p></div>
                            </section>
                            <article>
                                
                                <img className='post-image'
                                    src={post.url} alt='content'
                                    onError={(i) => i.target.style.display = 'none'} />
                                <br />
                                <div>
                                    <p><span className='subreddit-name'>Subreddit: </span>r/{post.subreddit}</p>
                                </div>
                                <br />
                                <aside className="scoreboard-container">
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
                                    </div>

                                {/* Add your comments button here */}
                                    <div className="comment-container">
                                        <button className="comment-button">
                                        <TfiCommentAlt />
                                        <Comments permalink={post.permalink}/>
                                        </button>
                                    </div>
                                </aside>
                            </article>
                        </div>                                  
                    ))}
                </div>  
            )}
        </div>
    )
}                  

export default Posts;


