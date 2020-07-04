const router = require('express').Router()
const User = require('../models/User')
const Tweet = require('../models/Tweet')
//configuration by using twitter api
const Twit = require('twit')
const config = require('../config')
const T = new Twit(config)

//request logs 
const log4js = require('log4js');
log4js.configure({
      appenders: { fileAppender: {type:'file',filename:'./logs/request.log'}},
      categories: {default: {appenders:['fileAppender'],level:'info'}} 
    });
const logger = log4js.getLogger();


router.route('/search/:name')
    .get((req, res) => {
        const q = req.params.name;
        logger.info(`search twitter users by name:${q}`);
        T.get('https://api.twitter.com/1.1/users/search.json', { q: q }, function (err, data) {
            if (err) {
                return res.status(400).json(err)
            }
            if (data && data.length !== 0) {
                let users = [];
                data.forEach((tUser) => {
                    let user = new User({
                        user_id: tUser.id_str,
                        user_name: tUser.name,
                        profile_image: tUser.profile_image_url_https,
                        followers: tUser.followers_count,
                        create_time: tUser.created_at,
                        protected: tUser.protected
                    })
                    users.push(user)

                })
                return res.status(200).json(users)
            } else {
                return res.status(404).json({ msg: 'Users not found' })
            }
        })
    })

router.route('/:id')
    .get((req, res) => {
        const userId = req.params.id
        logger.info(`search tweets  by userid:${userId}`);
        //'https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev' 
        T.get('https://api.twitter.com/1.1/statuses/user_timeline.json', { user_id: userId, count: 5 }, function (err, data) {
            if (err) {
                return res.status(404).json(err)
            }
            if (data && data.length !== 0) {
                let twits = [];
                data.forEach((tweet) => {
                    let twit = new Tweet({
                        tweet_id: tweet.id_str,
                        create_time: tweet.created_at,
                        content: tweet.text,
                        favorite_counts: tweet.favorite_count,
                        source: tweet.source,
                        user: tweet.user
                    })
                    twits.push(twit)
                })
                return res.status(200).json(twits)
            } else {
                return res.status(404).json({ msg: 'Twits not found' })
            }
        })
    })

module.exports = router 