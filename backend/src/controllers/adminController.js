const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await adminModel.findByEmail(email);
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    res.json({ token });
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const admin = req.admin;
    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) return res.status(400).json({ message: 'Old password wrong' });
    const hash = await bcrypt.hash(newPassword, 10);
    await adminModel.changePassword(admin.id, hash);
    res.json({ message: 'Password updated' });
};
