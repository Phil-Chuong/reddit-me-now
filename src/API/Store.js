import { configureStore } from "@reduxjs/toolkit";
import RedditPostsSlice from "./RedditSlice";
import RedditCommentsSlice from "./CommentsSlice";

 const store = configureStore({
    reducer: {
       redditPosts: RedditPostsSlice,
       redditComments: RedditCommentsSlice,
    }
});

export default store;