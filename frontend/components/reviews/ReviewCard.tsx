import React, { useState } from 'react';
import { Star, ShieldCheck, Flag, MoreVertical, Edit3, Trash2, Check } from 'lucide-react';
import { Review } from '../../types';
import { HelpfulButton } from './HelpfulButton';
import { useAuth } from '../../context/AuthContext';

interface ReviewCardProps {
  review: Review;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  onAuthRequired?: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onEdit,
  onDelete,
  onAuthRequired,
}) => {
  const { user } = useAuth();
  const [showReported, setShowReported] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isOwner = user && user.id === review.userId;

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    } catch {
      return 'Recently';
    }
  };

  const handleReport = () => {
    setShowReported(true);
    setShowMenu(false);
    setTimeout(() => setShowReported(false), 4000);
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-white/20 transition-all relative">
      
      {/* Top Header Row: User Avatar, Name, Verified Badge, Rating, Options */}
      <div className="flex items-start justify-between gap-4">
        
        {/* User Metadata */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5 shrink-0">
            {review.userAvatar ? (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                {review.userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">{review.userName}</span>
              {review.isVerified && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              )}
            </div>
            <span className="text-[11px] text-text-muted">{formatDate(review.createdAt)}</span>
          </div>
        </div>

        {/* Right Side: Rating & Menu */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{review.rating}.0</span>
          </div>

          {/* Options Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Review options menu"
              className="p-1 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-all"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 glass-panel rounded-2xl border border-white/15 p-1.5 shadow-2xl z-20 space-y-1">
                {isOwner ? (
                  <>
                    {onEdit && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onEdit(review);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-white hover:bg-white/10 rounded-xl transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>Edit Review</span>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onDelete(review.id);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Review</span>
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleReport}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Flag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Report Review</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-white tracking-wide">{review.title}</h4>
        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
          {review.review || review.comment}
        </p>
      </div>

      {/* Developer Reply Placeholder */}
      {review.adminReply && (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 ml-4 sm:ml-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan">
            <span>Developer Response</span>
            <span className="text-[10px] text-text-muted font-normal">
              {formatDate(review.adminReply.repliedAt)}
            </span>
          </div>
          <p className="text-xs text-text-secondary italic">
            "{review.adminReply.message}"
          </p>
        </div>
      )}

      {/* Footer Row: Helpful Counter Button */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <HelpfulButton
          reviewId={review.id}
          initialLikesCount={review.likesCount}
          initialIsLiked={review.isLikedByUser}
          onAuthRequired={onAuthRequired}
        />

        {showReported && (
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium animate-pulse">
            <Check className="w-3 h-3" /> Report submitted for moderation
          </span>
        )}
      </div>
    </div>
  );
};
