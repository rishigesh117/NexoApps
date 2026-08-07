/**
 * Visual Editor Service — NexoApps Phase 9B
 * Real-time canvas editing sessions, cursor positioning, and live preview state.
 */

const { v4: uuidv4 } = require('uuid');

class VisualEditorService {
  constructor() {
    this.sessions = [
      {
        id: 'editor-sess-1',
        applicationId: 'app-demo-1',
        userId: 'user-owner',
        lastCursorPosition: JSON.stringify({ x: 420, y: 180 }),
        activePageId: 'page-1',
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async getSession(applicationId, userId) {
    let sess = this.sessions.find(s => s.applicationId === applicationId && s.userId === userId);
    if (!sess) {
      sess = {
        id: `editor-sess-${uuidv4().substring(0, 8)}`,
        applicationId,
        userId,
        lastCursorPosition: JSON.stringify({ x: 0, y: 0 }),
        activePageId: 'page-1',
        updatedAt: new Date().toISOString()
      };
      this.sessions.push(sess);
    }
    return sess;
  }

  async updateCursor(applicationId, userId, cursorPosition) {
    const sess = await this.getSession(applicationId, userId);
    sess.lastCursorPosition = JSON.stringify(cursorPosition);
    sess.updatedAt = new Date().toISOString();
    return sess;
  }
}

module.exports = new VisualEditorService();
