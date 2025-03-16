const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); //form data

//csrf token middleware
const csurf = require("csurf");
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
});

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(csrfProtection); //validate csrf token

//api form
app.get("/transfer", (req, res) => {
  const htmlText = `
    <form action="/transfer" method="POST">
        <input type="hidden" name="_csrf" value="${req.csrfToken()}"/>
        <input type="text" name="amount" placeholder="กรุณาระบุจำนวนเงิน" />
        <input type="text" name="toAccount" placeholder="กรุณาระบุบัญชีปลายทาง" />
        <button type="submit">โอนเงินทันที!!!</button>
    </form>
    `;

  res.send(htmlText);
});

//api transfer money
app.post("/transfer", (req, res) => {
  const { amount, toAccount } = req.body;
  res.send({
    amount,
    toAccount,
    message: "โอนเงินสำเร็จ",
  });
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
