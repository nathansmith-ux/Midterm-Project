const express = require('express');
const router  = express.Router();
const messages = require('../db/queries/get_all_messages');

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  messages.getAllMessages(userId)
    .then(allMessages => {
      const templateVars = {
        allMessages
      }

      res.render('messages', templateVars)
    })
    .catch(err => {
      res.status(500).send('There was an error loading your messages', err)
      console.log('Server Error', err)
    })
});

module.exports = router;
