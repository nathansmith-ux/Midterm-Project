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

    console.log(message)

    const data = JSON.stringify(message);

    $.ajax({
      type: "POST",
      url: '/api/messages',
      data: data
    })
    .done(function(response) {
      console.log(response)
    })

  })

  const socket = io();
})
