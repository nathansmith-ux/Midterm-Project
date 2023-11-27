const db = require('../connection');

const addMessage = (message) => {
  const sendDate = new Date();
  const queryString = `INSERT INTO messages (sender_id, receiver_id, item_id, send_date, content) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const queryParams = [message.senderId, message.sellerId, message.item_id, sendDate, message.content];

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err))
}

module.exports = { addMessage };
