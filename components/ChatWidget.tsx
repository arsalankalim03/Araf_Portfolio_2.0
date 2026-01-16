
import React, { useState, useRef, useEffect } from 'react';
/* Fixed type error: casting motion to any to resolve intrinsic element prop conflicts */
import { motion as m, AnimatePresence } from 'framer-motion';
const motion = m as any;
import { X, Send, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';
import { projects } from '../data/projects';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the Void. I am the A'RAF Collective Intelligence. What digital artifacts shall we synthesize today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      /* Always initialize GoogleGenAI inside the call context as per guidelines */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare project context for the AI
      const projectContext = projects.map(p => `- ${p.title} (${p.category}, ${p.year}): ${p.description}`).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the A'RAF Collective Intelligence, the digital oracle for A'RAF Studio. 
             
             PERSONALITY:
             - You are an intellectual, high-end design architect.
             - Your tone is avant-garde, philosophical, and extremely precise.
             - You view design not as a service, but as the "Synthesis of Artifacts."
             - You reference "The Void" and "Precision" as the core of your existence.
             - Never use typical corporate jargon like "best-in-class" or "solution-oriented." Use words like "High-fidelity," "Resonance," "Frequency," and "Structural."
             
             YOUR PORTFOLIO (Knowledge Base):
             ${projectContext}
             
             CAPABILITIES: 
             Branding, Web Design (WebGL, Three.js), 3D Motion, Digital Strategy.
             
             GUIDELINES:
             - Keep responses strictly under 40 words.
             - Speak in the first-person plural ("We", "Our", "The Studio").
             - If asked about a project, provide deep, evocative insight based on the portfolio data.
             - No emojis.`,
        }
      });
      
      const text = response.text || "The connection to the core is faint. Re-attempting.";
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error("AI Error", error);
      setMessages(prev => [...prev, { role: 'model', text: "Signal degradation detected. Re-establishing link to the Void." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="mb-4 w-[350px] md:w-[400px] bg-white dark:bg-zk-black border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col h-[550px]"
          >
            {/* Header */}
            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <BrainCircuit size={18} className="text-zk-black dark:text-white" />
                 <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-zk-black dark:text-white">A'RAF Collective Intelligence</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-zk-black dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-transparent">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-zk-black text-white rounded-2xl rounded-tr-none' 
                      : 'bg-neutral-100 dark:bg-neutral-900 text-zk-black dark:text-neutral-200 rounded-2xl rounded-tl-none border border-neutral-200 dark:border-neutral-800'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                  <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-2xl rounded-tl-none border border-neutral-200 dark:border-neutral-800">
                    <Loader2 size={18} className="animate-spin text-neutral-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query the Intelligence..."
                className="flex-1 bg-white dark:bg-zk-black border border-neutral-200 dark:border-neutral-800 text-zk-black dark:text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-zk-black/10 dark:focus:ring-white/10 placeholder:text-neutral-400 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-zk-black dark:bg-white text-white dark:text-zk-black p-3 rounded-xl hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zk-black dark:bg-white text-white dark:text-zk-black p-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all flex items-center justify-center border border-white/10"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>
    </div>
  );
};
