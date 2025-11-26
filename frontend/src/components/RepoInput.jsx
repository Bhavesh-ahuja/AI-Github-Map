import React, { useState } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';

const RepoInput = ({ onSubmit }) => {
  // 1. STATE: "Memory" for our component
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // LOGIC: what happens when user clicks "Analyze"
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page from refreshing
    setError('');

    // Basic Validation
    if (!url.includes('github.com/')) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    // Start Loading
    setLoading(true);

    // Simulate a delay
    onSubmit(url);
    setTimeout(() => setLoading(false), 1000);

  };

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit} className='relative'>

        {/* The Input Box */}
        <div className='relative group'>
          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-event-none'>
            <Search className={`h-5 w-5 ${error ? 'text-red-400' : 'text-slate-400'}`} />
          </div>
          <input type='text' value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className={`block w-full pl-11 pr-32 py-4 bg-white border-2 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all
                    ${error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300'
              }`} />
          <button type='submit' disabled={loading || !url}
            className='absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 '>
            {loading ? (
              <>
                <Loader2 className='h-4  w-4 animate-spin' />
                <span>Scanning...</span>
              </>
            ) : (
              <span>Analyze</span>
            )}
          </button>
        </div>

        {/* Error Message Area */}
        {error && (
          <div className='mt-3 flex items-center gap-2 text-red-500 text-sm animate-pulse'>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Helper Text */}
      <p className='mt-4 text-center text-slate-500 text-sm'>
        Try public repositories like
        <span className='text-blue-600 font-mono bg-blue-50 px-1 rounded'>
          facebook/react 
        </span>
        or
        <span className='text-blue-600 font-mono bg-blue-50 px-1 rounded'>
          fastapi/fastapi
        </span>
      </p>
    </div>
  );
};

export default RepoInput;