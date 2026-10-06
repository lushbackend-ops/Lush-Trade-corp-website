"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

type MessageType = 'text' | 'options' | 'typing' | 'form';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  type: MessageType;
  text?: string;
  options?: Array<{ label: string; action: string; payload?: any }>;
  timestamp: Date;
}

// Simulated conversation graph
const CONVERSATION_GRAPH: Record<string, { text: string; options?: Array<{ label: string; action: string; payload?: string }>; isForm?: boolean }> = {
  main: {
    text: "Welcome to Lush Trade Corp! I'm your digital assistant. How can I help you streamline your global sourcing today?",
    options: [
      { label: "Explore Products", action: "explore_products" },
      { label: "Request a Quote", action: "quote_form" },
      { label: "Contact Us", action: "contact" }
    ]
  },
  explore_products: {
    text: "We source and process premium agro-commodities. Which category interests you?",
    options: [
      { label: "Cashew Nuts", action: "prod_cashew" },
      { label: "Coffee", action: "prod_coffee" },
      { label: "Pulses", action: "prod_pulses" },
      { label: "Timber", action: "prod_timber" },
      { label: "Main Menu", action: "main" }
    ]
  },
  prod_cashew: {
    text: "We offer premium Cashew varieties. Please select your interest:",
    options: [
      { label: "Raw Cashew Nuts (RCN)", action: "quote_form", payload: "Raw Cashew Nuts (RCN)" },
      { label: "Cashew Nut Kernels (White)", action: "quote_form", payload: "Cashew Nut Kernels (White)" },
      { label: "Borma Kernels", action: "quote_form", payload: "Borma Kernels" },
      { label: "Back to Products", action: "explore_products" }
    ]
  },
  prod_coffee: {
    text: "Our Tanzanian Arabica and Robusta coffee beans are ethically sourced, providing rich flavor profiles.",
    options: [
      { label: "Request Quote for Coffee", action: "quote_form", payload: "Coffee (Arabica & Robusta)" },
      { label: "Back to Products", action: "explore_products" }
    ]
  },
  prod_pulses: {
    text: "We supply a variety of high-quality pulses:",
    options: [
      { label: "Pigeon Peas", action: "quote_form", payload: "Pigeon Peas" },
      { label: "Chickpeas", action: "quote_form", payload: "Chickpeas" },
      { label: "Sesame Seeds", action: "quote_form", payload: "Sesame Seeds" },
      { label: "Back to Products", action: "explore_products" }
    ]
  },
  prod_timber: {
    text: "We export sustainably harvested timber, compliant with international forestry standards.",
    options: [
      { label: "Pine Timber", action: "quote_form", payload: "Pine Timber" },
      { label: "Teak Timber", action: "quote_form", payload: "Teak Timber" },
      { label: "Back to Products", action: "explore_products" }
    ]
  },
  contact: {
    text: "Email us at lushtradecorp@gmail.com or call +255 639 354 286. Our headquarters is located near Nangwanda Stadium in Mtwara, Tanzania.",
    options: [{ label: "Main Menu", action: "main" }]
  },
  quote_form: {
    text: "Please fill out your details below to request a quote.",
    isForm: true
  },
  quote_success: {
    text: "Thank you! We have received your inquiry and our team will get back to you shortly.",
    options: [{ label: "Main Menu", action: "main" }]
  }
};

