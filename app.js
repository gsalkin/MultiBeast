/* NPM Packages */
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3001;

if (process.env.PASSPORT_SECRET && process.env.SECRET_TOKEN) {
	require('./server/auth');
}

/* Custom libraries */
if (process.env.ENABLE_SLACK !== false) {
	require('./server/dataWatcher');
}
const apiEngine = require('./server/apiEngine');
const routes = require('./server/routes');
const api = require('./server/apiEndpoints');

// app setup
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
// app.use('/admin', routes);
// app.use('/api', api);
app.use(routes)

//production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build', 'index.html'));
	});
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
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
