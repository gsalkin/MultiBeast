const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

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
passport.use('local-login',new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
},  async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                console.log(username + ' not found');
                return done(null, false, { errMsg: 'Incorrect Username. Please contact admin' });
            }
            const validate = await user.validPassword(password);
            if (!validate) {
                console.log('Invalid password try again');
                return done(null, false, { message: 'Invalid password try again' });
            }
            return done(null, user, { message: 'Success! Logged in' });
        } catch (error) {
            return done(error);
        }
	})
);

passport.use('jwt', new JWTstrategy({
    secretOrKey: process.env.SECRET_TOKEN,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (error) {
        done(error)
    }
}))

// Sign-up strategy
passport.use('local-signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    },  async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (user) {
                return done(null, false, console.log('User already exists')
                )
            } else {
                let newUser = new User()
                newUser.username = username
                newUser.passwordHash = newUser.generateHash(password)
                newUser.isAdmin = req.body.admin
                newUser.save( err => {
                    if (err) {
                        return done(null, err, {message: 'Issue creating user'})
                    }
                    return done(null, newUser, {message: 'Account ' + username + ' created!'})
                })

            }
        } catch (error) {
            done(error)
        }
    })
);