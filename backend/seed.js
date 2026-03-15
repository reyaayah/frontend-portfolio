const bcrypt = require('bcrypt');
const pool = require('./src/config/db');
require('dotenv').config();

async function seedDatabase() {
    const connection = await pool.getConnection();

    try {
        console.log('🌱 Starting database seed...');

        // Hash admin password
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // 1. Insert Admin
        console.log('Adding admin...');
        await connection.execute(
            'INSERT INTO admins (email, password, role) VALUES (?, ?, ?)',
            ['admin@riyaawal.com', hashedPassword, 'admin']
        );

        // 2. Insert Sample Projects
        console.log('Adding sample projects...');
        const projects = [
            {
                title: 'Portfolio Website',
                description: 'A modern portfolio website built with Next.js and TypeScript',
                techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Tailwind CSS']),
                githubUrl: 'https://github.com/riyaawal/portfolio',
                liveUrl: 'https://riyaawal.netlify.app',
                featured: true,
                order: 1
            },
            {
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce application with payment integration',
                techStack: JSON.stringify(['Node.js', 'Express', 'React', 'MongoDB']),
                githubUrl: 'https://github.com/riyaawal/ecommerce',
                liveUrl: 'https://ecommerce-demo.netlify.app',
                featured: true,
                order: 2
            },
            {
                title: 'Task Management App',
                description: 'Collaborative task management tool with real-time updates',
                techStack: JSON.stringify(['Vue.js', 'Firebase', 'Tailwind CSS']),
                githubUrl: 'https://github.com/riyaawal/taskapp',
                liveUrl: 'https://taskapp-demo.netlify.app',
                featured: false,
                order: 3
            }
        ];

        for (const project of projects) {
            await connection.execute(
                'INSERT INTO projects (title, description, techStack, githubUrl, liveUrl, featured, `order`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [project.title, project.description, project.techStack, project.githubUrl, project.liveUrl, project.featured, project.order]
            );
        }

        // 3. Insert Sample Experiences
        console.log('Adding sample experiences...');
        const experiences = [
            {
                company: 'Tech Corp Inc',
                role: 'Senior Developer',
                duration: '2022 - Present',
                description: 'Led development of scalable web applications and mentored junior developers',
                technologies: JSON.stringify(['JavaScript', 'React', 'Node.js', 'Docker']),
                order: 1
            },
            {
                company: 'Digital Solutions Ltd',
                role: 'Full Stack Developer',
                duration: '2020 - 2022',
                description: 'Developed and maintained multiple customer-facing web applications',
                technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS']),
                order: 2
            },
            {
                company: 'StartUp XYZ',
                role: 'Junior Developer',
                duration: '2019 - 2020',
                description: 'Contributed to frontend development and bug fixes',
                technologies: JSON.stringify(['JavaScript', 'React', 'HTML', 'CSS']),
                order: 3
            }
        ];

        for (const exp of experiences) {
            await connection.execute(
                'INSERT INTO experiences (company, role, duration, description, technologies, `order`) VALUES (?, ?, ?, ?, ?, ?)',
                [exp.company, exp.role, exp.duration, exp.description, exp.technologies, exp.order]
            );
        }

        // 4. Insert Sample Skills
        console.log('Adding sample skills...');
        const skills = [
            { name: 'React', category: 'frontend', level: 95, order: 1 },
            { name: 'JavaScript', category: 'frontend', level: 95, order: 2 },
            { name: 'TypeScript', category: 'frontend', level: 85, order: 3 },
            { name: 'Node.js', category: 'backend', level: 90, order: 4 },
            { name: 'Express.js', category: 'backend', level: 85, order: 5 },
            { name: 'MongoDB', category: 'backend', level: 80, order: 6 },
            { name: 'MySQL', category: 'backend', level: 85, order: 7 },
            { name: 'Docker', category: 'tools', level: 75, order: 8 },
            { name: 'Git', category: 'tools', level: 90, order: 9 },
            { name: 'AWS', category: 'tools', level: 75, order: 10 }
        ];

        for (const skill of skills) {
            await connection.execute(
                'INSERT INTO skills (name, category, level, `order`) VALUES (?, ?, ?, ?)',
                [skill.name, skill.category, skill.level, skill.order]
            );
        }

        // 5. Insert Sample Contact Messages
        console.log('Adding sample contact messages...');
        const contacts = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Project Inquiry',
                message: 'I am interested in discussing a new project opportunity',
                isRead: true
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                subject: 'Collaboration',
                message: 'Would love to collaborate on an upcoming project',
                isRead: false
            }
        ];

        for (const msg of contacts) {
            await connection.execute(
                'INSERT INTO contacts (name, email, subject, message, isRead) VALUES (?, ?, ?, ?, ?)',
                [msg.name, msg.email, msg.subject, msg.message, msg.isRead]
            );
        }

        console.log('✅ Database seeded successfully!');
        console.log(`Admin credentials:`);
        console.log(`Email: admin@riyaawal.com`);
        console.log(`Password: ${adminPassword}`);
    } catch (err) {
        console.error('❌ Seeding error:', err);
    } finally {
        connection.release();
        process.exit(0);
    }
}

seedDatabase();
