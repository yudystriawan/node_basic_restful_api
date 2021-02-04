const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');


//middleware
app.use(cors());
app.use(bodyParser.json());

//import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to DB');
    });

//listen to the server
app.listen(3000);
