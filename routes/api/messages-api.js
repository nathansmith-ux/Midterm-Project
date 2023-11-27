const express = require('express');
const router  = express.Router();
const messages = require('../../db/queries/add_message');

router.post('/', (req, res) => {
  const senderId = req.cookies.user_id;

})

module.exports = router
