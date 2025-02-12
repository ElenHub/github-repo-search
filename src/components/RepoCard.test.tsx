import React from 'react';
import { render } from '@testing-library/react';
import RepoCard from './RepoCard';
import { Repo } from '../features/reposSlice';

describe('RepoCard', () => {
  const repo = {
    id: 1,
    name: 'Test Repo',
    description: 'This is a test repository',
    html_url: 'https://github.com/test/test-repo',
    stargazers_count: 5,
    updated_at: '2023-10-01T12:00:00Z'
  };

  it('renders repository name', () => {
    const { getByText } = render(<RepoCard repo={repo as Repo} />);
    expect(getByText('Test Repo')).toBeInTheDocument(); // Check if repo name is rendered
  });

  it('renders repository description', () => {
    const { getByText } = render(<RepoCard repo={repo as Repo} />);
    expect(getByText('This is a test repository')).toBeInTheDocument(); // Check if description is rendered
  });

  it('renders stars count', () => {
    const { getByText } = render(<RepoCard repo={repo as Repo} />);
    expect(getByText('Stars: 5')).toBeInTheDocument(); // Check if stars count is rendered
  });

  it('renders the link to the repository', () => {
    const { getByText } = render(<RepoCard repo={repo as Repo} />);
    expect(getByText('Go to repository').closest('a')).toHaveAttribute('href', 'https://github.com/test/test-repo'); // Check if link points to the correct URL
  });
});