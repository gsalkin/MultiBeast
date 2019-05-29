const express = require('express');
const Session = require('./models/session');
const User = require('./models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const router = express.Router();

//Authentication routing
const userAuthenticated = exjwt({ secret: process.env.SECRET_TOKEN });

router.post('/login', async (req, res, next) => {
	passport.authenticate('local-login', async (err, user) => {
		try {
			if (!user) {
				const error = new Error('User not found');
				return next(error);
			}
			req.login(user, { session: false }, async error => {
				if (error) {
					return next(error);
				}
				const body = {
					_id: user._id,
					username: user.username
				};
				const token = jwt.sign(body, process.env.SECRET_TOKEN, {
					expiresIn: 2629746 // expires in 1 month
				});
				res.json({
					success: true,
					token: token,
					user: user.username
				});
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.post('/signup', passport.authenticate('local-signup', { session: false }), async (req, res) => {
	res.json({
		message: 'Account Created',
		user: req.user
	});
});

router.get('/admin/users', userAuthenticated, async (req, res) => {
	await User.find({}, 'username isAdmin', (err, result) => {
		console.log(result);
		res.json(result);
	});
});

/* view all route */
router.get('/api/v1/all', userAuthenticated, async (req, res) => {
	await Session.find({}, (err, result) => {
		res.json(result);
	}).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

router.get('/api/v1/season/:season', userAuthenticated, async (req, res) => {
	let season = decodeURI(req.params.season);
	await Session.find(
		{
			'ArtsVisionFork.SessionFest': season
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

/* Individual session routes */
router.get('/api/v1/session/:id', userAuthenticated, async (req, res) => {
	await Session.find(
		{
			'ArtsVisionFork.EventID': req.params.id
		},
		(err, result) => {
			res.json(result);
		}
	).limit(1); // No duplicates
});

/* Routes for date */
router.get('/api/v1/date/:date', userAuthenticated, async (req, res) => {
	await Session.find(
		{
			'ArtsVisionFork.SessionDate': req.params.date
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});

/* Routes for location */
router.get('/api/v1/location/:location', userAuthenticated, async (req, res) => {
	let location = decodeURI(req.params.location);
	await Session.find(
		{
			'ArtsVisionFork.SessionLocation': location
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

// Catch-all coverage routes for Rover/QuickClip/LiveStream
router.get('/api/v1/type/:meta', userAuthenticated, async (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	await Session.find(
		{
			[searchKey]: true
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

// Video is a special route that includes all video & rover sessions
router.get('/api/v1/video', userAuthenticated, async (req, res) => {
	await Session.find(
		{ $or: [{ 'AspenCoverageFork.VideoVenue': true }, { 'AspenCoverageFork.VideoRover': true }] },
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

router.get('/api/v1/video/location/:location', userAuthenticated, async (req, res) => {
	let location = decodeURI(req.params.location);
	await Session.find(
		{
			$and: [
				{ $or: [{ 'AspenCoverageFork.VideoVenue': true }, { 'AspenCoverageFork.VideoRover': true }] },
				{ 'ArtsVisionFork.SessionLocation': location }
			]
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

router.get('/api/v1/video/date/:date', userAuthenticated, async (req, res) => {
	let date = req.params.date;
	await Session.find(
		{
			$and: [
				{ $or: [{ 'AspenCoverageFork.VideoVenue': true }, { 'AspenCoverageFork.VideoRover': true }] },
				{ 'ArtsVisionFork.SessionDate': date }
			]
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});

router.get('/api/v1/video/location/:location/date/:date', userAuthenticated, async (req, res) => {
	let location = decodeURI(req.params.location);
	let date = req.params.date;
	await Session.find(
		{
			$and: [
				{ $or: [{ 'AspenCoverageFork.VideoVenue': true }, { 'AspenCoverageFork.VideoRover': true }] },
				{ 'ArtsVisionFork.SessionDate': date, 'ArtsVisionFork.SessionLocation': location }
			]
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});

/**
 * Filter Location by Date
 * Client sends same request regardless of origin URL being location or date
 * **/
router.get('/api/v1/location/:location/date/:date', userAuthenticated, async (req, res) => {
	let location = decodeURI(req.params.location);
	let date = req.params.date;
	await Session.find(
		{
			'ArtsVisionFork.SessionLocation': location,
			'ArtsVisionFork.SessionDate': date
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});

/**
 * Filter Truth/False metas by date
 */
router.get('/api/v1/type/:meta/date/:date', userAuthenticated, async (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	let date = req.params.date;
	await Session.find(
		{
			[searchKey]: true,
			'ArtsVisionFork.SessionDate': date
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});

/**
 * Filter Truth/False metas by location
 */
router.get('/api/v1/type/:meta/location/:location', userAuthenticated, async (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	let location = req.params.location;
	await Session.find(
		{
			[searchKey]: true,
			'ArtsVisionFork.SessionLocation': location
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

router.get('/api/v1/type/:meta/location/:location/date/:date', userAuthenticated, async (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	let location = decodeURI(req.params.location);
	let date = req.params.date;
	await Session.find(
		{
			[searchKey]: true,
			'ArtsVisionFork.SessionLocation': location,
			'ArtsVisionFork.SessionDate': date
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});

/* POST Route to update Sessions */
router.post('/api/v1/update/session/:id', userAuthenticated, async (req, res) => {
	if (req.body.coverage) {
		await Session.findOneAndUpdate(
			{ 'ArtsVisionFork.EventID': req.params.id },
			{
				$set: {
					'AspenCoverageFork.VideoVenue': req.body.coverage.video,
					'AspenCoverageFork.VideoRover': req.body.coverage.rover,
					'AspenCoverageFork.LiveStream': req.body.coverage.livestream,
					'AspenCoverageFork.QuickClip': req.body.coverage.quickclip,
					'AspenCoverageFork.Photo': req.body.coverage.photo,
					'AspenCoverageFork.Transcript': req.body.coverage.transcript,
					'AspenCoverageFork.Audio': req.body.coverage.audio,
					'AspenCoverageFork.Quotes': req.body.coverage.quotes,
					'AspenCoverageFork.Rundown': req.body.coverage.rundown,
					'AspenCoverageFork.Restriction': req.body.coverage.restriction,
					'AspenCoverageFork.AspenNotes': req.body.coverage.notes
				}
			}
		)
			.then(() => {
				return Session.find({ 'ArtsVisionFork.EventID': req.params.id }).limit(1);
			})
			.then(session => {
				res.json(session);
			})
			.catch(err => {
				console.log(err);
			});
	} else if (req.body.workflow) {
		await Session.findOneAndUpdate(
			{ 'ArtsVisionFork.EventID': req.params.id },
			{
				$set: {
					'AspenChecklistFork.QuickClip': req.body.workflow.quickclip,
					'AspenChecklistFork.QuickClipRendered': req.body.workflow.quickclipRendered,
					'AspenChecklistFork.Recorded': req.body.workflow.recorded,
					'AspenChecklistFork.Rendered': req.body.workflow.rendered,
					'AspenChecklistFork.AlbumURL': req.body.workflow.albumURL,
					'AspenChecklistFork.YouTubeURL': req.body.workflow.youtubeURL,
					'AspenChecklistFork.SessionURL': req.body.workflow.sessionURL,
					'AspenChecklistFork.TranscriptURL': req.body.workflow.transcriptURL,
					'AspenChecklistFork.AudioURL': req.body.workflow.audioURL,
					'AspenChecklistFork.Status': req.body.workflow.status,
					'AspenChecklistFork.Sent': req.body.workflow.sent,
					'AspenChecklistFork.Complete': req.body.workflow.complete
				}
			}
		)
			.then(() => {
				return Session.find({ 'ArtsVisionFork.EventID': req.params.id }).limit(1);
			})
			.then(session => {
				res.json(session);
			})
			.catch(err => {
				console.log(err);
			});
	}
});

module.exports = router;
