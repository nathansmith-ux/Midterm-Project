const db = require('../connection');

const getAllSellers = () => {
  const queryString = `SELECT * FROM users WHERE seller = true;`

  return db.query(queryString)
  .then(data => data.rows)
  .catch(err => console.log('SQL error', err));
}

module.exports = { getAllSellers }
