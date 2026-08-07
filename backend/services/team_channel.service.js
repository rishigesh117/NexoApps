/**
 * Team Channel Service — NexoApps Phase 11D (v8.4)
 */

class TeamChannelService {
  constructor() {
    this.channels = [
      {
        id: 'tc-general',
        workspaceId: 'ws-main',
        channelName: 'general',
        channelType: 'public',
        topic: 'Company-wide announcements & general discussions',
        createdBy: 'user-admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 'tc-engineering',
        workspaceId: 'ws-main',
        channelName: 'engineering',
        channelType: 'public',
        topic: 'Engineering discussions, architecture & releases',
        createdBy: 'user-admin',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getChannels(workspaceId) {
    return this.channels.filter(c => c.workspaceId === workspaceId || !workspaceId);
  }

  async createChannel(data) {
    const channel = {
      id: `tc-${Date.now()}`,
      workspaceId: data.workspaceId || 'ws-main',
      channelName: data.channelName,
      channelType: data.channelType || 'public',
      topic: data.topic || '',
      createdBy: data.createdBy || 'user-admin',
      createdAt: new Date().toISOString()
    };
    this.channels.push(channel);
    return channel;
  }
}

module.exports = new TeamChannelService();
