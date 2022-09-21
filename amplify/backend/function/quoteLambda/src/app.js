/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/quote", async function (req, res) {
  try {
    await fetch("https://zenquotes.io/api/random/")
      .then(response => response.json())
      .then(data => {
        res.json({
          statusCode: 200,
          url: req.url,
          body: JSON.stringify(data[0]),
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to fetch quote of the day");
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
