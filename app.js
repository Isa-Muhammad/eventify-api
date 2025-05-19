const express = require("express");
const fs = require("fs");

const app = express();

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/data/events.json`, "utf-8")
);

console.log(events);

app.get("/api/v1/events", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: events.length, data: { events } });
});

const port = 3000;
app.listen(port, "127.0.0.1", () => {
  console.log(`App running on port ${port}...`);
});
