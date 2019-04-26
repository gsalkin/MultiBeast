const express = require('express');
const Session = require('./models/session');
const passport = require('passport');
const path = require('path');
const router = express.Router();

//Auth routing
router.post(
	'/auth/login',
	passport.authenticate('local-login', {
		successRedirect: '/api/view/all',
		failureRedirect: '/auth/error',
		failureFlash: false
	})
);

router.post(
	'/auth/create',
	passport.authenticate('local-signup', {
		successRedirect: '/admin',
		failureRedirect: '/auth/error'
	})
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// Middleware to check that users are authenticated before accessing data or HTTP requests
function userAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		console.log('Please Login!');
	}
}

router.get('/auth/error', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/error.html'));
});

router.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/admin.html'));
});

/* View all route */
router.get('/api/view/all', (req, res) => {
	Session.find({}, (err, result) => {
		res.json(result);
	}).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

router.get('/api/view/all/:season', (req, res) => {
	let season = decodeURI(req.params.season)
	Session.find({
		'ArtsVisionFork.SessionFest': season
	},
	(err, result) => {
		res.json(result)
	})
} ) 

/* Individual session routes */
router.get('/api/view/session/:id', async (req, res) => {
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
router.get('/api/view/date/:date', (req, res) => {
	Session.find(
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
router.get('/api/view/location/:location', (req, res) => {
	let location = decodeURI(req.params.location);
	Session.find(
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
router.get('/api/view/all/:meta', (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	Session.find(
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

// All Video requires VideoVenue + VideoRover
router.get('/api/view/video', (req, res) => {
	Session.find(
		{
			'AspenCoverageFork.VideoVenue': true,
			'AspenCoverageFork.VideoRover': true
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.SessionDate': 1,
		'ArtsVisionFork.StartTime': 1
	});
});

/* All relevant routes filtered by dates */
router.get('/api/view/location/:location/date/:date', (req, res) => {
	let location = decodeURI(req.params.location);
	let date = req.params.date;
	Session.find(
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

router.get('/api/view/:meta/date/:date', (req, res) => {
	let searchKey = 'AspenCoverageFork.' + req.params.meta;
	let date = req.query.date;
	Session.find(
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

router.get('/api/view/video/date/:date', (req, res) => {
	Session.find(
		{
			'AspenCoverageFork.VideoVenue': true,
			'AspenCoverageFork.VideoRover': true,
			'ArtsVisionFork.SessionDate': req.query.date
		},
		(err, result) => {
			res.json(result);
		}
	).sort({
		'ArtsVisionFork.StartTime': 1
	});
});


/* POST Route to update Sessions */
router.post('/api/update/session/:id', (req, res) => {
	if (req.body.coverage) {
		Session.findOneAndUpdate(
			{'ArtsVisionFork.EventID': req.params.id},
			{ $set: {
				'AspenCoverageFork.VideoVenue': req.body.coverage.video,
				'AspenCoverageFork.VideoRover': req.body.coverage.rover,
				'AspenCoverageFork.LiveStream': req.body.coverage.livestream,
				'AspenCoverageFork.QuickClip': req.body.coverage.quickclip,
				'AspenCoverageFork.Photo': req.body.coverage.photo,
				'AspenCoverageFork.Transcript': req.body.coverage.transcript,
				'AspenCoverageFork.Audio': req.body.coverage.audio,
				'AspenCoverageFork.Restriction': req.body.coverage.restriction,
				'AspenCoverageFork.AspenNotes': req.body.coverage.notes,
			}
		})
		.then( () => {
			return Session.find({ 'ArtsVisionFork.EventID': req.params.id }).limit(1);
		})
		.then(session => {
			res.json(session)
		})
		.catch(err => {
			console.log(err);
		})
	} else if (req.body.workflow) {
		Session.findOneAndUpdate(
			{'ArtsVisionFork.EventID': req.params.id},
			{ $set: {
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
				'AspenChecklistFork.Complete': req.body.workflow.complete,
			}
		})
		.then( () => {
			return Session.find({ 'ArtsVisionFork.EventID': req.params.id }).limit(1);
		})
		.then(session => {
			res.json(session)
		})
		.catch(err => {
			console.log(err);
		})
	}
});
module.exports = router;
