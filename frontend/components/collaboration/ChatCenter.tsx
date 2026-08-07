import React, { useEffect, useState } from 'react';
import { Send, MessageSquare, User, Paperclip } from 'lucide-react';
import { getChannelMessages, sendChannelMessage } from '../../services/messagingService';
import { ChannelMessage } from '../../../shared/types';

export const ChatCenter: React.FC = () => {
  const [messages, setMessages] = useState<ChannelMessage[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getChannelMessages('chan-general').then(setMessages);
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    const newMsg = await sendChannelMessage('chan-general', text);
    setMessages((prev) => [...prev, newMsg]);
    setText('');
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 flex flex-col h-[600px]">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-cyan" /> #general Chat Center
        </h3>
        <span className="text-xs text-text-muted">Real-time Enterprise Messaging</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 max-w-xl">
              <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                <span className="font-semibold text-white">{m.senderId}</span>
                <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-text-secondary text-sm">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 flex items-center gap-2">
        <button className="p-2 text-text-muted hover:text-white transition">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-cyan/50"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-brand-cyan text-background rounded-xl hover:opacity-90 transition font-bold"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
