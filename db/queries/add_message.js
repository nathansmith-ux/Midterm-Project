const db = require('../connection');

const addMessage = (senderId, receiverId, itemId, content) => {
  const sentDate = new Date().toISOString().slice(0, 10);
  const queryString = `INSERT INTO messages (sender_id, receiver_id, item_id, sent_date, content) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  const queryParams = [senderId, receiverId, itemId, sentDate, content];

  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows);
      return data.rows
      })
    .catch(err => console.log('SQL error', err))
}

module.exports = { addMessage };
