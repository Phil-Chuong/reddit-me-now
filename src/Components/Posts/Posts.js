import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../API/RedditSlice";


const Posts = () => {    
    
    const post = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts())
    }, [dispatch]);

    return (
        <div className="card">              
            <h2>List of Posts</h2>  
                {post.loading && <div>Loading...</div>}
                {!post.loading && post.error ? (
                    <div>ERROR: {post.error}</div>
                    ) : null}
                {!post.loading && post.posts.length ? (
                <ul>            
                    {post.Posts.map((post) => (
                    <li key={post.id}>
                        {post.data}
                    </li>
                    ))}
                </ul>
            ) : null}
        </div>      
    )
}

export default Posts;
