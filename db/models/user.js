const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	local: {
		email: { 
			type: String, 
			unique: true, 
			required: "Email is required.",
			match: [/.+\@.+\..+/, "Please enter a valid e-mail address"] 
		},
		password: { 
			type: String,
			trim: true, 
			unique: false, 
			required: "Password is required.",
			validate: [
				function(input) {
					return input.length >= 6;
				},
				"Password must be longer than 6 characters."
			]
		}
	}
})

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User