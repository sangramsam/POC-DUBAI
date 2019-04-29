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
router.post('/studentLogin', async function (req, res, next) {
    if (!req.body || !req.body.username || !req.body.password) return res.status(500).send("Invalid Inputs!");
    let user = await queries.studentLogin(req.body);
    return res.status(200).send(user);
});
router.post('/addStudentSchool', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let school = await queries.saveSchool(req.body);
    certTransaction.sendCertSchoolTX(req.body);
    return res.status(200).send(school);
});
router.post('/updateSchool', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let school = await queries.updateSchool(req.body);
    certTransaction.sendCertSchoolTX(req.body);
    return res.status(200).send(school);
});
router.post('/addStudentUniversity', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let university = await queries.saveUniversity(req.body);
    certTransaction.sendCertUniversityTX(req.body);
    return res.status(200).send(university);
});
router.post('/addStudentCompany', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let company = await queries.saveCompany(req.body);
    certTransaction.sendCertCompanyTX(req.body);
    return res.status(200).send(company);
});
router.get('/getSchoolStundent',async function (req, res, next) {
    if (!req.param) return res.status(500).send("Invalid Inputs!");
    let school = await queries.getSchoolStudent();
    return res.status(200).send(school);
});
router.get('/getCompanyStundent',async function (req, res, next) {
    if (!req.param) return res.status(500).send("Invalid Inputs!");
    let school = await queries.getCompanyStundent();
    return res.status(200).send(school);
});
router.get('/getUniversityStundent', async function (req, res, next) {
    if (!req.param) return res.status(500).send("Invalid Inputs!");
    let university = await queries.getUniversityStudent();
    return res.status(200).send(university);
});
router.get('/blockExplorer', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let blockEx = await queries.getBlockExplorer();
    return res.status(200).send(blockEx);
});
router.get('/searchStudent', async function (req, res, next) {
    if (!req.query) return res.status(500).send("Invalid Inputs!");
    let student = await queries.searchStudent(req.query.studentID);
    return res.status(200).send(student);
});
router.get('/generatePrivatekey', async function (req, res, next) {
    if (!req.query) return res.status(500).send("Invalid Inputs!");
    let student = await certTransaction.generatePrivateKey();
    return res.status(200).send(student);
});
router.post('/registerStudent', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.registerStudent(req.body);
    return res.status(200).send(student);
});
router.post('/additionalCourse', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.saveAdditionalCourse(req.body);
    return res.status(200).send(student);
});

router.post('/approveAdditionalCourse', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.approveAdditionalCourse(req.body);
    return res.status(200).send(student);
});
router.post('/approveRegistration', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.approveRegistration(req.body);
    return res.status(200).send(student);
});
router.get('/getRegistrationRequest', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.getRegistrationRequest();
    return res.status(200).send(student);
});
router.get('/getDocumentRequest', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.getDocumentRequest();
    return res.status(200).send(student);
});
router.get('/getMyAdditionalCourses', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.getMyAdditionalDocument(req.query.StudentID);
    return res.status(200).send(student);
});
router.post('/documentGrantRequest', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.saveDocumentGrant(req.body);
    return res.status(200).send(student);
});
router.post('/documentGrantRequestApprove', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.approveDocumentGrant(req.body);
    return res.status(200).send(student);
});
router.post('/documentGrantRequestRevoke', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.revokeDocumentGrant(req.body);
    return res.status(200).send(student);
});
router.get('/getGranttedUserList', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.getGranttedUserList(req.query);
    return res.status(200).send(student);
});
router.get('/getGranttedUserList', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.getGranttedUserList(req.query);
    return res.status(200).send(student);
});
router.get('/getMyGranttedList', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let student = await queries.getMyGranttedList(req.query);
    return res.status(200).send(student);
});

module.exports = router;
