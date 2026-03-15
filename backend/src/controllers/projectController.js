const projectModel = require('../models/projectModel');

exports.getAll = async (req, res) => {
    const rows = await projectModel.all();
    res.json(rows);
};

exports.getFeatured = async (req, res) => {
    const rows = await projectModel.featured();
    res.json(rows);
};

exports.getOne = async (req, res) => {
    const row = await projectModel.find(req.params.id);
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
};

exports.create = async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const techStackRaw = req.body.techStack;

        let techStackArr = [];

        if (Array.isArray(techStackRaw)) {
            techStackArr = techStackRaw;
        } else if (typeof techStackRaw === 'string') {
            techStackArr = [techStackRaw];
        }

        const data = {
            title: req.body.title,
            description: req.body.description,
            techStack: techStackArr.map(t => t.trim()),
            githubUrl: req.body.githubUrl || null,
            liveUrl: req.body.liveUrl || null,
            featured: req.body.featured === 'true',
            order: Number(req.body.order) || 0,
            image: req.file ? req.file.path : null,
        };

        await projectModel.create(data);

        res.status(201).json({ message: 'Created' });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Failed to create project',
            error: err.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const techStackRaw = req.body.techStack;

        let techStackArr = [];

        if (Array.isArray(techStackRaw)) {
            techStackArr = techStackRaw;
        } else if (typeof techStackRaw === 'string') {
            techStackArr = [techStackRaw];
        }
        if (req.body.featured !== undefined) {
            req.body.featured = req.body.featured === 'true';
        }
        const data = {
            title: req.body.title,
            description: req.body.description,
            techStack: techStackArr.map(t => t.trim()),
            githubUrl: req.body.githubUrl || null,
            liveUrl: req.body.liveUrl || null,
            featured: req.body.featured,
            order: Number(req.body.order) || 0,
            image: req.file ? req.file.path : null,
        };

        await projectModel.update(req.params.id, data);

        res.json({ message: 'Updated' });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Failed to update project',
            error: err.message
        });
    }
};

exports.delete = async (req, res) => {
    await projectModel.remove(req.params.id);
    res.json({ message: 'Deleted' });
};
