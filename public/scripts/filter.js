$(document).ready(function() {

  $("#price-form").on('submit', function(event) {
    event.preventDefault();

    const $minPrice = $('#minPrice').val();
    const $maxPrice = $('#maxPrice').val();

    $.ajax({
      type: "GET",
      url: `/api/items?minPrice=${$minPrice}&maxPrice=${$maxPrice}`
    })
      .done(function(response) {
        console.log(response);
        $('.listed-items-container').empty();

        response.items.forEach(item => {
          const itemHtml = `
              <div class="col-md-3 shoe-product">
                  <img src="${item.profile_url}" alt="${item.name}" class="profile-pic">
                  <span><strong>${item.name}</strong></span>
                  <img src="${item.thumbnail_photo_url}" class="shoe-img" alt="${item.title}">
                  <div class="image-actions">
                      <i class="fas fa-heart" data-item-id="${item.item_id}"></i>
                      <a href="/messages/convo-test">
                        <i class="fas fa-envelope" data-item-id="${item.item_id}" data-seller-id="${item.seller_id}"></i>
                      </a>
                      <i class="fas fa-envelope" data-item-id="${item.item_id}"></i>
                      <i class="fas fa-cog" data-item-id="${item.id}"></i>
                  </div>
                  <p><strong>${item.title}</strong> <em>${item.description} - $</em><strong>${item.price}</strong></p>
              </div>
          `;

          if (response.items.indexOf(item) % 4 === 0) {
            $('.listed-items-container').append('<div class="row gy-10 gx-10">');
          }

          $('.listed-items-container').append(itemHtml);

          if ((response.items.indexOf(item) % 4 === 3) || (response.items.indexOf(item) === response.items.length - 1)) {
            $('.listed-items-container').append('</div>');
          }
        });
      })
      .fail(function(error) {
        console.error('Error fetching data:', error);
      });
  });
});
