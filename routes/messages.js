const express = require('express');
const router  = express.Router();
const messages = require('../db/queries/get_all_messages');

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  messages.getAllMessages(userId)
    .then(messages => {
      const templateVars = {
        messages,
        userId
      }

      console.log(templateVars)

      res.render('messages', templateVars)
    })
    .catch(err => {
      res.status(500).send('There was an error loading your messages', err)
      console.log('Server Error', err)
    })
});

router.get('/convo-test', (req, res) => {
  const userId = req.cookies.user_id;

  messages.getAllMessages(userId)
    .then(messages => {
      const templateVars = {
        messages,
        userId
      }

      console.log(templateVars)

      res.render('messages-test-convo', templateVars)
    })
    .catch(err => {
      res.status(500).send('There was an error loading your messages', err)
      console.log('Server Error', err)
    })
});

router.get('/homepage-test', (req, res) => {
  const userId = req.cookies.user_id;

  messages.getAllMessages(userId)
    .then(messages => {
      const templateVars = {
        messages,
        userId
      }

      console.log(templateVars)

      res.render('messages-test-home', templateVars)
    })
});

module.exports = router;
