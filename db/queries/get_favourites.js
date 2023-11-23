const db = require('../connection');

const getAllFavourites = (userId) => {
  const queryString = `SELECT * FROM items JOIN favourites ON items.id = item_id WHERE favourites.user_id = $1;`
  const queryParams = [userId]

  return db.query(queryString, queryParams)
  .then(allFavourites => allFavourites.rows)
  .catch(err => console.log('SQL error', err))
}

module.exports = { getAllFavourites };
