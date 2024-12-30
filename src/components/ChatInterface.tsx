import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  position: { x: number; y: number } | null;
  onClose: () => void;
  selectedText: string;
  visible: boolean;
}

export const ChatInterface = ({
  position,
  onClose,
  selectedText,
  visible,
}: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  if (!position || !visible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');

    // TODO: Integrate with OpenAI/Gemini here
    // For now, just echo back
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `Response regarding: "${selectedText}"\n${message}`, 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <div
      className={cn(
        "fixed z-50 w-80 bg-white/95 rounded-lg shadow-lg backdrop-blur-sm",
        "border border-gray-200/50 animate-slide-up"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y + 20}px`,
        transform: 'translate(-50%, 0)',
      }}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-200/50">
        <h3 className="text-sm font-medium text-gray-700">Ask about selection</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100/50 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="p-3 max-h-60 overflow-y-auto">
        <div className="text-xs text-gray-500 mb-3 p-2 bg-gray-50/50 rounded">
          Selected text: "{selectedText}"
        </div>
        
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "mb-2 p-2 rounded-lg text-sm",
              msg.isUser ? "bg-gray-100/50 ml-4" : "bg-gray-50/50 mr-4"
            )}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className={cn(
              "flex-1 px-3 py-2 text-sm rounded-md",
              "bg-gray-50/50 border border-gray-200/50",
              "focus:outline-none focus:ring-1 focus:ring-gray-300"
            )}
          />
          <button
            type="submit"
            className={cn(
              "p-2 rounded-md bg-gray-900 text-white",
              "hover:bg-gray-800 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};