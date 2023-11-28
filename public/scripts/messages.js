$(document).ready(function() {

  const socket = io();

  socket.on('connect', () => {

    socket.on("welcome-message", (message) => {
      console.log(message);
    })

    function getUserId() {
      $.ajax({
        type: "GET",
        url: "/api/messages"
      })
      .done(function(response) {
        const userId = response.user[0].id;
        console.log('You are connected with user id', userId, 'and socket id', socket.id)

        socket.emit('login', { userId: userId, socketId: socket.id})
      })
    }

    getUserId();
  })

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

      function sendMessageToUser(recipientUserId, message) {
        socket.emit('send message', { to: recipientUserId, message: message });
      }

      sendMessageToUser($sellerId, $messageInput)
    })

  })
})
