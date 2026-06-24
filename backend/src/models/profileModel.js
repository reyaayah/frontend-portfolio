const { query } = require('../utils/sql');

async function get() {
    const rows = await query('SELECT * FROM profile LIMIT 1');
    return rows[0] || null;
}

async function upsert(data) {
    const {
        name, title, tagline, bio,
        github_url, linkedin_url, email,
        available_for_work, avatar_url
    } = data;

    const existing = await get();

    if (existing) {
        return query(
            `UPDATE profile SET
                name=?, title=?, tagline=?, bio=?,
                github_url=?, linkedin_url=?, email=?,
                available_for_work=?, avatar_url=?
             WHERE id=?`,
            [name, title, tagline, bio,
             github_url, linkedin_url, email,
             available_for_work, avatar_url,
             existing.id]
        );
    } else {
        return query(
            `INSERT INTO profile
                (name, title, tagline, bio, github_url, linkedin_url, email, available_for_work, avatar_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, title, tagline, bio,
             github_url, linkedin_url, email,
             available_for_work, avatar_url]
        );
    }
}

module.exports = { get, upsert };
