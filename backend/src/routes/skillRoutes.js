const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { skill } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/skills:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Get all skills
 *     description: Retrieve all skills in order
 *     responses:
 *       200:
 *         description: List of all skills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 */
router.get('/', skillController.getAll);

router.use(protect);

/**
 * @swagger
 * /api/skills:
 *   post:
 *     tags:
 *       - Skills
 *     summary: Create skill
 *     description: Add a new skill (admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [frontend, backend, tools, other]
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Skill created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 */
router.post('/', skill, skillController.create);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     tags:
 *       - Skills
 *     summary: Update skill
 *     description: Update an existing skill (admin only)
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
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [frontend, backend, tools, other]
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Skill updated
 *       401:
 *         description: Not authorized
 */
router.put('/:id', skill, skillController.update);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     tags:
 *       - Skills
 *     summary: Delete skill
 *     description: Delete a skill (admin only)
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
 *         description: Skill deleted
 *       401:
 *         description: Not authorized
 */
router.delete('/:id', skillController.delete);

module.exports = router;

