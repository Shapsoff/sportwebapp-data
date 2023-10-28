const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const router = express.Router();
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;
console.log(connectionString);

class Database {
    constructor() {
      this._connect();
    }
    _connect() {
      mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        .then(() => {
          console.log('Database connection successful');
        })
        .catch((err) => {
          console.error('Database connection failed');
        });
    }
  }
  
  module.exports = new Database();

  const SportModel = mongoose.model('sport', new mongoose.Schema({
    name: String,
    bodyPart: String,
    mainMuslces: Array,
    stabilazingMuscles: Array,
    bilateral: Boolean,
    unilateral: Boolean
  }), 'sport');

  router.get("/", async (request, response) => {
    const sport = await SportModel.find({});
    try {
        response.send(sport);
        console.log(sport.length);
      } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;