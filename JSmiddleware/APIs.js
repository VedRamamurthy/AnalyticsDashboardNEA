var express = require('express');
var router = express.Router();
var sql = require('mssql');
var sqlConfig = require('../config')

//API to user login
router.get('/UserLogin',function (req, res) {

    var request = new sql.Request();
    request.input("Username", sql.NVarChar(255), req.query.Username)
    request.input("Password", sql.NVarChar(255), req.query.Password)
    request.execute("spUserLogin", function (error, results) {
        if (error) {
            console.log('error',results)
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to sign up
router.get('/UserRegister',function (req, res) {

    var request = new sql.Request();
    request.input("Username", sql.NVarChar(255), req.query.Username)
    request.input("Password", sql.NVarChar(255), req.query.Password)
    request.execute("spUserSignUp", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            if (results.returnValue ==0 || results.returnValue ==-1 ){
                res.json({ "success": false, data: results.returnValue });
            } else{
                res.json({ "success": true, data: results.returnValue });
            }
        
            
        }
    });
})
//API to get amount of patients in each age bracket
router.get('/GetPatientAgeGroups',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetAgeGroups", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get amount of member vs non member patients
router.get('/GetMembershipCount',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetMembershipCount", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get information for each membership type
router.get('/GetMembership',function (req, res) {

    var request = new sql.Request();
    //Allows user to input specific MembershipID to view, an input of 0 would show all
    request.input("MembershipID", sql.Int, req.query.MembershipID)
    request.execute("spGetMemberships", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get amount of patients with each membership type, and whether they pay annually or monthly
router.get('/GetMembershipTypes',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetMembershipTypes", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get membership sales per year
router.get('/GetMembershipYears',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetMembershipYears", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get amount of patients of each gender
router.get('/GetPatientGenders',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetPatientGenders", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get amount of NHS vs Private patients
router.get('/GetPatientTypes',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetPatientTypes", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get amount of each Treatment and how much revenue was generated
router.get('/GetTreatmentCount',function (req, res) {

    var request = new sql.Request();
    request.execute("spGetTreatmentCount", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get generated revenue from memberships each year
router.get('/GetMembershipRevenueByYear',function (req, res) {

    var request = new sql.Request();
    request.execute("spMembershipRevenueByYear", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})

//API to get generated revenue from treatments each year
router.get('/GetTreatmentRevenueByMonth',function (req, res) {

    var request = new sql.Request();
    request.execute("spTreatmentRevenueByMonth", function (error, results, feilds) {
        if (error) {
            res.json({ "success": false, "error": error });
        }
        else {
            console.log(results.recordset)
            res.json({ "success": true, data: results.recordset });
        }
    });
})


module.exports = router;
