const mongo_port = 27017;
const config = {
    //env: envVars.NODE_ENV,
    port: process.env.PORT || 8080,
    jwtSecret: 'NearbyShops_secretKey',
    mongo_host: 'mongodb://localhost:' + mongo_port + '/nearbyshops_db',
    distPathDir: 'dist/NearbyShops'
  };
  
  module.exports = config;