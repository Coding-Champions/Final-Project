const express = require('express');
const router = require('express').Router;
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');

app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
//connect to database
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

//app.use('/register', require('./routes/register'));  //If someone does a register route, then go in that file.
//app.use('/auth', require('./routes/auth'));
//app.use('/guests', require('./routes/guests'));
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})