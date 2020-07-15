const express = require('express');
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

app.use(express.json({extended:true}));

app.use('/register', require('./routes/register'));  //If someone does a register route, then go in that file.
app.use('/auth', require('./routes/auth'));
//app.use('/guests', require('./routes/guests'));
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})