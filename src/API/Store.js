import { configureStore, combineReducers } from "@reduxjs/toolkit";
import RedditPostsSlice from "./RedditSlice";

export default configureStore({
    reducer: combineReducers({
       redditPosts: RedditPostsSlice
    })
});