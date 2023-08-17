let express = require('express');
let router = express.Router();
let dbConn  = require('../db');
 
// display user page
router.post('/', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    dbConn.query("SELECT * FROM users WHERE email='"+email+"' AND password='"+password+"'", function(err,rows){
        if(err) {
            res.status(500).send({'error': err});
        } else {
            if(rows.length > 0) {
                res.status(200).send({'data': rows});
            }
            else {
                res.status(404).send({
                    'error': 'User not found',
                    'data': rows
                });
            }
        }
    });
});

module.exports = router;