const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataPath = path.join(__dirname, "../data/events.json");

router.get("/", (req, res) => {
  const events = JSON.parse(fs.readFileSync(dataPath));
  res.json(events);
});

router.post("/:id/register", (req, res) => {
  const { name, email } = req.body;
  const eventId = parseInt(req.params.id);

  const events = JSON.parse(fs.readFileSync(dataPath));
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.spots === 0) {
    return res.status(400).json({ message: "No spots left!" });
  }

  event.registrations.push({ name, email });
  event.spots -= 1;

  fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));

  res.json({ message: `Successfully registered for ${event.title}!` });
});

module.exports = router;