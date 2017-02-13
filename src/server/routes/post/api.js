// Dependencies
// =============================================================
var express = require('express');
var path = require('path');
var router = express.Router();
var Transaction = require('../models/Transaction.js');

//update wallet when transfer button is clicked
// =============================================================
router.post('/:username/:coin1/:coin2/wallet/transact', function(req, res) {

    Transaction.create({
        coin1: req.body.coin1,
        coin2: req.body.coin2
    }).then(function(data) {
        res.json(data);
    });
});