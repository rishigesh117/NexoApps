/**
 * Messaging Service — NexoApps Phase 11D (v8.4)
 * Handles channel messages, threads, and direct messaging.
 */

class MessagingService {
  constructor() {
    this.messages = [
      {
        id: 'msg-1',
        channelId: 'chan-general',
        senderId: 'user-admin',
        content: 'Welcome to the NexoApps Collaboration Hub! Version 8.4 is live.',
        messageType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg-2',
        channelId: 'chan-general',
        senderId: 'user-dev',
        content: 'AI Collaboration Platform features are working smoothly across all workspaces.',
        messageType: 'text',
        attachments: [],
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString()
      }
    ];

    this.threads = [
      {
        id: 'th-1',
        parentMessageId: 'msg-1',
        senderId: 'user-dev',
        content: 'Great update! Glad to see Phase 11D deployed.',
        createdAt: new Date(Date.now() - 3000000).toISOString()
      }
    ];

    this.directMessages = [
      {
        id: 'dm-1',
        senderId: 'user-admin',
        recipientId: 'user-dev',
        content: 'Hey, can you review the document library updates?',
        isRead: 1,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
  }

  async getChannelMessages(channelId) {
    return this.messages.filter(m => m.channelId === channelId);
  }

  async sendChannelMessage(data) {
    const msg = {
      id: `msg-${Date.now()}`,
      channelId: data.channelId,
      senderId: data.senderId || 'user-admin',
      content: data.content,
      messageType: data.messageType || 'text',
      attachments: data.attachments || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.messages.push(msg);
    return msg;
  }

  async getMessageThreads(parentMessageId) {
    return this.threads.filter(t => t.parentMessageId === parentMessageId);
  }

  async sendThreadReply(data) {
    const thread = {
      id: `th-${Date.now()}`,
      parentMessageId: data.parentMessageId,
      senderId: data.senderId || 'user-admin',
      content: data.content,
      createdAt: new Date().toISOString()
    };
    this.threads.push(thread);
    return thread;
  }

  async getDirectMessages(senderId, recipientId) {
    return this.directMessages.filter(
      dm => (dm.senderId === senderId && dm.recipientId === recipientId) ||
            (dm.senderId === recipientId && dm.recipientId === senderId)
    );
  }

  async sendDirectMessage(data) {
    const dm = {
      id: `dm-${Date.now()}`,
      senderId: data.senderId || 'user-admin',
      recipientId: data.recipientId,
      content: data.content,
      isRead: 0,
      createdAt: new Date().toISOString()
    };
    this.directMessages.push(dm);
    return dm;
  }
}

module.exports = new MessagingService();
