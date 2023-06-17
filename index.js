const Twit = require("twit");
const fs = require("fs");
require("dotenv").config();

// Load your Twitter API keys from a .env file
const bot = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Load the tweets from the file
const tweets = fs.readFileSync("tweets.txt", "utf8").split("\n");

// Function to post a random tweet from the file
function postRandomTweet() {
  const randomIndex = Math.floor(Math.random() * tweets.length);
  const status = tweets[randomIndex];

  bot.post("statuses/update", { status }, (err, data, response) => {
    if (err) {
      console.error("Error posting tweet:", err);
    } else {
      console.log("Tweet posted successfully!");
    }
  });
}

// Listen for mentions
const stream = bot.stream("statuses/filter", { track: "@WhatToDoChub" });

stream.on("tweet", (tweet) => {
  // Ignore tweets by self
  if (tweet.user.screen_name !== "@WhatToDoChub") {
    // Reply to the mention with a random tweet
    postRandomTweet();
  }
});
