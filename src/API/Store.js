import { configureStore } from "@reduxjs/toolkit";
import RedditPostsSlice from "./RedditSlice";
import RedditCommentsSlice from "./CommentsSlice";
import RedditsSubsSlice  from "./SubredditSlice";


const store = configureStore({
    reducer: {
       redditPosts: RedditPostsSlice,     
       redditComments: RedditCommentsSlice,
       redditsSub: RedditsSubsSlice,
    }
});

export default store;