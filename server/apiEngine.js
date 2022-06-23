require('dotenv').config();
const axios = require('axios');
const postBody = require('../postBody.json');
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
	addToDB: async function(dbCount, apiCount, api, db, callback) {
		let database = db;
		let dbIDs = [];
		for (let i = 0; i < dbCount; i++) {
			dbIDs.push(db[i].ArtsVisionFork.EventID);
		}
		console.log('Adding ' + (apiCount - dbCount) + ' session(s) to database');
		for (let i = 0; i < apiCount; i++) {
			if (!dbIDs.includes(api[i].Data['Id'])) {
				console.log(api[i].Data.Text);
				let newSession = new Session({
					ArtsVisionFork: {
						EventID: api[i].Data['Id'],
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
		}

		if (callback) {
			callback(database, api, apiCount);
		}
	},
	removeFromDB: async function(dbCount, apiCount, api, db, callback) {
		let database = db;
		let apiIDs = [];
		for (let i = 0; i < apiCount; i++) {
			apiIDs.push(api[i].Data['Id']);
		}
		console.log('Removing ' + (dbCount - apiCount) + ' session(s) from database');
		for (let i = 0; i < dbCount; i++) {
			if (!apiIDs.includes(db[i].ArtsVisionFork.EventID)) {
				console.log(db[i].ArtsVisionFork.SessionName);
				Session.deleteOne({ 'ArtsVisionFork.EventID': db[i].ArtsVisionFork.EventID }, function(err, doc) {
					console.log(doc);
				});
			}
		}
		if (callback) {
			callback(database, api, apiCount);
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
						var apiCount = api && api.length;
						var dbCount = db && db.length;
						console.log(apiCount);
						console.log(dbCount);
						if (apiCount == dbCount) {
							this.compareData(db, api, apiCount);
						}
						else if (apiCount > dbCount) {
							this.addToDB(dbCount, apiCount, api, db, this.compareData);
						} else if (apiCount < dbCount) {
							this.removeFromDB(dbCount, apiCount, api, db, this.compareData);
						}
					});
			});
	},
	compareData: function(db, api, count) {
		console.log('Comparing data for changes to existing sessions');
		for (let i = 0; i < count; i++) {
			Session.findOneAndUpdate(
				{ 'ArtsVisionFork.EventID': api[i].Data['Id'] },
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
					if (err) {
						console.error(err);
					}
				}
			);
		}
	}
};

module.exports = apiEngine;
