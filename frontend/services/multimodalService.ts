/**
 * Multimodal Service — NexoApps Phase 9A
 * Frontend API service for vision, speech, image generation & translation capabilities.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const multimodalService = {
  async processMultimodal(data: any) {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async generateImage(data: { prompt: string; resolution?: string; style?: string; providerId?: string }) {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async processSpeech(data: { type: 'tts' | 'stt'; inputTextOrAudio: string; providerId?: string }) {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async processTranslation(data: { inputText: string; targetLang: string; sourceLang?: string }) {
    const res = await fetch(`${API_BASE}/ai-gateway/gateway/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
