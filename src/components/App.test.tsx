import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);
const store = mockStore({ repos: { repos: [], loading: false, error: null } });

describe('App', () => {
  it('renders the App component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Search Repositories')).toBeInTheDocument();
  });
});