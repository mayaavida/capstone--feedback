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

//get id for a username
app.get("/getemployee/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
    const employeeInfo = await collection.findOne({
      "employeeDetails.username": username,
    });

    res.json(employeeInfo);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

//gets posts for a certain employee
app.get("/employee/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
    const employeeInfo = await collection.findOne({ employeeId: parseInt(id) });

    const posts = employeeInfo?.employeePosts;
    const stringPosts = posts.map((item) => item.toString());

    const secondCollection = db.collection(postsCollection);
    const employeePosts = await secondCollection
      .find({ post_id: { $in: stringPosts } })
      .toArray();

    res.json(employeePosts);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

//gets direct reports for a certain employee
app.get("/employee/:id/reports", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
    const employeeInfo = await collection.findOne({ employeeId: parseInt(id) });

    const directReports = employeeInfo?.employeesManaged;

    const directReportInfo = await collection
      .find({ employeeId: { $in: directReports } })
      .toArray();

    res.json(directReportInfo);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

//get direct reports of a manager, then get those employees posts
app.get("/employee/:id/reports/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
    const employeeInfo = await collection.findOne({ employeeId: parseInt(id) });

    const directReports = employeeInfo?.employeesManaged;

    const directReportInfo = await collection
      .find({ employeeId: { $in: directReports } })
      .toArray();
    const directReportPosts = directReportInfo.map(
      (employees) => employees.employeePosts
    );

    const postIds = directReportPosts.flatMap((item) => item);
    const stringPostIds = postIds.map((item) => item.toString());
    console.log(stringPostIds);

    const secondCollection = db.collection(postsCollection);
    const postContent = await secondCollection
      .find({ post_id: { $in: stringPostIds } })
      .toArray();

    console.log("please work", postContent);

    res.json(postContent);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, no employee info for you! ☹");
  }
});

//register new user in db
app.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(employeesCollection);
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

//store new posts for employee
app.post("/employee/:id/newPost", async (req, res) => {
  console.log("newPost on server side: ", req.body);
  const postData = req.body;
  const employeeId = +req.params.id;
  console.log("employee id", employeeId);
  const postId = postData.post_id;
  console.log("post Id", postId);

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(postsCollection);
    collection.insertOne(postData);

    const secondCollection = db.collection(employeesCollection);
    secondCollection.updateOne(
      { employeeId: employeeId },
      { $push: { employeePosts: postId } }
    );

    //Respond with the created post information and a 201 created status
    res.status(201).send({
      states: "success",
      message: "Post created successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, that didn't work!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
