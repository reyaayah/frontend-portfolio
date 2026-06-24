const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    })
);

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.use(errorHandler);

module.exports = app;

