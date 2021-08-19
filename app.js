const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: String,
  score: Number,
  review: String,
});

const Fruit = mongoose.model("fruit", fruitSchema);
const fruit = new Fruit({
  name: "apple",
  score: 8,
  review: "Great fruit",
});

fruit.save();

const orange = new Fruit({
  name: "orange",
  score: 6,
  review: "Kinda sour",
});

const grapes = new Fruit({
  name: "grapes",
  score: 9,
  review: "delicious",
});

const avocado = new Fruit({
  name: "avocado",
  score: 10,
  review: "BEST FRUIT!",
});

Fruit.insertMany([orange, grapes, avocado], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("succesfully added items");
  }
});

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("person", personSchema);
const person = new Person({
  name: "Ramiro",
  age: 19,
});

person.save();
