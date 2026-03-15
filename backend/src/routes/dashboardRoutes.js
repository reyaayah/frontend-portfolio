const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get dashboard statistics
 *     description: Retrieve overall portfolio statistics (admin only)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProjects:
 *                   type: integer
 *                 totalMessages:
 *                   type: integer
 *                 unreadMessages:
 *                   type: integer
 *                 totalSkills:
 *                   type: integer
 *       401:
 *         description: Not authorized
 */
router.get('/stats', protect, dashboardController.stats);

module.exports = router;

