const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "../frontend")));
app.use(bodyParser.json());
app.use(studentRoutes);
app.use("/student", express.static(path.join(__dirname, "../frontend/student")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});