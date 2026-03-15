const Joi = require('joi');

exports.adminLogin = (req, res, next) => {
    const schema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

exports.project = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        techStack: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required(),
        githubUrl: Joi.string().uri().allow(''),
        liveUrl: Joi.string().uri().allow(''),
        featured: Joi.boolean().truthy('true').falsy('false').default(false),
        order: Joi.number().integer().default(0)
    }).unknown(true);
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

exports.experience = (req, res, next) => {
    const schema = Joi.object({
        company: Joi.string().required(),
        role: Joi.string().required(),
        duration: Joi.string().required(),
        description: Joi.string().required(),
        technologies: Joi.array().items(Joi.string()).required(),
        order: Joi.number().integer().default(0)
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

exports.skill = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().valid('frontend', 'backend', 'tools', 'other').required(),
        level: Joi.number().min(1).max(100).required(),
        order: Joi.number().integer().default(0)
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};

exports.contact = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        subject: Joi.string().allow(''),
        message: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    next();
};
