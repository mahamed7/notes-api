require("dotenv").config();
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoose = require("mongoose"); 
const logger=require("./middleware/logger");
const errorHandler=require("./middleware/errorHandler");
const notesRoutes = require("./routes/notes");

const app = express();
const port = 3000;
app.use(logger);
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB:", err.message);
  });