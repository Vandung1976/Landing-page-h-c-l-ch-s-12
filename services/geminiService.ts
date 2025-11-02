import { GoogleGenAI, Chat } from "@google/genai";
import { HISTORY_TUTOR_SYSTEM_PROMPT } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function getAiChat(): Chat {
    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: HISTORY_TUTOR_SYSTEM_PROMPT,
        },
    });
    return chat;
}