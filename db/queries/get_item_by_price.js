const db = require('../connection');

const filterByPrice = (minPrice, maxPrice) => {
  let queryString = `SELECT * FROM items JOIN users ON items.seller_id = users.id`;
  const queryParams = [];

  if (minPrice !== null && maxPrice !== null) {
    queryString += ` WHERE price >= $1 AND price <= $2;`;
    queryParams.push(minPrice, maxPrice);

  } else if (minPrice !== null) {
    queryString += ` WHERE price >= $1;`;
    queryParams.push(minPrice);

  } else if (maxPrice !== null) {
    queryString += ` WHERE price <= $1;`;
    queryParams.push(maxPrice);

  } else {
    queryString += `;`;
  }

  return db.query(queryString, queryParams)
    .then(data => data.rows)
    .catch(err => console.log('SQL error', err));
};

module.exports = { filterByPrice };
