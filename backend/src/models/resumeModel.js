const { query } = require('../utils/sql');

async function getLatest() {
    const rows = await query('SELECT * FROM resumes ORDER BY createdAt DESC LIMIT 1');
    return rows[0];
}

async function upload(path, filename) {
    return query(
        'INSERT INTO resumes (path, filename) VALUES (?, ?)',
        [path, filename]
    );
}

module.exports = { getLatest, upload };
