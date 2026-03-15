const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { uploadResume } = require('../middleware/upload');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/resume/download:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Download latest resume
 *     description: Download the latest uploaded resume PDF
 *     responses:
 *       200:
 *         description: Resume PDF file
 *         content:
 *           application/pdf: {}
 *       404:
 *         description: No resume found
 */
router.get('/download', resumeController.download);

router.use(protect);

/**
 * @swagger
 * /api/resume/upload:
 *   post:
 *     tags:
 *       - Resume
 *     summary: Upload resume
 *     description: Upload a new resume PDF file (admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Resume uploaded
 *       400:
 *         description: File required or invalid
 *       401:
 *         description: Not authorized
 */
router.post('/upload', uploadResume.single('resume'), resumeController.upload);

module.exports = router;

