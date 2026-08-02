/**
 * AI Bug Detection & Static Scanner Service
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

class BugDetectionService {
  constructor() {
    this.bugs = [
      {
        id: 'bug-1',
        filePath: 'backend/routes/index.js',
        severity: 'Low',
        issueTitle: 'Missing Rate Limiting Header Verification',
        description: 'Consider adding express-rate-limit middleware to public API routes.',
        suggestedFix: 'router.use(limiter);',
        detectedByAgentId: 'ag-3',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getBugs() {
    return this.bugs;
  }
}

module.exports = new BugDetectionService();
