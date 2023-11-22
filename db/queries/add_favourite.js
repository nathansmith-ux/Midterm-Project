const db = require('../connection');

const addFavourite = (userId, itemId) => {
  const queryString = `INSERT INTO favourites (user_id, item_id) VALUES ($1, $2) RETURNING *;`;

  return db.query(queryString, [userId, itemId])
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { addFavourite };
