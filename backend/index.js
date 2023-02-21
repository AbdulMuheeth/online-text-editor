const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const app = express();
const env = require("dotenv");

app.use(bodyParser.json());
require("dotenv").config();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

const Path = require('./models/path')
const FileData = require('./models/fileData')

const pathRouter = require('./routes/path')
const dataRouter = require('./routes/data')

app.use('/path',pathRouter)
app.use('/data',dataRouter)

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log("er1" + err));

app.listen(5000, () => {
  console.log("server is up and listening at port 5000");
});
