const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); //form data
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self'");
  next();
});

const comments = [];
// comments.push("Comment10");
// comments.push("Comment20");
// comments.push("Comment30");

app.get("/api/xss", (req, res) => {
  //SSR - Server Side Rendering
  const commentHtml = comments.map((item) => `<p>${item}</p>`).join("");
  const html = `
    <h1>Simple Comment App</h1>
    <form action="/api/xss/submit" method="POST">
        <input type="text" name="comment" id="comment" />
        <button type="submit">Submit Form</button>
    </form>
    
    <h2>Display Comments</h2>
    ${commentHtml}
    `;
  res.send(html);
});

app.post("/api/xss/submit", (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  res.redirect("/api/xss");
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
