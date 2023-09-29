 import { createSlice } from "@reduxjs/toolkit";
 import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit";

  const limit = 10;

  export const fetchComments = createAsyncThunk('redditComments/fetchComments', async (permalink) => {
       try {
       const response = await axios
         .get(`https://www.reddit.com/r/${permalink}.json?limit=${limit}`);
       return response.data.data[1].children.map((comment) => comment.data);
       }catch (error) {
         throw (error);
       }
    });


   //create slice & reducer
 const RedditCommentsSlice = createSlice({
     name: 'redditComments',
     initialState: {
       loading: false,
       error: false,
       comments: [],
  
     },
     extraReducers: (builder) => {
       builder.addCase(fetchComments.pending, (state) => {
         state.loading = true;
         state.error = false;
       })
       builder.addCase(fetchComments.fulfilled, (state, action) => {
         state.loading = false;
         state.comments = action.payload;
       })
       builder.addCase(fetchComments.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error;
       })
       },
 })
  
   export const { fetchCommentsPending, fetchCommentsFulfilled, fetchCommentsRejected } = RedditCommentsSlice.actions;
   export default RedditCommentsSlice.reducer;

