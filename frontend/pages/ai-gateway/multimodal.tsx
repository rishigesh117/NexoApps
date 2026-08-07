import React, { useState } from 'react';
import Head from 'next/head';
import { Sparkles, Image as ImageIcon, Mic, Globe, Eye, Send } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { multimodalService } from '../../services/multimodalService';

export default function AIMultimodalPage() {
  const [imagePrompt, setImagePrompt] = useState('Futuristic glassmorphism enterprise dashboard with cyan and violet neon accents');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const [speechText, setSpeechText] = useState('Welcome to NexoApps Version 6.0 Enterprise AI Gateway.');
  const [speechAudioUrl, setSpeechAudioUrl] = useState<string | null>(null);
  const [speechLoading, setSpeechLoading] = useState(false);

  const [transInput, setTransInput] = useState('NexoApps Platform offers high-throughput model routing and low latency.');
  const [targetLang, setTargetLang] = useState('es');
  const [translatedResult, setTranslatedResult] = useState<string | null>(null);

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setImgLoading(true);
    try {
      const res = await multimodalService.generateImage({ prompt: imagePrompt });
      if (res.success) {
        setGeneratedImg(res.data.imageUrl);
      }
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setImgLoading(false);
    }
  };

  const handleSpeechTTS = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpeechLoading(true);
    try {
      const res = await multimodalService.processSpeech({ type: 'tts', inputTextOrAudio: speechText });
      if (res.success) {
        setSpeechAudioUrl(res.data.outputUrl);
      }
    } catch (err) {
      console.error('Failed to generate speech', err);
    } finally {
      setSpeechLoading(false);
    }
  };

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await multimodalService.processTranslation({ inputText: transInput, targetLang });
      if (res.success) {
        setTranslatedResult(res.data.translatedText);
      }
    } catch (err) {
      console.error('Failed to translate', err);
    }
  };

  return (
    <>
      <Head>
        <title>Multimodal & Generative AI Studio | NexoApps Version 6.0</title>
        <meta name="description" content="Vision processing, image synthesis, text-to-speech, speech-to-text, and neural translation." />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-brand-cyan" />
              Multimodal & Generative AI Studio
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Vision processing, DALL-E/Midjourney image generation pipelines, speech audio synthesis, and neural translation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Synthesis */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                Text-to-Image Generation Studio
              </h3>
              <form onSubmit={handleGenerateImage} className="space-y-3">
                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={imgLoading}
                  className="w-full py-2.5 rounded-xl bg-brand-cyan text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{imgLoading ? 'Synthesizing...' : 'Generate Image'}</span>
                </button>
              </form>

              {generatedImg && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Output Preview</span>
                  <img src={generatedImg} alt="Generated AI Visual" className="w-full rounded-2xl border border-white/10 object-cover max-h-64" />
                </div>
              )}
            </div>

            {/* Speech Synthesis */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-violet-400" />
                Text-to-Speech (TTS) Audio Pipeline
              </h3>
              <form onSubmit={handleSpeechTTS} className="space-y-3">
                <textarea
                  rows={3}
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={speechLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-blue text-white font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>{speechLoading ? 'Synthesizing Audio...' : 'Generate Speech'}</span>
                </button>
              </form>

              {speechAudioUrl && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Generated Audio Asset</span>
                  <p className="text-xs font-mono text-emerald-400">Asset URL: {speechAudioUrl}</p>
                </div>
              )}
            </div>
          </div>

          {/* Neural Translation */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Multilingual Neural Translation Engine
            </h3>
            <form onSubmit={handleTranslate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={transInput}
                  onChange={(e) => setTransInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-white text-xs focus:border-brand-cyan focus:outline-none"
                >
                  <option value="es">Spanish (es)</option>
                  <option value="fr">French (fr)</option>
                  <option value="de">German (de)</option>
                  <option value="ja">Japanese (ja)</option>
                  <option value="zh">Chinese (zh)</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 flex-1"
                >
                  Translate
                </button>
              </div>
            </form>

            {translatedResult && (
              <div className="mt-2 p-4 rounded-2xl bg-surface-100 border border-white/10 text-xs font-mono text-emerald-300">
                {translatedResult}
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  );
}
