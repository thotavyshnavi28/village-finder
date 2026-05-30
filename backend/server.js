const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1028",
  database: "village_api",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Village API Running");
});

app.get("/states", (req, res) => {
  db.query("SELECT * FROM states", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/districts/:stateCode", (req, res) => {
  const stateCode = req.params.stateCode;

  db.query(
    "SELECT * FROM districts WHERE state_code = ?",
    [stateCode],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.get("/subdistricts/:districtCode", (req, res) => {
  const districtCode = req.params.districtCode;

  db.query(
    "SELECT * FROM subdistricts WHERE district_code = ?",
    [districtCode],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.get("/villages/:subdistrictCode", (req, res) => {
  const subdistrictCode = req.params.subdistrictCode;

  db.query(
    "SELECT * FROM villages WHERE subdistrict_code = ?",
    [subdistrictCode],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});