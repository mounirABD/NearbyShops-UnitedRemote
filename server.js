// ==== set up ====
const express = require("express");
const path = require('path');
const app = express();

// ==== configuration ====
const port = process.env.PORT || 8080;
const distDir = 'dist/NearbyShops';

// set the static files location
app.use(express.static(path.join(__dirname, distDir)));

// ==== routes ====

// redirect every request to the index page
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});


// ==== start the server ====
app.listen(port, ()=>{
    console.info(`server started on port : ${port}`);
});