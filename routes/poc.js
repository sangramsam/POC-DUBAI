var express = require('express');
var router = express.Router();
var queries = require('../query/queries');
/* GET users listing. */
router.post('/addMankani',async function(req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let mankani = await queries.saveMankani(req.body);
  return res.status(200).send(mankani);
});
router.post('/addParcel', async  function(req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let parcel = await queries.saveParcels(req.body);
  return res.status(200).send(parcel);
});
router.post('/addZoning',async function(req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let zoning = await queries.saveZoning(req.body);
  return res.status(200).send(zoning);
});
router.post('/addBuilding', async function(req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let building = await queries.saveBuilding(req.body);
  return res.status(200).send(building);
});
router.post('/addBlockchain',async function(req, res, next) {
  if (!req.body) return res.status(500).send("Invalid Inputs!");
  let blockchain = await queries.saveBlockchain(req.body);
  return res.status(200).send(blockchain);
});

module.exports = router;
