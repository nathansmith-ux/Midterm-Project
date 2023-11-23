const express = require('express');
const router  = express.Router();
const listings = require('../db/queries/get_listings')

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  listings.getAllListings(userId)
  .then((allListings) => {
    const templateVars = {
      listings: allListings
    }

    console.log(templateVars);
    res.render('listings', templateVars);
  })
  .catch(err => {
    res.status(500)
    console.log('Server Error', err)
  })
});

module.exports = router;