const ChatForm = ({ onComplete, initialProduct }: { onComplete: () => void; initialProduct: string }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', product: initialProduct, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Update formData if initialProduct changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, product: initialProduct }));
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fire and forget for instant UX (Google Scripts can take 2-3s to respond)
    fetch('https://script.google.com/macros/s/AKfycbwHXsVaRtyJKAqJRYW-z33YpobepDtKqxjAYzZrSUxWTsf8-UpDeIo69qn5p6oFYlGg/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        ...formData,
        phone: formData.phone || 'N/A',
        recipient: 'lush.backend@gmail.com'
      }),
    }).catch(() => {
      // Silently fail or log in background
    });

    setSubmitted(true);
    setTimeout(onComplete, 1500);
  };

  if (submitted) {
    return (
      <div className="mt-2 p-3 bg-green-50 text-green-700 text-sm font-semibold rounded-xl border border-green-200 text-center">
        Quote Request Sent Successfully!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-2 p-4 bg-white border border-gray-200 rounded-xl w-full shadow-sm">
      <input required placeholder="Your Name *" className="p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-brand-gold" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input required type="email" placeholder="Your Email *" className="p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-brand-gold" onChange={e => setFormData({...formData, email: e.target.value})} />
      <input placeholder="Phone / WhatsApp" className="p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-brand-gold" onChange={e => setFormData({...formData, phone: e.target.value})} />
      <select value={formData.product} className="p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-brand-gold" onChange={e => setFormData({...formData, product: e.target.value})}>
        <option value="Raw Cashew Nuts (RCN)">Raw Cashew Nuts (RCN)</option>
        <option value="Cashew Nut Kernels (White)">Cashew Nut Kernels (White)</option>
        <option value="Borma Kernels">Borma Kernels</option>
        <option value="Coffee (Arabica & Robusta)">Coffee (Arabica & Robusta)</option>
        <option value="Pigeon Peas">Pigeon Peas</option>
        <option value="Chickpeas">Chickpeas</option>
        <option value="Sesame Seeds">Sesame Seeds</option>
        <option value="Pine Timber">Pine Timber</option>
        <option value="Teak Timber">Teak Timber</option>
      </select>
      <textarea required placeholder="Requirements / Specifications *" className="p-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 resize-none focus:outline-none focus:border-brand-gold" rows={2} onChange={e => setFormData({...formData, message: e.target.value})} />
      <button type="submit" disabled={isSubmitting} className="mt-1 w-full py-2.5 rounded-lg font-bold text-brand-dark bg-brand-gold hover:bg-brand-goldLight transition-colors disabled:opacity-50 text-sm">
        {isSubmitting ? 'Sending...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Raw Cashew Nuts (RCN)');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    if (messages.length === 0) {
      appendBotResponse('main');
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const appendBotResponse = (nodeKey: string, delay: number = 800) => {
    setIsTyping(true);
    // Remove previous options if they exist
    setMessages(prev => prev.map(m => ({ ...m, type: m.type === 'options' ? 'text' : m.type })));
    
    setTimeout(() => {
      const node = CONVERSATION_GRAPH[nodeKey];
      if (!node) return;

      const newMsgs: Message[] = [
        {
          id: Date.now().toString(),
          sender: 'bot',
          type: 'text',
          text: node.text,
          timestamp: new Date()
        }
      ];

      if (node.isForm) {
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          type: 'form',
          timestamp: new Date()
        });
      }

      if (node.options) {
        newMsgs.push({
          id: (Date.now() + 2).toString(),
          sender: 'bot',
          type: 'options',
          options: node.options,
          timestamp: new Date()
        });
      }

      setIsTyping(false);
      setMessages(prev => [...prev, ...newMsgs]);
    }, delay);
  };

  const handleAction = (label: string, action: string, payload?: string) => {
    if (payload) {
      setSelectedProduct(payload);
    }
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      text: label,
      timestamp: new Date()
    };
    
    // Clear current options visually
    setMessages(prev => {
      const updated = [...prev];
      if (updated.length > 0 && updated[updated.length - 1].type === 'options') {
        updated.pop();
      }
      return [...updated, userMsg];
    });

    // Trigger next node
    appendBotResponse(action);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-[340px] sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-gold/30 flex flex-col"
            style={{ height: '550px', maxHeight: '85vh' }}
          >
            {/* Header */}
            <div className="bg-brand-dark text-white px-5 py-4 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-gold/10 pointer-events-none"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark font-bold font-heading">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand-dark rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg leading-tight">Lush Trade Agent</h3>
                  <p className="text-xs text-brand-cream/70 font-medium">Automated Support System</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="relative z-10 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 bg-gray-50/50 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-gray-200">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.type === 'text' && msg.text && (
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      <div 
                        className={`p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                          msg.sender === 'user' 
                            ? 'bg-brand-gold text-brand-dark rounded-tr-none font-medium' 
                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-[10px] text-gray-400 font-medium px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  )}

                  {msg.type === 'form' && (
                    <div className="w-full max-w-[95%]">
                      <ChatForm initialProduct={selectedProduct} onComplete={() => appendBotResponse('quote_success')} />
                    </div>
                  )}

                  {msg.type === 'options' && msg.options && (
                    <div className="mt-2 flex flex-col gap-2 w-full max-w-[90%]">
                      {msg.options.map((opt, idx) => (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          key={idx}
                          onClick={() => handleAction(opt.label, opt.action, opt.payload)}
                          className="w-full text-left text-sm bg-white hover:bg-brand-gold/10 text-brand-dark border border-brand-gold/40 rounded-xl px-4 py-3 transition-colors flex justify-between items-center shadow-sm font-medium"
                        >
                          <span>{opt.label}</span>
                          <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex items-start max-w-[85%]"
                >
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-1" />
            </div>
            
            {/* Footer Branding */}
            <div className="bg-white py-2 text-center border-t border-gray-100">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Secured by Lush Trade Systems</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 bg-brand-dark rounded-full shadow-2xl text-brand-gold hover:bg-brand-dark/90 transition-colors ml-auto group"
        aria-label="Toggle chat"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}

