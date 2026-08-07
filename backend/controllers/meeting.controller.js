/**
 * Meeting Controller — NexoApps Phase 11D (v8.4)
 */

const meetingService = require('../services/meeting.service');

class MeetingController {
  async getMeetingRooms(req, res) {
    try {
      const rooms = await meetingService.getMeetingRooms(req.query.workspaceId);
      res.json({ success: true, data: rooms });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createMeetingRoom(req, res) {
    try {
      const room = await meetingService.createMeetingRoom(req.body);
      res.status(201).json({ success: true, data: room });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getMeetingSessions(req, res) {
    try {
      const sessions = await meetingService.getMeetingSessions(req.params.roomId);
      res.json({ success: true, data: sessions });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async createMeetingSession(req, res) {
    try {
      const session = await meetingService.createMeetingSession(req.body);
      res.status(201).json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async getParticipants(req, res) {
    try {
      const participants = await meetingService.getParticipants(req.params.sessionId);
      res.json({ success: true, data: participants });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  async joinMeeting(req, res) {
    try {
      const participant = await meetingService.joinMeeting(
        req.params.sessionId,
        req.body.userId,
        req.body.role
      );
      res.status(201).json({ success: true, data: participant });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new MeetingController();
