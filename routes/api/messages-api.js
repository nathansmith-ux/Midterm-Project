const express = require('express');
const router  = express.Router();
const messages = require('../../db/queries/add_message');
const user = require('../../db/queries/get_user_id');

router.post('/', (req, res) => {
  const senderId = req.cookies.user_id;
  const { receiverId, itemId, content } = req.body;

  // console.log(req.body);

  messages.addMessage(senderId, receiverId, itemId, content)
    .then(newMessage => {
      res.json({ newMessage })
    })
    .catch(err => {
      res.status(500).send('An error occurred when entering your message information', err)
      console.log('Server Error', err)
    })
})

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  user.getUserId(userId)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      res.status(500).send('An error occurred when trying to get the user id', err)
      console.log('Server Error', err)
    })
})

module.exports = router
