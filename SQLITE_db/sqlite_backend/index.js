const  express =require('express')
const bodyParser =require('body-parser') 
const sequelize=require('./App/db/conection.js')
const initRoutes = require("./App/routes/app.route.js");
const {notFound,handleError}=require("./middleware/errorHandler.js")
//const test=require('./App/routes/index')
require('dotenv').config();
global.__basedir = __dirname ;
//app.use(express.urlencoded({ extended: true }));
//const compression = require('compression')

//const helmet = require('helmet')
//import productRoute from './src/routes/producRoute'
//const  router =require( './src/server/routes/book_route.js')
//const router=require('./test_sequelize/routes/index.js')
const cors =require('cors'); 
const { authMiddleware } = require('./middleware/userAuth.js');
const app=express()
//import routes from './src/routes/producRoute.js'
const PORT = process.env.PORT || 3001

app.use(cors())


//app.options("*", cors({ origin: 'http://localhost:3001', optionsSuccessStatus: 200 }));

//app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
//app.use(helmet())
//app.use(compression())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//app.use('/etud',router)
//  app.use(authMiddleware)
app.use('/app',initRoutes) 
//app.use('/etud',test)
//app.use('/book',router)  


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken.')
  })
  
  // Implement 404 error route
  app.use(function (req, res, next) {
    res.status(404).send('Sorry we could not find that.')
      
  }) 
  app.use(notFound)
  app.use(handleError)
  sequelize.sync({}).then(()=>console.log('db is ready'))

app.listen(PORT, function() {
    console.log(`Server is running on: ${PORT}`)
  })