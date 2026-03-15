const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await pool.getConnection(); // verify DB connection
        console.log('MySQL connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('DB connection failed', err);
        process.exit(1);
    }
}

start();
