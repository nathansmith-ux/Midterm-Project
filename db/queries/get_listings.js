const db = require('../connection');

const getAllListings = (userId) => {
  const queryString = `SELECT * FROM items JOIN users ON items.seller_id = users.id WHERE users.seller = TRUE AND users.id = $1;;`
  const queryParams = [userId];

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { getAllListings };
