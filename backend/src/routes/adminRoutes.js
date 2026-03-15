const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminLogin } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Admin login
 *     description: Authenticate admin with email and password, returns JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', adminLogin, adminController.login);

/**
 * @swagger
 * /api/admin/me:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get current admin
 *     description: Returns the currently logged-in admin info
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current admin info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, (req, res) => res.json({ email: req.admin.email }));

/**
 * @swagger
 * /api/admin/change-password:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Change admin password
 *     description: Update the admin password
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Old password wrong
 *       401:
 *         description: Not authorized
 */
router.put('/change-password', protect, adminController.changePassword);

module.exports = router;

