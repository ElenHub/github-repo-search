
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos, clearRepos } from '../features/reposSlice';
import { RootState } from '../store';
import RepoCard from './RepoCard';
import ClipLoader from 'react-spinners/ClipLoader';

const RepoSearch: React.FC = () => {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { repos, loading, error } = useSelector((state: RootState) => state.repos);

 // Function to handle search button click
 const handleSearch = () => {
  if (username) {
    dispatch(clearRepos()); // Clear previous repos
    setPage(1); // Reset to the first page
    dispatch(fetchRepos({ username, page: 1 })); // Fetch repos for the entered username
  }
};

  // useEffect to handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
        setPage((prev) => prev + 1); // Increment page if scrolled to the bottom
      }
    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up listener on unmount
    };
  }, [loading]);

   // useEffect to load repos when the page changes
  useEffect(() => {
    if (page > 1) {
      dispatch(fetchRepos({ username, page })); // Fetch repos for the new page
    }
  }, [page, dispatch, username]);

  return (
    <div className="container mx-auto p-4">
   <input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Enter username"
  className="p-2 border rounded w-full md:w-1/2 mb-10 bg-gray-900 text-white border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-xl" 
/>
<button onClick={handleSearch} className="ml-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300 rounded-xl">Search</button>
{loading && (
        <div className="flex justify-center my-4">
          <ClipLoader color="#007bff" loading={loading} size={50} /> 
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoSearch;