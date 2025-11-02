import React from 'react';

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-maroon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.005C17.064 17.582 22 14.132 22 10c0-4.411-4.486-8-10-8zm0 14c-4.411 0-8-2.691-8-6s3.589-6 8-6 8 2.691 8 6-3.589 6-8 6z"/><path d="M9.5 9c-.828 0-1.5.672-1.5 1.5S8.672 12 9.5 12s1.5-.672 1.5-1.5S10.328 9 9.5 9zm5 0c-.828 0-1.5.672-1.5 1.5S13.672 12 14.5 12s1.5-.672 1.5-1.5S15.328 9 14.5 9z"/></svg>
);

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mt-2">
            <AiIcon />
        </div>
        <div className="flex flex-col max-w-2xl">
            <span className="text-sm font-bold mb-1 text-brand-maroon">Sử Bot</span>
            <div className="px-4 py-3 rounded-lg shadow-md bg-white border border-gray-200 rounded-bl-none flex items-center space-x-1.5">
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
            <div className="dot w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="dot w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="dot w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
        </div>
    </div>
  );
};
