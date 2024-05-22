import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const employeesCollection = process.env.EMPLOYEES_COLLECTION;
const postsCollection = process.env.POSTS_COLLECTION;

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

// Endpoint to get employee info for a certain id
app.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
    const employeeInfo = await collection
      .find({ employeeId: parseInt(id) })
      .toArray();
    res.json(employeeInfo);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

app.get("/employee/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
    const employeeInfo = await collection.findOne({ employeeId: parseInt(id) });
    console.log("employee info: ", employeeInfo);
    const posts = employeeInfo?.employeePosts;
    const stringPosts = posts.map((item) => item.toString());
    console.log("employee posts:", stringPosts);
    const secondCollection = db.collection(postsCollection);
    const employeePosts = await secondCollection
      .find({ post_id: { $in: stringPosts } })
      .toArray();
    console.log("employeePosts: ", employeePosts);
    res.json(employeePosts);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

app.get("/getemployee/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log("username on server: ", username);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const employeeInfo = await collection.findOne({
      "employeeDetails.username": username,
    });
    console.log("employeeInfo? ", employeeInfo);
    res.json(employeeInfo);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

app.post("/register", async (req, res) => {
  console.log("newUser on server side: ", req.body);
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

//Request for multiple posts from an employee

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
