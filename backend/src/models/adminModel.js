const { query } = require('../utils/sql');

async function findByEmail(email) {
    const rows = await query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
}

async function createAdmin(email, hash) {
    return query(
        'INSERT INTO admins (email, password, role) VALUES (?, ?, ?)',
        [email, hash, 'admin']
    );
}

async function changePassword(id, hash) {
    return query('UPDATE admins SET password = ? WHERE id = ?', [hash, id]);
}

module.exports = { findByEmail, createAdmin, changePassword };
