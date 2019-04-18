var express = require('express');
var router = express.Router();
var Cert = require('../models/cert');
var CertUser = require('../models/certuser');
var queries = require('../query/certQueries');
var certTransaction = require('../query/certTx');
router.get('/getCert', function (req, res, next) {
    Cert.find({}).exec(async function (err, data) {
        if (err) {
            res.status(500).send({"status": false, "data": err});
        } else {
            res.status(200).send({"status": true, "data": data});
        }
    });
});
router.post('/certUser', function (req, res, next) {
    CertUser.create(req.body, function (error, data) {
        if (error) {
            res.status(500).send({success: false});
        } else {
            res.status(200).send({success: true, data: data});
        }
    });
});
router.post('/login', async function (req, res, next) {
    if (!req.body || !req.body.username || !req.body.password) return res.status(500).send("Invalid Inputs!");
    let user = await queries.login(req.body);
    return res.status(200).send(user);
});
router.post('/addStudentSchool', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let school = await queries.saveSchool(req.body);
    return res.status(200).send(school);
});
router.post('/addStudentUniversity', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let university = await queries.saveUniversity(req.body);
    return res.status(200).send(university);
});
router.post('/addStudentCompany', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let company = await queries.saveCompany(req.body);
    return res.status(200).send(company);
});

module.exports = router;
