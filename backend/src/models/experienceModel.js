const { query } = require('../utils/sql');

function parseJsonOrSplit(str) {
    if (!str || typeof str !== 'string') return [];
    try {
        return JSON.parse(str);
    } catch {
        return str.split(',').map(s => s.trim());
    }
}

function mapExperience(exp) {
    return {
        ...exp,
        tech: parseJsonOrSplit(exp.technologies),
        stats: parseJsonOrSplit(exp.stats),
        current: !!exp.current
    };
}
async function all() {
    const results = await query("SELECT * FROM experiences ORDER BY `order` ASC");
    return results.map(mapExperience);
}

async function find(id) {
    const results = await query('SELECT * FROM experiences WHERE id = ?', [id]);
    return results.map(mapExperience)[0];
}

function create(data) {
    const { company, role, duration, description, technologies, order, location, current, achievement, stats, highlight } = data;
    return query(
        `INSERT INTO experiences
      (company, role, duration, description, technologies, \`order\`,location,current,achievement,stats,highlight)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [company, role, duration, description, JSON.stringify(technologies), order, location, current, achievement, JSON.stringify(stats), highlight]
    );
}

function update(id, data) {
    const { company, role, duration, description, technologies, order, location, current, achievement, stats, highlight } = data;
    return query(
        `UPDATE experiences SET
      company=?, role=?, duration=?, description=?, technologies=?, \`order\`=?, location=?, current=?, achievement=?, stats=?, highlight=?
     WHERE id=?`,
        [company, role, duration, description, JSON.stringify(technologies), order, location, current, achievement, JSON.stringify(stats), highlight, id]
    );
}

function remove(id) {
    return query('DELETE FROM experiences WHERE id = ?', [id]);
}

module.exports = { all, find, create, update, remove };
