const skillModel = require('../models/skillModel');

exports.getAll = async (req, res) => {
    const rows = await skillModel.all();
    res.json(rows);
};

exports.create = async (req, res) => {
    await skillModel.create(req.body);
    res.status(201).json({ message: 'Created' });
};

exports.update = async (req, res) => {
    await skillModel.update(req.params.id, req.body);
    res.json({ message: 'Updated' });
};

exports.delete = async (req, res) => {
    await skillModel.remove(req.params.id);
    res.json({ message: 'Deleted' });
};
