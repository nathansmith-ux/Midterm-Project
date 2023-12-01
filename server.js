// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const featured = require('./db/queries/get_featured_items');
const items = require('./db/queries/get_all_items');
const { createServer } = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

// Routes To Pages
const listingRoutes = require('./routes/listings');
const messageRoutes = require('./routes/messages');
const favouriteRoutes = require('./routes/favourites');

// API Routes
const itemApiRoutes = require('./routes/api/items-api');
const favouritesApiRoutes = require('./routes/api/favourites-api');
const messagesApiRoutes = require('./routes/api/messages-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

// Routes To Pages
app.use('/listings', listingRoutes);
app.use('/messages', messageRoutes);
app.use('/favourites', favouriteRoutes);

// API Endpoints
app.use('/api/items', itemApiRoutes);
app.use('/api/favourites', favouritesApiRoutes);
app.use('/api/messages', messagesApiRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

/*
app.get('/', (req, res) => {
  res.render('index')
});
*/

// localhost:8080/login/1
// localhost:8080/login/2
app.get('/login/:id', (req, res) => {
  res.cookie('user_id', req.params.id);

  Promise.all([
    featured.getFeaturedItems(),
    items.getAllItems()
  ])
    .then(([featuredItems, allItems]) => {

    const templateVars = {
      featuredItems: featuredItems,
      listedItems: allItems
    }
    console.log(templateVars);
    res.render('index' , templateVars)
  })
  .catch(err => {
    res.status(500)
    console.log('Server Error', err)
  })
});

/*
Data Structure
conversation = {
  (string) 'userId': COOKIE, (value)
  (string) 'sellerId: sellerId (value)
  (string) 'message': message (value)
}
*/
const conversation = {}
const socketMap = {}



// Socket.IO configuration -> Setting up connection to client
io.on("connect", (socket) => {
  console.log("The Server Connection Is Made");


  // Listens for custom event 'sending message to seller'
  // currentUserId is the cookie id
  socket.on('sending user cookie', (currentUserInfo) => {
    conversation['userId'] = currentUserInfo['cookie'];
    conversation['socketId'] = currentUserInfo['socket'];

    // Store the socket ID against the user ID (cookie ID)
    socketMap[currentUserInfo['cookie']] = currentUserInfo['socket'];

  });

  // Listens for custom event 'sending seller id to the server'
  // sellerId is the id of the seller profile clicked on the homepage
  socket.on('sending seller id to the server', (sellerId, changeUrlPath) => {
    conversation['sellerId'] = sellerId
    changeUrlPath();
  });

    // Listens for custom event 'sending message to seller'
    // currentUserMessage is gathered from reply button click
    // Gets the message from buyer and the buyerId
    socket.on('capturing current user message', (messageInfo) => {
      const { message, senderId } = messageInfo;
      let receiverId;

      if (senderId === conversation.userId) {
        // If the sender is the buyer (user), then the receiver is the seller
        receiverId = conversation.sellerId;

      } else {
      // If the sender is the seller, then the receiver is the buyer (user)
        receiverId = conversation.userId;
      }

      // Look up the receiver's socket ID in the socketMap
      const receiverSocketId = socketMap[receiverId];

      console.log(conversation);
      console.log(receiverSocketId);

    if (receiverSocketId) {
      // Send the message to the receiver
      io.to(receiverSocketId).emit('receive message', { message, senderId });
    }
  });

});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
