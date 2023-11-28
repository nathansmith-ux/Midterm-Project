const db = require('../connection');

const addListing = (item, userId) => {
  const queryString = `INSERT
  INTO items (seller_id, title, price, description, date_posted, thumbnail_photo_url)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const addDate = new Date().toISOString().slice(0, 10);

  const queryParams = [userId, item.title, item.price, item.description, addDate, item.thumbnail_photo_url];

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { addListing };

