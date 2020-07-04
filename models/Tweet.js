const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TweetSchema = new Schema({
    tweet_id: {
        type: String,
        required: true,
        unique: true
    },
    create_time: {
        type: String,
    },
    content: {
        type: String,
    },
    favorite_counts: {
        type: Number
    },
    source: {
        type: String
    },
    user: {
        type: Schema.Types.Object,
        required: true
    },

})

module.exports = mongoose.model('Tweet', TweetSchema)