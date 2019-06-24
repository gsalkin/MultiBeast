const mongoose = require('mongoose');
const Session = require('./models/session.js');
const IncomingWebhook = require('@slack/webhook').IncomingWebhook;
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const trackedFields = [
	'ArtsVisionFork.Status',
	'ArtsVisionFork.SessionDate',
	'ArtsVisionFork.SessionLocation',
	'ArtsVisionFork.StartTime',
	'ArtsVisionFork.SessionName'
];

slackMessager().catch(error => console.error(error));

async function slackMessager() {
	await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
	Session.watch().on('change', data => {
		const documentKey = data.documentKey;
		const updatedFields = data.updateDescription.updatedFields;
		const updatedFieldKeys = Object.keys(data.updateDescription.updatedFields);
		trackedFields.forEach(field => {
			if (updatedFieldKeys.includes(field)) {
				sendMessage(documentKey, updatedFields);
			}
		});
	});
}

sendMessage = async (documentKey, updatedFields) => {
	await Session.findById(documentKey, 'ArtsVisionFork', (err, session) => {
		if (err) {
			console.error(err);
		} else {
			webhook.send({
				attachments: [
					{
						fallback: 'Session Update',
						pretext: 'A Session has been updated in ArtsVision',
						color: '#A82890',
						title: session.ArtsVisionFork.SessionName + ', #' + session.ArtsVisionFork.EventID,
						title_link: 'https://multibeast.aspenideas.org',
						fields: [
							{
								color: 'danger',
								title: 'Status:',
								value: updatedFields['ArtsVisionFork.Status']
									? updatedFields['ArtsVisionFork.Status']
									: 'Unchanged',
								short: true
							},
							{
								title: 'Name:',
								value: updatedFields['ArtsVisionFork.SessionName']
									? updatedFields['ArtsVisionFork.SessionName']
									: 'Unchanged',
								short: true
							},
							{
								title: 'Date:',
								value: updatedFields['ArtsVisionFork.SessionDate']
									? updatedFields['ArtsVisionFork.SessionDate']
									: 'Unchanged',
								short: true
							},
							{
								title: 'Location:',
								value: updatedFields['ArtsVisionFork.SessionLocation']
									? updatedFields['ArtsVisionFork.SessionLocation']
									: 'Unchanged',
								short: true
							},
							{
								title: 'Start Time:',
								value: updatedFields['ArtsVisionFork.StartTime']
									? updatedFields['ArtsVisionFork.StartTime']
									: 'Unchanged',
								short: true
							}
						]
					}
				]
			});
		}
	});
};
