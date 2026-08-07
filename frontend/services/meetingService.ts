import { fetchApi } from './apiClient';
import { MeetingRoom, MeetingSession, MeetingParticipant } from '../../shared/types';

export const getMeetingRooms = async (workspaceId = 'ws-main'): Promise<MeetingRoom[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: MeetingRoom[] }>(`/collaboration/meetings/rooms?workspaceId=${workspaceId}`);
    return res.data;
  } catch {
    return [
      {
        id: 'room-1',
        workspaceId,
        roomName: 'Sprint Planning Room',
        roomCode: 'NEXO-SPRINT-01',
        hostId: 'user-admin',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const createMeetingRoom = async (roomName: string, workspaceId = 'ws-main'): Promise<MeetingRoom> => {
  try {
    const res = await fetchApi<{ success: boolean; data: MeetingRoom }>('/collaboration/meetings/rooms', {
      method: 'POST',
      body: JSON.stringify({ roomName, workspaceId })
    });
    return res.data;
  } catch {
    return {
      id: `room-${Date.now()}`,
      workspaceId,
      roomName,
      roomCode: `ROOM-${Math.floor(1000 + Math.random() * 9000)}`,
      hostId: 'user-admin',
      isActive: true,
      createdAt: new Date().toISOString()
    };
  }
};

export const getMeetingSessions = async (roomId: string): Promise<MeetingSession[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: MeetingSession[] }>(`/collaboration/meetings/rooms/${roomId}/sessions`);
    return res.data;
  } catch {
    return [
      {
        id: 'sess-1',
        roomId,
        sessionTitle: 'Weekly Standup & Sync',
        scheduledStart: new Date().toISOString(),
        scheduledEnd: new Date(Date.now() + 3600000).toISOString(),
        status: 'in_progress',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const meetingService = {
  getMeetingRooms,
  createMeetingRoom,
  getMeetingSessions
};
