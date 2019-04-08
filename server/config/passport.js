//const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = function(passport) {
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Login strategy
    passport.use('local-login', new localStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log('User does not exist, please contact admin');
                    
                    return done(null, false, {
                        errMsg: 'User does not exist, please contact admin'
                    });
                }
                if (!user.validPassword(password)) {
                    console.log('Invalid password try again');
                    return done(null, false, { errMsg: 'Invalid password try again' });
                }
                return done(null, user);
            });

        })
    );

    // Sign-up strategy
    passport.use('local-signup', new localStrategy(
        function(username, password, done) {
            process.nextTick(function() {
                User.findOne({ username: username }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, console.log(user.username + ' already exists'));
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.passwordHash = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        })
    );
}