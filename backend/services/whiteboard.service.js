/**
 * Whiteboard Service — NexoApps Phase 11D (v8.4)
 * Handles whiteboard creation, canvas data persistence, and objects.
 */

class WhiteboardService {
  constructor() {
    this.whiteboards = [
      {
        id: 'wb-1',
        workspaceId: 'ws-main',
        boardName: 'Phase 11D System Architecture Whiteboard',
        createdBy: 'user-admin',
        isPublic: 1,
        canvasData: JSON.stringify({ zoom: 1.0, panX: 0, panY: 0 }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.objects = [
      {
        id: 'wbo-1',
        whiteboardId: 'wb-1',
        objectType: 'sticky',
        positionX: 100,
        positionY: 150,
        width: 200,
        height: 150,
        propertiesJson: JSON.stringify({ color: 'yellow', text: 'AI Collaboration Platform features ready for release' }),
        createdBy: 'user-admin',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getWhiteboards(workspaceId) {
    return this.whiteboards.filter(w => w.workspaceId === workspaceId || !workspaceId);
  }

  async createWhiteboard(data) {
    const board = {
      id: `wb-${Date.now()}`,
      workspaceId: data.workspaceId || 'ws-main',
      boardName: data.boardName || 'Untitled Whiteboard',
      createdBy: data.createdBy || 'user-admin',
      isPublic: data.isPublic ? 1 : 0,
      canvasData: JSON.stringify(data.canvasData || { zoom: 1, panX: 0, panY: 0 }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.whiteboards.push(board);
    return board;
  }

  async getWhiteboardObjects(whiteboardId) {
    return this.objects.filter(o => o.whiteboardId === whiteboardId);
  }

  async addObject(data) {
    const obj = {
      id: `wbo-${Date.now()}`,
      whiteboardId: data.whiteboardId,
      objectType: data.objectType || 'sticky',
      positionX: data.positionX || 0,
      positionY: data.positionY || 0,
      width: data.width || 150,
      height: data.height || 100,
      propertiesJson: JSON.stringify(data.propertiesJson || {}),
      createdBy: data.createdBy || 'user-admin',
      createdAt: new Date().toISOString()
    };
    this.objects.push(obj);
    return obj;
  }
}

module.exports = new WhiteboardService();
