const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

//==================>
// Workshop1: fix salt
//==================>
app.get("/api/hashing/w1/:password", (req, res) => {
  const password = req.params.password;
  const salt = "$2b$10$Q6n6z1Z6Q6n6z1Z6Q6n6z1";
  bcrypt.hash(password, salt, (err, outputHashing) => {
    res.json({ salt, outputHashing });
  });
});

//$2b$10$Q6n6z1Z6Q6n6z1Z6Q6n6zu8aQ/TJpOFP6nOhVfd9clm9/18jazOsO
//$2b$10$Q6n6z1Z6Q6n6z1Z6Q6n6zu8aQ/TJpOFP6nOhVfd9clm9/18jazOsO
//$2b$10$Q6n6z1Z6Q6n6z1Z6Q6n6zu8aQ/TJpOFP6nOhVfd9clm9/18jazOsO

//==================>
// Workshop2: random salt
//==================>
// app.get("/api/hashing/w2/:password", (req, res) => {
//   const password = req.params.password;
//   //   const salt = "$2b$10$Q6n6z1Z6Q6n6z1Z6Q6n6z1";
//   bcrypt.genSalt(10, (err, saltRandom) => {
//     bcrypt.hash(password, saltRandom, (err, outputHashing) => {
//       res.json({ salt: saltRandom, outputHashing });
//     });
//   });
// });

app.get("/api/hashing/w2/:password", (req, res) => {
  const password = req.params.password;
  //   const salt = "$2b$10$Q6n6z1Z6Q6n6z1Z6Q6n6z1";
  const saltRound = 10;
  bcrypt.hash(password, saltRound, (err, outputHashing) => {
    res.json({ salt: saltRound, outputHashing });
  });
});

//==================>
// Workshop1: fix salt
//==================>
app.use(express.json());
app.post("/api/hashing/w3", (req, res) => {
  const { password: orginalPassword, hashData } = req.body;
  bcrypt.compare(orginalPassword, hashData, (err, result) => {
    res.send(result);
  });
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
