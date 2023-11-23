const express = require('express');
const router  = express.Router();
const price = require('../../db/queries/get_item_by_price');
const item = require('../../db/queries/add_listing');

// Gets items matching a specific filter
router.get('/', (req, res) => {
  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null;

  price.filterByPrice(minPrice, maxPrice)
  .then(items => {
    console.log(items);
    res.json({items})
  })
  .catch(err => {
    res.status(500).send('Unable to filter items', err)
    console.log('Server Error', err)
  })
});

// Adds new item to database
router.post('/add-item', (req, res) => {
  const itemInfo = req.body;

  item.addListing(itemInfo)
  .then(newItem => {
    const templateVars = {
      item: newItem
    }

    console.log(templateVars)

    res.render('success', templateVars)
  })
  .catch(err => {
    res.status(500).send('An error occurred when entering in your item information', err)
    console.log('Server Error', err)
  })
});

// Alters item field in the database
router.patch('/update-item/:id', (req, res) => {

});

module.exports = router;
