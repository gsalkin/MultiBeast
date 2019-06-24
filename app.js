/* NPM Packages */
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 8081;
require('./server/auth');

/* Custom libraries */
require('./server/dataWatcher');
const apiEngine = require('./server/apiEngine');
const router = require('./server/routes');

// app setup
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(router);

//production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build', 'index.html'));
	});
}

mongoose.set('useFindAndModify', false);
//mongoose.set('debug', true);
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.then(() => apiEngine.populateDB())
	.catch(err => console.log(err));

// Runs API scrape and compare to DB every 10 minutes
setInterval(() => {
	apiEngine.populateDB();
}, 600000);

/* Port */
app.listen(port, () => {
	console.log(
		'Let\'s get this show on the road! Listening in on port ' + port + ' and running in ' + process.env.NODE_ENV
	);
});
