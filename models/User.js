const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
	user_id: {
		type: String,
		required: true,
		unique: true
	},
	user_name: {
		type: String,
		required: true
	},
	profile_image: {
		type: String
	},
	followers: {
		type: Number
    },
    create_time:{
        type: String
    }
	
})

module.exports = mongoose.model('User', userSchema)