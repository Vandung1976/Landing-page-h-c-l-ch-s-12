import React, { useMemo } from 'react';
import { Message } from '../types';

declare global {
    interface Window {
        marked: any;
        DOMPurify: any;
    }
}
interface MessageBubbleProps {
  message: Message;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const AiIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-maroon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.005C17.064 17.582 22 14.132 22 10c0-4.411-4.486-8-10-8zm0 14c-4.411 0-8-2.691-8-6s3.589-6 8-6 8 2.691 8 6-3.589 6-8 6z"/><path d="M9.5 9c-.828 0-1.5.672-1.5 1.5S8.672 12 9.5 12s1.5-.672 1.5-1.5S10.328 9 9.5 9zm5 0c-.828 0-1.5.672-1.5 1.5S13.672 12 14.5 12s1.5-.672 1.5-1.5S15.328 9 14.5 9z"/></svg>
);


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const sanitizedHtml = useMemo(() => {
    if (typeof window.marked === 'function' && typeof window.DOMPurify === 'object') {
      const rawMarkup = window.marked.parse(message.text);
      return window.DOMPurify.sanitize(rawMarkup);
    }
    return message.text.replace(/\n/g, '<br />');
  }, [message.text]);

  const bubbleClasses = isUser
    ? 'bg-brand-maroon text-white rounded-br-none'
    : 'bg-white text-gray-800 rounded-bl-none border border-gray-200';
  
  const containerClasses = isUser
    ? 'justify-end'
    : 'justify-start';

  const icon = isUser ? <UserIcon /> : <AiIcon />;
  const name = isUser ? 'Bạn' : 'Sử Bot';
  const nameColor = isUser ? 'text-gray-600' : 'text-brand-maroon';

  return (
    <div className={`flex items-start gap-3 w-full ${containerClasses}`}>
       {!isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mt-2">{icon}</div>}
      <div className="flex flex-col max-w-xl">
        <span className={`text-sm font-bold mb-1 ${nameColor} ${isUser ? 'text-right' : ''}`}>{name}</span>
        <div
          className={`px-4 py-3 rounded-lg shadow-md ${bubbleClasses}`}
        >
          <div
            className={`prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-li:my-1 prose-a:text-sky-600 hover:prose-a:text-sky-500 ${isUser ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </div>
      </div>
      {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-maroon flex items-center justify-center mt-2">{icon}</div>}
    </div>
  );
};