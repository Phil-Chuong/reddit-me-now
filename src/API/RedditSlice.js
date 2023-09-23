
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  posts: [],
  error: '',
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => {
  return axios
  .get('https://www.reddit.com/r/popular.json')
  .then((response) => response.data)
})


const RedditPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = action.payload
      state.error = ''
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false
      state.posts = []
      state.error = action.error.message
    })
  },
})

export default RedditPostsSlice.reducer;