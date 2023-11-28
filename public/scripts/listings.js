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
      });
  };

  $('.fas.fa-dollar-sign').one("click", function() {
    const itemId = $(this).data('item-id');
    updateSold(itemId);
  });
});
