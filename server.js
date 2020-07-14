const express = require('express');
const mongoose = require('mongoose'); 2
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//DB configuration
const db = require('./config/default').mongoURI;

//Connect to DB
mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
