import React, { useState } from 'react';
import axios from 'axios'
import Layout from './components/Layout';
import RepoInput from './components/RepoInput';


function App() {
  const [status, setStatus] = useState('');

  // Logic to handle what happens when the child componet submits
  const handleRepoSubmit = async (url) => {
    try {
      setStatus('connecting');

      // 1 Sent the POST request to out Backend
      const response = await axios.post('http://127.0.0.1:8000/api/analyze',{
        url:url
      });

      // 2 Handle Success
      console.log("Server Response:", response.data);
      alert(`Server says: ${response.data.message}`);
      setStatus('success');
    } catch (error) {
      // 3 Handle Error
      console.error("Error connecting to server:", error);
      alert("Error: Could not connect to the backend. Is it running?");
      setStatus('error');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10">

        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-extrabold text-slate-900 mb-4 tracking-tight'>
            Visualize any Codebase
          </h1>
          <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
            Paste a GitHub link below to generate an interactive knowledge map,
            explore dependencies, and chat with the code.
          </p>
        </div>

        {/* Input Component */}
        <RepoInput onSubmit={handleRepoSubmit} />

        {/* Debig Status Indicator */}
        {status && (
          <div className='mt-4 text-center text-sm text-slate-400'>
            System Status: {status}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
