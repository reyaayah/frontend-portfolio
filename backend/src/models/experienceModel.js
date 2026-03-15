const { query } = require('../utils/sql');

function all() {
    return query('SELECT * FROM experiences ORDER BY `order` ASC');
}

function find(id) {
    return query('SELECT * FROM experiences WHERE id = ?', [id]);
}

function create(data) {
    const { company, role, duration, description, technologies, order } = data;
    return query(
        `INSERT INTO experiences
      (company, role, duration, description, technologies, \`order\`)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [company, role, duration, description, JSON.stringify(technologies), order]
    );
}

function update(id, data) {
    const { company, role, duration, description, technologies, order } = data;
    return query(
        `UPDATE experiences SET
      company=?, role=?, duration=?, description=?, technologies=?, \`order\`=?
     WHERE id=?`,
        [company, role, duration, description, JSON.stringify(technologies), order, id]
    );
}

function remove(id) {
    return query('DELETE FROM experiences WHERE id = ?', [id]);
}

module.exports = { all, find, create, update, remove };
