let express = require("express");
let router = express.Router();
let dbConn = require("../db");

// CREATE TABLE `bookingInfo` (
//     `id` int(50) NOT NULL,
//     `busId` varchar(100) DEFAULT NULL,
//     `userId` varchar(100) DEFAULT NULL,
//     `busName` varchar(50) DEFAULT NULL,
//     `busNO` varchar(15) DEFAULT NULL,
//     `pickUpTime` varchar(50) DEFAULT NULL,
//     `dropTime` varchar(50) DEFAULT NULL,
//     `busFrom` varchar(50) DEFAULT NULL,
//     `busTo` varchar(50) DEFAULT NULL,
//     `busDate` varchar(50) DEFAULT NULL,
//     `price` varchar(10) DEFAULT NULL,
//     `busType` varchar(25) DEFAULT NULL,
//     `fname` varchar(25) DEFAULT NULL,
//     `lname` varchar(25) DEFAULT NULL,
//     `mobile_no` varchar(15) DEFAULT NULL,
//     `email` varchar(100) DEFAULT NULL,
//     `age` varchar(5) DEFAULT NULL,
//     `seatNo` varchar(5) DEFAULT NULL
//   )

// ALTER TABLE `bookingInfo` ADD PRIMARY KEY (`id`);
// ALTER TABLE `bookingInfo` MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

// seat booking api routes
router.post("/", function (req, res, next) {
  console.log("booking Data => ", req.body);
  const bookingData = {
    userId: req.body.userId,
    busId: req.body.id,
    busName: req.body.name,
    busNO: req.body.busNO,
    pickUpTime: req.body.pickUpTime,
    dropTime: req.body.dropTime,
    busFrom: req.body.busFrom,
    busTo: req.body.busTo,
    busDate: req.body.busDate,
    price: req.body.price,
    busType: req.body.busType,
    fname: req.body.fname,
    lname: req.body.lname,
    mobile_no: req.body.mobile_no,
    email: req.body.emailId,
    age: req.body.age,
    seatNo: req.body.seatNo,
  };
  dbConn.query(
    "INSERT INTO bookingInfo SET ?",
    bookingData,
    function (err, result) {
      console.log("INSERT INTO bookingInfo");
      if (err) {
        console.log("Error bookingInfo");
        res.status(500).send({ errormsg: err });
      } else {
        console.log("Inserted bookingInfo");
        dbConn.query(
          "UPDATE busInfos SET totalSeat='" +
            req.body.totalSeat +
            "' WHERE id='" +
            req.body.id +
            "'",
          (error, result) => {
            if (error) {
              console.log("Error UPDATE bookingInfo");
              res.status(500).send({ errormsg: err });
            } else {
              res.status(200).send({
                msg: "Seat booked successfully",
                result: result,
                data: {...bookingData, totalSeat: req.body.totalSeat},
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
