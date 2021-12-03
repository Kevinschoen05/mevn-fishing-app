//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//DB Connection

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//routes prefix 
app.use('/api/record', require('./routes/routes'))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(__dirname + '/dist/'))
  app.get( '*', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html ")
  })
}
//start server
app.listen(port, () => console.log(`sever running at http://localhost:${port}`))
