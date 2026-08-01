/**
 * Support Ticket System Service
 * NexoApps Platform - Phase 5B
 */

class SupportService {
  constructor() {
    this.tickets = [
      {
        id: 'tkt-1001',
        userId: 'usr-1',
        userName: 'Rishigesh (Platform Owner)',
        userEmail: 'rishigesh720@gmail.com',
        subject: 'Platform Production Launch & Health Check Verification',
        category: 'Publishing',
        priority: 'Urgent',
        status: 'Resolved',
        description: 'Verified all 10 core subsystems, signed APK delivery, and OWNER privileges across console pages.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [
          {
            id: 'rep-1',
            ticketId: 'tkt-1001',
            senderName: 'NexoApps Automated Support Bot',
            isAdmin: true,
            message: 'All core routes, PostgreSQL schema, and authentication middleware passed 100% verification checks.',
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: 'tkt-1002',
        userId: 'usr-2',
        userName: 'Batlytics Dev Team',
        userEmail: 'developer@batlytics.com',
        subject: 'Inquiry on Bluetooth Scorekeeper Sync Beta',
        category: 'General',
        priority: 'Medium',
        status: 'Open',
        description: 'When will Bluetooth scorekeeper hardware sync be available in the upcoming v1.1.0 update?',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
      },
    ];
  }

  getTickets(filter = {}) {
    let list = [...this.tickets];
    if (filter.status) list = list.filter((t) => t.status === filter.status);
    if (filter.category) list = list.filter((t) => t.category === filter.category);
    if (filter.userId) list = list.filter((t) => t.userId === filter.userId);
    return list;
  }

  getTicketById(id) {
    return this.tickets.find((t) => t.id === id) || null;
  }

  createTicket(data) {
    const newTicket = {
      id: `tkt-${Date.now()}`,
      userId: data.userId || 'usr-guest',
      userName: data.userName || 'Guest User',
      userEmail: data.userEmail,
      subject: data.subject,
      category: data.category || 'General',
      priority: data.priority || 'Medium',
      status: 'Open',
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
    };
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  addReply(ticketId, { senderName, isAdmin = false, message }) {
    const ticket = this.getTicketById(ticketId);
    if (!ticket) throw new Error('Ticket not found');

    const reply = {
      id: `rep-${Date.now()}`,
      ticketId,
      senderName,
      isAdmin,
      message,
      createdAt: new Date().toISOString(),
    };

    ticket.replies.push(reply);
    ticket.updatedAt = new Date().toISOString();
    if (isAdmin && ticket.status === 'Open') ticket.status = 'In Progress';
    return reply;
  }

  updateTicketStatus(ticketId, status) {
    const ticket = this.getTicketById(ticketId);
    if (!ticket) throw new Error('Ticket not found');
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    return ticket;
  }
}

module.exports = new SupportService();
