const db = require('../connection');

const updateSeller = (userId) => {
  const queryString = 'UPDATE users SET seller = TRUE WHERE id = $1;'
  const queryParams = [userId]

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { updateSeller };
