const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

const posts = [
  {
    id: "1",
    product: "Apple Ipad Mini",

    details: "waiting for the next one to release",
  },
  {
    id: "2",
    product: "Vespa Scooter",
    details: "this will be good to cruise NYC",
  },
  {
    id: "3",
    product: "Shake Shack Milkshake",
    details: "nothing beats chocolate",
  },
  {
    id: "4",
    product: "12oz Stumptown Coffee",
    details: "coffee that gets you wired",
  },
];

app.get("/", (req, res) => {
  res.send("This is root!");
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id === id);
  res.json(post);
});

app.post("/posts", (req, res) => {
  const post = req.body;
  posts.push(post);
  res.json(posts);
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postIndex = posts.findIndex((post) => post.id === id);
  const post = { ...posts[postIndex], ...req.body };
  posts.splice(postIndex, 1, post);
  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postIndex = posts.findIndex((post) => post.id === id);
  posts.splice(postIndex, 1);
  res.json(posts);
});
