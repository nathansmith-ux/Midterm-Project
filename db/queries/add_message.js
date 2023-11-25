const db = require('../connection');

const addMessage = (senderId, sellerId, content) => {
  const sentDate = new Date(); 
  const queryString = 'INSERT INTO messages (sender_id, seller_id, content, sent_date, read) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const queryParams = [senderId, sellerId, content, sentDate, false]; // Assuming 'read' is initially set to false

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error('Error adding message:', err);
})
}

modle.exports ={ addMessage }