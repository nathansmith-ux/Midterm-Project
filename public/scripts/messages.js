$(document).ready(function() {
  const socket = io();

  $("#send-button").on('click', function(event) {
    event.preventDefault();

    const $messageInput = $('#message-input').val()
    const $sellerId = $('#seller-id').val()
    console.log($messageInput, $sellerId);

  })

})
