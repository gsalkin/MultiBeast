var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var sessionSchema = new Schema({
	ArtsVisionFork: {
		EventID: Number,
		SessionName: String,
		SessionSpeakers: Array,
		SessionDate: String,
		StartTime: String,
		EndTime: String,
		SessionLocation: String,
		ArtsVisionNotes: String,
		Meta: {
			Status: String,
			LastEdit: {
				type: String,
				default: Date.now()
			},
			LastUser: String,
			Updated: Boolean
		}
	},
	AspenCoverageFork: {
		VideoVenue: {
			type: Boolean,
			default: false
		},
		VideoRover: {
			type: Boolean,
			default: false
		},
		LiveStream: {
			type: Boolean,
			default: false
		},
		QuickClip: {
			type: Boolean,
			default: false
		},
		Photo: {
			type: Boolean,
			default: false
		},
		Transcript: {
			type: Boolean,
			default: false
		},
		Podcast: {
			type: Boolean,
			default: false
		},
		AspenNotes: {
			type: String,
			default: ''
		}
	},
	AspenChecklistFork: {
		QuickClip: Array,
		Recorded: {
			type: Boolean,
			default: false
		},
		Rendered: {
			type: Boolean,
			default: false
		},
		AlbumURL: {
			type: String,
			default: ''
		},
		YouTubeURL: {
			type: String,
			default: ''
		},
		SessionURL: {
			type: String,
			default: ''
		},
		Complete: {
			type: Boolean,
			default: false
		}
	}
});

const Session = Mongoose.model('Session', sessionSchema);

module.exports = Session;
