const db = require('../connection');

const getFeaturedItems = () => {
  return db.query('SELECT * FROM items JOIN users ON items.seller_id = users.id WHERE featured = true;')
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { getFeaturedItems };
