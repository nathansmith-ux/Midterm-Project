const db = require('../connection');

const addListing = (item) => {
  const queryString = `INSERT INTO items (seller_id, title, price, description, date_posted, thumbnail_photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

  const queryParams = [item.seller_id, item.title, item.price, item.description, item.date_posted, item.thumbnail_photo_url]

return db.query(queryString, queryParams)
  .then(data => data.rows)
  .catch(err => console.log('SQL error', err))
};

module.exports = { addListing };
