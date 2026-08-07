/**
 * Meeting Service — NexoApps Phase 11D (v8.4)
 * Handles meeting rooms, meeting sessions, participants, recordings, and transcripts.
 */

class MeetingService {
  constructor() {
    this.rooms = [
      {
        id: 'room-1',
        workspaceId: 'ws-main',
        roomName: 'Sprint Planning Room',
        roomCode: 'NEXO-SPRINT-01',
        hostId: 'user-admin',
        isActive: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: 'room-2',
        workspaceId: 'ws-main',
        roomName: 'AI Architecture Review Room',
        roomCode: 'NEXO-ARCH-02',
        hostId: 'user-dev',
        isActive: 1,
        createdAt: new Date().toISOString()
      }
    ];

    this.sessions = [
      {
        id: 'sess-1',
        roomId: 'room-1',
        sessionTitle: 'Weekly Sync & Version 8.4 Walkthrough',
        scheduledStart: new Date().toISOString(),
        scheduledEnd: new Date(Date.now() + 3600000).toISOString(),
        actualStart: new Date().toISOString(),
        actualEnd: null,
        status: 'in_progress',
        recordingUrl: 'https://cdn.nexoapps.internal/recordings/sess-1.mp4',
        transcriptText: 'Discussion on Phase 11D features and backward compatibility tests.',
        createdAt: new Date().toISOString()
      }
    ];

    this.participants = [
      {
        id: 'part-1',
        sessionId: 'sess-1',
        userId: 'user-admin',
        role: 'host',
        joinedAt: new Date().toISOString(),
        leftAt: null
      },
      {
        id: 'part-2',
        sessionId: 'sess-1',
        userId: 'user-dev',
        role: 'attendee',
        joinedAt: new Date().toISOString(),
        leftAt: null
      }
    ];
  }

  async getMeetingRooms(workspaceId) {
    return this.rooms.filter(r => r.workspaceId === workspaceId || !workspaceId);
  }

  async createMeetingRoom(data) {
    const room = {
      id: `room-${Date.now()}`,
      workspaceId: data.workspaceId || 'ws-main',
      roomName: data.roomName || 'New Meeting Room',
      roomCode: data.roomCode || `ROOM-${Math.floor(1000 + Math.random() * 9000)}`,
      hostId: data.hostId || 'user-admin',
      isActive: 1,
      createdAt: new Date().toISOString()
    };
    this.rooms.push(room);
    return room;
  }

  async getMeetingSessions(roomId) {
    return this.sessions.filter(s => s.roomId === roomId || !roomId);
  }

  async createMeetingSession(data) {
    const session = {
      id: `sess-${Date.now()}`,
      roomId: data.roomId,
      sessionTitle: data.sessionTitle,
      scheduledStart: data.scheduledStart || new Date().toISOString(),
      scheduledEnd: data.scheduledEnd || new Date(Date.now() + 3600000).toISOString(),
      actualStart: null,
      actualEnd: null,
      status: 'scheduled',
      recordingUrl: '',
      transcriptText: '',
      createdAt: new Date().toISOString()
    };
    this.sessions.push(session);
    return session;
  }

  async getParticipants(sessionId) {
    return this.participants.filter(p => p.sessionId === sessionId);
  }

  async joinMeeting(sessionId, userId, role = 'attendee') {
    const participant = {
      id: `part-${Date.now()}`,
      sessionId,
      userId: userId || 'user-admin',
      role,
      joinedAt: new Date().toISOString(),
      leftAt: null
    };
    this.participants.push(participant);
    return participant;
  }
}

module.exports = new MeetingService();
