const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

console.log(`dynamodb region: ${process.env.TABLE_REGION}`);
AWS.config.update({ region: "ap-southeast-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "todosTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

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

app.get("/todos", function (req, res) {
  let params = {
    TableName: tableName,
    limit: 100,
  };
  dynamodb.scan(params, (err, result) => {
    if (err) {
      res.json({ statusCode: 500, error: err.message });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(result.Items),
      });
    }
  });
});

app.get("/todos/:id", function (req, res) {
  let params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
  };
  dynamodb.get(params, (err, result) => {
    if (err) {
      res.json({ statusCode: 500, error: err.message });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(result.Item),
      });
    }
  });
});

app.post("/todos", function (req, res) {
  let params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      ...req.body,
      isComplete: false,
    },
  };
  dynamodb.put(params, err => {
    if (err) {
      res.json({ statusCode: 500, error: err.message, url: req.url });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(params.Item),
      });
    }
  });
});

app.put("/todos", function (req, res) {
  const params = {
    TableName: tableName,
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW",
  };
  params.UpdateExpression = "SET ";
  if (req.body.description) {
    params.ExpressionAttributeValues[":description"] = req.body.description;
    params.UpdateExpression += "description = :description ";
  }
  if (req.body.isComplete !== undefined) {
    params.ExpressionAttributeValues[":isComplete"] = req.body.isComplete;
    params.UpdateExpression += "isComplete = :isComplete ";
  }
  dynamodb.update(params, (err, result) => {
    if (err) {
      res.json({ statusCode: 500, error: err.message, url: req.url });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(result.Attributes),
      });
    }
  });
});

app.delete("/todos/:id", function (req, res) {
  let params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
    ReturnValues: "ALL_OLD",
  };
  dynamodb.delete(params, (err, result) => {
    if (err) {
      res.json({ statusCode: 500, error: err.message, url: req.url });
    } else {
      console.log(result);
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(result.Attributes),
      });
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
