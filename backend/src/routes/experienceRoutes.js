const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const { experience } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/experiences:
 *   get:
 *     tags:
 *       - Experiences
 *     summary: Get all experiences
 *     description: Retrieve all work experiences in order
 *     responses:
 *       200:
 *         description: List of all experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 */
router.get('/', experienceController.getAll);

router.use(protect);

/**
 * @swagger
 * /api/experiences:
 *   post:
 *     tags:
 *       - Experiences
 *     summary: Create experience
 *     description: Add a new work experience (admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Experience created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 */
router.post('/', experience, experienceController.create);

/**
 * @swagger
 * /api/experiences/{id}:
 *   put:
 *     tags:
 *       - Experiences
 *     summary: Update experience
 *     description: Update an existing work experience (admin only)
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
 *               company:
 *                 type: string
 *               role:
 *                 type: string
 *               duration:
 *                 type: string
 *               description:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Experience updated
 *       401:
 *         description: Not authorized
 */
router.put('/:id', experience, experienceController.update);

/**
 * @swagger
 * /api/experiences/{id}:
 *   delete:
 *     tags:
 *       - Experiences
 *     summary: Delete experience
 *     description: Delete a work experience (admin only)
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
 *         description: Experience deleted
 *       401:
 *         description: Not authorized
 */
router.delete('/:id', experienceController.delete);

module.exports = router;

