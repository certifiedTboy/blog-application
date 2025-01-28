const express = require("express");
// const sanitizer = require("perfect-express-sanitizer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

// configuration to allow acceptance of json data from client
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-application-xi-blue.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.static(path.join(process.cwd(), "public")));

// global middleware for data sanitization
// const whiteList = ["/users"];

// app.use(
//   sanitizer.clean(
//     {
//       xss: true,
//       noSql: true,
//       sql: true,
//     },
//     whiteList
//   )
// );

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

// server health check
app.get("/", (req, res) => {
  res.json({ message: "Server is live" });
});

module.exports = app;
