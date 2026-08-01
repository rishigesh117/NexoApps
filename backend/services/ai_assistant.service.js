/**
 * AI Assistant Core Intelligence Service
 * NexoApps Platform - Phase 5B
 */

class AIAssistantService {
  constructor() {
    this.conversations = new Map();
  }

  createConversation(userId = null, contextPage = '/') {
    const convId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const conversation = {
      id: convId,
      userId,
      title: 'AI Assistant Session',
      contextPage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-welcome`,
          conversationId: convId,
          sender: 'assistant',
          text: 'Hello! I am NexoBot, your AI Assistant. How can I help you explore apps, publish software, or navigate NexoApps today?',
          suggestedActions: [
            { label: 'Explore Batlytics', action: 'navigate', link: '/app/batlytics-cricket-scoring' },
            { label: 'Owner Upload Portal', action: 'navigate', link: '/admin/upload' },
            { label: 'Platform Health Check', action: 'navigate', link: '/admin/testing' },
            { label: 'Knowledge Base FAQs', action: 'navigate', link: '/help' },
          ],
          createdAt: new Date().toISOString(),
        },
      ],
    };

    this.conversations.set(convId, conversation);
    return conversation;
  }

  getConversation(convId) {
    return this.conversations.get(convId) || this.createConversation();
  }

  sendMessage(convId, userText, userRole = 'GUEST') {
    let conv = this.conversations.get(convId);
    if (!conv) {
      conv = this.createConversation(null, '/');
    }

    const userMsg = {
      id: `msg-${Date.now()}-u`,
      conversationId: conv.id,
      sender: 'user',
      text: userText,
      createdAt: new Date().toISOString(),
    };
    conv.messages.push(userMsg);

    // AI Intent & Response Generator
    const replyText = this.generateResponseText(userText, userRole);

    const assistantMsg = {
      id: `msg-${Date.now()}-a`,
      conversationId: conv.id,
      sender: 'assistant',
      text: replyText.answer,
      suggestedActions: replyText.actions,
      createdAt: new Date().toISOString(),
    };
    conv.messages.push(assistantMsg);
    conv.updatedAt = new Date().toISOString();

    return {
      conversation: conv,
      replyMessage: assistantMsg,
    };
  }

  generateResponseText(text, userRole) {
    const q = text.toLowerCase();

    if (q.includes('batlytics') || q.includes('cricket') || q.includes('scoring')) {
      return {
        answer: 'Batlytics is our flagship sports performance & real-time cricket scoring engine! It features instant ball-by-ball logging, Manhattan/Worm analytics, and PDF report export.',
        actions: [{ label: 'View Batlytics Details', action: 'navigate', link: '/app/batlytics-cricket-scoring' }],
      };
    }

    if (q.includes('upload') || q.includes('publish') || q.includes('apk')) {
      if (userRole === 'OWNER' || userRole === 'ADMIN') {
        return {
          answer: 'You have full Owner Upload privileges! You can use our 8-Step Upload Wizard to validate APK binaries, read version codes, calculate SHA-256 checksums, and publish immediately to the storefront.',
          actions: [{ label: 'Open Owner Upload Portal', action: 'navigate', link: '/admin/upload' }],
        };
      }
      return {
        answer: 'Developers can apply to join our Multi-Developer Workspace to submit application packages for Owner review and publishing.',
        actions: [{ label: 'Apply as Developer', action: 'navigate', link: '/developer/apply' }],
      };
    }

    if (q.includes('health') || q.includes('status') || q.includes('test')) {
      return {
        answer: 'You can run our automated diagnostic suite on the OWNER Testing Dashboard to verify Express Server, PostgreSQL, Auth, APIs, and Subsystem status.',
        actions: [{ label: 'Open Testing Dashboard', action: 'navigate', link: '/admin/testing' }],
      };
    }

    return {
      answer: `I analyzed your request regarding "${text}". NexoApps offers AI Global Search, personalized recommendations, custom app playlists, and developer analytics.`,
      actions: [
        { label: 'Try Global AI Search', action: 'navigate', link: '/search' },
        { label: 'View Knowledge Base', action: 'navigate', link: '/help' },
      ],
    };
  }
}

module.exports = new AIAssistantService();
