const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meeting.controller');

router.get('/rooms', (req, res) => meetingController.getMeetingRooms(req, res));
router.post('/rooms', (req, res) => meetingController.createMeetingRoom(req, res));
router.get('/rooms/:roomId/sessions', (req, res) => meetingController.getMeetingSessions(req, res));
router.post('/rooms/:roomId/sessions', (req, res) => meetingController.createMeetingSession(req, res));
router.get('/sessions/:sessionId/participants', (req, res) => meetingController.getParticipants(req, res));
router.post('/sessions/:sessionId/join', (req, res) => meetingController.joinMeeting(req, res));

module.exports = router;
