let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');

let port = process.env.PORT || 9999;
let app = express();

/**
 * socket.io测试
 * 
 */
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8888);

io.on('connection', function (socket) {
    socket.on('test', function (data) {
        console.log(data);
        io.emit('reciveData', data)
    });
});

/**
 * 
 * socket.io测试结束
 * 
 */



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'fuckupig',
    cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
}));

app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${port}`);
});