const db = require('../connection');

const getUserId = (userId) => {
  const queryString = 'SELECT * FROM users WHERE id = $1'
  const queryParams = [userId]

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err))
}

module.exports = { getUserId }
