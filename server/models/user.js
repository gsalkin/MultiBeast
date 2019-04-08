const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = Mongoose.Schema;
const saltRounds = 12;

var userSchema = new Schema({
	username: String,
	passwordHash: String,
	isAdmin: Boolean
})

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, saltRounds);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
}

const User = Mongoose.model('User', userSchema);

module.exports = User;