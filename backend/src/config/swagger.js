const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Riya Awal Portfolio Backend API',
            version: '1.0.0',
            description: 'Complete REST API for portfolio management with admin authentication and dynamic content',
            contact: {
                name: 'Riya Awal',
                url: 'https://riyaawal.netlify.app'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server'
            },
            {
                url: 'https://api.riyaawal.com',
                description: 'Production Server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Admin: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        email: { type: 'string' },
                        role: { type: 'string' }
                    }
                },
                Project: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        techStack: { type: 'array', items: { type: 'string' } },
                        githubUrl: { type: 'string' },
                        liveUrl: { type: 'string' },
                        image: { type: 'string' },
                        featured: { type: 'boolean' },
                        order: { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Experience: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        company: { type: 'string' },
                        role: { type: 'string' },
                        duration: { type: 'string' },
                        description: { type: 'string' },

                        tech: {
                            type: 'array',
                            items: { type: 'string' }
                        },

                        order: { type: 'integer' },

                        location: { type: 'string' },
                        current: { type: 'boolean' },

                        achievement: { type: 'string' },

                        stats: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    value: { type: 'string' },
                                    label: { type: 'string' }
                                }
                            }
                        },

                        highlight: { type: 'string' }
                    }
                },
                Skill: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        category: { type: 'string', enum: ['frontend', 'backend', 'tools', 'other'] },
                        level: { type: 'integer', minimum: 1, maximum: 100 },
                        order: { type: 'integer' }
                    }
                },
                Contact: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        subject: { type: 'string' },
                        message: { type: 'string' },
                        isRead: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Resume: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        path: { type: 'string' },
                        filename: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                }
            }
        }
    },
    apis: [
        './src/routes/adminRoutes.js',
        './src/routes/projectRoutes.js',
        './src/routes/experienceRoutes.js',
        './src/routes/skillRoutes.js',
        './src/routes/contactRoutes.js',
        './src/routes/resumeRoutes.js',
        './src/routes/dashboardRoutes.js'
    ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;
