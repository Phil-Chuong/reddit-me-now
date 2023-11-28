import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//reddit limit to 20
const limit = 20;

//action: Fetch Reddit posts
export const fetchPosts = createAsyncThunk('redditPosts/fetchPosts', async () => {
  try {
  const response = await axios
    .get(`https://www.reddit.com/r/popular.json?limit=${limit}`);
  return response.data.data.children.map((post) => post.data);
  }catch (error) {
    throw error;
  }
});

//Action: Search Reddit posts
export const searchPosts = createAsyncThunk('redditPosts/searchPosts', async (searchQuery) => {
  try {
    const response = await axios.get(`https://www.reddit.com/search.json?q=${searchQuery}`);
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
    reducers: {
      clearSearchPosts: (state) => {
        state.searchPosts = [];
      },
      clearPosts: (state) => {
        state.posts = [];
      }
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
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchPosts = action.payload;
        state.error = null;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});


export const { pending, fulfilled, rejected, clearSearchPosts, clearPosts } = RedditPostsSlice.actions;
export default RedditPostsSlice.reducer;