import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 9100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const TARGET = process.env.TARGET || "http://CHANGE_ME_BY_SETTING_TARGET_ENV/notify";
const TOKEN = process.env.TOKEN || "mysecret";

app.post("/notify", async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: "Missing fields" });

  await fetch(TARGET, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: TOKEN, title, message: body }),
  });

  res.json({ success: true });
});
