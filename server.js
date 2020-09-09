const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('./middleware/logger')
const connectDB = require('./config/db')



const morgan = require('morgan')

// Load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB()



// Routes

const bootcamps = require('./routes/bootcamps')


const app = express();

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
app.use(logger);

//body parser
app.use(express.json())

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);




const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
  );

  //handle unhandled rejetion
  process.on('unhandledRejection',(err,promise) => {
    console.log(`Error : ${err.message}`.red.bold)

    server.close(() => {
      process.exit(1)
    })
  })
