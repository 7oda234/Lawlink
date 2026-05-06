import React, { useState, useRef, useEffect } from 'react';
import dataService from '../../services/DataService';

const LegalChatbot = () => {
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Hello! I am your AI Legal Assistant for Egyptian law. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError('');
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await dataService.aiTools.chat({ message: userMsg.content, jurisdiction: 'Egypt' });
      if (response.data?.success && response.data.data?.reply) {
        setMessages((prev) => [...prev, { role: 'ai', content: response.data.data.reply }]);
      } else {
        throw new Error(response.data?.message || 'No reply received from the server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Sorry, I encountered an error connecting to the server.');
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, I encountered an error connecting to the server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 h-[600px] flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Quick Legal Assistant</h2>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 p-3 rounded-lg rounded-bl-none animate-pulse">Typing...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          placeholder="Ask a legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md disabled:bg-blue-400"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LegalChatbot;
