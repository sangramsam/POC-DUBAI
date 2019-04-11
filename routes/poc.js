var express = require('express');
var router = express.Router();
var queries = require('../query/queries');
var sendTransaction = require('../query/sendTx');
/* GET users listing. */
router.post('/addMankani', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let mankani = await queries.saveMankani(req.body);
    sendTransaction.sendMakaniTX(req.body);
    return res.status(200).send(mankani);
});
router.post('/addParcel', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    // console.log("req",req.body)
    if(!req.body.update) queries.saveParcels(req.body);
    let parcel = await sendTransaction.sendParcelsTX(req.body);
    return res.status(200).send(parcel);
});
router.post('/addZoning', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    if(!req.body.update) queries.saveZoning(req.body);
    let zoning = await sendTransaction.sendZoningTX(req.body);
    return res.status(200).send(zoning);
});
router.post('/addBuilding', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    if(!req.body.update)  queries.saveBuilding(req.body);
    let building = await sendTransaction.sendBuilingTX(req.body);
    return res.status(200).send(building);
});
router.post('/addBlockchain', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let blockchain = await queries.saveBlockchain(req.body);
    return res.status(200).send(blockchain);
});
router.post('/addUser', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let user = await queries.saveUser(req.body);
    return res.status(200).send(user);
});
router.get('/blockExplorer', async function (req, res, next) {
    if (!req.body) return res.status(500).send("Invalid Inputs!");
    let blockEx = await queries.getBlockExplorer();
    return res.status(200).send(blockEx);
});
router.post('/login', async function (req, res, next) {
    console.log("req", req.body);
    console.log("req", req.body.username);
    console.log("req", req.body.password);
    if (!req.body || !req.body.username || !req.body.password) return res.status(500).send("Invalid Inputs!");
    let user = await queries.login(req.body);
    return res.status(200).send(user);
});

module.exports = router;
