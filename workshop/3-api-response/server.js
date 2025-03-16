const express = require("express");
const app = express();

//===================>
// HTTP STATUS CODE
//===================>
app.get("/api/statusCode/200", (req, res) => {
  res.send("status code 200");
});

app.get("/api/statusCode/201", (req, res) => {
  res.status(201);
  res.send("status code 200");
});

app.get("/api/statusCode/400", (req, res) => {
  res.status(400).send("status code 400");
});

//===================>
// HEADER RESPONSE
//===================>
app.get("/api/headers/1", (req, res) => {
  res.set("Content-Type", "application/json"); //set header key-value
  res.status(201);
  res.send("header response");
});

app.get("/api/headers/2", (req, res) => {
  res
    .set("X-CUSTEOM-HEADER", "custom value")
    .status(201)
    .send("header response");
});

app.get("/api/headers/3", (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CUSTOM-HEADER": "custom value",
  };
  res.header(headers);
  res.status(200);
  res.send("header response");
});

//===================>
// BODY RESPONSE
//===================>
//text
app.get("/api/body/1", (req, res) => {
  const message = "response body text";
  res.send(message);
});

//html
app.get("/api/body/2", (req, res) => {
  const messageHTML = "<h1>response body html</h1>";
  res.send(messageHTML);
});

//json
app.get("/api/body/3", (req, res) => {
  const messageJSON = [{ message: "response body json" }];
  res.json(messageJSON);
});

//file
const path = require("path");
app.get("/api/body/4", (req, res) => {
  const parentPath = path.join(__dirname, "..", "..");
  const filePath = path.join(parentPath, "uploads", "fb.png");
  res.sendFile(filePath);
});

//stream
app.get("/api/body/5", (req, res) => {
  res.write("Hello");
  res.write("from");
  res.write("the");
  res.write("server");
  res.end();
});

app.listen(3000, () => console.log("api run on http://localhost:3000"));
