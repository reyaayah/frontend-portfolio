const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

exports.protect = async (req, res, next) => {
    let token;
    const header = req.headers.authorization;
    if (header && header.startsWith('Bearer ')) token = header.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findByEmail(decoded.email);
        if (!admin) throw new Error();
        req.admin = admin;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalid' });
    }
};

exports.currentAdmin = (req, res) => {
    res.json({ email: req.admin.email, role: req.admin.role });
};
