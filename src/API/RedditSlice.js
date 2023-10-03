import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//reddit limit to 20
const limit = 10;

//action 
export const fetchPosts = createAsyncThunk('redditPosts/fetchPosts', async () => {
  try {
  const response = await axios
    .get(`https://www.reddit.com/r/popular.json?limit=${limit}`);
  return response.data.data.children.map((post) => post.data);
  }catch (error) {
    throw error;
  }
});

 export const searchPosts = createAsyncThunk('redditPosts/searchPosts', async (query) => {
   try {
     const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${query}`);
     return response.data.data.children.map((post) => post.data);
   } catch (error) {
     throw error;
   }
 });


//create slice & reducer
const RedditPostsSlice = createSlice({
  name: 'redditPosts',
  initialState: {
    loading: false,
    posts: [],
    error: null,
    searchPosts: [],

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResults = [];
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.searchResults = [];
      });
  }
});

export const { pending, fulfilled, rejected } = RedditPostsSlice.actions;
export default RedditPostsSlice.reducer;