const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { project } = require('../middleware/validators');
const { protect } = require('../middleware/auth');
const { uploadProject } = require('../middleware/upload');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     description: Retrieve all projects in order
 *     responses:
 *       200:
 *         description: List of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/', projectController.getAll);

/**
 * @swagger
 * /api/projects/featured:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get featured projects
 *     description: Retrieve only featured projects
 *     responses:
 *       200:
 *         description: List of featured projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/featured', projectController.getFeatured);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get single project
 *     description: Retrieve a single project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Not found
 */
router.get('/:id', projectController.getOne);

router.use(protect);
/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create project
 *     description: Create a new project (admin only)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *                 style: form      # <--- important
 *                 explode: true    # <--- important
 *               githubUrl:
 *                 type: string
 *               liveUrl:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               featured:
 *                 type: boolean
 *               order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Project created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 */
router.post('/', uploadProject.single('image'), project, projectController.create);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update project
 *     description: Update an existing project (admin only)
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *               githubUrl:
 *                 type: string
 *               liveUrl:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               featured:
 *                 type: boolean
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Project updated
 *       401:
 *         description: Not authorized
 */
router.put('/:id', uploadProject.single('image'), project, projectController.update);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete project
 *     description: Delete a project (admin only)
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
 *         description: Project deleted
 *       401:
 *         description: Not authorized
 */
router.delete('/:id', projectController.delete);

module.exports = router;

