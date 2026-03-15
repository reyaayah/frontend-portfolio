const { query } = require('../utils/sql');

function all() {
    return query('SELECT * FROM skills ORDER BY `order` ASC');
}

function find(id) {
    return query('SELECT * FROM skills WHERE id = ?', [id]);
}

function create({ name, category, level, order }) {
    return query(
        'INSERT INTO skills (name, category, level, `order`) VALUES (?, ?, ?, ?)',
        [name, category, level, order]
    );
}

function update(id, { name, category, level, order }) {
    return query(
        'UPDATE skills SET name=?, category=?, level=?, `order`=? WHERE id=?',
        [name, category, level, order, id]
    );
}

function remove(id) {
    return query('DELETE FROM skills WHERE id = ?', [id]);
}

module.exports = { all, find, create, update, remove };
