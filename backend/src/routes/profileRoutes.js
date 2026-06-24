const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const avatarStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/avatar',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }],
    },
});

const uploadAvatar = multer({
    storage: avatarStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get public profile
 *     description: Returns the portfolio owner's public profile data
 *     responses:
 *       200:
 *         description: Profile object
 */
router.get('/', profileController.get);

router.use(protect);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update profile (admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               tagline:
 *                 type: string
 *               bio:
 *                 type: string
 *               github_url:
 *                 type: string
 *               linkedin_url:
 *                 type: string
 *               email:
 *                 type: string
 *               available_for_work:
 *                 type: boolean
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Not authorized
 */
router.put('/', uploadAvatar.single('avatar'), profileController.upsert);

module.exports = router;
