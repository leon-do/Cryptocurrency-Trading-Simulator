// Dependencies
// =============================================================
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction.js');

//update wallet when transfer button is clicked
// =============================================================
router.post('/:username/:coin1/:coin2/wallet/transact', function(req, res) {
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
        lsk: req.body.lsk
    });

    let entry = {};
        entry.coin1 = req.body.coin1;
        entry.coin2 = req.body.coin2;

    }).then(function(data) {
        res.json(data);
    });
});