$(document).ready(function() {
  const socket = io();
  let currentBuyerId = 1;
  let currentSellerId = 2;

  // Socket Io Connections
  socket.on('connect', () => {
    socket.on("welcome-message", (message) => {
      console.log(message);
    });

    /**
     * Receives message from the server
     * Inputs: Event, message object containing seller, buyer and content
     * Returns a function
     */
    socket.on('receive message', message => {
      console.log(message);
      displayMessage(message);
    });

    socket.on('reply to buyer', message => {
      console.log(message);
      displayMessage(message);
    });

    // AJAX Requests

    /**
     * Ajax Request to get all the messages and connect socket id to user id
     */
    const getUserId = function() {
      $.ajax({
        type: "GET",
        url: "/api/messages"
      })
        .done(function(response) {
          const userId = response.user[0].id;
          console.log('You are connected with user id', userId, 'and socket id', socket.id);

          const userInfo = {
            userId: userId,
            socketId: socket.id
          };

          socket.emit('login', userInfo);
        });
    };

    getUserId();

    /**
     * Click event on send button to gather all information to tie to the server
     */
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
          const content = response.newMessage[0].content;
          const buyer = response.newMessage[0].sender_id;
          const seller = response.newMessage[0].receiver_id;

          const direction = buyer === currentBuyerId ? 'sent' : 'from';

          const message = {
            content,
            buyer,
            seller
          };

          // Sending Message To The Server
          socket.emit('sent message', message);

          displayMessage(message, direction);
        });
    });

    $("#reply-button").on('click', function(event) {
      event.preventDefault();

      const $replyMessage = $('#response-message').val();

      const message = {
        content: $replyMessage,
        itemId: 12,
        receiverId: 1
      };

      $.ajax({
        type: "POST",
        url: '/api/messages',
        data: message
      })
        .done(function(response) {
          const content = response.newMessage[0].content;
          const buyer = response.newMessage[0].sender_id;
          const seller = response.newMessage[0].receiver_id;

          const direction = buyer === currentBuyerId ? 'from' : 'sent';

          const message = {
            content,
            buyer,
            seller
          };

        socket.emit('reply message', message);
        displayMessage(message, direction);
      });
    });

    const displayMessage = (message, direction) => {
      const chatContainer = $('#chat-container');
      const messageClass = direction === 'sent' ? 'message-container' : 'message-container other-person';

      const messageHTML = `
      <div class="${messageClass}">
        <p>${message.content}</p>
      </div>`
      chatContainer.append(messageHTML);
  };
  });
})
