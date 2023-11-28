import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  comments: [],
  error: '',
}

export const fetchComments = createAsyncThunk('redditComments/fetchComments', async (permalink) => {
       
  try{
    const response = await axios
    .get(`https://www.reddit.com${permalink}.json`);
    console.log(response);

    return response.data[1].data.children.map((comment) => comment.data)
    } catch (err) {
      throw err;
    }
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

export const { pending, fulfilled, rejected } = RedditCommentsSlice.actions;
export default RedditCommentsSlice.reducer;

