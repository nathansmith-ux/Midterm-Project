const db = require('../connection');

const getAllItems = () => {
  return db.query(`SELECT * FROM items JOIN users ON items.seller_id = users.id WHERE featured = false;`)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { getAllItems };
