import format from 'date-fns/format';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export function stringifySpeakers(array) {
	let count = array.length;
	let speakerString = '';
	for (let i = 0; i < count; i++) {
		if (i === count - 1) {
			speakerString = speakerString + array[i];
		} else {
			speakerString = speakerString + array[i] + ',\n';
		}
	}
	return speakerString;
}

export function convertTimes(time) {
	if (time) {	
		let dateTime = new Date('1970-01-01T' + time + '-07:00')
		let newTime = format(dateTime, 'h:mm A');
		return newTime;
	} else {
		return 'No End Time';
	}
}

export function classHelper(status) {
	let className = '';
	switch (status) {
		case 'Ready':
			className = 'badge-secondary';
			break;
		case 'In Progress':
		case 'Recorded':
		case 'Rendered':
		case 'Uploaded':
		case 'Ready to Send':
		case 'Sent':
			className = 'badge-primary';
			break;
		case 'Complete':
			className = 'badge-success';
			break;
		case 'Cancelled':
			className = 'badge-danger';
			break;
		case 'Confirmed':
			className = 'badge-warning';
			break;
		default:
			break;
	}
	return className;
}

export function dateClassHelper(date) {
	let className = '';
	switch (date) {
		case '2019-06-20':
				className = 'badge badge-warning';
				break;
		case '2019-06-21':
			className = 'badge badge-light';
			break;
		case '2019-06-22':
			className = 'badge badge-secondary';
			break;
		case '2019-06-23':
			className = 'badge badge-info';
			break;
		case '2019-06-24':
			className = 'badge badge-primary';
			break;
		case '2019-06-25':
			className = 'badge badge-success';
			break;
		case '2019-06-26':
			className = 'badge badge-dark';
			break;
		case '2019-06-27':
			className = 'badge badge-light';
			break;
		case '2019-06-28':
			className = 'badge badge-secondary';
			break;
		case '2019-06-29':
			className = 'badge badge-info';
			break;
		case '2019-06-30':
			className = 'badge badge-primary';
			break;
		default:
			break;
	}
	return className;
}

export function seasonMarker(season) {
	if (!season) {
		return;
	} else {
		let fest = season.split(' ');
		if (fest[0] === 'AIF') {
			return 'Aspen Ideas Festival';
		} else if (fest[0] === 'SH' || fest[0] === 'AIH') {
			return 'Aspen Ideas Health';
		}
	}
}

export function camelCaseBreaker(s) {
	return s.split(/(?=[A-Z])/).join(' ');
}

export function mediaQuery() {
	if ($(window).width() >= 1024) {
		return true;
	} else {
		return false;
	}
}

export function headerClassSwitch(mediaQuery) {
	if (mediaQuery()) {
		return 'fixed-top'
	} else {
		return
	}
}

export function scrollToTop() {
	document.body.scrollTop = 0; //Safari
	document.documentElement.scrollTop = 0;
}

export const getFilterOptions = (sessions) => {
	const dates = new Set(sessions.map(session => session.ArtsVisionFork.SessionDate));
	const locations = new Set(sessions.map(session => session.ArtsVisionFork.SessionLocation));
	const filterOptions = {
		Dates: [
			...dates
		],
		Locations: [
			...locations
		],
		Types: [
			"Video",
			"Rover",
			"LiveStream",
			"QuickClip",
			"Photo",
			"Audio",
			"Quotes",
			"Rundown",
			"Transcript",
			"Restriction",
			"Complete"
		], 
		Status: {
			Recorded: "Recorded",
			Rendered: "Rendered",
			QuickClip: "QC Added",
			QuickClipRendered: "QC Rendered",
			AudioURL: "Audio Ready",
			TranscriptURL: "Transcript Ready",
			AlbumURL: "Album Ready",
			YouTubeURL: "Youtube Ready",
			SessionURL: "Site Page Ready",
			ReadySend: "Ready to Send",
			Sent: "Sent to Speaker",
			Complete: "Complete"
		}
	}
	return filterOptions;
}