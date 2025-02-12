import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import reposReducer, { fetchRepos, clearRepos } from './reposSlice'; 
import axios from 'axios';
import { RootState } from '../store';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('reposSlice', () => {
  let store: ReturnType<typeof configureStore>; 

   // Before each test, configure a new store instance
  beforeEach(() => {
    store = configureStore({
      reducer: {
        repos: reposReducer,
      },
    });
  });

    // Test for initial state
  it('should return the initial state', () => {
    const state = store.getState() as RootState; 
    expect(state.repos).toEqual({
      repos: [],
      loading: false,
      error: null,
    });
  });

    // Test for the pending state of fetchRepos
  it('should handle fetchRepos.pending', () => {
    store.dispatch(fetchRepos.pending('1', { username: 'testuser', page: 1 }));
    const state = store.getState() as RootState; 
    expect(state.repos.loading).toBe(true);
    expect(state.repos.error).toBe(null);
  });

   // Test for fulfilling the fetchRepos action
  it('should handle fetchRepos.fulfilled', async () => {
    const mockRepos = [
      { id: 1, name: 'Repo1', description: 'Description1', html_url: 'http://example.com/1', stargazers_count: 10, updated_at: '2025-01-01T00:00:00Z' },
      { id: 2, name: 'Repo2', description: 'Description2', html_url: 'http://example.com/2', stargazers_count: 20, updated_at: '2025-01-02T00:00:00Z' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockRepos });

    const result = await store.dispatch(fetchRepos({ username: 'testuser', page: 1 }) as any);
    const state = store.getState() as RootState; 

    expect(result.type).toBe(fetchRepos.fulfilled.type);
    expect(state.repos.repos).toEqual(mockRepos);
    expect(state.repos.loading).toBe(false);
    expect(state.repos.error).toBe(null);
  });

   // Test for handling rejection of fetchRepos
  it('should handle fetchRepos.rejected', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const result = await store.dispatch(fetchRepos({ username: 'testuser', page: 1 }) as any);
    const state = store.getState() as RootState; 

    expect(result.type).toBe(fetchRepos.rejected.type);
    expect(state.repos.loading).toBe(false);
    expect(state.repos.error).toBe('Load error. Please check the username.');
  });

    // Test for clearing repos
  it('should clear repos', () => {
    store.dispatch(fetchRepos.fulfilled([
      { id: 1, name: 'Repo1', description: 'Description1', html_url: 'http://example.com/1', stargazers_count: 10, updated_at: '2025-01-01T00:00:00Z' }
    ], '', { username: 'testuser', page: 1 }));
    
    store.dispatch(clearRepos());
    const state = store.getState() as RootState; 
    expect(state.repos.repos).toEqual([]);
  });
});
