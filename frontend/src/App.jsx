import React, { useState } from 'react';
import axios from 'axios';
import Layout from './components/Layout';
import RepoInput from './components/RepoInput';
import FileGraph from './components/FileGraph';
import FilePanel from './components/FilePanel';

function App() {

  const [status, setStatus] = useState('');
  const [repoData, setRepoData] = useState(null);   // Store the backend response
  
  // States for the Side Panel
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [fileSummary, setFileSummary] = useState(null);

  // Logic to handle what happens when the child component submits
  const handleRepoSubmit = async (url) => {
    try {
      setStatus('connecting');
      setRepoData(null);   // Reset previous data

      // 1 Send the POST request to our backend
      const response = await axios.post('http://127.0.0.1:8000/api/analyze', {
        url: url
      });

      // 2 Handle Success
      console.log("Server Response:", response.data);
      setStatus('success');
      setRepoData(response.data); // Save the data to state

    } catch (error) {
      // 3 Handle Error
      console.error("Error connecting to server:", error);
      alert("Error: Could not connect to the backend.");
      setStatus('error');
    }
  };

  // Called when user clicks a blue dot
  const handleNodeClick = async (filePath) => {
    setSelectedFile(filePath);
    setSummaryLoading(true);
    setFileSummary(null); // Clear old summary

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/summarize', {
        file_path: filePath
      });
      setFileSummary(response.data);
    } catch (error) {
      console.error("Summary error:", error);
      setFileSummary({ 
        file: filePath, 
        summary: "Failed to generate summary.", 
        content: "Error reading file." 
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-6 relative">

        {/* Header Section */}
        {!repoData && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Visualize any Codebase
            </h1>
            <RepoInput onSubmit={handleRepoSubmit} />
          </div>
        )}

        {/* Input (Show smaller version if data exists) */}
        {repoData && (
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-700">
              Project: {repoData.repo_url.split('/').slice(-2).join('/')}
            </h2>
            <button 
              onClick={() => { setRepoData(null); setSelectedFile(null); }}
              className="text-sm text-slate-500 hover:text-blue-600"
            >
              Analyze another
            </button>
          </div>
        )}

        {/* Status Message */}
        {status === 'connecting' && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-500">Cloning repository... this may take 10–20 seconds.</p>
          </div>
        )}

        {/* THE GRAPH */}
        {repoData && repoData.files && (
          <div className="animate-fade-in-up">
            <FileGraph 
              fileList={repoData.files}
              onNodeClick={handleNodeClick} // Pass the click handler
            />
          </div>
        )}

        {/* Side Panel */}
        <FilePanel 
          fileData={fileSummary} 
          loading={summaryLoading} 
          onClose={() => { setSelectedFile(null); setFileSummary(null); }} 
        />

      </div>
    </Layout>
  );
}

export default App;
