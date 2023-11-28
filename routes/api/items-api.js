const express = require('express');
const router  = express.Router();
const price = require('../../db/queries/get_item_by_price');
const item = require('../../db/queries/add_listing');
const seller = require('../../db/queries/update_seller');
const sold = require('../../db/queries/update_sold_status');
const remove = require('../../db/queries/delete_item');

// Gets items matching a specific filter
router.get('/', (req, res) => {
  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null;

  price.filterByPrice(minPrice, maxPrice)
    .then(items => {
      console.log(items);
      res.json({items});
    })
    .catch(err => {
      res.status(500).send('Unable to filter items', err);
      console.log('Server Error', err);
    });
});

// Adds new item to database
router.post('/add-item', (req, res) => {
  const itemInfo = req.body;
  const userId = req.body.seller_id;

  item.addListing(itemInfo)
    .then(newItem => {
      return seller.updateSeller(userId)
        .then(() => {
          res.json({ newItem });
        });
    })
    .catch(err => {
      res.status(500).send('An error occurred when entering in your item information', err);
      console.log('Server Error', err);
    });
});

// Alters item field to sold in the database
router.patch('/update-item/:id', (req, res) => {
  const itemId = req.params.id;

  sold.updateSoldStatus(itemId)
    .then(soldItem => {
      res.json({ soldItem });
    })
    .catch(err => {
      res.status(500).send('An error occurred when marking this item as sold', err);
      console.log('Server Error', err);
    });
});

// Deletes item from the database
router.delete('/delete-item/:id', (req, res) => {
  const itemId = req.params.id;

  remove.deleteItem(itemId)
    .then(() => {
      res.json({ message: `Item with ID ${itemId} has been successfully deleted.` });
    })
    .catch(err => {
      res.status(500).send('An error occurred when deleting the item', err);
      console.log('Server Error', err);
    });

});

module.exports = router;
