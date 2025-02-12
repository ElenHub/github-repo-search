import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './features/reposSlice';

export type RootState = {
  repos: ReturnType<typeof reposReducer>;
};

const store = configureStore({
  reducer: {
    repos: reposReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;