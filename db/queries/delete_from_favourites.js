const db = require('../connection');

const deleteFromFavourites = (userId, itemId) => {
  const queryString = `DELETE FROM favourites WHERE user_id = $1 AND WHERE item_id = $2;`;

  return db.query(queryString, [userId, itemId])
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { deleteFromFavourites };
