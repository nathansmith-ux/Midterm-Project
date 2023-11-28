const db = require('../connection');

const deleteItem = (itemId) => {
  const queryString = `DELETE FROM items WHERE id = $1`;

  return db.query(queryString, [itemId])
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { deleteItem };
