const db = require('../connection');

const getAllItems = () => {
  return db.query(`SELECT * FROM items;`)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { getAllItems };
