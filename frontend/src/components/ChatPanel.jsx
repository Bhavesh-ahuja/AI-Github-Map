import React, { useState } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import axios from 'axios';

const ChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessages = [...messages, { role: 'user', text: question }];
    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', {
        question: question
      });
      setMessages([...newMessages, { role: 'ai', text: response.data.answer }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', text: "Error: Could not fetch answer." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all z-50 flex items-center gap-2"
      >
        <MessageSquare size={24} />
        <span className="font-bold">Chat with Code</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden">
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare size={18} /> Chat Assistant
        </h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-500 p-1 rounded">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-10 text-sm">
            Ask questions like: <br/> "How does login work?"
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
              <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleAsk} className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button type="submit" disabled={loading || !question} className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
