require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async (text) => {
  try {
    await twitterClient.v2.tweet(text);
  } catch (e) {
    console.log(e);
  }
};

const replyToMention = async (tweetId, username) => {
  try {
    const tweets = fs.readFileSync("tweets.txt", "utf8").split("\n");
    const randomIndex = Math.floor(Math.random() * tweets.length);
    const status = tweets[randomIndex];
    const response = await twitterClient.v2.tweet(`@${username} ${status}`, {
      in_reply_to_tweet_id: tweetId,
    });
    console.log(`Replied to mention by ${username}: ${response.data.text}`);
  } catch (e) {
    console.log(e);
  }
};

const processMentions = async () => {
  try {
    const mentions = await twitterClient.v2.searchRecentTweets.all({
      query: `to:${process.env.TWITTER_USERNAME}`,
    });

    for (const mention of mentions.data) {
      const tweetId = mention.id;
      const username = mention.author.username;
      await replyToMention(tweetId, username);
    }
  } catch (e) {
    console.log(e);
  }
};

const cronMentions = new CronJob("* * * * *", async () => {
  processMentions();
});

cronMentions.start();
