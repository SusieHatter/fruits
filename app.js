const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "fruitsDB";

const client = new MongoClient(url);

client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected succesfully to server");

  const db = client.db(dbName);

  findDocuments(db, function () {
    client.close();
  });
});

const insertDocuments = function (db, callback) {
  const collection = db.collection("fruits");
  collection.insertMany(
    [
      { name: "apple", score: 8, review: "Great fruit" },
      { name: "orange", score: 6, review: "Kinda sour" },
      { name: "banana", score: 9, review: "Great stuff" },
    ],
    function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.insertedCount);
      assert.equal(3, Object.keys(result.insertedIds).length);
      console.log("Inserted 3 documents into this collection");
      callback(result);
    }
  );
};

const findDocuments = function (db, callback) {
  const collection = db.collection("fruits");
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
