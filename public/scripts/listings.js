$(document).ready(function() {
  const updateSold = (itemId) => {
    $.ajax({
      type: "PATCH",
      url: `/api/items/update-item/${itemId}`,
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
      const itemId = $(this).data('item-id'); // Could there be a cross over with the item id and user id for vintage sneakers?
      updateSold(itemId);
      $(`[data-item-id="${itemId}"]`).closest('.shoe-product').find('.sold-overlay').show();
    // Disable further clicks
    $(this).css("pointer-events", "none");
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

  const soldButtons = document.querySelectorAll('.fa-dollar-sign');

  soldButtons.forEach(button => {
    button.addEventListener('click', function() {
      const container = this.closest('.image-container');
      const soldText = container.querySelector('.soldText');
      soldText.style.display = soldText.style.display === 'none' ? 'block' : 'none';
    });
  });

});



