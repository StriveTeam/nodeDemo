let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');

let port = process.env.PORT || 9999;
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next()
  });

app.use(session({
    secret: 'fuckupig',
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true,
}));

app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});