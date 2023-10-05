import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reddits: [],
  error: '',
}

export const fetchSubredditData = createAsyncThunk('redditsSub/fetchSubredditData', async () => {
  try {
    const response = await axios.get(`https://www.reddit.com/subreddits.json`);
    return response.data.data.children.map((subreddit) => subreddit.data); // This will contain an array of posts on the subreddit
  } catch (error) {
    throw error;
  }
});

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
    });
 },
})

export default RedditsSubsSlice.reducer;
