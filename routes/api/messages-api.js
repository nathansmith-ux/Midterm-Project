const express = require('express');
const router = express.Router();
const addMessage = require('../../db/queries/add_message'); // Fix the closing parenthesis

// API endpoint to add a message
router.post('/', (req, res) => {
  const { senderId, sellerId, content } = req.body;

  addMessage(senderId, sellerId, content)
    .then(result => {
      const templateVars = {
        messageResult: result
      };

      console.log(templateVars);
      res.json({ success: true, message: 'Message added successfully', data: result });
    })
    .catch(error => {
      console.error('Error adding message:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

module.exports = router;
