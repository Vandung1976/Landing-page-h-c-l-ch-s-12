
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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const AiIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.96 11.44c.11-1.46-.26-2.84-1.04-4.01-.1-.15-.26-.23-.43-.23-.22 0-.4.22-.32.44.75 2.03-.03 4.31-1.88 5.63l-1.16.83c-.39.27-1.01.03-1.01-.44V12c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-2c0-1.1.9-2 2-2h1.69c.81.43 1.54 1.03 2.12 1.78.15.19.4.28.64.28.13 0 .26-.04.38-.11.3-.19.42-.55.28-.89-.48-1.17-.73-2.39-.73-3.64 0-.61.11-1.21.32-1.78l.4-.96c.18-.44.7-.63 1.14-.46.33.13.54.45.54.81v.01zM7 2c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-2c0-1.1.9-2 2-2h2V4c0-1.1-.9-2-2-2H7zm10 0c-1.1 0-2 .9-2 2v2h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v-2c0-1.1.9-2 2-2h2V4c0-1.1-.9-2-2-2h-2z" />
    </svg>
);


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const sanitizedHtml = useMemo(() => {
    if (typeof window.marked === 'function') {
      const rawMarkup = window.marked.parse(message.text);
      return window.DOMPurify.sanitize(rawMarkup);
    }
    return message.text.replace(/\n/g, '<br />');
  }, [message.text]);

  const bubbleClasses = isUser
    ? 'bg-sky-600 rounded-br-none'
    : 'bg-slate-700 rounded-bl-none';
  
  const containerClasses = isUser
    ? 'justify-end'
    : 'justify-start';

  const icon = isUser ? <UserIcon /> : <AiIcon />;
  const name = isUser ? 'Bạn' : 'LANDIA';
  const nameColor = isUser ? 'text-sky-300' : 'text-emerald-300';

  return (
    <div className={`flex items-start gap-3 w-full ${containerClasses}`}>
       {!isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mt-2">{icon}</div>}
      <div className="flex flex-col max-w-2xl">
        <span className={`text-sm font-bold mb-1 ${nameColor} ${isUser ? 'text-right' : ''}`}>{name}</span>
        <div
          className={`px-4 py-3 rounded-lg shadow-md ${bubbleClasses}`}
        >
          <div
            className="prose prose-sm prose-invert max-w-none prose-p:my-2 prose-headings:my-3 prose-li:my-1 prose-a:text-sky-400 hover:prose-a:text-sky-300"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </div>
      </div>
      {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center mt-2">{icon}</div>}
    </div>
  );
};
