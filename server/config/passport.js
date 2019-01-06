const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const config = require('./config');
const User = require('../models/user.model');

// configure passport for local authentication
const localLogin = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done)=>{
        let user = await User.findOne({email});
        //let user = new User({email:'mounir', password:'$2y$10$Nez9BzKDkpVxrFQN3xj.Be74.nrWdpb3kfkkoXCR9zNL1HHm.7n.a'});
        if(!user || !bcrypt.compareSync(password, user.password)){
            return done(null, false, {error: 'Login failed. Please try again...'});
        }
        user = user.toObject();
        delete user.password;
        done(null, user);
    }
);

// configure passport for jwt verification
const jwtLogin = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
    }, async (jwtPayload, done)=>{
        let user = await User.finById(jwtPayload._id);
        if(!user){ return done(null, false); }
        user = user.toObject();
        delete user.passport;
        done(null, user);
    });

passport.use(localLogin);
passport.use(jwtLogin);

module.exports = passport;