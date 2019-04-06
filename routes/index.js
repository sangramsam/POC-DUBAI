var express = require('express');
var router = express.Router();
var queries = require('../query/queries');
/* GET home page. */
router.get('/getBlockchain', async function(req, res, next) {
  let response = await queries.getBlockchain();
  res.status(200).send(response);
});
router.get('/getBuilding', async function(req, res, next) {
  let response = await queries.getBuilding();
  res.status(200).send(response);
});
router.get('/getMankani', async function(req, res, next) {
  let response = await queries.getMankani();
  res.status(200).send(response);
});
router.get('/getParcels', async function(req, res, next) {
  let response = await queries.getParcels();
  res.status(200).send(response);
});
router.get('/getZoning', async function(req, res, next) {
  let response = await queries.getZoning();
  res.status(200).send(response);
});

module.exports = router;
