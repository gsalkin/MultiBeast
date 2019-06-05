require('dotenv').config();
const axios = require('axios');
const postBody = require('../postBody.json')
const Session = require('./models/session.js');
const Utils = require('./utils.js');

var apiEngine = {
	fetchAPI: async function() {
		console.log('Fetching from ArtsVision...');
		try {
			const apiResponse = await axios({
				method: 'post',
				url: process.env.ARTSVISION_URI,
				headers: {
					apikey: process.env.ARTSVISION_KEY
				},
				data: postBody
			});
			return apiResponse.data.Data[0].Rows;
		} catch (error) {
			console.error(error);
		}
	},
	fetchDB: async function() {
		console.log('Fetching from Database...');
		const dataBase = await Session.find({})
			.sort({ 'ArtsVisionFork.EventID': 1 })
			.exec();
		return dataBase;
	},
	addToDB: async function(loopStart, loopEnd, api, db, callback) {
		let database = db;
		console.log('Adding ' + (loopEnd - loopStart) + ' session(s) to database');
		for (let i = loopStart; i < loopEnd; i++) {
			let newSession = new Session({
				ArtsVisionFork: {
					EventID: api[i].Data['Event Id'],
					SessionName: api[i].Data.Text,
					SessionSpeakers: api[i].Entities
						? Utils.collateSpeakers(api[i].Entities['AspenInstEvent.Participant'].Rows)
						: 'N/A',
					SessionTrack: api[i].Data.ProjectName,
					SessionType: api[i].Data.Type,
					SessionFest: api[i].Data.Season,
					SessionDate: api[i].Data.Date,
					StartTime: api[i].Data.StartTime,
					EndTime: api[i].Data.EndTime,
					SessionLocation: api[i].Data.Location,
					ArtsVisionNotes: api[i].Data.Notes,
					Status: api[i].Data.StatusName,
					LastEdit: api[i].Data.UpdateDate,
					LastUser: api[i].Data.UpdateUser
			}
			});
			newSession.save();
		}

		if (callback) {
			callback(database, api, loopEnd);
		}
	},
	populateDB: function() {
		var api = [];
		var db = [];
		this.fetchAPI()
			.then(response => {
				api = response;
			})
			.then(() => {
				this.fetchDB()
					.then(result => {
						db = result;
					})
					.then(() => {
						var apiCount = api.length;
						var dbCount = db.length;

						this.addToDB(dbCount, apiCount, api, db, this.compareData);
					});
			});
	},
	compareData: function(db, api, count) {
		console.log('Comparing data for changes to existing sessions');
		for (let i = 0; i < count; i++) {
			if (db[i].ArtsVisionFork.LastEdit !== api[i].Data.UpdateDate) {
				Session.findOneAndUpdate(
					{ 'ArtsVisionFork.EventID': db[i].ArtsVisionFork.EventID },
					{
						'ArtsVisionFork.SessionTrack': api[i].Data.ProjectName,
						'ArtsVisionFork.SessionType': api[i].Data.Type,
						'ArtsVisionFork.SessionFest': api[i].Data.Season,
						'ArtsVisionFork.SessionSpeakers': api[i].Entities
							? Utils.collateSpeakers(api[i].Entities['AspenInstEvent.Participant'].Rows)
							: 'N/A',
						'ArtsVisionFork.SessionName': api[i].Data.Text,
						'ArtsVisionFork.SessionDate': api[i].Data.Date,
						'ArtsVisionFork.SessionLocation': api[i].Data.Location,
						'ArtsVisionFork.StartTime': api[i].Data.StartTime,
						'ArtsVisionFork.EndTime': api[i].Data.EndTime,
						'ArtsVisionFork.ArtsVisionNotes': api[i].Data.Notes,
						'ArtsVisionFork.Status': api[i].Data.StatusName,
						'ArtsVisionFork.LastEdit': api[i].Data.UpdateDate,
						'ArtsVisionFork.LastUser': api[i].Data.UpdateUser
					},
					{ new: true },
					function(err, doc) {
						console.log(doc);
					}
				);
			}
		}
	}
};

module.exports = apiEngine;
