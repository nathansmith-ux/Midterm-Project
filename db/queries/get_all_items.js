const db = require('../connection');

const getAllItems = () => {
  return db.query(`SELECT
  items.*,
  users.profile_url,
  users.name
FROM
  items
JOIN
  users ON items.seller_id = users.id
WHERE
  items.featured = false;
`)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { getAllItems };

// JOIN users ON user.id = users_id;
