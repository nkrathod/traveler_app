const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const signupRouter = require("./routes/signup");
const signInRouter = require("./routes/signin");
const searchBus = require("./routes/searchBus");
const addBus = require("./routes/addBus");
const bookSeats = require("./routes/bookSeats");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send({ status: 200, msg: `Welcome on node server port:${port}!` });
});

app.use("/signup", signupRouter);
app.use("/login", signInRouter);
app.use("/searchbus", searchBus);
app.use("/addbus", addBus);
app.use("/booking",bookSeats);

app.listen(port, () => {
  console.log(`Server Started and Running Port ${port}`);
});
