import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get("/", async (_req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection.find({}).toArray();
    res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something went wrong");
  }
});

app.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertOne(newUser);

    // Respond with the created user information and a 201 Created status
    res.status(201).send({
      status: "success",
      message: "User created successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, that didn't work:(");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
