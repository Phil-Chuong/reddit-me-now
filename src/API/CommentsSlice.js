 import { createSlice } from "@reduxjs/toolkit";
 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  comments: [],
  error: '',
}

const limit = 10;
export const fetchComments = createAsyncThunk('redditComments/fetchComments', async (subreddit) => {
       const response = await axios
      .get(`https://www.reddit.com/r/${subreddit}/comments.json?limit=${limit}`);
      // console.log(response)

    return response.data[1].data.children.map((comment) => comment.data)
    }
  );


   //create slice & reducer
 const RedditCommentsSlice = createSlice({
     name: 'redditComments',
     initialState,
     extraReducers: (builder) => {
       builder
       .addCase(fetchComments.pending, (state) => {
         state.loading = true;
       })
      .addCase(fetchComments.fulfilled, (state, action) => {
         state.loading = false;
         state.comments = action.payload;
         state.error = '';
       })
       .addCase(fetchComments.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error;
       });
    },
 })
  
export default RedditCommentsSlice.reducer;

