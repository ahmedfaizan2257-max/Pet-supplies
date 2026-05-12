import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, ShoppingCart, Info, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../types';
import { PRODUCTS, AI_SYSTEM_INSTRUCTIONS } from '../constants';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  linkedProducts?: Product[];
}

export default function AIAssistant({ isOpen, onClose, onAddToCart, onSelectProduct }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: "G'day mate! 🐾 I'm your interactive Pet Superstore Companion. Ask me anything about our specialized collars, raised orthopedic bowls, digital aquarium meters, or turtle basking setups! Let me know what species you have and I'll find the perfect match.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Suggested prompts
  const SUGGESTED_QUESTIONS = [
    { text: "My greyhound gets terrible thunder anxiety, what works?", label: "Dog Anxiety" },
    { text: "My cat vomits during floor feeding, any tips?", label: "Feline Posture" },
    { text: "How do I set up healthy basking lamps for turtles?", label: "Turtle Basking Setup" },
    { text: "I have feathers and seeds flying everywhere, help!", label: "Bird Seeds Cleanliness" }
  ];

  // Detect which products from constants are mentioned in the AI response
  const parseProductsFromText = (text: string): Product[] => {
    const matched: Product[] = [];
    const normalized = text.toLowerCase();
    
    PRODUCTS.forEach(p => {
      // check if product SKU or lowercase name is included
      if (normalized.includes(p.sku.toLowerCase()) || normalized.includes(p.name.toLowerCase())) {
        if (!matched.some(item => item.id === p.id)) {
          matched.push(p);
        }
      }
    });

    return matched;
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Lazy initialize GoogleGenAI exactly before the API request to avoid module-load crashes
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("Gemini API Key is not configured yet in the Settings secrets.");
      }

      const ai = new GoogleGenAI({ apiKey });

      // Compile content history safely for Gemini API representation
      const contentsPayload = messages.concat(userMsg).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Call latest recommended text flash preview model
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contentsPayload,
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTIONS,
          temperature: 0.7
        }
      });

      const responseText = result.text || "I apologize, I didn't catch that. Could you please rephrase?";
      const linked = parseProductsFromText(responseText);

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: responseText,
          timestamp: new Date(),
          linkedProducts: linked
        }
      ]);

    } catch (err: any) {
      console.error("Gemini API Error details:", err);
      let errMsg = "Unable to connect to AI Assistant. ";
      
      if (err instanceof Error && err.message.includes("API Key")) {
        errMsg += "The Gemini API key is missing. AI Studio will inject your secret key soon.";
      } else {
        errMsg += "Please make sure your internet is working or try again shortly.";
      }

      setErrorStatus(errMsg);

      // Add offline fallback advice behavior
      const lower = textToSend.toLowerCase();
      let fallbackText = "G'day! I'm currently running in local backup mode because the API keys are loading. Still, let me advise you on that! ";
      
      if (lower.includes("anxiety") || lower.includes("bark") || lower.includes("greyhound") || lower.includes("collar")) {
        fallbackText += "For pet stress, the **Dog Calming Collar (SKU: DOG-CL-04)** and **Cat Calming Collar (SKU: CAT-CL-01)** are outstanding. They use simulated maternal facial pheromones that relax the brain without prescription drugs. Active for 60 full days!";
      } else if (lower.includes("vomit") || lower.includes("bowl") || lower.includes("neck") || lower.includes("posture")) {
        fallbackText += "Check out our **15° Raised Stainless Steel Pet Bowl (SKU: DOG-BW-02)**. It lifts the food by orthopedically beneficial height to protect their joints, easing digestion and reducing acid reflux.";
      } else if (lower.includes("basking") || lower.includes("turtle") || lower.includes("reptile") || lower.includes("lamp")) {
        fallbackText += "For turtles, shell rot is extremely dangerous. We recommend using our heavy duty **Adjustable Reptile Lamp Stand (SKU: REP-LS-01)** aligned over our non-slip **Turtle Basking Platform (SKU: REP-BP-02)**. This guarantees perfect dry times and UVB coverage.";
      } else {
        fallbackText += "Explore our premium revamped listings in the shop interface! We have backpacks, adjustable cone collars, seed catchers, and digital pH meters fully stocked in Australia.";
      }

      const backupMatches = parseProductsFromText(fallbackText);

      setMessages(prev => [
        ...prev,
        {
          id: `ai-fallback-${Date.now()}`,
          role: 'model',
          text: fallbackText,
          timestamp: new Date(),
          linkedProducts: backupMatches
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex justify-end"
          id="ai-assistant-drawer-backdrop"
        >
          {/* Main Sidebar Drawer Container */}
          <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-md bg-[#FFFDF7] h-full shadow-2xl flex flex-col justify-between border-l border-gray-150"
            id="ai-assistant-drawer"
          >
            {/* Header section styled with theme colors */}
            <div className="bg-[#2EC4B6] text-white p-5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#CBF3F0] flex items-center justify-center text-[#2EC4B6]">
                  <Sparkles className="w-4 h-4 fill-current text-[#2EC4B6]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base tracking-tight">AI Pet Care Assistant</h3>
                  <p className="text-[10px] text-[#CBF3F0] font-mono uppercase tracking-widest font-bold">Powered by Gemini 3 Flash</p>
                </div>
              </div>
              <button
                id="close-drawer-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#25ab9e] transition text-white"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat list viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-140px)]">
              {messages.map((msg) => {
                const isModel = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} space-y-1`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold px-1 uppercase tracking-wider">
                      {isModel ? (
                        <>
                          <Sparkles className="w-3 h-3 text-[#2EC4B6]" />
                          <span>Boutique Expert</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 text-gray-400" />
                          <span>Pet Owner</span>
                        </>
                      )}
                    </div>
                    
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isModel
                          ? 'bg-[#CBF3F0] text-[#2B2D42] rounded-tl-xs shadow-xs'
                          : 'bg-[#FF9F1C] text-white rounded-tr-xs shadow-xs font-semibold'
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>
                    </div>

                    {/* Inline linked accessory cards */}
                    {isModel && msg.linkedProducts && msg.linkedProducts.length > 0 && (
                      <div className="w-full max-w-[85%] mt-2 space-y-2">
                        <span className="block text-[10px] font-mono text-[#2EC4B6] font-bold tracking-wider">🔗 Recommended Add-on fits:</span>
                        {msg.linkedProducts.map(p => (
                          <div 
                            key={p.id}
                            className="bg-white rounded-xl border border-gray-150 p-2.5 flex items-center gap-2.5 shadow-sm hover:border-[#FF9F1C] transition cursor-pointer"
                            onClick={() => onSelectProduct(p)}
                          >
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-11 h-11 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-black text-[#2B2D42] truncate leading-tight">{p.name}</h4>
                              <p className="text-[10px] text-gray-500 font-mono mt-0.5">${p.price} AUD</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(p);
                              }}
                              className="bg-[#2B2D42] hover:bg-[#FF9F1C] text-white hover:text-[#2B2D42] p-1.5 rounded-lg transition"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-[10px] text-gray-400 font-mono animate-pulse uppercase tracking-widest font-bold">Expert is typing...</span>
                  <div className="bg-[#CBF3F0] px-4 py-3.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#2EC4B6] rounded-full animate-bounce delay-75" />
                    <span className="w-2.5 h-2.5 bg-[#2EC4B6] rounded-full animate-bounce delay-150" />
                    <span className="w-2.5 h-2.5 bg-[#2EC4B6] rounded-full animate-bounce delay-225" />
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={listEndRef} />
            </div>

            {/* Quick suggested chips & Chat form */}
            <div className="border-t border-gray-150 p-4 bg-white space-y-3.5">
              
              {/* Suggester tag slide */}
              {messages.length < 3 && (
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 text-center">Frequently Asked Care Questions</span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q.text)}
                        className="text-[11px] font-bold bg-[#FFFDF7] text-[#2EC4B6] border border-[#2EC4B6]/30 hover:bg-[#CBF3F0]/20 hover:border-[#2EC4B6] px-2.5 py-1 rounded-full transition cursor-pointer"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input structure */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask our boutique doctor..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 focus:bg-white text-sm text-[#2B2D42] placeholder-gray-400 rounded-full py-2.5 px-4 focus:outline-none border-2 border-transparent focus:border-[#FF9F1C] focus:ring-4 focus:ring-[#FF9F1C]/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="bg-[#FF9F1C] hover:bg-[#e08910] text-white p-2.5 rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Trust disclaimer */}
              <p className="text-[9px] text-gray-400 text-center leading-normal">
                Our advice is informational. Consult local Australian physical vets for urgent conditions.
              </p>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
