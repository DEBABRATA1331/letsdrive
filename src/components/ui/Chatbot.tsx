'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: 'assistant', content: "Hello! I'm your LET'S DRIVE assistant. How can I help you today?" }
  ]);
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm processing your request. One moment..." }]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-neon text-brand-charcoal rounded-full flex items-center justify-center shadow-2xl shadow-brand-neon/40 border border-brand-neon/50"
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-brand-charcoal/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-brand-neon flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-charcoal flex items-center justify-center">
                  <Bot size={18} className="text-brand-neon" />
                </div>
                <span className="font-bold text-brand-charcoal">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand-charcoal hover:scale-110 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl p-3 text-sm",
                    msg.role === 'user' 
                      ? "bg-brand-neon text-brand-charcoal rounded-tr-none" 
                      : "bg-white/10 text-white rounded-tl-none border border-white/5"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-neon transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-brand-neon text-brand-charcoal rounded-xl flex items-center justify-center hover:bg-brand-lime transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
