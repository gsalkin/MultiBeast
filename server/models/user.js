const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = Mongoose.Schema;
const saltRounds = 10;
Mongoose.set('useCreateIndex', true);

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	isAdmin: Boolean
})

// userSchema.pre('save', async function(next) {
// 	const User = this;
// 	const hash = await bcrypt.hash(this.password, 12);
// 	this.password = hash;
// 	next()
// })

// userSchema.methods.validPassword = async (password) => {
// 	const user = this;
// 	const compare = await bcrypt.compare(password, user.password);
// 	return compare;
// }

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, saltRounds);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
}

const User = Mongoose.model('User', userSchema);

module.exports = User;