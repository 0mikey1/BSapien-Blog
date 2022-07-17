const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json()); // app.use adds a new middleware to the app. Whenever a requst hits backend, Express will execute the functions passed to app.use
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to DB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

console.log(process.env);
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded.");
});

app.use("/api/auth", authRoute); // tells Express to execute api/routes/Auth.js which was imported and set as "AuthRoute".
app.use("/api/users", userRoute); // tells Express to execute api/routes/User.js which was imported and set as "userRoute".
app.use("/api/posts", postRoute); // tells Express to execute api/routes/Post.js which was imported and set as "postRoute".
app.use("/api/categories", categoryRoute); // tells Express to execute api/routes/Categories.js which was imported and set as "categoryRoute".

app.listen("8000", () => {
  console.log("DB is running.");
});
