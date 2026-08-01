import React, { useState, useEffect } from 'react';
import { SubmissionCommentRecord } from '../../types';
import { developerService } from '../../services/developerService';
import { MessageSquare, Send, User } from 'lucide-react';

interface CommentsPanelProps {
  submissionId: string;
}

export const ReviewCommentsPanel: React.FC<CommentsPanelProps> = ({ submissionId }) => {
  const [comments, setComments] = useState<SubmissionCommentRecord[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const list = await developerService.getComments(submissionId);
      setComments(list || []);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [submissionId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await developerService.addComment(submissionId, newComment.trim());
      setNewComment('');
      fetchComments();
    } catch (err: any) {
      alert(err.message || 'Failed to add comment');
    }
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <MessageSquare className="w-4 h-4 text-brand-cyan" />
        <h4 className="text-xs font-bold text-white">Reviewer Discussion Thread</h4>
      </div>

      <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-none text-xs">
        {comments.length === 0 ? (
          <p className="text-text-muted italic text-center py-2 text-[11px]">No feedback comments posted yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-white flex items-center gap-1">
                  <User className="w-3 h-3 text-brand-cyan" /> {c.authorName} ({c.authorRole})
                </span>
                <span className="text-text-muted text-[10px]">{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-text-secondary leading-relaxed text-[11px]">{c.commentText}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAddComment} className="flex gap-2 pt-1 text-xs">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add feedback or change request..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-2xl bg-brand-cyan/20 text-brand-cyan font-bold hover:bg-brand-cyan/30 flex items-center gap-1 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
