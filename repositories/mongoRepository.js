const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
const dbName = "lms_forum";
let collection;

async function init() {
  await client.connect();
  collection = client.db(dbName).collection("discussion_posts");
}
init();

module.exports = {
  getAll: async () => await collection.find({}).toArray(),
  getById: async (id) => await collection.findOne({ _id: new ObjectId(id) }),
  create: async (doc) => await collection.insertOne(doc),
  update: async (id, doc) => await collection.updateOne({ _id: new ObjectId(id) }, { $set: doc }),
  delete: async (id) => await collection.deleteOne({ _id: new ObjectId(id) })
};
