import React, { useState } from 'react';
import { AppItem } from '../../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenshotGalleryProps {
  app: AppItem;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ app }) => {
  const screenshots = app.screenshots && app.screenshots.length > 0 ? app.screenshots : [app.bannerUrl];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % screenshots.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-brand-cyan" /> App Preview & Screenshots
      </h3>

      {/* Main Cover Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video max-h-72 w-full group">
        <img
          src={app.bannerUrl}
          alt={`${app.title} Cover Banner`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end p-6">
          <span className="text-xs font-bold text-white bg-surface-200/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
            {app.title} Cover Banner
          </span>
        </div>
      </div>

      {/* Screenshots Scrollable Carousel */}
      <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
        {screenshots.map((src, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className="relative min-w-[220px] sm:min-w-[260px] h-40 rounded-2xl overflow-hidden border border-white/10 cursor-pointer group shrink-0"
          >
            <img
              src={src}
              alt={`${app.title} Screenshot ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 rounded-xl bg-surface-200/80 text-white border border-white/15">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-2xl bg-surface-200 text-white hover:bg-surface-100 border border-white/15 z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-surface-200 text-white hover:bg-surface-100 border border-white/15 z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-surface-200 text-white hover:bg-surface-100 border border-white/15 z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src={screenshots[activeImageIndex]}
                alt="Fullscreen Preview"
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
