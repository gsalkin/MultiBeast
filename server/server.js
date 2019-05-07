/* NPM Packages */
require('dotenv').config();
const express = require('express');
// const session = require('express-session');
const passport = require('passport');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const MongoDBStore = require('connect-mongodb-session')(session);
require('./config/auth');

/* Custom libraries */
const apiEngine = require('./apiEngine');
const router = require('./routes');

/* Middleware configuration */
//const db = mongoose.connect(process.env.MONGO_URI, {collection: 'usersessions'});
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
// 	session({
// 		secret: process.env.PASSPORT_SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 		store: new MongoDBStore({
// 			uri: process.env.MONGO_URI,
// 			databaseName: 'test',
// 			collection: 'usersessions'
// 		}, error => {
// 			console.log(error);
// 		})
// 	})
// );
app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static('public'));
app.use(router);

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.then(() => apiEngine.populateDB())
	.catch(err => console.log(err));
// setInterval( apiEngine.populateDB(), 60000 );

/* Port */
app.listen(process.env.PORT || 5000, () => {
	console.log('Let\'s get this show on the road!');
});
