const express = require('express');
const Session = require('./models/session');
const User = require('./models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { expressjwt: exjwt } = require("express-jwt");
const router = express.Router();

//Authentication routing
const userAuthenticated = process.env.ENABLE_AUTH ? exjwt({ secret: process.env.SECRET_TOKEN, algorithms: ["HS256"] }) : () => { };
const sortPattern = { 'ArtsVisionFork.SessionDate': 1, 'ArtsVisionFork.StartTime': 1 }

router.post('/admin/login', async (req, res, next) => {
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

router.post('/admin/signup', passport.authenticate('local-signup', { session: false }), userAuthenticated, asyncHandler(async (req, res) => {
	res.json({
		message: 'Account Created',
		user: req.user
	});
}));

router.get('/admin/users', userAuthenticated, asyncHandler(async (req, res) => {
	let users = await User.find({}, ['username', 'isAdmin']).exec();
	res.json(users);
}));

/* view all route */
router.get('/api/v1/all', userAuthenticated, asyncHandler(async (req, res) => {
	var query = {};

	req.query.date && (query['ArtsVisionFork.SessionDate'] = req.query.date);
	req.query.location && (query['ArtsVisionFork.SessionLocation'] = req.query.location)
	req.query.type && (query['AspenCoverageFork.' + req.query.type] = true)
	req.query.status && (query['AspenChecklistFork.Status'] = req.query.status)

	let result = await Session.find(query).sort(sortPattern);

	res.json(result);
}));

router.get('/api/v1/season/:season', userAuthenticated, asyncHandler(async (req, res) => {
	let season = decodeURI(req.params.season);
	let response = await Session.find({'ArtsVisionFork.SessionFest': season}).sort(sortPattern);
	res.json(response);
}));

/* Individual session routes */
router.get('/api/v1/session/:id', userAuthenticated, asyncHandler(async (req, res) => {
	const { id } = req.params;
	let response = await Session.find({ 'ArtsVisionFork.EventID': id }).limit(1);
	res.json(response);
}));

/* Routes for date */
router.get('/api/v1/date/:date', userAuthenticated, asyncHandler(async (req, res) => {
	const { date } = req.params;
	let response = await Session.find({ 'ArtsVisionFork.SessionDate': date }).sort(sortPattern);
	res.json(response);
}));

/* Routes for location */
router.get('/api/v1/location/:location', userAuthenticated, asyncHandler(async (req, res) => {
	let location = decodeURI(req.params.location);
	let response =  await Session.find({'ArtsVisionFork.SessionLocation': location}).sort(sortPattern);
	res.json(response);
}));

// Catch-all coverage routes for Rover/QuickClip/LiveStream
router.get('/api/v1/type/:meta', userAuthenticated, asyncHandler(async (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	let response = await Session.find({[searchKey]: true}).sort(sortPattern);
	res.json(response);
}));

// Video is a special route that includes all video & rover sessions
router.get('/api/v1/video', userAuthenticated, asyncHandler(async (req, res) => {
	let response = await Session.find({ $or: [{ 'AspenCoverageFork.Video': true }, { 'AspenCoverageFork.Rover': true }] }).sort(sortPattern);
	res.json(response);
}));

router.get('/api/v1/video/location/:location', userAuthenticated, asyncHandler(async (req, res) => {
	let location = decodeURI(req.params.location);
	let response = await Session.find(
		{
			$and: [
				{ $or: [{ 'AspenCoverageFork.Video': true }, { 'AspenCoverageFork.Rover': true }] },
				{ 'ArtsVisionFork.SessionLocation': location }
			]
		},
	).sort(sortPattern);
	res.json(response);
}));

router.get('/api/v1/video/date/:date', userAuthenticated, asyncHandler(async (req, res) => {
	const { date } = req.params;
	let response = await Session.find(
		{
			$and: [
				{ $or: [{ 'AspenCoverageFork.Video': true }, { 'AspenCoverageFork.Rover': true }] },
				{ 'ArtsVisionFork.SessionDate': date }
			]
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
	res.json(response);
}));

router.get('/api/v1/video/location/:location/date/:date', userAuthenticated, asyncHandler(async (req, res) => {
	const location = decodeURI(req.params.location);
	const { date } = req.params;
	let response = await Session.find(
		{
			$and: [
				{ $or: [{ 'AspenCoverageFork.Video': true }, { 'AspenCoverageFork.Rover': true }] },
				{ 'ArtsVisionFork.SessionDate': date, 'ArtsVisionFork.SessionLocation': location }
			]
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
	res.json(response);
}));

/**
 * Filter Location by Date
 * Client sends same request regardless of origin URL being location or date
 * **/
router.get('/api/v1/location/:location/date/:date', userAuthenticated, asyncHandler(async (req, res) => {
	const location = decodeURI(req.params.location);
	const { date } = req.params;
	let response = await Session.find(
		{
			'ArtsVisionFork.SessionLocation': location,
			'ArtsVisionFork.SessionDate': date
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
	res.json(response);
}));

/**
 * Filter Truth/False metas by date
 */
router.get('/api/v1/type/:meta/date/:date', userAuthenticated, asyncHandler(async (req, res) => {
	const searchKey = 'AspenCoverageFork.' + req.params.meta;
	const { date } = req.params;
	let response = await Session.find(
		{
			[searchKey]: true,
			'ArtsVisionFork.SessionDate': date
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
	res.json(response);
}));

/**
 * Filter Truth/False metas by location
 */
router.get('/api/v1/type/:meta/location/:location', userAuthenticated, asyncHandler(async (req, res) => {
	const searchKey = 'AspenCoverageFork.' + req.params.meta;
	const { location } = req.params;
	let response = await Session.find(
		{
			[searchKey]: true,
			'ArtsVisionFork.SessionLocation': decodeURI(location)
		}
	).sort(sortPattern);
	res.json(response);
}));

router.get('/api/v1/type/:meta/location/:location/date/:date', userAuthenticated, asyncHandler(async (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	let location = decodeURI(req.params.location);
	let date = req.params.date;
	let response = await Session.find(
		{
			[searchKey]: true,
			'ArtsVisionFork.SessionLocation': location,
			'ArtsVisionFork.SessionDate': date
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
	res.json(response);
}));

/* POST Route to update Sessions */
router.post('/api/v1/update/session/:id', userAuthenticated, asyncHandler(async (req, res) => {
	if (req.body.coverage) {
		await Session.findOneAndUpdate(
			{ 'ArtsVisionFork.EventID': req.params.id },
			{
				$set: {
					'AspenCoverageFork.Video': req.body.coverage.video,
					'AspenCoverageFork.Rover': req.body.coverage.rover,
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
					'AspenChecklistFork.ReadySend': req.body.workflow.readysend,
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
}));

module.exports = router;
