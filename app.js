const express = require("express");
const fs = require("fs");

const app = express();

// Middleware
app.use(express.json());

const events = JSON.parse(
  fs.readFileSync(`${__dirname}/data/events.json`, "utf-8")
);

// HANDLER FUNCTIONS
const getAllEvents = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: events.length, data: { events } });
};

const getEvent = (req, res) => {
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
};

const createEvent = (req, res) => {
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
};

const updateEvent = (req, res) => {
  const { id } = req.params;

  if (Number(id) > events.length) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }

  res.status(200).json({
    status: "success",
    data: { event: "<Updated event here...>" },
  });
};

const deleteEvent = (req, res) => {
  const { id } = req.params;

  if (Number(id) > events.length) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }

  res.status(204).json({ status: "success", data: null });
};

// app.get("/api/v1/events", getAllEvents);
// app.get("/api/v1/events/:id", getEvent);
// app.post("/api/v1/events", createEvent);
// app.patch("/api/v1/events/:id", updateEvent);
// app.delete("/api/v1/events/:id", deleteEvent);

app.route("/api/v1/events").get(getAllEvents).post(createEvent);

app
  .route("/api/v1/events/:id")
  .get(getEvent)
  .patch(updateEvent)
  .delete(deleteEvent);

const port = 3000;
app.listen(port, "127.0.0.1", () => {
  console.log(`App running on port ${port}...`);
});
