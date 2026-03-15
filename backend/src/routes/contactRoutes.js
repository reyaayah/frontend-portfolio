const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contact } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Submit contact form
 *     description: Submit a new contact message from public visitors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 *       400:
 *         description: Validation error
 */
router.post('/', contact, contactController.create);

router.use(protect);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get all contact messages
 *     description: Retrieve all contact messages (admin only)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Not authorized
 */
router.get('/', contactController.getAll);

/**
 * @swagger
 * /api/contacts/{id}/read:
 *   patch:
 *     tags:
 *       - Contacts
 *     summary: Mark message as read/unread
 *     description: Update the read status of a contact message (admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isRead:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Message status updated
 *       401:
 *         description: Not authorized
 */
router.patch('/:id/read', contactController.mark);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Delete contact message
 *     description: Delete a contact message (admin only)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message deleted
 *       401:
 *         description: Not authorized
 */
router.delete('/:id', contactController.delete);

module.exports = router;

