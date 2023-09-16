"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var sequelize = require('./App/db/conection.js');

var initRoutes = require("./App/routes/app.route.js");

var _require = require("./middleware/errorHandler.js"),
    notFound = _require.notFound,
    handleError = _require.handleError; //const test=require('./App/routes/index')


require('dotenv').config();

global.__basedir = __dirname; //app.use(express.urlencoded({ extended: true }));
//const compression = require('compression')
//const helmet = require('helmet')
//import productRoute from './src/routes/producRoute'
//const  router =require( './src/server/routes/book_route.js')
//const router=require('./test_sequelize/routes/index.js')

var cors = require('cors');

var _require2 = require('./middleware/userAuth.js'),
    authMiddleware = _require2.authMiddleware;

var app = express(); //import routes from './src/routes/producRoute.js'

var PORT = process.env.PORT || 3001;
app.use(cors()); //app.options("*", cors({ origin: 'http://localhost:3001', optionsSuccessStatus: 200 }));
//app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
//app.use(helmet())
//app.use(compression())

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //app.use('/etud',router)
//  app.use(authMiddleware)

app.use('/app', initRoutes); //app.use('/etud',test)
//app.use('/book',router)  

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is broken.');
}); // Implement 404 error route

app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.');
});
app.use(notFound);
app.use(handleError);
sequelize.sync({}).then(function () {
  return console.log('db is ready');
});
app.listen(PORT, function () {
  console.log("Server is running on: ".concat(PORT));
});