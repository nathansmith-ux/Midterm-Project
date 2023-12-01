$(document).ready(() => {
  const socket = io();

  // Getting user cookie
  const cookies = document.cookie.split('; ');
  const userIdCookie = cookies.find(row => row.startsWith('user_id='));
  const userId = userIdCookie ? userIdCookie.split('=')[1] : null;
  console.log(userId);

  /**
   * Gets the message information that will be sent
   */
  const sendMessage = () => {
    $('#reply-button').on('click', (e) => {
      e.preventDefault();
      const message = $('#response-message').val()

      console.log(message)
    })
  }

  sendMessage();


  socket.on("connect", () => {
    console.log("The Client Is Connected")
  })

});
