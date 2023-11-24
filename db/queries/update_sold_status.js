const db = require('../connection');

const updateSoldStatus = (itemId) => {
    const queryString = `UPDATE items SET sold = TRUE WHERE id = $1 RETURNING *;`;

  return db.query(queryString, [itemId])
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err))
};

module.exports = { updateSoldStatus };
