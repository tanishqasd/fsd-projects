const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

app.use("/api/events", eventRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});