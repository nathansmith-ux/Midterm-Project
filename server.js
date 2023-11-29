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
const userApiRoutes = require('./routes/api/users-api');
const widgetApiRoutes = require('./routes/api/widgets-api');
const usersRoutes = require('./routes/users');

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
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);

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
    res.render('index', templateVars)
  })
  .catch(err => {
    res.status(500)
    console.log('Server Error', err)
  })
});

// Socket Object Empty but maps to user id (keys) and socket ids (values)
let socketMap = {};

io.on("connect", (socket) => {
  io.emit('welcome-message', "You Are Connected To Our Chat System")

  // Ties User To Socket Id On Server and populates socketMap
  socket.on('login', (userInfo) => {
    const userId = userInfo.userId
    const socketId = userInfo.socketId

    socketMap[userId] = socketId
  })

  // Listening for sent message, then responding with action
  socket.on('sent message', message => {
   // console.log('Socket Object is', socketMap)

    const sellerSocketId = socketMap[message.seller];
      if (sellerSocketId) {
        io.to(sellerSocketId).emit('receive message', message)
      }
  })

  // Listening for replies within the same conversation
  socket.on('reply message', message => {
    const buyerSocketId = socketMap['1']
    io.to(buyerSocketId).emit('reply to buyer', message)
  })
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
