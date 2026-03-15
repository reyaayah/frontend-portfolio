const projectModel = require('../models/projectModel');
const contactModel = require('../models/contactModel');
const skillModel = require('../models/skillModel');

exports.stats = async (req, res) => {
    const [projects, contacts, skills] = await Promise.all([
        projectModel.all(),
        contactModel.all(),
        skillModel.all()
    ]);
    const unread = contacts.filter(c => !c.isRead).length;
    res.json({
        totalProjects: projects.length,
        totalMessages: contacts.length,
        unreadMessages: unread,
        totalSkills: skills.length
    });
};
