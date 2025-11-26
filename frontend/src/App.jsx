import React, { useState } from 'react';
import axios from 'axios'
import Layout from './components/Layout';
import RepoInput from './components/RepoInput';
import FileGraph from './components/FileGraph';


function App() {
  const [status, setStatus] = useState('');
  const [repoData, setRepoData] = useState(null);   // Store the backend response

  // Logic to handle what happens when the child componet submits
  const handleRepoSubmit = async (url) => {
    try {
      setStatus('connecting');
      setRepoData(null);   //Reset previous data

      // 1 Sent the POST request to out Backend
      const response = await axios.post('http://127.0.0.1:8000/api/analyze', {
        url: url
      });

      // 2 Handle Success
      console.log("Server Response:", response.data);
      setStatus('success');
      setRepoData(response.data); //Save the data to state

    } catch (error) {
      // 3 Handle Error
      console.error("Error connecting to server:", error);
      alert("Error: Could not connect to the backend. Is it running?");
      setStatus('error');
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-6">

        {/* Header Section */}
        {!repoData && (
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-extrabold text-slate-900 mb-4 tracking-tight'>
              Visualize any Codebase
            </h1>
            <RepoInput onSubmit={handleRepoSubmit} />
          </div>
        )}

        {/* Input (Show smaller version if data exists) */}
        {repoData && (
          <div className='mb-8 flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-slate-800'>
              Analysis: {repoData.repo_url}
            </h2>
            <button
              onClick={() => setRepoData(null)}
              className='text-sm text-blue-600 hover:underline'
            >
              Analyze another
            </button>
          </div>
        )}

        {/* Status Message */}
        {status === 'connecting' && (
          <div className='text-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'>
            </div>
            <p className='text-slate-500'> Cloning and parsing repository... this may take a moment.</p>
          </div>
        )}

        {/* THE GRAPH */}
        {repoData && repoData.files && (
          <div className='animate-fade-in-up'>
            <FileGraph fileList={repoData.files} />
            <p className='mt-4 text-center text-slate-400 text-sm'>
              Found {repoData.total_files} files in this project
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
