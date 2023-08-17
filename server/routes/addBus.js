let express = require("express");
let router = express.Router();
let dbConn = require("../db");

// CREATE TABLE `businfos` (
//     `id` int(50) NOT NULL,
//     `name` varchar(100) DEFAULT NULL,
//     `busNO` varchar(100) DEFAULT NULL,
//     `pickUpTime` varchar(100) DEFAULT NULL,
//     `dropTime` varchar(100) DEFAULT NULL,
//     `busFrom` varchar(100) DEFAULT NULL,
//     `busTo` varchar(100) DEFAULT NULL,
//     `busDate` varchar(100) DEFAULT NULL,
//     `price` varchar(100) DEFAULT NULL,
//     `totalSeat` varchar(100) DEFAULT NULL,
//     `status` varchar(100) DEFAULT NULL,
//     `busType` varchar(100) DEFAULT NULL
//   )

// ALTER TABLE `businfos` ADD PRIMARY KEY (`id`);

// ALTER TABLE `businfos` MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

// ALTER TABLE businfos MODIFY COLUMN totalSeat varchar(1000) DEFAULT NULL;

// display user page
router.post("/", function (req, res, next) {
  const seatNo = [];
  for (let i = 0; i < Number(req.body.totalSeats); i++) {
    seatNo.push("Available");
  }
  const busData = {
    name: req.body.name,
    busNo: req.body.busNo,
    pickUpTime: req.body.pickUpTime,
    dropTime: req.body.dropTime,
    busFrom: req.body.busfrom,
    busTo: req.body.busto,
    busDate: req.body.busDate,
    price: req.body.price,
    totalSeat: JSON.stringify(seatNo),
    status: req.body.status,
    busType: req.body.busType,
  };
  //console.log("seatNo => ", busData);
  dbConn.query(
    "SELECT * FROM busInfos Where busNo='" +
      req.body.busNo +
      "' AND busDate='" +
      req.body.busDate +
      "'",
    function (err, rows) {
      if (err) {
        res.status(500).send({ errormsg: err });
      }
      if (rows && rows.length > 0) {
        res.status(500).send({
          errormsg: "Bus record already inserted for same date.",
          data: [],
        });
      } else {
        dbConn.query(
          "INSERT INTO busInfos SET ?",
          busData,
          function (err, result) {
            if (err) {
              res.status(500).send({ errormsg: err });
            } else {
              res.status(201).send({
                msg: "Register successfully",
                result: result,
                data: busData,
              });
            }
          }
        );
      }
    }
  );
});

router.delete("/delete-bus", function (req, res, next) {
  console.log("req.query => ", req.query);
  dbConn.query(
    "DELETE FROM  busInfos Where id='" + req.query.id + "'",
    function (err, result) {
      if (err) {
        res.status(500).send({ errormsg: err });
      } else {
        res.status(200).send({
          msg: "Bus record deleted successfully.",
          busId: req.query.id,
          result: result,
        });
      }
    }
  );
});

module.exports = router;
