/**
 * Developer Follow Service
 * NexoApps Platform - Phase 4D
 */

class FollowService {
  constructor() {
    this.follows = [
      { id: 'fol-1', userId: 'usr-demo-1', developerId: 'batlytics', followedAt: new Date().toISOString() },
    ];
  }

  followDeveloper(userId, developerId) {
    const existing = this.follows.find((f) => f.userId === userId && f.developerId.toLowerCase() === developerId.toLowerCase());
    if (existing) return existing;

    const follow = {
      id: `fol-${Date.now()}`,
      userId,
      developerId: developerId.toLowerCase(),
      followedAt: new Date().toISOString(),
    };
    this.follows.push(follow);
    return follow;
  }

  unfollowDeveloper(userId, developerId) {
    const index = this.follows.findIndex((f) => f.userId === userId && f.developerId.toLowerCase() === developerId.toLowerCase());
    if (index !== -1) {
      this.follows.splice(index, 1);
    }
    return { success: true };
  }

  isFollowing(userId, developerId) {
    if (!userId || !developerId) return false;
    return this.follows.some((f) => f.userId === userId && f.developerId.toLowerCase() === developerId.toLowerCase());
  }

  getFollowersCount(developerId) {
    return this.follows.filter((f) => f.developerId.toLowerCase() === developerId.toLowerCase()).length + 1420;
  }

  getFollowingCount(userId) {
    return this.follows.filter((f) => f.userId === userId).length;
  }
}

module.exports = new FollowService();
