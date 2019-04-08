const Utils = {
	collateSpeakers(array) {
		let nameList = [];
		let count = array.length;
		for (let i = 0; i < count; i++) {
			nameList.push(array[i].Data.Name);
		}
		return nameList;
	}
}

module.exports = Utils;