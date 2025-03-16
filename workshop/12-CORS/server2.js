//SSR - Server Side Rendering

const express = require("express");
const app = express();

app.get("/api/test-cors", (req, res) => {
  const htmlText = `
    
    
    <h2>test cors</h2>
    <button onClick="testCors()">Click for test</button>
    
    <script>
    
    function testCors() {
    
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => console.log(data));
    
    }
    
    </script>


    `;
  res.send(htmlText);
});

const PORT = 3002;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
