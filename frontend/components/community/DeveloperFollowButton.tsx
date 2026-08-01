import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { communityService } from '../../services/communityService';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';

interface Props {
  developerId: string;
  onFollowChange?: (isFollowing: boolean, count: number) => void;
  className?: string;
}

export const DeveloperFollowButton: React.FC<Props> = ({ developerId, onFollowChange, className = '' }) => {
  const { isAuthenticated } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1420);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    communityService.getFollowStatus(developerId).then((res) => {
      if (isMounted) {
        setIsFollowing(res.isFollowing);
        setFollowersCount(res.followersCount);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [developerId]);

  const handleToggleFollow = async () => {
    if (!isAuthenticated) {
      alert('Please log in to follow developer studios.');
      return;
    }

    setIsLoading(true);
    try {
      if (isFollowing) {
        const res = await communityService.unfollowDeveloper(developerId);
        setIsFollowing(false);
        setFollowersCount(res.followersCount);
        if (onFollowChange) onFollowChange(false, res.followersCount);
      } else {
        const res = await communityService.followDeveloper(developerId);
        setIsFollowing(true);
        setFollowersCount(res.followersCount);
        if (onFollowChange) onFollowChange(true, res.followersCount);
      }
    } catch (err: any) {
      alert(err.message || 'Follow action failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFollow}
      disabled={isLoading}
      className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg ${
        isFollowing
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
          : 'bg-gradient-to-r from-brand-cyan to-brand-violet text-slate-950 hover:shadow-glow-cyan'
      } ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserCheck className="w-3.5 h-3.5" />
          <span>Following Studio</span>
        </>
      ) : (
        <>
          <UserPlus className="w-3.5 h-3.5" />
          <span>Follow Studio ({followersCount})</span>
        </>
      )}
    </button>
  );
};
