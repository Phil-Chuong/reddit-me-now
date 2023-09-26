
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//reddit limit to 10
const limit = 10;

//action 
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
  const response = await axios
    .get(`https://www.reddit.com/r/popular.json?limit=${limit}`);
  return response.data.data.children.map((post) => post.data);
  }catch (error) {
    throw error;
  }
});


//create slice & reducer
const RedditPostsSlice = createSlice({
  name: 'redditPosts',
  initialState: {
    loading: false,
    posts: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
  }}
)

export const { pending, fulfilled, rejected } = RedditPostsSlice.actions;
export default RedditPostsSlice.reducer;