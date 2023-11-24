const express = require('express');
const router  = express.Router();
const favourite = require('../../db/queries/add_favourite');

router.post('/', (req, res) => {
  const userId = req.cookies.user_id;
  const itemId = req.body.itemId

  favourite.addFavourite(userId, itemId)
  .then(itemFavourited => {
    res.status(201).json({ message: 'This product has been added to your favourites', item: itemFavourited });
  })
  .catch(err => {
    res.status(500).json({ error: "We weren't able to add the item to your favourites", details: err })
    console.log('Server error', err)
  })

})

module.exports = router;
