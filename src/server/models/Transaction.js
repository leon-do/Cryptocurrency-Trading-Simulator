const Sequelize = require('sequelize');

const Transaction = {
    //user data
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    accountBalance: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 100000
    },
    profitAndLoss: {
        type: Sequelize.DECIMAL(24,10)
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    //Wallet
    usd: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 100000
    },
    btc: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    eth: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    xrp: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    ltc: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    xmr: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    etc: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    dash: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    maid: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    doge: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    zec: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    lsk: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    }
};

const options = {
    freezeTableName: true
};

module.exports.Transaction = Transaction;
module.exports.options = options;