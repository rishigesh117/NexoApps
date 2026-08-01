/**
 * Automatic Content & Review Moderation Service
 * NexoApps Platform - Phase 5B
 */

class ModerationService {
  constructor() {
    this.spamKeywords = ['buy cheap', 'casino', 'free money', 'click here link', 'crypto scam'];
  }

  moderateReview(reviewText, rating) {
    if (!reviewText) return { approved: true, flagReason: null };

    const lower = reviewText.toLowerCase();

    for (const keyword of this.spamKeywords) {
      if (lower.includes(keyword)) {
        return {
          approved: false,
          flagReason: `Spam keyword detected: "${keyword}"`,
        };
      }
    }

    if (reviewText.length < 3) {
      return {
        approved: false,
        flagReason: 'Review text too short (minimum 3 characters)',
      };
    }

    return { approved: true, flagReason: null };
  }
}

module.exports = new ModerationService();
