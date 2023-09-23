import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducers from "./RedditSlice";

export default configureStore({
    reducer: combineReducers({
        RedditPostsSlice: reducers   
    })
});