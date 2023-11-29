const express = require('express');
const router  = express.Router();
const favourite = require('../../db/queries/add_favourite');
const removeFavourite = require('../../db/queries/delete_from_favourites');

router.post('/', (req, res) => {
  const userId = req.cookies.user_id;
  const itemId = req.body.itemId;

  console.log(itemId);

  favourite.addFavourite(userId, itemId)
    .then(itemFavourited => {
      res.status(201).json({ message: 'This product has been added to your favourites', item: itemFavourited });
    })
    .catch(err => {
      res.status(500).json({ error: "We weren't able to add the item to your favourites", details: err });
      console.log('Server error', err);
    });

});

// RemoveFavourite item from favourites
router.delete('/delete-favourite/:id', (req, res) => {
  const userId = req.cookies.user_id;
  const itemId = req.body.itemId;

  removeFavourite.deleteFromFavourites(userId, itemId)
    .then(() => {
      res.json({ message: `Item with ID ${itemId} has been successfully removeFavourited from favourites.` });
    })
    .catch(err => {
      res.status(500).send('An error occurred when removing the item from favourites', err);
      console.log('Server Error', err);
    });

});

module.exports = router;
