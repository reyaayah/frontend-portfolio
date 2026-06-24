const profileModel = require('../models/profileModel');
const cloudinary = require('cloudinary').v2;

exports.get = async (req, res) => {
    const profile = await profileModel.get();
    res.json(profile || {});
};

exports.upsert = async (req, res) => {
    const data = { ...req.body };

    // If a new avatar was uploaded via Cloudinary
    if (req.file) {
        data.avatar_url = req.file.path;
    }

    // Coerce boolean
    if (data.available_for_work !== undefined) {
        data.available_for_work =
            data.available_for_work === 'true' || data.available_for_work === true ? 1 : 0;
    }

    await profileModel.upsert(data);
    const updated = await profileModel.get();
    res.json({ message: 'Profile updated', profile: updated });
};
