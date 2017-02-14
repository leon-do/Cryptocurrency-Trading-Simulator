// Dependencies
// =============================================================
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction.js');

//update wallet when transfer button is clicked
// =============================================================
router.post('/:username/wallet/transact', function(req, res) {
    Transaction.create({
        id: req.body.id,
        username: req.body.username,
        usd: req.body.usd,
        btc: req.body.btc,
        eth: req.body.eth,
        xrp: req.body.xrp,
        ltc: req.body.ltc,
        xmr: req.body.xmr,
        etc: req.body.etc,
        dash: req.body.dash,
        maid: req.body.maid,
        doge: req.body.doge,
        zec: req.body.zec,
        lsk: req.body.lsk,

    }).then(function(data) {
        res.json(data);
    });
});