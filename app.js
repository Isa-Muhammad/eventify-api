const express = require("express");
const fs = require("fs");

const app = express();

// Middleware
app.use(express.json());

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/data/events.json`, "utf-8")
);

// console.log(events);

app.get("/api/v1/events", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: events.length, data: { events } });
});

app.get("/api/v1/events/:id", (req, res) => {
  const { id } = req.params;
  const event = events.find((item) => item.id === Number(id));

  // if (id > events.length) {
  if (!event) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

app.post("/api/v1/events", (req, res) => {
  console.log(req.body);

  const newId = events[events.length - 1].id + 1;
  const newEvent = Object.assign({ id: newId }, req.body);

  events.push(newEvent);

  fs.writeFile(`${__dirname}/data/events.json`, JSON.stringify(events), () => {
    res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  });
});

const port = 3000;
app.listen(port, "127.0.0.1", () => {
  console.log(`App running on port ${port}...`);
});
