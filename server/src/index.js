const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors")

const { port, DB } = require("./config");
const routes = require('./routes');
const {authMiddleware} = require('./middlewares/authMiddleware')

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser())

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  // some legacy browsers (IE11, various SmartTVs) choke on 204,
 credentials: true
}

app.use(cors(corsOptions))

app.use(authMiddleware);

app.use(routes);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successfull"))
  .catch((err) => console.log(`Error while connecting to DB: ${err}`));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));

app.listen(port, () => console.log(`App is listening on http:localhost:${port}`));

