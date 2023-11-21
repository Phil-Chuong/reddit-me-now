import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchSubredditData = createAsyncThunk('redditsSub/fetchSubredditData', async () => {
  try {
    const response = await axios.get(`https://www.reddit.com/subreddits.json`);
    return response.data.data.children.map((subreddit) => subreddit.data); // This will contain an array of posts on the subreddit
  } catch (error) {
    throw error;
  }
});


// const subreddit_name = 'WOW';
export const selectSubredditData = createAsyncThunk('redditsSub/selectSubredditData', async (subreddit_name) => {
  try {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit_name}.json`);
    return response.data.data.children.map((subreddit) => subreddit.data); // This will contain an array of posts on the subreddit
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  reddits: [],
  error: '',
  subredditsPosts: [],
}

const RedditsSubsSlice = createSlice({
  name: 'redditsSub',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchSubredditData.pending, (state) => {
      state.loading = true;
    })
   .addCase(fetchSubredditData.fulfilled, (state, action) => {
      state.loading = false;
      state.reddits = action.payload;
      state.error = '';
    })
    .addCase(fetchSubredditData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(selectSubredditData.pending, (state) => {
      state.loading = true;
    })
    .addCase(selectSubredditData.fulfilled, (state, action) => {
      state.loading = false;
      state.subredditsPosts = action.payload;
      state.error = action.error;
    })
    .addCase(selectSubredditData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
 },
})

export default RedditsSubsSlice.reducer;
