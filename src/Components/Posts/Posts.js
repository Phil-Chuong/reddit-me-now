import React from "react";
import { useSelector } from "react-redux";


function Posts() {
    const post = useSelector((state) => state.RedditPostsSlice);
    return (
            <div>
                
            <h2>List of Posts</h2>  
                {post.isLoading && <div>Loading...</div>}
                {!post.isLoading && post.error ? <div>ERROR: {post.error}</div> : null}
                {!post.isLoading && post.posts.length ? (
            <ul className="card">
                
                {post.posts.map((post) => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>
            ) : null}
        </div>      
    )
}

export default Posts;
