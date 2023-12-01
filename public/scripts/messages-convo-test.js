$(document).ready(() => {
  const socket = io();

  // Getting user cookie --> Becomes Sender_id
  const cookies = document.cookie.split('; ');
  const userIdCookie = cookies.find(row => row.startsWith('user_id='));
  const senderId = userIdCookie ? userIdCookie.split('=')[1] : null;
  console.log(senderId);

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
        senderId: senderId
      }

      console.log(senderInformation)
    })
  }

  


  socket.on("connect", () => {
    console.log("The Client Is Connected")
  })

});
