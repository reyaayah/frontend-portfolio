const experienceModel = require('../models/experienceModel');

exports.getAll = async (req, res) => {
    const rows = await experienceModel.all();
    res.json(rows);
};

exports.create = async (req, res) => {
    await experienceModel.create(req.body);
    res.status(201).json({ message: 'Created' });
};

exports.update = async (req, res) => {
    await experienceModel.update(req.params.id, req.body);
    res.json({ message: 'Updated' });
};

exports.delete = async (req, res) => {
    await experienceModel.remove(req.params.id);
    res.json({ message: 'Deleted' });
};
