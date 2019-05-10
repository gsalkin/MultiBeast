/* NPM Packages */
require('dotenv').config();
const express = require('express');
// const session = require('express-session');
const passport = require('passport');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 5000;
// const MongoDBStore = require('connect-mongodb-session')(session);
require('./server/config/auth');

/* Custom libraries */
const apiEngine = require('./server/apiEngine');
const router = require('./server/routes');

// app setup
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());


//production mode
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('/*', (req, res) => {
		console.log('Hi!');
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}
app.use(router);
// app.use(passport.session());
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
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.then(() => apiEngine.populateDB())
	.catch(err => console.log(err));
// setInterval( apiEngine.populateDB(), 60000 );

/* Port */
app.listen(port, () => {
	console.log('Let\'s get this show on the road! Listening in on port ' + port);
});
