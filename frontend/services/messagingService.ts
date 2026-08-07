import { fetchApi } from './apiClient';
import { ChannelMessage, MessageThread, DirectMessage } from '../../shared/types';

export const getChannelMessages = async (channelId: string): Promise<ChannelMessage[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: ChannelMessage[] }>(`/collaboration/messaging/channels/${channelId}/messages`);
    return res.data;
  } catch {
    return [
      {
        id: 'msg-1',
        channelId,
        senderId: 'user-admin',
        content: 'Welcome to channel conversation! NexoApps Version 8.4 AI Collaboration Platform.',
        messageType: 'text',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
};

export const sendChannelMessage = async (channelId: string, content: string, senderId = 'user-admin'): Promise<ChannelMessage> => {
  try {
    const res = await fetchApi<{ success: boolean; data: ChannelMessage }>(`/collaboration/messaging/channels/${channelId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ channelId, content, senderId })
    });
    return res.data;
  } catch {
    return {
      id: `msg-${Date.now()}`,
      channelId,
      senderId,
      content,
      messageType: 'text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};

export const getMessageThreads = async (parentMessageId: string): Promise<MessageThread[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: MessageThread[] }>(`/collaboration/messaging/messages/${parentMessageId}/threads`);
    return res.data;
  } catch {
    return [];
  }
};

export const getDirectMessages = async (senderId = 'user-admin', recipientId = 'user-dev'): Promise<DirectMessage[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: DirectMessage[] }>(`/collaboration/messaging/direct-messages?senderId=${senderId}&recipientId=${recipientId}`);
    return res.data;
  } catch {
    return [
      {
        id: 'dm-1',
        senderId,
        recipientId,
        content: 'AI Collaboration Platform messaging initialized.',
        isRead: true,
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const messagingService = {
  getChannelMessages,
  sendChannelMessage,
  getMessageThreads,
  getDirectMessages
};
