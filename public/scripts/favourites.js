$(document).ready(function() {
  const addFavourites = (itemId) => {

    console.log(itemId);

    $.ajax({
      type: "POST",
      url: '/api/favourites',
      data: {itemId: itemId},
      dataType: 'json'
    })
      .done(function(response) {
        console.log(response);
      });
  };

  $(document).on("click", '.fas.fa-heart', function() {
    const itemId = $(this).data('item-id');
    addFavourites(itemId);
  });
});
