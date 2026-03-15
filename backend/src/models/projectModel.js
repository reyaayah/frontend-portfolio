const { query } = require('../utils/sql');

function all() {
    return query('SELECT * FROM projects ORDER BY `order` ASC');
}

function featured() {
    return query('SELECT * FROM projects WHERE featured = 1 ORDER BY `order` ASC');
}

function find(id) {
    return query('SELECT * FROM projects WHERE id = ?', [id]);
}

function create(data) {
    const { title, description, techStack, githubUrl, liveUrl, image, featured, order } = data;
    return query(
        `INSERT INTO projects
     (title, description, techStack, githubUrl, liveUrl, image, featured, \`order\`)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, JSON.stringify(techStack), githubUrl, liveUrl, image, featured, order]
    );
}

function update(id, data) {
    const { title, description, techStack, githubUrl, liveUrl, image, featured, order } = data;
    return query(
        `UPDATE projects SET
      title=?, description=?, techStack=?, githubUrl=?, liveUrl=?, image=?, featured=?, \`order\`=?
     WHERE id=?`,
        [title, description, JSON.stringify(techStack), githubUrl, liveUrl, image, featured, order, id]
    );
}

function remove(id) {
    return query('DELETE FROM projects WHERE id = ?', [id]);
}

module.exports = { all, featured, find, create, update, remove };
