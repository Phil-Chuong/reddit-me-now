import React from "react";
import './Posts.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../API/RedditSlice";


const Posts = () => {    
    const posts = useSelector((state) => state.redditPosts.posts);
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
        <div className="card">              
            <h2>List of Posts</h2>
                <ul>            
                    {posts.map((post) => (
                <li key={post.data}>{post.title}</li>
                    ))}
                </ul>
        </div>      
    )
}

export default Posts;
