$(document).ready(function() {
  // Existing icon click functionality
  $('.image-actions i').on('click', function() {
    var icon = $(this);
    icon.addClass('jello-horizontal');

    // Optional: Remove the class after the animation completes
    setTimeout(function() {
      icon.removeClass('jello-horizontal');
    }, 900); // = 0.9 seconds
  });
});
