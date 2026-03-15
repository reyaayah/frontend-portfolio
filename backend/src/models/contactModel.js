const { query } = require('../utils/sql');

function create({ name, email, subject, message }) {
    return query(
        'INSERT INTO contacts (name,email,subject,message) VALUES (?,?,?,?)',
        [name, email, subject, message]
    );
}

function all() {
    return query('SELECT * FROM contacts ORDER BY createdAt DESC');
}

function markRead(id, isRead) {
    return query('UPDATE contacts SET isRead=? WHERE id=?', [isRead, id]);
}

function remove(id) {
    return query('DELETE FROM contacts WHERE id=?', [id]);
}

module.exports = { create, all, markRead, remove };
