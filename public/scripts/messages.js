$(document).ready(function() {
  const socket = io();

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

        // Sending Message To The Server
        socket.emit('sent message', message);

        displayMessage(message)
        $("#message-container").hide();

      });
    });

    /**
     * Clicking reply button capturing value and sending to the server
     */
    $("#reply-button").on('click', function(event) {
      event.preventDefault();
      const $replyMessage = $('#response-message').val();

      const message = {
        content: $replyMessage
      }

      socket.emit('reply message', message)
    })

  })

  const displayMessage = (message) => {
    const chatContainer = $('#chat-container');
    chatContainer.append($('<p>').text(message.content));
  }

})

// Step 1: Connect User Id With socket Id (Complete)
// Step 2: On A Post Request Send A Message To The Server For A Specific User Id
// Step 3: Receive message based on userId
// Step 4: Create a function to display sent message
// Step 5: Create a function to display received message
