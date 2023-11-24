$(document).ready(function() {
  const addFavourites = (itemId) => {
    $.ajax({
    type: "POST",
    url: '/api/favourites',
    data: {itemId: itemId},
    dataType: 'json'
    })
    .done(function(response){
      console.log(response)
    })
  }

  $('.fas.fa-heart').one("click", function() {
    const itemId = $(this).data('item-id')
    addFavourites(itemId);
  })
})
