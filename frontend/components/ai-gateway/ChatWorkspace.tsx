import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Zap, Sliders, Image as ImageIcon, CornerDownLeft } from 'lucide-react';
import { chatService } from '../../services/chatService';
import { ModelSelector } from './ModelSelector';
import { ChatMessage, ChatSession, ProviderModel } from '../../../shared/types';

export const ChatWorkspace: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedModelKey, setSelectedModelKey] = useState('gpt-4o');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (currentSession) {
      fetchMessages(currentSession.id);
    }
  }, [currentSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSessions = async () => {
    try {
      const res = await chatService.listSessions();
      if (res.success && res.data.length > 0) {
        setSessions(res.data);
        setCurrentSession(res.data[0]);
        setSelectedModelKey(res.data[0].modelKey || 'gpt-4o');
      }
    } catch (err) {
      console.error('Failed to fetch chat sessions', err);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const res = await chatService.getSessionMessages(sessionId);
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const handleNewSession = async () => {
    try {
      const res = await chatService.createSession({
        title: 'New AI Gateway Session',
        modelKey: selectedModelKey,
      });
      if (res.success) {
        setSessions([res.data, ...sessions]);
        setCurrentSession(res.data);
      }
    } catch (err) {
      console.error('Failed to create new session', err);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !currentSession || loading) return;

    const userText = input.trim();
    setInput('');
    setLoading(true);

    try {
      const res = await chatService.sendMessage({
        sessionId: currentSession.id,
        content: userText,
        modelKey: selectedModelKey,
      });
      if (res.success) {
        setMessages(prev => [...prev, res.data.userMessage, res.data.assistantMessage]);
      }
    } catch (err) {
      console.error('Failed to send chat message', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[720px]">
      {/* Sessions Sidebar */}
      <div className="lg:col-span-1 glass-panel p-4 rounded-3xl border border-white/10 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Chat History</span>
            <button
              onClick={handleNewSession}
              className="p-1.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 transition-all text-xs font-semibold flex items-center gap-1"
            >
              + New Chat
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[560px] scrollbar-none pr-1">
            {sessions.map((s) => {
              const isSelected = currentSession?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSession(s)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex flex-col gap-1 ${
                    isSelected ? 'bg-brand-cyan/15 border border-brand-cyan/40 text-white' : 'hover:bg-white/5 text-text-secondary hover:text-white border border-transparent'
                  }`}
                >
                  <span className="text-xs font-bold truncate">{s.title}</span>
                  <span className="text-[10px] text-text-muted font-mono">{s.modelKey}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-white/10">
          <ModelSelector
            selectedModelKey={selectedModelKey}
            onSelectModel={(m: ProviderModel) => setSelectedModelKey(m.modelKey)}
          />
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between h-full">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{currentSession?.title || 'Interactive AI Chat'}</h3>
              <p className="text-[11px] text-text-muted flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-brand-cyan" />
                Active Model: {selectedModelKey}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            Gateway Stream Active
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 scrollbar-none">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-brand-blue text-white' : 'bg-surface-200 border border-white/10 text-brand-cyan'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-white rounded-tr-none shadow-glow-cyan'
                    : 'bg-surface-100 border border-white/10 text-text-secondary rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-text-muted font-mono">
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {msg.latencyMs && <span>{msg.latencyMs}ms • {msg.tokensUsed} tokens</span>}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-surface-200 border border-white/10 text-brand-cyan flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-surface-100 border border-white/10 text-xs text-text-muted italic">
                Routing request through AI Gateway & generating response...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to route across universal AI models..."
            className="flex-1 px-4 py-3 rounded-2xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
