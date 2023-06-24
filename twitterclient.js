const Twit = require("twit");
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
  timeout_ms: 60 * 1000, // optional: timeout for API requests
});

module.exports = { twitterClient };

// const { TwitterApi } = require("twitter-api-v2");

// const client = new TwitterApi({
//   appKey: process.env.API_KEY,
//   appSecret: process.env.API_SECRET,
//   accessToken: process.env.ACCESS_TOKEN,
//   accessSecret: process.env.ACCESS_SECRET,
// });

// const bearer = new TwitterApi(process.env.BEARER_TOKEN);

// const twitterClient = client.readWrite;
// const twitterBearer = bearer.readOnly;

// module.exports = { twitterClient, twitterBearer };

// const Twit = require("twit");
// const fs = require("fs");
// require("dotenv").config();

// // Load your Twitter API keys from a .env file
// const bot = new Twit({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token: process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

// Load the tweets from the file
// const tweets = fs.readFileSync("tweets.txt", "utf8").split("\n");

// // Function to post a random tweet from the file
// function postRandomTweet() {
//   const randomIndex = Math.floor(Math.random() * tweets.length);
//   const status = tweets[randomIndex];

//   bot
//     .post("tweets", {
//       tweet: {
//         text: status,
//       },
//     })
//     .then((response) => {
//       console.log("Tweet posted successfully!");
//     })
//     .catch((err) => {
//       console.error("Error posting tweet:", err);
//     });
// }

// // Set up a filtered stream to track mentions of your Twitter handle
// const stream = bot.stream("tweets/search/stream", {
//   tweet: {
//     // Replace 'YourTwitterHandle' with your actual Twitter handle without the '@' symbol
//     mentions: "whattodochub",
//   },
// });

// // Event handler for incoming tweets
// stream.on("tweet", (tweet) => {
//   // Extract relevant information from the tweet
//   const tweetId = tweet.data.id;
//   const username = tweet.includes.users[0].username;

//   // Reply to the tweet
//   replyToTweet(tweetId, username, "Thank you for mentioning me!");
// });

// // Function to reply to a tweet
// function replyToTweet(tweetId, username, message) {
//   bot
//     .post("tweets", {
//       tweet: {
//         in_reply_to_tweet_id: tweetId,
//         text: `@${username} ${message}`,
//       },
//     })
//     .then((response) => {
//       console.log("Replied to tweet:", response.data);
//     })
//     .catch((err) => {
//       console.error("Error replying to tweet:", err);
//     });
// }

// // Listen for errors
// stream.on("error", (error) => {
//   console.error("Error on stream:", error.message);
//   // Handle any stream
// });

// // Post a random tweet
// postRandomTweet();
