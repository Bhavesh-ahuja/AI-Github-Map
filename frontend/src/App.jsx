import React, { useState } from 'react';
import Layout from './components/Layout';
import RepoInput from './components/RepoInput';


function App() {
  // Logic to handle what happens when the child componet submits
  const handleRepoSubmit = (url) => {
    console.log("Parent received URL:", url);
    // Later, this is where we will trigger the graph generation
    alert(`Success! We would now start anslyzinf: ${url}`);
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
      </div>
    </Layout>
  );
}

export default App;
