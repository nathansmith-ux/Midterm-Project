const db = require('../connection');

const deleteFromFavourites = (itemId) => {
  const queryString = `DELETE FROM favourites WHERE id = $1;`;

  return db.query(queryString, [itemId])
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { deleteFromFavourites };
