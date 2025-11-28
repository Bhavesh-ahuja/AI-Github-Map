import React from 'react';
import { X, FileCode, Bot } from 'lucide-react';

const FilePanel = ({ fileData, onClose, loading }) => {
  if (!fileData && !loading) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <FileCode size={20} className="text-blue-500" />
          <span className="truncate max-w-[200px]">
            {loading ? "Analyzing..." : fileData?.file || "Details"}
          </span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition">
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-slate-500 text-sm">Reading code & generating summary...</p>
          </div>
        ) : (
          <>
            {/* AI Summary Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold text-sm uppercase tracking-wide">
                <Bot size={16} />
                AI Summary
              </div>
              <p className="text-slate-700 leading-relaxed text-sm">
                {fileData?.summary}
              </p>
            </div>

            {/* Code Preview Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Code Preview
              </h3>
              <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                {fileData?.content}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilePanel;
