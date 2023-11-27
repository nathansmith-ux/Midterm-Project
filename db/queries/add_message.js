const db = require('../connection');

const addMessage = (senderId, sellerId, content) => {
  const sendDate = new Date();
  const queryString = `INSERT INTO messages (seller_id, seller_id, content, send_date, read) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const queryParams = [senderId, sellerId, content];

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err))
}

module.exports = { addMessage };
