var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: "40nKyXATnE3JYgYhtlffEncUa",
    consumer_secret: "oWN4nDc8gg0mzGdvBjEjkQRtMS0WViGIl58RIOqf1pOizlH3l7",
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAAJRKQEAAAAA9J5vOx9i7SCzTa6fvWFrX7yqEKk%3DgHURLzeWcn51RiqRRzpLCgiUUJZWtRFvVhglUQDmfl7V5ldXFG"
  });

  var tweetEmbeds = [];
  var tweetEmbedsHTML = [];

  client.get('search/tweets', {q: '#woodworking'})
    //Get all tweets with #woodworking
    .then(function (tweet) {
      tweet.statuses.forEach(tweet => {
        var object = new Object();
        object = {
          id: tweet.id_str,
          favorites: tweet.favorite_count,
          user: tweet.user.screen_name,
          html: ""
        }
        tweetEmbeds.push(object)
      })
      //Sort by popularity
      tweetEmbeds.sort(function(a, b){
        return b.favorites-a.favorites
      })

    })
    .then(function () {
      //Loop through tweet array
      tweetEmbeds.forEach((tweet, i) => 
        {
          client.get('statuses/oembed', { url: `https://twitter.com/${tweet.user}/status/${tweet.id}` })
          //Add embed code to each object in tweetEmbeds array  
          .then(function(tweet) {
            console.log(tweet.html.toString())
            tweetEmbedsHTML.push(tweet.html);
            if (i === tweetEmbeds.length - 1) {
              //Render final page
              console.log(tweetEmbedsHTML)
              res.render('index', { tweets: tweetEmbedsHTML });
            }
          })
          .catch(function (error) {
            //Render without embedded tweets if error
            res.render('index', { tweets: tweetEmbedsHTML });
            throw error;
          })
        }
      ) 

      
    })
    .catch(function (error) {
      
      //Render without tweets if error
      res.render('index', { tweets: tweetEmbeds });
      throw error;
    })

});

module.exports = router;