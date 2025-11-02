import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { getAiChat } from '../services/geminiService';
import { Message } from '../types';
import { ChatWindow } from './ChatWindow';
import { InputBar } from './InputBar';

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onClose }) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Initialize chat session and add initial message only once when the chat is first opened.
    if (isOpen && !isInitialized.current) {
      const chat = getAiChat();
      setChatSession(chat);
      setMessages([
        {
          id: 'init',
          sender: 'ai',
          text: 'Chào bạn, tôi là Sử Bot! Tôi có thể giúp bạn tìm hiểu điều gì về Lịch sử 12 hôm nay?',
        },
      ]);
      isInitialized.current = true;
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!chatSession || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const stream = await chatSession.sendMessageStream({ message: text });
      
      let aiResponse = '';
      const aiMessageId = (Date.now() + 1).toString();

      // Add a placeholder for the AI message
      setMessages((prev) => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          aiResponse += chunkText;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, text: aiResponse } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed bottom-24 right-5 sm:right-10 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="chatbot-title"
    >
      <header className="flex items-center justify-between p-4 bg-brand-maroon text-white flex-shrink-0">
        <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.005C17.064 17.582 22 14.132 22 10c0-4.411-4.486-8-10-8zm0 14c-4.411 0-8-2.691-8-6s3.589-6 8-6 8 2.691 8 6-3.589 6-8 6z"/><path d="M9.5 9c-.828 0-1.5.672-1.5 1.5S8.672 12 9.5 12s1.5-.672 1.5-1.5S10.328 9 9.5 9zm5 0c-.828 0-1.5.672-1.5 1.5S13.672 12 14.5 12s1.5-.672 1.5-1.5S15.328 9 14.5 9z"/></svg>
            <h2 id="chatbot-title" className="text-lg font-bold font-montserrat">Sử Bot - Trợ lý Lịch sử</h2>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-yellow-200 text-3xl leading-none font-bold"
          aria-label="Đóng cửa sổ chat"
        >
          &times;
        </button>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>
      <footer className="p-4 bg-white border-t border-gray-200">
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};
