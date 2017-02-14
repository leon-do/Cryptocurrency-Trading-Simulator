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

//use /wallet by for testing until login works
// =============================================================
router.get('/wallet', (req, res) => {
		res.json(data);
});

router.get('/:username/wallet', (req, res) => {
		Transaction.findOne({
			where: {
				username: req.params.username
			},
			order: [[ 'createdAt', 'DESC' ]]
		}).then((data) => {
			res.json(data);
		});
});

module.exports = router;