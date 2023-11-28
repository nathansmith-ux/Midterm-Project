const express = require('express');
const router  = express.Router();
const favourites = require('../db/queries/get_favourites');

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  favourites.getAllFavourites(userId)
    .then(allFavourites => {
      const templateVars = {
        favourites: allFavourites
      };
      console.log(templateVars);

      res.render('favourites', templateVars);
    })
    .catch(err => {
      res.status(500);
      console.log('Server error', err);
    });
});

module.exports = router;
