/**
 * Developer Follow Controller Layer
 * NexoApps Platform - Phase 4D
 */

const followService = require('../services/follow.service');
const notificationService = require('../services/notification.service');

class FollowController {
  // POST /api/v1/follow/:developerId
  follow(req, res) {
    try {
      const userId = req.user.id;
      const { developerId } = req.params;
      const result = followService.followDeveloper(userId, developerId);

      notificationService.createNotification({
        userId,
        type: 'developer_followed',
        title: `Following Studio`,
        message: `You are now following ${developerId} studio updates.`,
        link: `/developer/${developerId}`,
      });

      return res.status(200).json({
        success: true,
        message: `Now following ${developerId}`,
        data: {
          isFollowing: true,
          followersCount: followService.getFollowersCount(developerId),
        },
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // DELETE /api/v1/follow/:developerId
  unfollow(req, res) {
    try {
      const userId = req.user.id;
      const { developerId } = req.params;
      followService.unfollowDeveloper(userId, developerId);

      return res.status(200).json({
        success: true,
        message: `Unfollowed ${developerId}`,
        data: {
          isFollowing: false,
          followersCount: followService.getFollowersCount(developerId),
        },
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // GET /api/v1/follow/status/:developerId
  getStatus(req, res) {
    try {
      const userId = req.user?.id;
      const { developerId } = req.params;
      const isFollowing = followService.isFollowing(userId, developerId);
      const followersCount = followService.getFollowersCount(developerId);
      return res.status(200).json({ success: true, data: { isFollowing, followersCount } });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = new FollowController();
