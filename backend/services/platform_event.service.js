/**
 * Unified Platform Event Bus Service
 * NexoApps Platform - Phase 6E (Version 2.5)
 */

class PlatformEventService {
  constructor() {
    this.events = [];
  }

  emitEvent(eventName, payload) {
    const evt = {
      id: `evt-${Date.now()}`,
      eventName,
      payload: payload || {},
      createdAt: new Date().toISOString(),
    };
    this.events.unshift(evt);
    return evt;
  }
}

module.exports = new PlatformEventService();
