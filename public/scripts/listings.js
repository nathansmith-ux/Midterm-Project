$(document).ready(function() {
  const updateSold = (itemId) => {
    $.ajax({
      type: "PATCH",
      url: `/api/items/update-item/${itemId}`, // Is this good?
      data: {itemId: itemId},
      dataType: 'json'
    })
      .done(function(response) {
        console.log(response);
        // Show the "Sold" overlay
        $(`[data-item-id="${itemId}"]`).closest('.shoe-product').find('.sold-overlay').show();
      });
  };

  $('.fas.fa-dollar-sign').one("click", function() {
    const itemId = $(this).data('item-id');
    updateSold(itemId);
  });

  const createListing = (title, price, description, thumbnail_photo_url) => {
    $.ajax({
      type: "POST",
      url: 'api/items/add-item',
      data: {
        title: title,
        price: price,
        description: description,
        thumbnail_photo_url: thumbnail_photo_url
      }
    })
      .done(response => {
        console.log(response);
      })
  };

$("#add-listing").on('submit', function(event) {
    event.preventDefault();

    const title = $('#title').val();
    const description = $('#description').val();
    const price = $('#price').val();
    const thumbnail_photo_url = $('#thumbnail_photo_url').val();

    createListing(title, price, description, thumbnail_photo_url)
  });

});
// id SERIAL PRIMARY KEY NOT NULL,
// seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
// title VARCHAR(255) NOT NULL,
// price INTEGER NOT NULL,
// description TEXT NOT NULL,
// date_posted DATE NOT NULL,
// sold BOOLEAN NOT NULL DEFAULT FALSE,
// featured BOOLEAN NOT NULL DEFAULT FALSE,
// thumbnail_photo_url TEXT NOT NULL
