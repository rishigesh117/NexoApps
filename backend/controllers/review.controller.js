/**
 * Code Review & Bug Scanner Controller
 * NexoApps Platform - Phase 6B (Version 2.2)
 */

const codeReviewService = require('../services/code_review.service');
const bugDetectionService = require('../services/bug_detection.service');
const documentationService = require('../services/documentation.service');

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = codeReviewService.getReviews();
    const bugs = bugDetectionService.getBugs();
    return res.status(200).json({
      success: true,
      data: { reviews, bugs },
    });
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { pullRequestTitle } = req.body;
    const review = codeReviewService.createReview(pullRequestTitle);
    return res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDocs = async (req, res, next) => {
  try {
    const docs = documentationService.getDocs();
    return res.status(200).json({
      success: true,
      data: docs,
    });
  } catch (err) {
    next(err);
  }
};

exports.generateDoc = async (req, res, next) => {
  try {
    const { docTitle, docType } = req.body;
    const doc = documentationService.generateDoc(docTitle, docType);
    return res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};
