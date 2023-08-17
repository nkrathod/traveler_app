let express = require("express");
let router = express.Router();
let dbConn = require("../db");

// display user page
router.post("/", function (req, res, next) {
  const searchData = {
    pickUp: req.body.pickUp,
    drop: req.body.drop,
    bookdate: req.body.bookdate,
  };
  let searchQuery = "SELECT * FROM busInfos";
  if (req.body.pickUp && req.body.drop && req.body.bookdate) {
    searchQuery =
      "SELECT * FROM busInfos Where busFrom = '" +
      req.body.pickUp +
      "' AND busTo = '" +
      req.body.drop +
      "' AND busDate = '" +
      req.body.bookdate +
      "'";
  }
  if (req.body.busNo) {
    searchQuery =
      "SELECT * FROM busInfos Where busNo = '" + req.body.busNo + "'";
  }
  dbConn.query(searchQuery, function (err, rows) {
    if (err) {
      res.status(500).send({ errormsg: err });
    } else {
      if (rows && rows.length > 0) {
        res.status(200).send({ msg: "Bus fetched seccessfuly", results: rows });
      } else {
        res.status(200).send({ msg: "Bus not found", results: [] });
      }
    }
  });
});

module.exports = router;
