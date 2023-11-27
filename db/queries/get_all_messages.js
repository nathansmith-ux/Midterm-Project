const db = require('../connection');

const getAllMessages = (userId) => {
  const queryString = `SELECT * FROM messages WHERE sender_id = $1`
  const queryParams = [userId]

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err))
}

module.exports = { getAllMessages };
