$(document).ready(function() {
  const socket = io();
  let currentBuyerId = "";
  let currentSellerId = "";

  /**
   *
   * @param {object} message
   * Returns an html appended Element
   */
  const displayMessage = (message) => {
    const chatContainer = $('#chat-container');
    chatContainer.append($('<p>').text(message.content));
  }

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
      console.log(message)
      displayMessage(message)
      })

    socket.on('reply to buyer', message => {
      console.log(message)
      displayMessage(message)
    })


    /**
     * Ajax Request to get all the messages and connect socket id to user id
     */
    function getUserId() {
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
        }

        socket.emit('login', userInfo);
      });
    }

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
        const content = response.newMessage[0].content
        const buyer = response.newMessage[0].sender_id
        const seller = response.newMessage[0].receiver_id

        const message = {
          content,
          buyer,
          seller
        }

        currentBuyerId = response.newMessage[0].sender_id;
        currentSellerId = response.newMessage[0].receiver_id;

        // Sending Message To The Server
        socket.emit('sent message', message);

        displayMessage(message)
        $("#message-container").hide();

      });
    });
  })

})
