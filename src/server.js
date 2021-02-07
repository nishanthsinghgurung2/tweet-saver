const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const Twit  = require('twit');

var Tweet = new Twit({
  consumer_key: 'T5Nc9cfwgvmJ6WGYi6aRaQF1l',
  consumer_secret: 'EWOoP41wF2wdnOedaHMaqBLt8uEzXCjR7TTvBqgtdbA7z12LUq',
  access_token: '121320791-bJl7EODHUMVHn2yJgt5Api9xmiT6x4RCFLSs6w2t',
  access_token_secret: 'bihIb570y267r5cQCzteWFKoZmyJM16qJGFBxDnXPiMG1'
});

app.get('/searchTweets/:term', function(req, res) {
    Tweet.get('search/tweets', { q: req.params.term, count: 10}, function(err, data, response){
        if(err) {
          return res.send(err);
        }
        return res.send(data);
      });
    
})

app.listen(8080, () => {
    console.log('Server listening on port 8080')
})
