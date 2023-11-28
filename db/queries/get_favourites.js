const db = require('../connection');

const getAllFavourites = (userId) => {
  const queryString = `SELECT
  items.*,
  sellers.name AS seller_name,
  sellers.profile_url AS seller_profile_url,
  fav_users.profile_url AS favorite_user_profile_url,
  fav_users.name AS favorite_user_name
  FROM items
  JOIN favourites ON items.id = favourites.item_id
  JOIN users AS fav_users ON favourites.user_id = fav_users.id
  JOIN users AS sellers ON items.seller_id = sellers.id
  WHERE favourites.user_id = $1;`;
  const queryParams = [userId];

  return db.query(queryString, queryParams)
    .then(allFavourites => allFavourites.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { getAllFavourites };


// SELECT * FROM items JOIN favourites ON items.id = item_id WHERE favourites.user_id = $1;
