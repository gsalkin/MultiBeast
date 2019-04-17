import format from 'date-fns/format';

export function stringifySpeakers(array) {
	let count = array.length;
	let speakerString = '';
	for (let i = 0; i < count; i++) {
		if (i == count - 1) { 
			speakerString = speakerString + array[i]
		} else {
			speakerString = speakerString + array[i] + ',\n';
		}
	}
	return speakerString;
}

export function convertTimes(time) {
	let dateTime = new Date('1970-01-01T' + time + '-07:00')
	let newTime = format(dateTime, 'h:mm A');
	
	return newTime;
}

export function classHelper(status) {
	let className = '';
	switch (status) {
		case 'Ready':
			className = 'badge-secondary'
			break;
		case 'In Progress':
			className = 'badge-primary'
			break;
		case 'Complete':
			className = 'badge-success'
			break;
		case 'Cancelled':
			className = 'badge-danger'
			break;
		case 'Conflict':
			className = 'badge-warning'
			break;
		default:
			break;
	}
	return className;
}

export function dateClassHelper(date) {
	let className = '';
	switch (date) {
		case '2017-06-22':
			className = 'badge badge-pill badge-light'
			break;
		case '2017-06-23':
			className = 'badge badge-pill badge-secondary'
			break;
		case '2017-06-24':
			className = 'badge badge-pill badge-info'
			break;
		case '2017-06-25':
			className = 'badge badge-pill badge-primary'
			break;
		case '2017-06-26':
			className = 'badge badge-pill badge-success'
			break;
		case '2017-06-27':
			className = 'badge badge-pill badge-dark'
			break;
		case '2017-06-28':
			className = 'badge badge-pill badge-light'
			break;
		case '2017-06-29':
			className = 'badge badge-pill badge-secondary'
			break;
		case '2017-06-30':
			className = 'badge badge-pill badge-info'
			break;
		case '2017-07-01':
			className = 'badge badge-pill badge-primary'
			break;
		default:
			break;
	}
	return className;
}

export function copyToClipboard(target) {

}