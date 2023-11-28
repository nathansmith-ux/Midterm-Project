$(document).ready(function() {
  const socket = io();

  socket.on('connect', () => {
    socket.on("welcome-message", (message) => {
      console.log(message);
    });

    // Receiving Message From The Server
    socket.on('receive message', content => {
      displayReceivedMessage(content)
      })

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
        socket.emit('sent message', message );

        displaySentMessage(message.content)

    });
    });
  })

  const displaySentMessage = (message) => {
    console.log('Displayed SENT message content', message)
  }

  const displayReceivedMessage = (message) => {
    console.log('Displayed RECEIVED message content', message)
  }

})

// Step 1: Connect User Id With socket Id (Complete)
// Step 2: On A Post Request Send A Message To The Server For A Specific User Id
// Step 3: Receive message based on userId
// Step 4: Create a function to display sent message
// Step 5: Create a function to display received message
