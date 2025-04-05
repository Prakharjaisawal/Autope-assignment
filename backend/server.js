const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const morgan = require('morgan')
const fs = require('fs');
const path = require('path');

const errorHandler = require("./middleware/errorHandler")
const catNotesRoutes = require("./routes/catNoteRoute")
const actuator = require("./routes/systemRoutes")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", catNotesRoutes );
app.use('/actuator', actuator);


app.use(errorHandler);

if (!fs.existsSync('logs')) fs.mkdirSync('logs');

// Log HTTP requests to access.log
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
}));

// DB + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
