
import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.96 11.44c.11-1.46-.26-2.84-1.04-4.01-.1-.15-.26-.23-.43-.23-.22 0-.4.22-.32.44.75 2.03-.03 4.31-1.88 5.63l-1.16.83c-.39.27-1.01.03-1.01-.44V12c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-2c0-1.1.9-2 2-2h1.69c.81.43 1.54 1.03 2.12 1.78.15.19.4.28.64.28.13 0 .26-.04.38-.11.3-.19.42-.55.28-.89-.48-1.17-.73-2.39-.73-3.64 0-.61.11-1.21.32-1.78l.4-.96c.18-.44.7-.63 1.14-.46.33.13.54.45.54.81v.01zM7 2c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-2c0-1.1.9-2 2-2h2V4c0-1.1-.9-2-2-2H7zm10 0c-1.1 0-2 .9-2 2v2h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-2c0-1.1.9-2 2-2h2V4c0-1.1-.9-2-2-2h-2z" />
            </svg>
        </div>
        <div className="flex flex-col max-w-2xl">
            <span className="text-sm font-bold mb-1 text-emerald-300">LANDIA</span>
            <div className="px-4 py-3 rounded-lg shadow-md bg-slate-700 rounded-bl-none flex items-center space-x-1.5">
            <style>
                {`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                .dot {
                    animation: bounce 1s infinite;
                }
                .dot:nth-child(2) { animation-delay: 0.1s; }
                .dot:nth-child(3) { animation-delay: 0.2s; }
                `}
            </style>
            <div className="dot w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="dot w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="dot w-2 h-2 bg-slate-400 rounded-full"></div>
            </div>
        </div>
    </div>
  );
};
