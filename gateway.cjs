const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const TARGET = process.env.TARGET || "http://localhost:9999/notify";
const TOKEN = process.env.TOKEN || "mysecret";

app.post("/notify", async (req, res) => {
  const { title, body } = req.body;
  console.log("Got notification:", title, body);
  await fetch(TARGET, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: TOKEN, title, message: body }),
  });
  res.json({ success: true });
});
