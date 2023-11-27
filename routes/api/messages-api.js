const express = require('express');
const router  = express.Router();
const messages = require('../../db/queries/add_message');

router.post('/', (req, res) => {
  const senderId = req.cookies.user_id;
  const { receiverId, itemId, content } = req.body;

  console.log(req.body);

  messages.addMessage(senderId, receiverId, itemId, content)
    .then(newMessage => {
      res.json({ newMessage })
    })
    .catch(err => {
      res.status(500).send('An error occurred when entering your message information', err)
      console.log('Server Error', err)
    })
})

module.exports = router
