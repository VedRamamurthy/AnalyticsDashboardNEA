var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/GetAgeGroups', function (req, res) {

    var request = new sql.Request();
    // request.input("ConfigurationID", sql.Int, req.query.ConfigurationID)
    request.execute("spGetAgeGroups", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            res.json({ "success": true, data: results.recordset });
        }
    });
})


module.exports = router;

