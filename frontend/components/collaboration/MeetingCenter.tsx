import React, { useEffect, useState } from 'react';
import { Video, Plus, Users, Calendar, Mic, Play } from 'lucide-react';
import { getMeetingRooms } from '../../services/meetingService';
import { MeetingRoom } from '../../../shared/types';

export const MeetingCenter: React.FC = () => {
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);

  useEffect(() => {
    getMeetingRooms().then(setRooms);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-brand-cyan" /> Meeting Center & AI Transcripts
          </h2>
          <p className="text-text-muted text-sm">Enterprise video meetings, live room codes, and AI-driven recording transcripts</p>
        </div>
        <button className="px-4 py-2 bg-brand-cyan text-background font-semibold rounded-xl text-sm hover:opacity-90 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((r) => (
          <div key={r.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">{r.roomName}</h3>
              <span className="px-2 py-0.5 bg-brand-cyan/20 text-brand-cyan text-xs rounded-md font-mono">{r.roomCode}</span>
            </div>
            <p className="text-text-muted text-xs flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-cyan" /> Host: {r.hostId}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button className="px-3 py-1.5 bg-brand-cyan text-background font-semibold text-xs rounded-lg flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> Join Room
              </button>
              <button className="px-3 py-1.5 bg-white/10 text-white font-semibold text-xs rounded-lg flex items-center gap-1">
                <Play className="w-3.5 h-3.5" /> View Recordings
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
