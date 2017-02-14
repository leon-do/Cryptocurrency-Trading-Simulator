const User = require('../../models/User');
const Transaction = require('../../models/Transaction');

//use /wallet by for testing until login works
// =============================================================
module.exports = (app) => {
    app.get('/wallet', (req, res) => {
        res.json(data);
    });

    app.get('/:username/history', (req, res) => {
        Transaction.findAll({
            where: {
                username: req.params.username
            },
        }).then((data) => {
            res.json(data);
        });
    });
};