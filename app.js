const express = require('express');
const session = require('express-session');

const app = express();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const port = 8000;

mongoose.connect('mongodb://localhost/gup-sup', { useNewUrlParser: true }, function(err, connection) {
  if(err) throw err;
  else console.log('connected to mongodb');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'toDo fullStack',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000,
  },
  store: new MongoStore({ url: 'mongodb://localhost/gup-sup-session'})
}));

if(process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(passport.initialize());
app.use(passport.session());
require('./server/modules/passport')(passport);
app.use(cors());

app.use('/api', require('./server/routes/api'));
app.use(require('./server/routes/index'));

var userSocketIds = {};

server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {

  socket.on('ONLINE', function(data) {
    userSocketIds[data.userId] = socket.id;
    console.log( userSocketIds, "online userSocketIds")
  });

  const Channel= require('./server/models/Channel');
  socket.on('SEND_CHANNEL_MESSAGE', function(channelMessage){
    let messageArray = [];
    let msgObj = {
      username: channelMessage.author,
      message: channelMessage.message,
      date: new Date(),
    }
    Channel.findOneAndUpdate( { _id: channelMessage.toChannel }, { $push: {messages: msgObj}}, (err, data) => {
      if (!err) {
        Channel.find({ _id: channelMessage.channelId }, (err, data) => {
          if (!err) messageArray = data;
        })
      }
    })
    io.emit('RECEIVE_CHANNEL_MESSAGE', messageArray);
  });


  const PrivateMessage = require('./server/models/PrivateMessage');
  socket.on('SEND_PRIVATE_MESSAGE', function(data) {
    const newPrivateMessage = new PrivateMessage(data);
    let findedDataArr = [];
    newPrivateMessage.save((err, data) => {
      if (err) throw err;
      else {
        PrivateMessage.find({ $and: [
            {$or: [{toUser: data.toUser}, {fromUser: data.toUser}]}, 
            {$or: [{toUser: data.fromUser}, {fromUser: data.fromUser}]} 
          ]}, (err, data)=> {
          if (!err) findedDataArr = data;
          console.log(findedDataArr, "private message data after saving in mongoode");
          io.emit('RECEIVE_PRIVATE_MESSAGE', findedDataArr);
        });
        
      }
    });
    
    
    // data.toUserId -> UserID
    // userSocketsId[toUserId]   -> User socket id
    // emit event to only that socket.id;
  })
});
