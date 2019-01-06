// ==== set up ====
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('./server/config/passport');
const routes = require('./server/routes/api.route');
const mongoose = require('mongoose');
const config = require('./server/config/config')

const app = express();
mongoose.connect(config.mongo_host);

// ==== configuration ====
const port = config.port;
const distDir = config.distPathDir;

// set the static files location
app.use(express.static(path.join(__dirname, distDir)));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// initialize passport
app.use(passport.initialize());




// ==== routes ====

// redirect every request to the index page

// API router
app.use('/api/', routes);


// ==== start the server ====
app.listen(port, ()=>{
    console.info(`server started on port : ${port}`);
});