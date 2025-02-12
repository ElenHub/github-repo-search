import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an interface for repositories
export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

// Define an interface for the repos state
interface ReposState {
  repos: Repo[];
  loading: boolean;
  error: string | null;
}

// Define parameters needed for fetching repositories
interface FetchReposParams {
  username: string;
  page: number;
}

// Initial state of the repos slice
const initialState: ReposState = {
  repos: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching repositories
export const fetchRepos = createAsyncThunk<Repo[], FetchReposParams>(
  'repos/fetchRepos',
  async ({ username, page }) => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: { page, per_page: 20 },
    });
    return response.data;
  }
);

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    clearRepos(state) {
        // Clear the repositories from the state
      state.repos = [];
    },
  },
  extraReducers: (builder) => {
    builder
       // Set loading to true when fetch begins
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        // Update repos and loading state upon successful fetch
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.repos = [...state.repos, ...action.payload];
        state.loading = false;
      })
        // Handle errors from the fetch
      .addCase(fetchRepos.rejected, (state) => {
        state.loading = false;
        state.error = 'Load error. Please check the username.';
      });
  },
});

// Export the action to clear repos and the reducer
export const { clearRepos } = reposSlice.actions;
export default reposSlice.reducer;