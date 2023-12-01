$(document).ready(() => {
  const socket = io();

  // Getting user cookie --> Becomes buyerId
  const cookies = document.cookie.split('; ');
  const userIdCookie = cookies.find(row => row.startsWith('user_id='));
  const buyerId = userIdCookie ? userIdCookie.split('=')[1] : null;
  console.log(buyerId);



  /**
   * Gets the message information that will be sent
   * Returns obj that containers the message and sender id (cookie id)
   */
  const sendMessage = () => {
    $('#reply-button').on('click', (e) => {
      e.preventDefault();

      const message = $('#response-message').val()
      const senderInformation = {
        message: message,
        buyerId: buyerId
      }

      console.log(senderInformation)

      socket.emit('sending message to seller', (buyerInformation) => {
        console.log("The CLIENT sent object is this:", (buyerInformation))
      })

      return senderInformation
    })
  }


   sendMessage();


  // Receiving connection from server and connecting client
  socket.on("connect", () => {
    console.log("The Client Is Connected")

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

  })

});
