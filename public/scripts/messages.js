$(document).ready(function() {
  $("#send-button").on('click', function(event) {
    event.preventDefault();

    const $messageInput = $('#message-input').val();
    const $sellerId = $('#seller-id').val();
    const $itemId = $('#item-id').val();

    const message = {
      receiverId: $sellerId,
      itemId: $itemId,
      content: $messageInput
    };

    $.ajax({
      type: "POST",
      url: '/api/messages',
      data: message
    })
    .done(function(response) {
      console.log(response)
    })

  })

  const socket = io();
})
