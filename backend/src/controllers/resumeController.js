const resumeModel = require('../models/resumeModel');

exports.upload = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'File required' });
    await resumeModel.upload(req.file.path, req.file.originalname);
    res.json({ message: 'Uploaded' });
};

const path = require('path');

exports.download = async (req, res) => {
    try {
        const record = await resumeModel.getLatest();

        if (!record) {
            return res.status(404).json({ message: 'No resume' });
        }

        const filePath = path.resolve(record.path);

        res.download(filePath, record.original_name); // forces download
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
