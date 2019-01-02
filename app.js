const express = require('express');
const session = require('express-session');

const app = express();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

const port = 8000;

mongoose.connect('mongodb://localhost/toDo-fullStack', { useNewUrlParser: true }, function(err, connection) {
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
  store: new MongoStore({ url: 'mongodb://localhost/toDo-fullStack-session'})
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

// app.use('/api', require('./server/routes/api'));
// app.use(require('./server/routes/index'));

app.get('/', (req, res) => {
  res.render('index');
})

server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id, "socket id");

  socket.on('SEND_MESSAGE', function(data){
    console.log(data, "data in send msg")
    io.emit('RECEIVE_MESSAGE', data);
  })
})
