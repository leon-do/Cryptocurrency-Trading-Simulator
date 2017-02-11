// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const router = express.Router();
//express session

// Models
// =============================================================
const User = require('../../models/User');
const Transaction = require('../../models/Transaction');
//the below is temporary
const data = require('./data');

//redirect to wallet route by default
// =============================================================
router.get('/', function(req, res) {
    res.redirect('/wallet');
});

//Return last transaction row from DB for that user
// =============================================================
router.get('/:username/wallet', function(req, res) {
    Transaction.findOne({
        where: {
            username: req.params.username
        },
        order: [[ 'createdAt', 'DESC' ]],

    }).then(function(data) {
        res.json(data);
    });
});



//initial load
// =============================================================
router.use(function(req, res) {
    res.redirect('/wallet');
});

//export
// =============================================================
module.exports = router;
