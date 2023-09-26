
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  try {
  const response = await axios
    .get('https://www.reddit.com/r/popular.json');
  return response.data.children;
  }catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  posts: [],
  error: '',
}

const RedditPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = '';
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = '';
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    })
}})

export default RedditPostsSlice.reducer;