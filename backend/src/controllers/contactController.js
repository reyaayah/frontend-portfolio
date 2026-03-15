const contactModel = require('../models/contactModel');

exports.create = async (req, res) => {
    await contactModel.create(req.body);
    res.status(201).json({ message: 'Sent' });
};

exports.getAll = async (req, res) => {
    const rows = await contactModel.all();
    res.json(rows);
};

exports.mark = async (req, res) => {
    const { isRead } = req.body;
    await contactModel.markRead(req.params.id, isRead);
    res.json({ message: 'Updated' });
};

exports.delete = async (req, res) => {
    await contactModel.remove(req.params.id);
    res.json({ message: 'Deleted' });
};
