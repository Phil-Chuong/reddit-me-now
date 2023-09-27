import React from "react";
import './Posts.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../API/RedditSlice";




const Posts = () => {    
    const posts = useSelector((state) => state.redditPosts.posts)
    const loading = useSelector((state) => state.redditPosts.loading);
    const error = useSelector((state) => state.redditPosts.error);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts())
    }, [dispatch]);

    if(loading) {
        return <div>
            Loading....
        </div>
    }

    if(error) {
        return <div>
            Error: {error}
        </div>
    }

    return (
        <div className="posts-container"> 
            {posts.map((post) => (
                <div className="card">
                <li key={post.id}>
                    <section className="card-header">
                        <div className="title-name"><p>{post.title}</p></div>
                        <div className="subreddit-name"><p>{post.subreddit}</p></div>
                    </section>                  
                    
                    <br/>
                    <img className='post-image' src={post.url} alt='content'/>
                </li>
                </div>
            ))}
        </div>      
    )
}

export default Posts;
