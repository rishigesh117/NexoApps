import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { favoriteService } from '../../services/favoriteService';
import { useAuth } from '../../context/AuthContext';

interface FavoriteButtonProps {
  appSlug: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onAuthRequired?: () => void;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  appSlug,
  showText = true,
  size = 'md',
  onAuthRequired,
  onFavoriteChange,
}) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (user && appSlug) {
      favoriteService.checkIsFavorite(appSlug).then((res) => {
        if (isMounted) setIsFavorite(res);
      });
    } else {
      setIsFavorite(false);
    }
    return () => {
      isMounted = false;
    };
  }, [user, appSlug]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      if (onAuthRequired) onAuthRequired();
      return;
    }

    if (isLoading) return;

    const nextState = !isFavorite;
    setIsFavorite(nextState);
    setIsLoading(true);

    try {
      if (nextState) {
        await favoriteService.addFavorite(appSlug);
      } else {
        await favoriteService.removeFavorite(appSlug);
      }
      if (onFavoriteChange) onFavoriteChange(nextState);
    } catch {
      setIsFavorite(!nextState);
    } finally {
      setIsLoading(false);
    }
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const buttonPadding = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ${
        buttonPadding[size]
      } ${
        isFavorite
          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-glow-rose hover:bg-rose-500/30'
          : 'glass-panel text-text-secondary hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/10'
      }`}
    >
      <Heart
        className={`${iconSizes[size]} transition-all duration-300 ${
          isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-current'
        }`}
      />
      {showText && (
        <span>{isFavorite ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
      )}
    </button>
  );
};
