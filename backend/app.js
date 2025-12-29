const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./connection/db');
const userRouter = require('./routes/user.route');
const boardRouter = require('./routes/board.route');
const columnRouter = require('./routes/column.route');
const taskRouter = require('./routes/task.route');

db();

const app = express();
const port = process.env.PORT || 8000;

//  CORS (Render-safe)
app.use(cors({
  origin: "https://kanbanx-frontend.onrender.com",
  credentials: true,
}));

//  Handle preflight
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/columns", columnRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
