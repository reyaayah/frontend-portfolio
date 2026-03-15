const resumeModel = require('../models/resumeModel');

exports.upload = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'File required' });
    await resumeModel.upload(req.file.path, req.file.originalname);
    res.json({ message: 'Uploaded' });
};

exports.download = async (req, res) => {
    const record = await resumeModel.getLatest();
    if (!record) return res.status(404).json({ message: 'No resume' });
    res.redirect(record.path);
};
