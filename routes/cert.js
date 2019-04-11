var express = require('express');
var router = express.Router();
var Cert = require('../models/cert');
var CertUser = require('../models/certuser');
var queries = require('../query/queries');
var certTransaction = require('../query/certTx');
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
router.post('/certUpload', upload.single('certFile'), function (req, res, next) {
    //console.log(req.body);
    Cert.create(req.body, async function (error, data) {
        if (error) {
            res.status(500).send({success: false});
        } else {
            let cert = await certTransaction.sendCertTX(data, req.body.address, req.body.myPrivateKey)
            res.status(200).send({success: true, data: cert});
        }
    });
});
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
    let user = await queries.certLogin(req.body);
    return res.status(200).send(user);
});

module.exports = router;
