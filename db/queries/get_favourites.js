const db = require('../connection');

const getAllFavourites = (userId) => {
  const queryString = `SELECT * FROM items JOIN favourites ON items.id = item_id JOIN users ON items.seller_id = users.id WHERE favourites.user_id = $1;`
  const queryParams = [userId]

  return db.query(queryString, queryParams)
  .then(allFavourites => allFavourites.rows)
  .catch(err => console.log('SQL error', err))
}

module.exports = { getAllFavourites };
