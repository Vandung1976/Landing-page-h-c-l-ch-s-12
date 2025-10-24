
import React, { useState } from 'react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-700">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập câu trả lời của bạn..."
        disabled={isLoading}
        className="flex-1 bg-slate-700 text-white placeholder-slate-400 px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="bg-sky-600 hover:bg-sky-500 text-white font-bold p-2 rounded-lg transition duration-200 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
};
