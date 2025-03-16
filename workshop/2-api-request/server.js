const express = require("express");
const app = express(); //app main

/* 
============================
create routing (API enpoint)
============================
*/
//get
app.get("/api/users", (req, res) => {
  res.send("get all users");
});

//post
app.post("/api/users", (req, res) => {
  res.send("create new user");
});

//put
app.put("/api/users/:id", (req, res) => {
  res.send("update user");
});

//delete
app.delete("/api/users/:id", (req, res) => {
  res.send("delete user");
});

/* 
============================
HEADER REQUEST
============================
*/
app.get("/api/headers", (req, res) => {
  const contentType = req.get("Content-Type");
  const authorization = req.get("Authorization");
  const message = `Content-Type: ${contentType}, Authorization: ${authorization}`;
  res.send(message);
});

/* 
============================
BODY REQUEST
============================
*/
app.use(express.json());
app.post("/api/body", (req, res) => {
  const body = req.body;
  const { username, email } = body;
  const message = `username: ${username}, email: ${email}`;
  res.json(message);
});

/* 
============================
URL PARAMETERS
============================
*/
app.get("/api/users/:id1/:id2", (req, res) => {
  const params = req.params;
  const { id1, id2 } = params;
  const message = `id1: ${id1}, id2: ${id2}`;
  res.send(message);
});

/* 
============================
QUERY PARAMETERS
============================
*/
app.use(express.urlencoded({ extended: true }));
app.get("/api/queryString", (req, res) => {
  const query = req.query;
  const { id, name, ratio } = query;
  const message = `id: ${id}, name: ${name}, ratio: ${ratio}`;
  res.send(message);
});

/* 
============================
COOKIES
============================
*/
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/api/cookies", (req, res) => {
  const cookies = req.cookies;
  const { _ga, sessionIdTest } = cookies;
  const message = `_ga: ${_ga}, sessionIdTest: ${sessionIdTest}`;
  res.send(message);
});

/* 
============================
FILES (MULTIPART FORM DATA)
============================
*/
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/api/singleUpload", upload.single("avatar"), (req, res) => {
  const avatar = req.file;
  res.json({ avatar });
});

const path = require("path");
app.get("/api/download/:file", (req, res) => {
  const { file } = req.params;
  const parentPath = path.join(__dirname, "..", "..");
  const pathFile = path.join(parentPath, "uploads", file);
  res.sendFile(pathFile);
});

/* 
============================
STREAMING 1 (GET)
============================
*/
app.get("/api/stream", (req, res) => {
  const messages = ["Hello", "from", "the", "server"];

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  //   messages.forEach((message) => {
  //     res.write(message);
  //   });

  let index = 0;
  const cb = () => {
    if (index < messages.length) {
      res.write(messages[index]);
      index++;
    } else {
      res.end();
      clearInterval(interval);
    }
  };
  const interval = setInterval(cb, 1000);

  //   res.end();
});

/* 
============================
STREAMING 2 (POST) - TEXT
============================
*/
app.post("/api/stream", (req, res) => {
  req.on("data", (chunk) => {
    console.log("chunk => ", chunk);
    console.log("chunk toString => ", chunk.toString());
  });

  req.on("end", () => {
    console.log("end stream");
    res.end();
  });
});

/* 
============================
STREAMING 3 (POST) - FILE (SAVE FILE)
============================
*/
const fs = require("fs");
app.post("/api/streamFile", (req, res) => {
  const fileName = req.headers["x-filename"];
  const parentPath = path.join(__dirname, "..", "..");
  const filePath = path.join(parentPath, "uploads", fileName);

  const fileStream = fs.createWriteStream(filePath);
  req.pipe(fileStream);

  req.on("error", (err) => {
    res.status(500).send(err.message);
  });

  fileStream.on("error", (err) => {
    res.status(500).send(err.message);
  });

  fileStream.on("finish", () => {
    res.send("file uploaded");
  });

  //   res.send("file uploaded");
});

app.listen(3000, () => {
  console.log("api run on http://localhost:3000");
});
