'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _routes = require('./routes');

var _setEnv = require('./config/set-env');

var _db = require('./config/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;

_dotenv2.default.config();
(0, _setEnv.setEnvironment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);

app.get('/', function (req, res) {
  if (process.env.NODE_ENV.toString().trim() !== 'production') {
    return res.send('Running server in development mode.');
  } else {
    return res.sendFile('index.html', { root: __dirname + '/../dist/' });
  }
});

app.listen(port, function () {
  console.log('ACDesigns listening at http://localhost:' + port + ' in ' + process.env.NODE_ENV + ' mode.');
});