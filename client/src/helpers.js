import format from 'date-fns/format';

export function stringifySpeakers(array) {
	let count = array.length;
	let speakerString = '';
	for (let i = 0; i < count; i++) {
		speakerString = speakerString + array[i] + ',\n';
	}
	return speakerString;
}

export function convertTimes(time) {
	let dateTime = new Date('1970-01-01T' + time);
	let myformat = 'h:mm A';
	let newTime = format(dateTime, myformat);
	return newTime;
}

export function classHelper(status) {
	let className = '';
	switch (status) {
		case 'Published':
			className = 'text-success'
			break;
		case 'Cancelled':
			className = 'text-warning'
			break;
		default:
			break;
	}
	return className;
}

export function copyToClipboard(target) {

}