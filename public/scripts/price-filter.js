$(document).ready(function() {

  $(":submit").on('click', function(event) {
    event.preventDefault();

    const $minPrice = $('#minPrice').val();
    const $maxPrice = $('#maxPrice').val();

    $.ajax({
      type: "GET",
      url: `/api/items?minPrice=${$minPrice}&maxPrice=${$maxPrice}`
    })
    .done(function(response) {
        console.log(response);
        $('listed-items-container').empty();
    })
  })
})