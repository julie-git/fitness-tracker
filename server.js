const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);



//**********************ROUTES for Displaying pages of app ************ */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});


//Display exercise Page 
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

//render stats html page with this route 
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});



// get all workouts 
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// Find one exercixe and update it 
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id,{$push:{exercises:req.body}})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// create a workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get workouts within a range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
     
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});