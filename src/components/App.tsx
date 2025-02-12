import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import RepoSearch from "./RepoSearch";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app min-h-screen bg-black text-white flex flex-col items-center max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 mt-6">
        Search Repositories <span className="text-blue-500">GitHub</span>
        </h1>
        <RepoSearch />
      </div>
    </Provider>
  );
};

export default App;