$(document).ready(() => {
  const socket = io();

  // Getting user cookie --> Becomes buyerId
  const cookies = document.cookie.split('; ');
  const userIdCookie = cookies.find(row => row.startsWith('user_id='));
  const currentUserId = userIdCookie ? userIdCookie.split('=')[1] : null;
  // console.log(currentUserId);


  /**
   * Gets the message information that will be sent
   * Returns obj that containers the message and sender id (cookie id)
   */
  const sendMessage = () => {
    $('#reply-button').on('click', (e) => {
      e.preventDefault();

      const currentUserMessage = $('#response-message').val()

      const messageInfo = {
        message: currentUserMessage,
        senderId: currentUserId
      }

      socket.emit('capturing current user message', messageInfo)
      displayMessage(currentUserMessage, currentUserId);
    })
  }


   sendMessage();

   // Creating the display
   const displayMessage = (message, senderId) => {
    const chatContainer = $('#chat-container');
    const isCurrentUser = senderId === currentUserId;
    const messageClass = isCurrentUser ? 'message-container' : 'message-container other-person';

    const messageHTML = `
    <div class="${messageClass}">
      <p>${message}</p>
    </div>`
    chatContainer.append(messageHTML);
  };


  // Receiving connection from server and connecting client
  socket.on("connect", () => {
    console.log("The Client Is Connected")
    console.log('Connected client socket ID:', socket.id)
    console.log('Connected userId / cookie id:', currentUserId)

    // Holds current userId and the corresponding socketId
    const currentUserInfo = {
      'cookie': currentUserId,
      'socket': socket.id
    }

    socket.emit('sending user cookie', currentUserInfo)

    // When user clicks the email button on homepage it registers the user id as seller id and sends user to the convos page
    const capturingSellerId = () => {
      $('.fas.fa-envelope').on('click', (e) => {
        e.preventDefault()

        // Access  <i class="fa-envelope" data-seller-id="<%= itemsArray[i].seller_id %>"> for seller id
        const sellerId = $(e.currentTarget).data('seller-id')

        // Sends seller Id to the server
        // Custom event 'sending seller id to the server'
        socket.emit('sending seller id to the server', sellerId, () => {
          location.href = "/messages/convo-test"
        })



      })

    }

    capturingSellerId();

    socket.on('receive message', (data) => {
      const { message, senderId } = data;
      displayMessage(message, senderId);
    });


  })

});
