let express = require("express");
let router = express.Router();
let dbConn = require("../db");

// CREATE TABLE `users` (
//     `id` int(50) NOT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `age` varchar(100) DEFAULT NULL,
//     `mobile_no` varchar(100) DEFAULT NULL,
//     `email` varchar(100) DEFAULT NULL,
//     `password` varchar(100) DEFAULT NULL,
//     `usertype` varchar(100) DEFAULT NULL
//   )

// ALTER TABLE `users` ADD PRIMARY KEY (`id`);

// ALTER TABLE `users` MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

// display user page
router.post("/", function (req, res, next) {
  const userData = {
    name: req.body.name,
    age: req.body.age,
    mobile_no: req.body.mobile_no,
    email: req.body.email,
    password: req.body.password,
    usertype: req.body.usertype,
  };
  dbConn.query(
    "SELECT * FROM users Where email = '" + req.body.email + "'",
    function (err, rows) {
      if (err) {
        res.status(500).send({ errormsg: err });
      }
      if (rows && rows.length > 0) {
        res
          .status(500)
          .send({ errormsg: "Email address already used", data: [] });
      } else {
        dbConn.query(
          "INSERT INTO users SET ?",
          userData,
          function (err, result) {
            if (err) {
              res.status(500).send({ errormsg: err });
            } else {
              res
                .status(201)
                .send({
                  msg: "Register successfully",
                  result: result,
                  data: userData,
                });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
