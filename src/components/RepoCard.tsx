import React from 'react';
import { Repo } from '../features/reposSlice';

const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  return (
    <div className="repo-card border border-gray-800 p-4 shadow-lg max-w-md mx-auto my-4 bg-gray-900 hover:bg-gray-800 transition duration-300 rounded-xl">
        <h3 className="text-lg font-bold">{repo.name}</h3>
      {repo.description && <p className="text-gray-700">{repo.description}</p>}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        Go to repository
        </a>
        <p>Stars: {repo.stargazers_count}</p>
        <p className="text-gray-500">Last updated {new Date(repo.updated_at).toLocaleDateString()}</p>
      </div>
  );
};

export default RepoCard;